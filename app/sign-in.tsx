import { Apple, ArrowLeft, Chrome } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  H1,
  Image,
  Input,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
  ZStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

const FOOD_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAuI3Wh3MfwfbbWGKNuxIRWZ4m7eymDdZAz5cP3nZ_6fhbPC2UpFP3Xd1lcHaPBTwigGNTBTKYItlb3km2espnnIHmJa0963iDOM6uwAvcPHCINx4oYTt7CCJMJNYzZuemuI6ayuj9Ttd9Vwvs6NJ2shvrKlkUMLi8PvMBvmIqEUU5FSXDPha8XjVKKqWzcz61Cr_GK-ZAaoGdNjLPX2HcobJAfXoAYuk9eufq02Tfp3gyr0vUDTUvR_FiymNxWu0JHpTSzWwBKdg";

const SignInScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // Base container with background color
    <YStack f={1} bg="$background">
      {/* 1. Background Image Section */}
      <ZStack position="absolute" top={0} left={0} right={0} height="45%">
        <Image
          source={{ uri: FOOD_IMAGE_URL }}
          width="100%"
          height="100%"
          objectFit="cover"
          opacity={0.7}
        />
        <LinearGradient
          fullscreen
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          start={[0.5, 0]}
          end={[0.5, 1]}
        />
        <LinearGradient
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={200}
          colors={["$background", "rgba(34, 21, 16, 0.8)", "transparent"]}
          start={[0.5, 1]}
          end={[0.5, 0]}
        />
      </ZStack>

      {/* 2. Scrollable Content Layer */}
      <ScrollView
        f={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Navigation Bar */}
        <XStack px="$6" pt={insets.top + 10}>
          <Button
            size="$4"
            circular
            bg="rgba(255, 255, 255, 0.1)"
            style={{ backdropFilter: "blur(10px)" }}
            icon={<ArrowLeft color="white" />}
            pressStyle={{ scale: 0.95, bg: "rgba(255, 255, 255, 0.2)" }}
            borderWidth={0}
          />
        </XStack>

        {/* Form Content */}
        <YStack f={1} jc="flex-end" px="$6" pb={insets.bottom + 20} pt={100}>
          <YStack mb="$8">
            <H1 color="white" fow="800" fontSize="$9" ls={-1}>
              Sign In
            </H1>
            <Text color="$gray10" fontSize="$4" fow="500">
              Sign In to start your culinary journey.
            </Text>
          </YStack>

          {/* Form Fields */}
          <YStack gap="$4">
            <YStack gap="$2">
              <Text color="white" fow="600" ml="$1">
                Email
              </Text>
              <Input
                h={55}
                br="$4"
                bg="rgba(255,255,255,0.05)"
                placeholder="foodie@example.com"
                color="white"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.1)"
                focusStyle={{ borderColor: "$primary" }}
              />
            </YStack>

            <YStack gap="$2">
              <Text color="white" fow="600" ml="$1">
                Password
              </Text>
              <Input
                h={55}
                br="$4"
                bg="rgba(255,255,255,0.05)"
                secureTextEntry
                placeholder="••••••••"
                color="white"
                borderColor="rgba(255,255,255,0.1)"
                focusStyle={{ borderColor: "$primary" }}
              />
            </YStack>

            <Button
              mt="$4"
              h={60}
              br="$4"
              bg="$primary"
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
            >
              <Text color="white" fow="700" fontSize="$4">
                Sign In
              </Text>
            </Button>
          </YStack>

          {/* Divider */}
          <XStack ai="center" my="$8" gap="$4">
            <Separator borderColor="rgba(255,255,255,0.1)" />
            <Text
              color="$gray9"
              fontSize="$2"
              fow="700"
              textTransform="uppercase"
            >
              Or continue with
            </Text>
            <Separator borderColor="rgba(255,255,255,0.1)" />
          </XStack>

          {/* Social Logins */}
          <XStack gap="$4">
            <Button
              f={1}
              h={55}
              br="$4"
              bg="white"
              icon={<Chrome size={20} color="black" />}
            >
              <Text color="black" fow="600">
                Google
              </Text>
            </Button>
            <Button
              f={1}
              h={55}
              br="$4"
              bg="white"
              icon={<Apple size={20} color="black" />}
            >
              <Text color="black" fow="600">
                Apple
              </Text>
            </Button>
          </XStack>

          {/* Footer Link */}
          <XStack jc="center" mt="$10" gap="$2">
            <Text color="$gray10">Don't have an account?</Text>
            <Link href={"/sign-up"}>
              <Text color="$primary" fow="700">
                Sign up
              </Text>
            </Link>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default SignInScreen;
