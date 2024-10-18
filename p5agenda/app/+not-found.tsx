import { View, Image, Text, StyleSheet } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import AnimatedButton from "../components/AnimatedButton";
import { playSound } from "../components/soundUtils";

export default function NotFoundScreen() {
  const fadeopacity = useSharedValue(0);

  useEffect(() => {
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

  const handleLoginPress = async () => {
    await playSound(require("../assets/images/SFX/Back.wav"));
    fadeopacity.value = withTiming(1, { duration: 500 }, () => {
      fadeopacity.value = 1;
    });
    router.navigate("/");
  };

  return (
    <>
      <View>
        <Image
          source={require("../assets/images/DarkStarsBGHD.png")}
          style={notfoundstyles.bg}
        />
        <Image
          source={require("../assets/images/404.png")}
          style={notfoundstyles.image404}
        />
        <Image
          source={require("../assets/images/Oops.png")}
          style={notfoundstyles.oops}
        />
        <AnimatedButton
          onPress={handleLoginPress}
          source={require("../assets/images/Login/Login.png")}
          pressStyle={notfoundstyles.buttonpressable}
          style={notfoundstyles.button}
        />
      </View>
    </>
  );
}

const notfoundstyles = StyleSheet.create({
  buttonpressable: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 3,
  },
  button: {
    position: "absolute",
    width: 220,
    height: 100,
    left: 70,
    top: 580,
    zIndex: 3,
  },
  image404: {
    position: "absolute",
    width: 340,
    height: 200,
    left: 30,
    top: 70,
    zIndex: 3,
  },
  oops: {
    position: "absolute",
    width: 240,
    height: 240,
    left: 75,
    top: 330,
    zIndex: 3,
  },
  bg: {
    position: "absolute",
    width: 400,
    height: 830,
    left: 0,
    top: 0,
    zIndex: 0,
  },
});
