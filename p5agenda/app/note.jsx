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
  let [favNote, setFavNote] = useState();
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
        setFavNote(note.favorite);
      } catch (error) {
        console.error("Failed to fetch note data:", error);
      }
    };

    fetchNote();
    console.log(favorite);

    setTimeout(() => {
      fadeopacity.value = withTiming(1, { duration: 500 });
    }, 500);
  }, [originalIndex]);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        fadeopacity.value = withTiming(0, { duration: 700 }, () => {
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
    console.log("Back from Note Button Pressed");
    await playSound(require("../assets/images/SFX/Back.wav"));

    // Fetch request to update the note
    try {
      const response = await fetch(
        `https://backend-notes-moviles.onrender.com/updateNote/${originalIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Include the fields you want to update
            title: notetitle,
            description: notedesc,
            favorite: favNote,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Note updated successfully:", data);
    } catch (error) {
      console.error("Error updating note:", error);
    }

    fadeopacity.value = withTiming(1, { duration: 300 }, () => {
      fadeopacity.value = 1;
    });

    setTimeout(() => {
      router.navigate({
        pathname: "/home",
        params: { personId },
      });
    }, 100);
  };

  const handleFav = async () => {
    await playSound(require("../assets/images/SFX/Select.wav"));
    const oldFavNote = favNote;
    const newFavNote = !favNote;
    setFavNote(newFavNote);
    console.log(`Favorite changed from ${oldFavNote} to ${newFavNote}`);
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
                fadeopacity.value = withTiming(1, { duration: 500 });
                setTimeout(() => {
                  router.navigate({
                    pathname: "/home",
                    params: { personId },
                  });
                }, 500);
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
        source={
          favNote
            ? require("../assets/images/Note/Fav.png")
            : require("../assets/images/Note/NoFav.png")
        }
        pressStyle={notestyles.favpressable}
        style={notestyles.fav}
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
    left: 0,
    top: 0,
    zIndex: 3,
  },
  fav: {
    position: "absolute",
    width: 80,
    height: 80,
    left: 156,
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
