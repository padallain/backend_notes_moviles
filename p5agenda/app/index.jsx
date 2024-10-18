import { View, Image, Pressable, TextInput, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { router, SplashScreen } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { playSound } from "../components/soundUtils";
import styles from "./indexstyles";

SplashScreen.preventAutoHideAsync();

const duration = 3700;
const delay1 = 1600;
const delay2 = 2000;
const delay3 = 3500;
const easing = Easing.bezier(0.1, -0.5, 0.25, 1);

export default function Index() {
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 1500);

  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(0);
  const keyboardmove = useSharedValue(0);
  const loadopacity = useSharedValue(1);
  const loadopacity2 = useSharedValue(0);
  const opacity = useSharedValue(1);
  const fadeopacity = useSharedValue(0);
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        keyboardmove.value = withTiming(-150, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        keyboardmove.value = withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
      }
    );

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

    loadopacity.value = withDelay(delay3, withTiming(0, { duration: 800 }));
    loadopacity2.value = withDelay(delay1, withTiming(1, { duration: 800 }));
    setTimeout(() => {
      (async () => {
        const sound = await playSound(
          require("../assets/images/SFX/Music.mp3"),
          {
            shouldPlay: true,
            isLooping: true,
            volume: 0.3,
          }
        );
        setSound(sound);
      })();
      setPressableDisabled(false);
    }, delay3);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
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

  const KeyboardMove = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: keyboardmove.value }],
    };
  });

  const FadeOpacity = useAnimatedStyle(() => {
    return {
      opacity: fadeopacity.value,
    };
  });

  const LoadOpacity = useAnimatedStyle(() => {
    return {
      opacity: loadopacity.value,
    };
  });

  const LoadOpacity2 = useAnimatedStyle(() => {
    return {
      opacity: loadopacity2.value,
    };
  });

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

  const [isSound, setSound] = useState(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const validateEmail = (text) => {
    // Actualiza el estado del email antes de validar
    setEmail(text);

    // Expresión regular para validar correos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Si el texto no pasa la validación, muestra un error
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    setPassword(text);

    // Verificar si la contraseña tiene al menos 8 caracteres
    if (text.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      console.log("Password too short");
    } else {
      setPasswordError("");
      console.log("Password is valid");
    }
  };

  const handlePress = async () => {
    await playSound(require("../assets/images/SFX/Start.wav"));
    setTimeout(async () => {
      await playSound(require("../assets/images/SFX/Start Alright.wav"));
    }, 200);
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
  };

  const handleRegisterPress = async () => {
    console.log("Register button pressed");
    await playSound(require("../assets/images/SFX/Select.wav"));
    setIsRegisterPressableActive(false);
    setIsForgotPassPressableActive(false);
    setIsLoginButtonPressableActive(false);
    setIsLoginBack1PressableActive(true);
    setIsRegisterButtonPressableActive(true);
    setUsername(""); // Resetea los inputs
    setEmail(""); // Borra el email
    setPassword(""); // Borra el password

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

  const handleForgotPassPress = async () => {
    console.log("Forgot Password button pressed");
    setEmail(""); // Borra el email
    await playSound(require("../assets/images/SFX/Select.wav"));
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
    await playSound(require("../assets/images/SFX/Calendar Knife.wav"));

    fadeopacity.value = withTiming(1, { duration: 500 }, () => {
      fadeopacity.value = 1;
    });
    setTimeout(() => {
      router.push("/home");
    }, 500);

    // Datos de inicio de sesión (capturados de los inputs)
    const loginData = {
      username: username, // El valor capturado del input de email
      password: password, // El valor capturado del input de password
    };

    console.log(loginData);

    try {
      const response = await fetch(
        "https://backend-notes-moviles.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Cambiar el mensaje de error si es "Invalid credentials"
        const errorMessage =
          data.message === "Invalid credentials"
            ? "WRONG USERNAME OR PASSWORD"
            : data.message || "Login failed. Please check your credentials.";

        console.error(errorMessage);
        setErrorMessage(errorMessage); // Mostrar mensaje de error en la UI
      } else {
        // Solo activar el fade y redirigir si el login es exitoso
        console.log("Login successful");
        fadeopacity.value = withTiming(1, { duration: 300 });
        setTimeout(() => {
          router.replace("/home");
        }, 500);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setErrorMessage("Login failed due to network error. Please try again."); // Manejar el error de conexión
    }
  };

  const handleRegisterButtonPress = async () => {
    console.log("Registered button pressed");
    await playSound(require("../assets/images/SFX/Calendar Knife.wav"));

    const dataRegister = {
      email_user: email, // El valor capturado del input de email
      password: password, // El valor capturado del input de password
      username: username,
    };
    console.log(dataRegister);

    try {
      const response = await fetch(
        "https://backend-notes-moviles.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataRegister),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("User registered successfully");
        setResponseMessage("User registered successfully");
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
      } else {
        let errorMessage;

        switch (data.message) {
          case "Invalid email formar":
            errorMessage = "WRONG EMAIL FORMAT";
            break;
          case "User already exists":
            errorMessage = "User already exists, please try logging in.";
            break;
          case "Password must be at least 8 characters long":
            errorMessage = "Password must be at least 8 characters long";
            break;
          case "Password must contain at least one lowercase letter":
            errorMessage =
              "Password must contain at least one lowercase letter";
            break;
          case "Password must contain at least one upper letter":
            errorMessage = "Password must contain at least one upper letter";
            break;
          case "assword must contain at least one special character":
            errorMessage =
              "password must contain at least one special character";
            break;
          default:
            errorMessage = data.message || "Failed to register user";
        }

        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Error connecting to the server:", error.message);
      setResponseMessage(`Error connecting to the server: ${error.message}`);
    }
  };

  const handleSendButtonPress = async () => {
    console.log("Send button pressed");
    await playSound(require("../assets/images/SFX/Select.wav"));
    setIsSendPressableActive(false);
    setIsVerifyPressableActive(true);

    const dataRecover = {
      email_user: email, // El valor capturado del input de email
    };
    console.log(dataRecover);

    try {
      const response = await fetch(
        "https://backend-notes-moviles.onrender.com/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataRecover),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Reset password email sent successfully", data);
        forgotpassmove.value = withTiming(
          900,
          { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
          () => {
            forgotpassmove.value = 900;
          }
        );
      } else {
        console.log(
          `Error: ${data.message || "Failed to send reset password email"}`
        );
      }
    } catch (error) {
      console.error("Error connecting to the server:", error.message);
    }
  };

  const handleVerifyButtonPress = async () => {
    console.log("Verify button pressed");
    await playSound(require("../assets/images/SFX/Select.wav"));
    setIsVerifyPressableActive(false);
    setIsConfirmPressableActive(true);

    // Verifica que el resetCode tenga 6 caracteres
    if (secretCode.length !== 6) {
      console.error("Incomplete code");
      setIsVerifyPressableActive(true); // Reactivar el botón si el código es incorrecto
      setIsConfirmPressableActive(false);
      return;
    }

    const dataCheck = {
      email_user: email, // El valor capturado del input de email
      resetCode: secretCode,
    };
    console.log(dataCheck);

    try {
      const response = await fetch(
        "https://backend-notes-moviles.onrender.com/checkReset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataCheck),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Verification successful", data);
        forgotpassmove.value = withTiming(
          1300,
          { duration: 1200, easing: Easing.bezier(0.5, -0.5, 0.25, 1) },
          () => {
            forgotpassmove.value = 1300;
          }
        );
      } else {
        console.log(`Error: ${data.message || "Failed to verify reset code"}`);
      }
    } catch (error) {
      console.error("Error connecting to the server:", error.message);
    }
  };

  const handleConfirmButtonPress = async () => {
    console.log("Confirm button pressed");
    await playSound(require("../assets/images/SFX/Calendar Knife.wav"));
    // Add your navigation or other logic here
  };

  const BackToLogin1ButtonPress = async () => {
    console.log("Back To Login button pressed");
    setEmail(""); // Borra el email
    setPassword(""); // Borra el password
    await playSound(require("../assets/images/SFX/Back.wav"));
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

  const BackToLogin2ButtonPress = async () => {
    console.log("Back To Login button pressed");
    await playSound(require("../assets/images/SFX/Back.wav"));
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
        { duration: 1600, easing: Easing.bezier(0.5, -0.15, 0.25, 1) },
        () => {
          forgotpassmove.value = 400;
        }
      );
    } else if (setIsConfirmPressableActive) {
      forgotpassmove.value = withTiming(
        800,
        { duration: 2000, easing: Easing.bezier(0.5, -0.15, 0.25, 1) },
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
      <Animated.View
        style={[{ flex: 1, backgroundColor: "#cc0f1e" }, KeyboardMove]}
      >
        {/* PANTALLA DE CARGA */}
        <Animated.View
          style={[styles.container, LoadOpacity]}
          pointerEvents={"none"}
        >
          <Animated.Image
            source={require("../assets/images/Loading/JokerShade.png")}
            style={[styles.Loading1, LoadFlip1, LoadOpacity2]}
          />
          <Animated.Image
            source={require("../assets/images/Loading/TakeYourTimeShade.png")}
            style={[styles.Loading2, LoadFlip2, LoadOpacity2]}
          />
        </Animated.View>

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
        <Animated.View style={[styles.input1Login, BookLoginAnim]}>
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
            keyboardType="email-address"
            style={styles.input2}
            multiline={false} // No permitir múltiples líneas
            scrollEnabled={false} // Evitar que el input se desplace horizontalmente
            numberOfLines={1} // Forzar una sola línea
            ellipsizeMode="tail" // Mostrar "..." al final si es muy largo
            maxLength={50}
          />

          {/* Mostrar mensaje de error si el correo no es válido
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null} */}
        </Animated.View>
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldlogin1, BookLoginAnim]}
        />
        <Animated.View style={[styles.input2Login, BookLoginAnim]}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={validatePassword} // Valida la contraseña en cada cambio
            secureTextEntry={true} // Ocultar el texto
            style={styles.input2}
            multiline={false}
            scrollEnabled={false}
            ellipsizeMode="tail" // Mostrar "..." al final si es muy largo
          />
          {/* Mostrar mensaje de error si la contraseña no es válida
          {passwordError ? (
            <Text style={styles.errorTextPassword}>{passwordError}</Text>
          ) : null} */}
        </Animated.View>
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldlogin2, BookLoginAnim]}
        />
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
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={(text) => setUsername(text.toLowerCase())} // Convierte a minúsculas
            style={styles.input2}
          />
        </Animated.View>

        <Animated.View style={[styles.input2Register, toRegisterAnim]}>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())} // Convierte a minúsculas
            keyboardType="email-address"
            style={styles.input2}
            multiline={false} // No permitir múltiples líneas
            scrollEnabled={false} // Evitar que el input se desplace horizontalmente
            numberOfLines={1} // Forzar una sola línea
            ellipsizeMode="tail" // Mostrar "..." al final si es muy largo
            maxLength={50}
          />
        </Animated.View>

        <Animated.View style={[styles.input3Register, toRegisterAnim]}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
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
            placeholder="Enter Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())} // Convierte a minúsculas
            keyboardType="email-address"
            style={styles.input2}
            multiline={false} // No permitir múltiples líneas
            scrollEnabled={false} // Evitar que el input se desplace horizontalmente
            numberOfLines={1} // Forzar una sola línea
            ellipsizeMode="tail" // Mostrar "..." al final si es muy largo
            maxLength={50}
          />
        </Animated.View>

        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldforgot2, toForgotAnim]}
        />
        <Animated.View style={[styles.input2Forgot, toForgotAnim]}>
          <TextInput
            placeholder="Enter the code"
            placeholderTextColor="#aaa"
            value={secretCode}
            onChangeText={(text) => setSecretCode(text.toLowerCase())} // Convierte a minúsculas
            keyboardType="email-address"
            style={styles.input2}
            multiline={false} // No permitir múltiples líneas
            scrollEnabled={false} // Evitar que el input se desplace horizontalmente
            numberOfLines={1} // Forzar una sola línea
            ellipsizeMode="tail" // Mostrar "..." al final si es muy largo
            maxLength={6}
          />
        </Animated.View>
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldforgot3, toForgotAnim]}
        />
        <Animated.View style={[styles.input3Forgot, toForgotAnim]}>
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#aaa"
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword} // Convierte a minúsculas
            keyboardType="email-address"
            style={styles.input2}
            multiline={false} // No permitir múltiples líneas
            scrollEnabled={false} // Evitar que el input se desplace horizontalmente
            numberOfLines={1} // Forzar una sola línea
            ellipsizeMode="tail" // Mostrar "..." al final si es muy largo
            maxLength={10}
          />
        </Animated.View>
        <Animated.Image
          source={require("../assets/images/Login/Field.png")}
          style={[styles.fieldforgot4, toForgotAnim]}
        />

        <Animated.View style={[styles.input4Forgot, toForgotAnim]}>
          <TextInput
            placeholder="Confirm New Password"
            placeholderTextColor="#aaa"
            value={confirmNewPassword}
            secureTextEntry
            onChangeText={setConfirmNewPassword} // Convierte a minúsculas
            keyboardType="email-address"
            style={styles.input2}
            multiline={false} // No permitir múltiples líneas
            scrollEnabled={false} // Evitar que el input se desplace horizontalmente
            numberOfLines={1} // Forzar una sola línea
            ellipsizeMode="tail" // Mostrar "..." al final si es muy largo
            maxLength={10}
          />
        </Animated.View>
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
        <Animated.View
          style={[styles.blackfade, FadeOpacity]}
          pointerEvents={"none"}
        />
        <View style={styles.under}></View>
      </Animated.View>
    </Pressable>
  );
}
