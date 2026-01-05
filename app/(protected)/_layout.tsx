import { Redirect, Stack } from "expo-router";
import React from "react";

const isLoggedIn = false;

export default function _layout() {
  if (!isLoggedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
