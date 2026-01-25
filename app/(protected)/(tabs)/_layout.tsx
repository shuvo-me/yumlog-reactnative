import { Home, PlusCircle, User } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Using your custom backgroundDark and primary tokens
        tabBarStyle: {
          backgroundColor: theme.backgroundDark?.get() || "#221710",
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: `auto`,
        },
        tabBarActiveTintColor: theme.primary?.get() || "#f26c0d",
        tabBarInactiveTintColor: theme.neutralMuted?.get() || "#54453b",
        tabBarLabelStyle: {
          fontFamily: "Inter_600SemiBold",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={30} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}