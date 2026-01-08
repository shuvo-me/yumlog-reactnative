import { useColorScheme } from "@/hooks/use-color-scheme";
import config from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { TamaguiProvider, Theme } from "tamagui";
export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Theme name={colorScheme === "dark" ? "dark" : "light"}>
            <Stack>
              <Stack.Screen
                name="onboarding"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="sign-up" options={{ headerShown: false }} />
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
              <Stack.Screen
                name="(protected)"
                options={{ headerShown: false }}
              />
            </Stack>
          </Theme>
          <StatusBar style="auto" />
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
