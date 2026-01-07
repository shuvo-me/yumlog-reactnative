import { Redirect, Stack } from "expo-router";
import React from "react";

const isLoggedIn = true;

export default function _layout() {
  if (!isLoggedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Smooth mobile transition
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Smooth mobile transition
        }}
      />
    </Stack>
  );
}
