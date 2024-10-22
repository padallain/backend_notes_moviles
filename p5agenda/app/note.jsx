import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import AnimatedButton from "../components/AnimatedButton";
import { playSound } from "../components/soundUtils";
import { Colors } from "../constants/Colors";
import { getCategoryNameById } from "./home";
import { imageMapCategory, imageMapSilhouette } from "../components/imageMaps";

export default function Note() {
  const { personId, categoryId, favorite, originalIndex } =
    useLocalSearchParams();
  const categoryIdInt = parseInt(categoryId);
  const fadeopacity = useSharedValue(1);
  let [notetitle, setNoteTitle] = useState("");
  let [notedesc, setNoteDesc] = useState("");
  const categoryName = getCategoryNameById(categoryIdInt);

  useEffect(() => {
    console.log(originalIndex); // Debugging: Check originalIndex value
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `https://backend-notes-moviles.onrender.com/getOneNote/${originalIndex}`
        );
        const note = await response.json();
        console.log(note); // Debugging: Check the fetched note
        setNoteTitle(note.title);
        setNoteDesc(note.description);
        console.log(notetitle, notedesc); // Debugging: Check state updates
      } catch (error) {
        console.error("Failed to fetch note data:", error);
      }
    };

    fetchNote();

    setTimeout(() => {
      fadeopacity.value = withTiming(1, { duration: 500 });
    }, 500);
  }, [originalIndex]);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        fadeopacity.value = withTiming(0, { duration: 500 }, () => {
          fadeopacity.value = 0;
        });
      }, 500);
    }, [])
  );

  const FadeOpacity = useAnimatedStyle(() => {
    return {
      opacity: fadeopacity.value,
    };
  });

  const handleBack = async () => {
    if (notetitle.trim().length === 0 || notedesc.trim().length === 0) {
      Alert.alert(
        "Validation Error",
        "Title and description must have at least one character.",
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert(
      "Save Note",
      "Do you want to save the note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await fetch(
                "https://backend-notes-moviles.onrender.com/createNote",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    title: notetitle,
                    description: notedesc,
                    user: personId, // Replace with actual user ID
                    category: categoryId, // Replace with actual category ID
                    priority: "High", // Replace with actual priority
                    favorite: false, // Replace with actual favorite status
                  }),
                }
              );

              if (!response.ok) {
                throw new Error("Failed to save the note");
              }

              console.log("Note saved successfully");
              await playSound(require("../assets/images/SFX/Back.wav"));
              fadeopacity.value = withTiming(1, { duration: 500 }, () => {
                fadeopacity.value = 1;
              });
              setTimeout(() => {
                router.replace("/home");
              }, 500);
            } catch (error) {
              console.error("Error saving note:", error);
              Alert.alert(
                "Error",
                "Failed to save the note. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleFav = async () => {
    console.log("Toggle Favorite Button Pressed");
    await playSound(require("../assets/images/SFX/Select.wav"));
  };

  const handleDelete = async () => {
    console.log("Delete Note Button Pressed");
    await playSound(require("../assets/images/SFX/Delete.wav"));

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await fetch(
                `https://backend-notes-moviles.onrender.com/deleteNote/${originalIndex}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const noteMessage = await response.json();
              console.log(noteMessage);
              if (response.ok) {
                console.log("Note deleted successfully");
                // Navigate back to home or update the state to remove the deleted note
                router.navigate("/home");
              } else {
                console.error("Failed to delete note");
              }
            } catch (error) {
              console.error("Failed to fetch note data:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[categoryId],
      }}
    >
      <Animated.View
        style={[notestyles.blackfade, FadeOpacity]}
        pointerEvents={"none"}
      />
      <Image
        source={require("../assets/images/DarkStarsBGHD.png")}
        style={notestyles.starbg}
      />
      <Image
        source={require("../assets/images/Login/SplitStripe2.png")}
        style={notestyles.splitstripe}
        pointerEvents={"none"}
      />
      <AnimatedButton
        onPress={handleBack}
        source={require("../assets/images/Note/Back.png")}
        pressStyle={notestyles.backpressable}
        style={notestyles.back}
      />
      <AnimatedButton
        onPress={handleFav}
        source={require("../assets/images/Note/Fav.png")}
        pressStyle={notestyles.favpressable}
        style={notestyles.nofav}
      />
      <AnimatedButton
        onPress={handleDelete}
        source={require("../assets/images/Note/Delete.png")}
        pressStyle={notestyles.deletepressable}
        style={notestyles.delete}
      />
      <Image source={imageMapSilhouette[categoryId]} style={notestyles.bg} />
      <ScrollView style={notestyles.scrollview}>
        <Image source={imageMapCategory[categoryId]} style={notestyles.cat} />
        <Text style={notestyles.textcat}>{categoryName}</Text>
        <Image
          source={require("../assets/images/Note/NoteTitleCategory.png")}
          style={notestyles.title}
        />
        <TextInput
          placeholder="Your Note Title..."
          caretHidden={true}
          textAlignVertical="top"
          placeholderTextColor="#aaa"
          value={notetitle}
          onChangeText={setNoteTitle}
          style={notestyles.notetitleinput}
          maxLength={23}
          multiline={false}
        />
        <TextInput
          placeholder="Start typing here..."
          multiline={true}
          textAlignVertical="top"
          placeholderTextColor="#aaa"
          value={notedesc}
          onChangeText={setNoteDesc}
          style={notestyles.noteinput}
          maxLength={1000}
        />
        <Image
          source={require("../assets/images/Note/Padder.png")}
          style={notestyles.padder}
        />
      </ScrollView>
    </View>
  );
}

notestyles = StyleSheet.create({
  scrollview: {
    width: "100%",
    height: "100%",
    paddingTop: 225,
    zIndex: 2,
  },
  padder: {
    width: 50,
    height: 750,
    left: -50,
    top: 0,
    zIndex: 1,
  },
  noteinput: {
    fontFamily: "P5-Font",
    fontSize: 19,
    color: "white",
    zIndex: 5,
    paddingHorizontal: 20,
  },
  notetitleinput: {
    fontFamily: "P5-Font",
    fontSize: 23,
    color: "white",
    width: 270,
    left: 80,
    top: -112,
    zIndex: 2,
    textAlign: "center",
  },
  title: {
    width: 400,
    height: 200,
    left: 0,
    top: 0,
    zIndex: 1,
  },
  textcat: {
    fontFamily: "P5-Font",
    fontSize: 19,
    zIndex: 2,
    left: -79,
    top: 51,
    textAlign: "center",
    transform: [
      {
        rotate: "-13deg",
      },
    ],
  },
  cat: {
    position: "absolute",
    width: 39,
    height: 39,
    zIndex: 2,
    left: 23,
    top: 83,
    transform: [
      {
        rotate: "-22deg",
      },
    ],
  },
  bg: {
    position: "absolute",
    width: 400,
    height: 680,
    left: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.85,
  },
  favpressable: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 3,
  },
  nofav: {
    position: "absolute",
    width: 80,
    height: 80,
    right: 157,
    top: 50,
    zIndex: 3,
  },
  deletepressable: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 3,
  },
  delete: {
    position: "absolute",
    width: 78,
    height: 78,
    right: 25,
    top: 53,
    zIndex: 3,
  },
  backpressable: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 3,
  },
  back: {
    position: "absolute",
    width: 100,
    height: 70,
    left: 17,
    top: 60,
    zIndex: 3,
  },
  splitstripe: {
    position: "absolute",
    width: 420,
    height: 220,
    left: -25,
    top: 45,
    transform: [{ rotate: "-2deg" }],
    zIndex: 3,
    pointerEvents: "none",
  },
  starbg: {
    position: "absolute",
    width: 400,
    height: 830,
    left: 0,
    bottom: 630,
    zIndex: 3,
  },
  blackfade: {
    position: "absolute",
    width: 450,
    height: 900,
    left: 0,
    top: 0,
    zIndex: 5,
    opacity: 0,
    backgroundColor: "black",
  },
});
