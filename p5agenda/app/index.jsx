import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { Link } from "expo-router";

export default function Index() {
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
  const loginbook2 = useSharedValue(0);
  const buttonsmove = useSharedValue(0);
  const registermove = useSharedValue(0);
  const backbuttonregistermove = useSharedValue(0);
  const backbuttonforgotmove = useSharedValue(0);
  const forgotpassmove = useSharedValue(0);
  const forgotpasstitlemove = useSharedValue(0);
  const inputPosition = useSharedValue(-300); // Inicialmente fuera de la pantalla a la izquierda

  const [pressableDisabled, setPressableDisabled] = useState(false);
  const [isRegisterPressableActive, setIsRegisterPressableActive] =
    useState(false);
  const [isForgotPassPressableActive, setIsForgotPassPressableActive] =
    useState(false);
  const [isLoginButtonPressableActive, setIsLoginButtonPressableActive] =
    useState(false);
  const [isRegisterButtonPressableActive, setIsRegisterButtonPressableActive] =
    useState(false);
  const [isLoginBack1PressableActive, setIsLoginBack1PressableActive] =
    useState(false);
  const [isSendPressableActive, setIsSendPressableActive] = useState(false);
  const [isVerifyPressableActive, setIsVerifyPressableActive] = useState(false);
  const [isConfirmPressableActive, setIsConfirmPressableActive] =
    useState(false);
  const [isLoginBack2PressableActive, setIsLoginBack2PressableActive] =
    useState(false);
  const [inputOpacity, setInputOpacity] = useState(0); // Inicialmente invisibles
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // Crear una animación de opacidad
  const inputAnimation = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

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
  const BookLoginAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: loginbook2.value }],
    };
  });
  const ButtonsAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: buttonsmove.value }],
    };
  });
  const toRegisterAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: registermove.value }],
    };
  });
  const ButtonBackRegisterAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: backbuttonregistermove.value }],
    };
  });
  const toForgotAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: forgotpassmove.value }],
    };
  });
  const toForgotTitleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: forgotpasstitlemove.value }],
    };
  });
  const ButtonBackForgotAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: backbuttonforgotmove.value }],
    };
  });
  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: inputAnimation.value,
    };
  });

  const handlePress = () => {
    console.log("Tap To Begin Pressed");
    setPressableDisabled(true);
    setIsRegisterPressableActive(true);
    setIsForgotPassPressableActive(true);
    setIsLoginButtonPressableActive(true);
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
    wynmove.value = withTiming(125, { duration: 1700 });
    rightsmove.value = withTiming(-300, { duration: 600 });
    loginbook.value = withTiming(
      -400,
      { duration: 1100, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        loginbook.value = -400;
      }
    );
    loginbook2.value = withTiming(
      -400,
      { duration: 1500, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        loginbook2.value = -400;
      }
    );
    buttonsmove.value = withTiming(-300, {
      duration: 1300,
      easing: Easing.bezier(0.5, -0.5, 0.25, 1),
    });
    inputAnimation.value = withTiming(1, { duration: 1000 }); // La opacidad pasa de 0 a 1
  };

  const handleRegisterPress = () => {
    setIsRegisterPressableActive(false);
    setIsForgotPassPressableActive(false);
    setIsLoginButtonPressableActive(false);
    setIsLoginBack1PressableActive(true);
    setIsRegisterButtonPressableActive(true);
    console.log("Register button pressed");
    loginbook2.value = withTiming(
      -800,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        loginbook2.value = -800;
      }
    );
    registermove.value = withTiming(
      -400,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        registermove.value = -400;
      }
    );
    buttonsmove.value = withTiming(300, {
      duration: 1300,
      easing: Easing.bezier(0.25, -0.25, 0.25, 1),
    });
    backbuttonregistermove.value = withTiming(-300, {
      duration: 1300,
      easing: Easing.bezier(0.25, -0.25, 0.25, 1),
    });
  };

  const handleForgotPassPress = () => {
    console.log("Forgot Password button pressed");
    setIsRegisterPressableActive(false);
    setIsForgotPassPressableActive(false);
    setIsLoginButtonPressableActive(false);
    setIsLoginBack2PressableActive(true);
    setIsSendPressableActive(true);
    loginbook2.value = withTiming(
      0,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        loginbook2.value = 0;
      }
    );
    forgotpasstitlemove.value = withTiming(
      500,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        forgotpassmove.value = 500;
      }
    );
    forgotpassmove.value = withTiming(
      500,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        forgotpassmove.value = 500;
      }
    );
    buttonsmove.value = withTiming(300, {
      duration: 1300,
      easing: Easing.bezier(0.25, -0.25, 0.25, 1),
    });
    backbuttonforgotmove.value = withTiming(-300, {
      duration: 1300,
      easing: Easing.bezier(0.25, -0.25, 0.25, 1),
    });
  };

  const handleLoginButtonPress = async () => {
    console.log("Login button pressed");

    // Datos de inicio de sesión (capturados de los inputs)
    const loginData = {
      email_user: username, // Asumiendo que `username` es el valor capturado del input
      password: password, // Asumiendo que `password` es el valor capturado del input
    };

    console.log(loginData);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Response Error:", data.message);
        // Manejo de errores
      } else {
        // Manejo del éxito
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const handleRegisterButtonPress = () => {
    console.log("Registered button pressed");
    // Add your navigation or other logic here
  };

  const handleSendButtonPress = () => {
    console.log("Send button pressed");
    setIsSendPressableActive(false);
    setIsVerifyPressableActive(true);
    forgotpassmove.value = withTiming(
      900,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        forgotpassmove.value = 900;
      }
    );
  };
  const handleVerifyButtonPress = () => {
    console.log("Verify button pressed");
    setIsVerifyPressableActive(false);
    setIsConfirmPressableActive(true);
    forgotpassmove.value = withTiming(
      1300,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        forgotpassmove.value = 1300;
      }
    );
  };
  const handleConfirmButtonPress = () => {
    console.log("Confirm button pressed");
    // Add your navigation or other logic here
  };

  const BackToLogin1ButtonPress = () => {
    console.log("Back To Login button pressed");
    setIsLoginBack1PressableActive(false);
    setIsRegisterButtonPressableActive(false);
    setIsRegisterPressableActive(true);
    setIsForgotPassPressableActive(true);
    setIsLoginButtonPressableActive(true);
    loginbook2.value = withTiming(
      -400,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        loginbook2.value = -400;
      }
    );
    registermove.value = withTiming(
      0,
      { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
      () => {
        registermove.value = 0;
      }
    );
    buttonsmove.value = withTiming(-300, {
      duration: 1300,
      easing: Easing.bezier(0.25, -0.5, 0.25, 1),
    });
    backbuttonregistermove.value = withTiming(300, {
      duration: 1300,
      easing: Easing.bezier(0.25, -0.25, 0.25, 1),
    });
  };

  const BackToLogin2ButtonPress = () => {
    console.log("Back To Login button pressed");
    setIsLoginBack2PressableActive(false);
    setIsSendPressableActive(false);
    setIsRegisterPressableActive(true);
    setIsForgotPassPressableActive(true);
    setIsLoginButtonPressableActive(true);
    loginbook2.value = withTiming(-400, {
      duration: 1200,
      easing: Easing.bezier(0.5, -0.5, 0.25, 1),
    });
    forgotpasstitlemove.value = withTiming(
      0,
      { duration: 1200, easing: Easing.bezier(0.5, -0.15, 0.25, 1) },
      () => {
        forgotpassmove.value = 0;
      }
    );
    buttonsmove.value = withTiming(-300, {
      duration: 1000,
      easing: Easing.bezier(0.25, -0.5, 0.25, 1),
    });
    backbuttonforgotmove.value = withTiming(300, {
      duration: 1000,
      easing: Easing.bezier(0.25, -0.25, 0.25, 1),
    });
    if (setIsSendPressableActive) {
      forgotpassmove.value = withTiming(
        0,
        { duration: 1200, easing: Easing.bezier(0.5, -0.15, 0.25, 1) },
        () => {
          forgotpassmove.value = 0;
        }
      );
    } else if (setIsVerifyPressableActive) {
      forgotpassmove.value = withTiming(
        400,
        { duration: 1200, easing: Easing.bezier(0.5, -0.15, 0.25, 1) },
        () => {
          forgotpassmove.value = 400;
        }
      );
    } else if (setIsConfirmPressableActive) {
      forgotpassmove.value = withTiming(
        800,
        { duration: 1200, easing: Easing.bezier(0.5, -0.15, 0.25, 1) },
        () => {
          forgotpassmove.value = 800;
        }
      );
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={pressableDisabled}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#cc0f1e",
        }}
      >
        {/* IMÁGENES ESTÁTICAS */}
        <Image
          source={require("../assets/images/Login/PTBGFullRed45.png")}
          style={styles.ptbg}
        />
        <Image
          source={require("../assets/images/Login/Splashes/paint-splatter-10.png")}
          style={styles.splash0}
        />
        <Image
          source={require("../assets/images/Login/Splashes/paint-splatter-1.png")}
          style={styles.splash1}
        />
        <Image
          source={require("../assets/images/Login/Splashes/paint-splatter-4.png")}
          style={styles.splash2}
        />
        <Image
          source={require("../assets/images/Login/Splashes/paint-splatter-9.png")}
          style={styles.splash3}
        />
        <Image
          source={require("../assets/images/Login/Splashes/paint-splatter-12.png")}
          style={styles.splash4}
        />
        <Image
          source={require("../assets/images/Login/Splashes/paint-splatter-17.png")}
          style={styles.splash5}
        />
        <Image
          source={require("../assets/images/Login/Splashes/paint-splatter-17.png")}
          style={styles.splash6}
        />

        {/* ASSETS DE WELCOME Y LOGIN */}
        <Animated.Image
          source={require("../assets/images/Login/SplitStripe.png")}
          style={[styles.splitstripe, SplitStripeAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/TapToBegin.png")}
          style={[styles.tap, TapBlinkingOpacity]}
        />
        <Animated.Image
          source={require("../assets/images/Logo.png")}
          style={[styles.logo, LogoAnim]}
        />
        <Animated.Image
          source={require("../assets/images/DarkStarsBGHD.png")}
          style={[styles.starsbg, StarBGAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Rights.png")}
          style={[styles.rights, RightsAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/WriteYourName.png")}
          style={[styles.wyn, WriteYourName]}
        />
        <Animated.Image
          source={require("../assets/images/Login/FormBookHDPT.png")}
          style={[styles.book, BookAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/LoginTitle.png")}
          style={[styles.login, BookLoginAnim]}
        />
        <Pressable
          onPress={handleLoginButtonPress}
          disabled={!isLoginButtonPressableActive}
          style={styles.loginbuttonpressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/Login.png")}
            style={[styles.loginbutton, ButtonsAnim]}
          />
        </Pressable>
        <Pressable
          onPress={handleRegisterPress}
          disabled={!isRegisterPressableActive}
          style={styles.registerPressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/RegisterTitle.png")}
            style={[styles.register, ButtonsAnim]}
          />
        </Pressable>
        <Pressable
          onPress={handleForgotPassPress}
          disabled={!isForgotPassPressableActive}
          style={styles.forgotPressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/ForgotPasswordTitle.png")}
            style={[styles.forgot, ButtonsAnim]}
          />
        </Pressable>
        <Animated.Image
          source={require("../assets/images/Login/StarSplit.png")}
          style={[styles.starsplit, ButtonsAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldlogin1, BookLoginAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldlogin2, BookLoginAnim]}
        />
        <Animated.View style={[styles.input1Login, BookLoginAnim]}>
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            style={styles.input2}
          />
        </Animated.View>

        <Animated.View style={[styles.input2Login, BookLoginAnim]}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input2}
          />
        </Animated.View>

        {/* ASSETS DE REGISTER */}
        <Animated.Image
          source={require("../assets/images/Login/RegisterTitle.png")}
          style={[styles.registertitle, toRegisterAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldregister1, toRegisterAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldregister2, toRegisterAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldregister3, toRegisterAnim]}
        />
         <Animated.View style={[styles.input1Register, toRegisterAnim]}>
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            style={styles.input2}
          />
        </Animated.View>

        <Animated.View style={[styles.input2Register, toRegisterAnim]}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input2}
          />
        </Animated.View>

        <Animated.View style={[styles.input3Register, toRegisterAnim]}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input2}
          />
        </Animated.View>

        <Pressable
          onPress={handleRegisterButtonPress}
          disabled={!isRegisterButtonPressableActive}
          style={styles.registerbuttonPressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/Register.png")}
            style={[styles.registerbutton, ButtonBackRegisterAnim]}
          />
        </Pressable>
        <Pressable
          onPress={BackToLogin1ButtonPress}
          disabled={!isLoginBack1PressableActive}
          style={styles.backtologin1Pressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/BackToLogin.png")}
            style={[styles.backtologin1, ButtonBackRegisterAnim]}
          />
        </Pressable>
        <Animated.Image
          source={require("../assets/images/Login/StarSplit.png")}
          style={[styles.starsplit1, ButtonBackRegisterAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/StarSplit.png")}
          style={[styles.starsplit2, ButtonBackRegisterAnim]}
        />

        {/* ASSETS DE FORGOT PASSWORD */}
        <Animated.Image
          source={require("../assets/images/Login/ForgotPasswordTitle.png")}
          style={[styles.forgottitle, toForgotTitleAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldforgot1, toForgotAnim]}
        />
       <Animated.View style={[styles.input1Forgot, toForgotAnim]}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#888"
            secureTextEntry
            value={email}
            onChangeText={setEmail}
            style={styles.input2}
          />
        </Animated.View>

        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldforgot2, toForgotAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldforgot3, toForgotAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldforgot4, toForgotAnim]}
        />
        <Pressable
          onPress={BackToLogin2ButtonPress}
          disabled={!isLoginBack2PressableActive}
          style={styles.backtologin2Pressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/BackToLogin.png")}
            style={[styles.backtologin2, ButtonBackForgotAnim]}
          />
        </Pressable>
        <Pressable
          onPress={handleSendButtonPress}
          disabled={!isSendPressableActive}
          style={styles.sendbuttonPressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/Send.png")}
            style={[styles.sendbutton, toForgotAnim]}
          />
        </Pressable>
        <Pressable
          onPress={handleVerifyButtonPress}
          disabled={!isVerifyPressableActive}
          style={styles.verifybuttonPressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/Verify.png")}
            style={[styles.verifybutton, toForgotAnim]}
          />
        </Pressable>
        <Pressable
          onPress={handleConfirmButtonPress}
          disabled={!isConfirmPressableActive}
          style={styles.confirmbuttonPressable}
        >
          <Animated.Image
            source={require("../assets/images/Login/Confirm.png")}
            style={[styles.confirmbutton, toForgotAnim]}
          />
        </Pressable>
        <Animated.Image
          source={require("../assets/images/Login/StarSplit.png")}
          style={[styles.starsplit1, ButtonBackForgotAnim]}
        />
        <Animated.Image
          source={require("../assets/images/Login/StarSplit.png")}
          style={[styles.starsplit2, ButtonBackForgotAnim]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loadview: {
    width: "100%",
    height: "100%",
    zIndex: 3,
  },
  sendbutton: {
    position: "absolute",
    width: 160,
    height: 70,
    left: -400,
    bottom: 105,
  },
  sendbuttonPressable: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 0,
    bottom: 0,
  },
  verifybutton: {
    position: "absolute",
    width: 160,
    height: 70,
    left: -800,
    bottom: 105,
  },
  verifybuttonPressable: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 0,
    bottom: 0,
  },
  confirmbutton: {
    position: "absolute",
    width: 160,
    height: 70,
    left: -1200,
    bottom: 105,
  },
  confirmbuttonPressable: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 0,
    bottom: 0,
  },
  backtologin2: {
    position: "absolute",
    width: 130,
    height: 70,
    left: 130,
    bottom: -280,
  },
  backtologin2Pressable: {
    position: "absolute",
    width: 130,
    height: 70,
    left: 0,
    bottom: 0,
    transform: [{ rotate: "2deg" }],
  },
  fieldforgot1: {
    position: "absolute",
    width: 250,
    height: 55,
    left: -435,
    bottom: 240,
  },
  fieldforgot2: {
    position: "absolute",
    width: 250,
    height: 55,
    left: -835,
    bottom: 240,
  },
  fieldforgot3: {
    position: "absolute",
    width: 250,
    height: 55,
    left: -1235,
    bottom: 300,
  },
  fieldforgot4: {
    position: "absolute",
    width: 250,
    height: 55,
    left: -1235,
    bottom: 220,
  },
  forgottitle: {
    position: "absolute",
    width: 190,
    height: 90,
    left: -410,
    bottom: 380,
  },
  registerbutton: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 105,
    bottom: -200,
  },
  registerbuttonPressable: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 0,
    bottom: 0,
  },
  backtologin1: {
    position: "absolute",
    width: 130,
    height: 70,
    left: 130,
    bottom: -280,
  },
  backtologin1Pressable: {
    position: "absolute",
    width: 130,
    height: 70,
    left: 0,
    bottom: 0,
    transform: [{ rotate: "2deg" }],
  },
  starsplit1: {
    position: "absolute",
    width: 60,
    height: 60,
    left: 50,
    bottom: -280,
  },
  starsplit2: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 50,
    bottom: -280,
  },
  registertitle: {
    position: "absolute",
    width: 160,
    height: 60,
    left: 505,
    bottom: 415,
  },
  fieldregister1: {
    position: "absolute",
    width: 250,
    height: 55,
    left: 465,
    bottom: 330,
  },
  fieldregister2: {
    position: "absolute",
    width: 250,
    height: 55,
    left: 465,
    bottom: 260,
  },
  input1Login: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    left: 510,
    bottom: 340,
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Color del texto para que sea legible
    zIndex: 10,
    position: "absolute", // Asegúrate de que esté en posición absoluta
    backgroundColor: "transparent", // Fondo transparente
  },
  input2Login: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    bottom: 220,
    top: "69%",
    left: "53%",
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Color del texto para que sea legible
    zIndex: 10,
    position: "absolute", // Asegúrate de que esté en posición absoluta
    backgroundColor: "transparent", // Fondo transparente
  },
  input1Register: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    left: 510,
    bottom: 360,
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Color del texto para que sea legible
    zIndex: 10,
    position: "absolute", // Asegúrate de que esté en posición absoluta
    backgroundColor: "transparent", // Fondo transparente
  },
  input2Register: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    left: 510,
    bottom: 300,
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Color del texto para que sea legible
    zIndex: 10,
    position: "absolute", // Asegúrate de que esté en posición absoluta
    backgroundColor: "transparent", // Fondo transparente
  },
  input3Register: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    left: 510,
    bottom: 225,
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Color del texto para que sea legible
    zIndex: 10,
    position: "absolute", // Asegúrate de que esté en posición absoluta
    backgroundColor: "transparent", // Fondo transparente
  },

  input1Forgot: {
    width: 250,
    height: 20,
    borderColor: "#ccc",
    left: -380,
    bottom: 275,
    transform: [{ translateX: -125 }, { translateY: -10 }],
    borderWidth: 0,
    paddingHorizontal: 10,
    color: "black", // Color del texto para que sea legible
    zIndex: 10,
    position: "absolute", // Asegúrate de que esté en posición absoluta
    backgroundColor: "transparent", // Fondo transparente
  },


  fieldregister3: {
    position: "absolute",
    width: 250,
    height: 55,
    left: 465,
    bottom: 190,
  },
  fieldlogin1: {
    position: "absolute",
    width: 250,
    height: 55,
    left: 465,
    bottom: 300,
  },
  fieldlogin2: {
    position: "absolute",
    width: 250,
    height: 55,
    left: 465,
    bottom: 220,
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
    width: 150,
    height: 65,
    left: 508,
    bottom: 410,
  },
  loginbutton: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 105,
    bottom: -200,
  },
  loginbuttonpressable: {
    position: "absolute",
    width: 160,
    height: 70,
    left: 0,
    bottom: 0,
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
  },
  forgotPressable: {
    position: "absolute",
    width: 150,
    height: 70,
    left: 0,
    bottom: 0,
    transform: [{ rotate: "-7deg" }],
    zIndex: 1,
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
});
