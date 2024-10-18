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
    scale.value = withTiming(1.3, { duration: 200 }, () => {
      scale.value = 1.3;
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 }, () => {
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

const styles = StyleSheet.create({
  // Define any common styles here if needed
});

export default AnimatedButton;
