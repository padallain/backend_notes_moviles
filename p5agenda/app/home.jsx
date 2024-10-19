// app/home.jsx
import { Text, View, StyleSheet, Image, ScrollView, Alert } from "react-native";
import React, { useEffect } from "react";
import { useSearchParams } from "expo-router";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import AnimatedButton from "../components/AnimatedButton";
import { playSound } from "../components/soundUtils";
import { useLocalSearchParams } from "expo-router";

export default function Home() {
  const { name, personId } = useLocalSearchParams(); // Cambia a useLocalSearchParams
  const fadeopacity = useSharedValue(1);

  useEffect(() => {
    console.log(`Welcome ${name}, your personId is ${personId}`);

    const fetchNotes = async () => {
      const url = `https://backend-notes-moviles.onrender.com/getNotes/${personId}`;
      try {
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          const data = await response.json();
          console.log('Notes:', data);
      } catch (error) {
          console.error('Error fetching notes:', error);
      }
  };

  fetchNotes();
    
    setTimeout(() => {
      fadeopacity.value = withTiming(0, { duration: 500 });
    }, 500);



  }, []);

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

  const handleLogoutPress = async () => {
    console.log("Logout Pressed");
    await playSound(require("../assets/images/SFX/Back.wav"));
    fadeopacity.value = withTiming(1, { duration: 500 }, () => {
      fadeopacity.value = 1;
    });
    setTimeout(() => {
      router.navigate("/");
    }, 500);
  };

  const handleEraseAccountPress = async () => {
    console.log("Erase Account Button Pressed");
    await playSound(require("../assets/images/SFX/Delete.wav"));

    const dataDelete = {
      username: name, // El valor capturado del input de email
      
    };

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account?",
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
                "https://backend-notes-moviles.onrender.com/deleteUser",
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(dataDelete), // Ajusta el email según tu lógica
                }
              );

              if (response.ok) {
                console.log("Account deleted successfully");
                fadeopacity.value = withTiming(1, { duration: 500 }, () => {
                  fadeopacity.value = 1;
                });
                setTimeout(() => {
                  router.navigate("/");
                }, 500);
              } else {
                console.log("Failed to delete account");
              }
            } catch (error) {
              console.error("Error connecting to the server:", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelCategoryPress = async () => {
    console.log("Delete Category Button Pressed");
    await playSound(require("../assets/images/SFX/Delete.wav"));
  };

  const handleNewNotePress = async () => {
    console.log("New Note Pressed");
    await playSound(require("../assets/images/SFX/Battle UI.wav"));
    fadeopacity.value = withTiming(1, { duration: 500 }, () => {
      fadeopacity.value = 1;
    });
    setTimeout(() => {
      router.push("/note");
    }, 500);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Animated.View
        style={[homestyles.blackfade, FadeOpacity]}
        pointerEvents={"none"}
      />
      <Image
        source={require("../assets/images/DarkStarsBGHD.png")}
        style={homestyles.bg}
      />
      <Image
        source={require("../assets/images/Home/Header.png")}
        style={homestyles.header}
      />
      <Image
        source={require("../assets/images/Home/CategoriesHD.png")}
        style={homestyles.categoriesstrip}
      />
      <AnimatedButton
        onPress={handleLogoutPress}
        source={require("../assets/images/Home/LogOut.png")}
        pressStyle={homestyles.logoutpressable}
        style={homestyles.logout}
      />
      <AnimatedButton
        onPress={handleDelCategoryPress}
        source={require("../assets/images/Home/DeleteCat.png")}
        pressStyle={homestyles.delcatpressable}
        style={homestyles.delcat}
      />
      <AnimatedButton
        onPress={handleEraseAccountPress}
        source={require("../assets/images/Home/EraseAccount.png")}
        pressStyle={homestyles.delprofilepressable}
        style={homestyles.delprofile}
      />
      <AnimatedButton
        onPress={handleNewNotePress}
        source={require("../assets/images/Home/NewNote.png")}
        pressStyle={homestyles.newnotepressable}
        style={homestyles.newnote}
      />
      <Image
        source={require("../assets/images/TarotCards/1.png")}
        style={{ width: 20, height: 50, left: 100, top: 300 }}
      />
      <ScrollView></ScrollView>
    </View>
  );
}

homestyles = StyleSheet.create({
  newnotepressable: {
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 3,
  },
  newnote: {
    position: "absolute",
    width: 125,
    height: 55,
    left: 18,
    bottom: 18,
    zIndex: 3,
  },
  delprofilepressable: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 3,
  },
  delprofile: {
    position: "absolute",
    width: 80,
    height: 85,
    right: 14,
    top: 45,
    zIndex: 3,
  },
  delcatpressable: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 3,
  },
  delcat: {
    position: "absolute",
    width: 80,
    height: 78,
    right: 158,
    top: 50,
    zIndex: 3,
    opacity: 0.5,
  },
  logoutpressable: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 3,
  },
  logout: {
    position: "absolute",
    width: 80,
    height: 80,
    left: 15,
    top: 50,
    zIndex: 3,
  },
  categoriesstrip: {
    position: "absolute",
    width: 400,
    height: 125,
    left: 0,
    top: 140,
    zIndex: 2,
  },
  header: {
    position: "absolute",
    width: 400,
    height: 400,
    left: 0,
    top: -12,
    zIndex: 1,
  },
  bg: {
    position: "absolute",
    width: 400,
    height: 830,
    left: 0,
    top: 0,
    zIndex: 0,
  },
  blackfade: {
    position: "absolute",
    width: 450,
    height: 900,
    left: 0,
    top: 0,
    zIndex: 4,
    opacity: 0,
    backgroundColor: "black",
  },
});
