import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, {useEffect} from "react";


export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="note" options={{ headerShown: false }} />
      </Stack>
  );
}