import React from "react";
import { Easing } from "react-native-reanimated";
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
} from "react-native-reanimated";

const duration = 3700;
const delay1 = 1600;
const delay2 = 2000;
const delay3 = 3500;
const easing = Easing.bezier(0.1, -0.5, 0.25, 1);

export const useAnimationValues = () => {
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(0);
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

  return {
    sv1,
    sv2,
    loadopacity,
    loadopacity2,
    opacity,
    fadeopacity,
    scaleLogo,
    moveLogoX,
    moveLogoY,
    stripeMoveY,
    stripeMoveX,
    stripeRotate,
    bgmove,
    wynmove,
    rightsmove,
    loginbook,
    loginbook2,
    buttonsmove,
    registermove,
    backbuttonregistermove,
    backbuttonforgotmove,
    forgotpassmove,
    forgotpasstitlemove,
  };
};

export const useAnimations = (values) => {
  const {
    sv1,
    sv2,
    loadopacity,
    loadopacity2,
    opacity,
    fadeopacity,
    scaleLogo,
    moveLogoX,
    moveLogoY,
    stripeMoveY,
    stripeMoveX,
    stripeRotate,
    bgmove,
    wynmove,
    rightsmove,
    loginbook,
    loginbook2,
    buttonsmove,
    registermove,
    backbuttonregistermove,
    backbuttonforgotmove,
    forgotpassmove,
    forgotpasstitlemove,
  } = values;

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
    loadopacity.value = withDelay(delay3, withTiming(0, { duration: 800 }));
    loadopacity2.value = withDelay(delay1, withTiming(1, { duration: 800 }));
  }, []);

  const FadeOpacity = useAnimatedStyle(() => ({ opacity: fadeopacity.value }));
  const LoadOpacity = useAnimatedStyle(() => ({ opacity: loadopacity.value }));
  const LoadOpacity2 = useAnimatedStyle(() => ({
    opacity: loadopacity2.value,
  }));
  const LoadFlip1 = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${sv1.value * 360}deg` }],
  }));
  const LoadFlip2 = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${sv2.value * 360}deg` }],
  }));
  const TapBlinkingOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const StarBGAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: bgmove.value }],
  }));
  const SplitStripeAnim = useAnimatedStyle(() => ({
    transform: [
      { translateY: stripeMoveY.value },
      { translateX: stripeMoveX.value },
      { rotate: `${stripeRotate.value}deg` },
    ],
  }));
  const LogoAnim = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleLogo.value },
      { translateY: moveLogoY.value },
      { translateX: moveLogoX.value },
    ],
  }));
  const WriteYourName = useAnimatedStyle(() => ({
    transform: [{ translateY: wynmove.value }],
  }));
  const RightsAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: rightsmove.value }],
  }));
  const BookAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: loginbook.value }],
  }));
  const BookLoginAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: loginbook2.value }],
  }));
  const ButtonsAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonsmove.value }],
  }));
  const toRegisterAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: registermove.value }],
  }));
  const ButtonBackRegisterAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: backbuttonregistermove.value }],
  }));
  const toForgotAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: forgotpassmove.value }],
  }));
  const toForgotTitleAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: forgotpasstitlemove.value }],
  }));
  const ButtonBackForgotAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: backbuttonforgotmove.value }],
  }));

  return {
    FadeOpacity,
    LoadOpacity,
    LoadOpacity2,
    LoadFlip1,
    LoadFlip2,
    TapBlinkingOpacity,
    StarBGAnim,
    SplitStripeAnim,
    LogoAnim,
    WriteYourName,
    RightsAnim,
    BookAnim,
    BookLoginAnim,
    ButtonsAnim,
    toRegisterAnim,
    ButtonBackRegisterAnim,
    toForgotAnim,
    toForgotTitleAnim,
    ButtonBackForgotAnim,
  };
};
