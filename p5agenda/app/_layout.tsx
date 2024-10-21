import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Font from "expo-font";
import useDisableBackButton from "../components/useDisableBackButton";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (Platform.OS === "android") {
    useDisableBackButton();
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      "P5-Font": require("../assets/fonts/P5FontRegular.otf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="note" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}
