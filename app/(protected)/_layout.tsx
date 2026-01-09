import { useAuth } from "@/lib/store";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { Spinner, YStack } from "tamagui";

export default function _layout() {
  const session = useAuth((state) => state.session);

  const isHydrated = useAuth((state) => state._isHydrated);

  if (!isHydrated)
    return (
      <YStack f={1} ai="center" jc="center" bg="$background">
        <Spinner size="large" color="$primary" />
      </YStack>
    );

  if (!session) {
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
