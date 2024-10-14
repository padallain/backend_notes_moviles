import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';

export default function Home() {

  const fadeopacity = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => {
      fadeopacity.value = withTiming(0, { duration: 300 });
    }, (500));
  }, []);

  const FadeOpacity = useAnimatedStyle(() => {
    return {
      opacity: fadeopacity.value,
    };
  });

  return (
    <View
    style={{
    backgroundColor: "#0f0f0f",
    flex: 1,
    }}
  >
      <Animated.View style={[styles.blackfade, FadeOpacity]} pointerEvents={'none'}/>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Image source={require("../assets/images/react-logo.png")}/>
      <Text style={{color: "white"}}>Welcome to the Home Page</Text>
        </View>
      </View>
  );
}

styles = StyleSheet.create({
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