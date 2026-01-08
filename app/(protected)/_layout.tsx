import { useAuth } from "@/lib/store";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function _layout() {
  const accessToken = useAuth((state) => state.session?.accessToken);

  if (!accessToken) {
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
