import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Link } from 'expo-router';


const duration = 3800;
const delay1 = 1500;
const delay2 = 1800;
const easing = Easing.bezier(0.1, -0.5, 0.25, 1);

export default function Index() {

    const sv1 = useSharedValue(0);
    const sv2 = useSharedValue(0);
    const opacity = useSharedValue(1);
    const scaleLogo = useSharedValue(1);
    const moveLogoX = useSharedValue(0);
    const moveLogoY = useSharedValue(0);
    const stripeMoveY = useSharedValue(0);
    const stripeMoveX = useSharedValue(0);
    const stripeRotate = useSharedValue(0);
    const bgmove = useSharedValue(0);
    const wynmove = useSharedValue(0);
    const rightsmove = useSharedValue(0);
    const loginbook = useSharedValue(0);
    const buttonsmove = useSharedValue(0);
  
    const [pressableDisabled, setPressableDisabled] = useState(false);
    const [isRegisterPressableActive, setIsRegisterPressableActive] = useState(false);


  React.useEffect(() => {
    sv1.value = withDelay(
      delay1,
      withRepeat(withTiming(1, { duration, easing }), -1)
    );
    sv2.value = withDelay(
      delay2,
      withRepeat(withTiming(1, { duration, easing }), -1)
    );
    opacity.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const LoadFlip1 = useAnimatedStyle(() => {
    const flip = sv1.value * 360;
    return {
      transform: [{ rotateY: `${flip}deg` }],
    };
  });

  const LoadFlip2 = useAnimatedStyle(() => {
    const flip = sv2.value * 360;
    return {
      transform: [{ rotateY: `${flip}deg` }],
    };
  });

  const TapBlinkingOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const StarBGAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bgmove.value }],
    };
  });

  const SplitStripeAnim = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: stripeMoveY.value },
        { translateX: stripeMoveX.value },
        { rotate: `${stripeRotate.value}deg` },
      ],
    };
  });
  const LogoAnim = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleLogo.value },
        { translateY: moveLogoY.value },
        { translateX: moveLogoX.value },
      ],
    };
  });
  const WriteYourName = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: wynmove.value }],
    };
  });
  const RightsAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: rightsmove.value }],
    };
  });
  const BookAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: loginbook.value }],
    };
  });
  const ButtonsAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: buttonsmove.value }],
    };
  });
    
  const handlePress = () => {
    console.log("Button pressed");
    setPressableDisabled(true);
    setIsRegisterPressableActive(true);
    opacity.value = withTiming(0, { duration: 500 });
    scaleLogo.value = withTiming(0.5, {
      duration: 1000,
      easing: Easing.bezier(0.2, -0.5, 0.25, 1),
    });
    moveLogoY.value = withTiming(-105, {
      duration: 1000,
      easing: Easing.bezier(0.5, -0.5, 0.25, 1),
    });
    moveLogoX.value = withTiming(215, {
      duration: 1000,
      easing: Easing.bezier(0.5, -0.5, 0.25, 1),
    });
    stripeMoveY.value = withTiming(-115, { duration: 1000 });
    stripeMoveX.value = withTiming(-10, { duration: 1000 });
    stripeRotate.value = withTiming(15, { duration: 1000 });
    bgmove.value = withTiming(-70, { duration: 1000 });
    wynmove.value = withTiming(125, { duration: 1500 });
    rightsmove.value = withTiming(-300, { duration: 600 });
    loginbook.value = withTiming(-400, { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) });
    buttonsmove.value = withTiming(-300, { duration: 1500, easing: Easing.bezier(0.5, -0.5, 0.25, 1) });
  };

  const handleRegisterPress = () => {
    console.log("Register button pressed");
    // Add your navigation or other logic here
  };

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: "#080808",
    //   }}
    // >
    //     <Animated.Image source={require("../assets/images/Loading/JokerShade.png")} style={[styles.Loading1, LoadFlip1]} />
    //   <Animated.Image source={require("../assets/images/Loading/TakeYourTimeShade.png")} style={[styles.Loading2, LoadFlip2]} />
    //     </View>
    <Pressable onPress={handlePress} disabled={pressableDisabled} style={{flex: 1}}>
    <View
      style={{
        flex: 1,
        backgroundColor: "#cc0f1e",
      }}
    >
          <Image source={require("../assets/images/Login/PTBGFullRed45.png")} style={styles.ptbg} />
          <Image source={require("../assets/images/Login/Splashes/paint-splatter-10.png")} style={styles.splash0} />
          <Image source={require("../assets/images/Login/Splashes/paint-splatter-1.png")} style={styles.splash1} />
          <Image source={require("../assets/images/Login/Splashes/paint-splatter-4.png")} style={styles.splash2} />
          <Image source={require("../assets/images/Login/Splashes/paint-splatter-9.png")} style={styles.splash3} />
          <Image source={require("../assets/images/Login/Splashes/paint-splatter-12.png")} style={styles.splash4} />
          <Image source={require("../assets/images/Login/Splashes/paint-splatter-17.png")} style={styles.splash5} />
          <Image source={require("../assets/images/Login/Splashes/paint-splatter-17.png")} style={styles.splash6} />
              

          <Animated.Image source={require("../assets/images/Login/SplitStripe.png")} style={[styles.splitstripe, SplitStripeAnim]} />
          <Animated.Image source={require("../assets/images/Login/TapToBegin.png")} style={[styles.tap, TapBlinkingOpacity]} />
          <Animated.Image source={require("../assets/images/Logo.png")} style={[styles.logo, LogoAnim]} />
          <Animated.Image source={require("../assets/images/DarkStarsBGHD.png")} style={[styles.starsbg, StarBGAnim]} />
          <Animated.Image source={require("../assets/images/Login/Rights.png")} style={[styles.rights, RightsAnim]} />
          <Animated.Image source={require("../assets/images/Login/WriteYourName.png")} style={[styles.wyn, WriteYourName]} />
          <Animated.Image source={require("../assets/images/Login/FormBookHDPT.png")} style={[styles.book, BookAnim]} />
          <Animated.Image source={require("../assets/images/Login/Login.png")} style={[styles.loginbutton, ButtonsAnim]} />
          <Animated.Image source={require("../assets/images/Login/LoginTitle.png")} style={[styles.login, BookAnim]} />
          <Pressable onPress={handleRegisterPress} disabled={!isRegisterPressableActive} style={styles.registerPressable}>
          <Animated.Image source={require("../assets/images/Login/RegisterTitle.png")} style={[styles.register, ButtonsAnim]} />
          </Pressable>
          <Animated.Image source={require("../assets/images/Login/ForgotPasswordTitle.png")} style={[styles.forgot, ButtonsAnim]} />
          <Animated.Image source={require("../assets/images/Login/StarSplit.png")} style={[styles.starsplit, ButtonsAnim]} />
          <Animated.Image source={require("../assets/images/Login/Field.png")} style={ [styles.fieldlogin1, BookAnim] } />
          <Animated.Image source={require("../assets/images/Login/Field.png")} style={ [styles.fieldlogin2, BookAnim] } />
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  fieldlogin1: {
    position: "absolute",
    width: 250,
    height: 55,
    left: 465,
    bottom: 305,
  },

  input1: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    top: "56%",
    left: "60%",
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Color del texto para que sea legible
    zIndex: 10,
    position: "absolute", // Asegúrate de que esté en posición absoluta
    backgroundColor: "transparent", // Fondo transparente
  },

  input2: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    top: "67%",
    left: "60%",
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Ensure the text is legible
    zIndex: 10,
    position: "absolute",
    backgroundColor: "transparent", // Fully transparent background
    opacity: 1, // Make sure it's fully visible
  },

  fieldlogin2: {
    position: "absolute",
    width: 250,
    height: 55,
    left: 465,
    bottom: 215,
  },
  book: {
    position: "absolute",
    width: 350,
    height: 420,
    left: 425,
    bottom: 155,
  },
  login: {
    position: "absolute",
    width: 140,
    height: 60,
    left: 512,
    bottom: 410,
  },
  loginbutton: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 105,
    bottom: -200,
  },
  register: {
    position: "absolute",
    width: 160,
    height: 55,
    right: 10,
    bottom: -280,
    transform: [{ rotate: "6deg" }],
  },
  registerPressable: {
    position: "absolute",
    width: 160,
    height: 55,
    right: 0,
    bottom: 0,
    transform: [{ rotate: "6deg" }],
    flex: 1,
  },
  forgot: {
    position: "absolute",
    width: 150,
    height: 70,
    left: 15,
    bottom: -282,
    transform: [{ rotate: "-7deg" }],
  },
  starsplit: {
    position: "absolute",
    width: 60,
    height: 60,
    left: 167,
    bottom: -280,
  },
  wyn: {
    position: "absolute",
    width: 220,
    height: 155,
    left: 5,
    top: -112,
    transform: [{ rotate: "5deg" }],
  },
  splash0: {
    position: "absolute",
    width: 150,
    height: 150,
    left: -60,
    bottom: 140,
    transform: [{ rotate: "-70deg" }],
  },
  splash1: {
    position: "absolute",
    width: 150,
    height: 150,
    left: -55,
    top: 315,
    transform: [{ rotate: "-70deg" }],
  },
  splash2: {
    position: "absolute",
    width: 200,
    height: 150,
    left: -100,
    bottom: -40,
    transform: [{ rotate: "-40deg" }],
  },
  splash3: {
    position: "absolute",
    width: 200,
    height: 150,
    right: -115,
    bottom: 170,
    transform: [{ rotate: "-30deg" }],
  },
  splash4: {
    position: "absolute",
    width: 200,
    height: 150,
    right: -60,
    bottom: -75,
    transform: [{ rotate: "130deg" }],
  },
  splash5: {
    position: "absolute",
    width: 200,
    height: 150,
    right: -80,
    top: 250,
    transform: [{ rotate: "130deg" }],
  },
  splash6: {
    position: "absolute",
    width: 200,
    height: 150,
    left: -65,
    top: 160,
    transform: [{ rotate: "30deg" }],
  },
  tap: {
    position: "absolute",
    width: 275,
    height: 60,
    left: 60,
    bottom: 320,
    zIndex: 1,
  },
  logo: {
    position: "absolute",
    width: 330,
    height: 200,
    left: 25,
    top: 55,
    zIndex: 1,
  },
  starsbg: {
    position: "absolute",
    width: 395,
    height: 500,
    left: 0,
    top: -199,
  },
  splitstripe: {
    position: "absolute",
    width: 420,
    height: 220,
    left: -12,
    top: 230,
    transform: [{ rotate: "-3deg" }],
    zIndex: 1,
  },
  ptbg: {
    position: "absolute",
    width: 700,
    height: 700,
    left: -155,
    bottom: -30,
    opacity: 0.6,
  },
  rights: {
    position: "absolute",
    width: 180,
    height: 60,
    left: 12,
    bottom: 15,
  },
  Loading1: {
    position: "absolute",
    width: 180,
    height: 180,
    right: 10,
    bottom: 60,
  },
  Loading2: {
    position: "absolute",
    width: 160,
    height: 80,
    right: 15,
    bottom: -5,
  },
});
