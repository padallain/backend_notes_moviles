import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AnimatedButton = ({ onPress, source, pressStyle, style }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(1.25, { duration: 150 }, () => {
      scale.value = 1.25;
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 }, () => {
      scale.value = 1;
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={pressStyle}
    >
      <Animated.Image source={source} style={[style, animatedStyle]} />
    </Pressable>
  );
};

export default AnimatedButton;
