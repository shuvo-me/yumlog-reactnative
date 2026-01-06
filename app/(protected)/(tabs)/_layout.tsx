import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
         
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
         
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
