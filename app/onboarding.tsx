import { HERO_IMAGE_URL, SCREEN_WIDTH, SLIDES } from "@/constants";
import { ArrowRight, Utensils } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  H1,
  Image,
  Paragraph,
  ScrollView,
  Text,
  View,
  XStack,
  YStack,
  ZStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient"; // Required for native gradients

const OnboardingScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / SCREEN_WIDTH);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <YStack f={1} backgroundColor="$backgroundDark" overflow="hidden">
      {/* 1. Background Section */}
      <ZStack position="absolute" top={0} left={0} width="100%" height="75%">
        <Image
          source={{ uri: HERO_IMAGE_URL }}
          width="100%"
          height="100%"
          objectFit="cover" // Better than resizeMode for Tamagui/Expo
        />

        {/* TOP GRADIENT: Native compatible */}
        <LinearGradient
          fullscreen
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          start={[0.5, 0]}
          end={[0.5, 0.4]}
        />

        {/* BOTTOM BLEND: Native compatible */}
        <LinearGradient
          fullscreen
          colors={["transparent", "rgba(34, 23, 16, 0.8)", "$backgroundDark"]}
          locations={[0.5, 0.8, 1]}
          start={[0.5, 0]}
          end={[0.5, 1]}
        />
      </ZStack>

      {/* 2. Header (Safe Area Aware) */}
      <XStack
        paddingHorizontal="$6"
        paddingTop={insets.top + 10} // Dynamic notch handling
        justifyContent="space-between"
        alignItems="center"
        zIndex={10}
      >
        <View
          width={44}
          height={44}
          borderRadius={22}
          backgroundColor="rgba(255,255,255,0.15)"
          alignItems="center"
          justifyContent="center"
          // Blur works on iOS/Web; safe fallback on Android
          style={{ backdropFilter: "blur(10px)" }}
        >
          <Utensils size={24} color="white" />
        </View>
        <Button
          size="$3"
          backgroundColor="rgba(0,0,0,0.3)"
          borderRadius="$10"
          borderWidth={0} // Remove default button border
          onPress={() => console.log("Skip")}
        >
          <Text color="white" fontSize={14} fontWeight="600">
            Skip
          </Text>
        </Button>
      </XStack>

      {/* 3. Content Section */}
      <YStack
        f={1}
        justifyContent="flex-end"
        paddingHorizontal="$6"
        paddingBottom={insets.bottom + 20}
        zIndex={10}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={handleScroll}
          width={SCREEN_WIDTH}
          snapToAlignment="center"
        >
          {SLIDES.map((slide) => (
            <YStack
              key={slide.title}
              width={SCREEN_WIDTH}
              justifyContent="flex-end"
            >
              <H1
                color="white"
                fontSize={44}
                fontWeight="900"
                lineHeight={46}
                textAlign="left" // Changed to left for a more modern "Stitch" look
              >
                Your Culinary {"\n"}
                <Text color="$primary">Passport</Text>
              </H1>

              <Paragraph
                color="$gray11"
                fontSize={16}
                marginTop="$4"
                lineHeight={24}
                opacity={0.8}
                numberOfLines={2}
              >
                Track every dish you taste, rate your favorites, and map your
                foodie journey.
              </Paragraph>
            </YStack>
          ))}
        </ScrollView>

        {/* Pagination Dots */}

        <XStack gap="$2" mt={"$10"}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              width={i === activeIndex ? 30 : 6}
              height={6}
              borderRadius={3}
              backgroundColor={
                i === activeIndex ? "$primary" : "rgba(255,255,255,0.2)"
              }
              animation={"smooth"}
            />
          ))}
        </XStack>

        {/* Action Button */}
        <Button
          backgroundColor="$primary"
          height={60}
          borderRadius="$4"
          pressStyle={{ scale: 0.97 }}
          iconAfter={<ArrowRight size={20} color="white" />}
          mt={"$12"}
        >
          <Text color="white" fontSize={18} fontWeight="bold">
            Get Started
          </Text>
        </Button>

        {/* Footer */}
        <XStack marginTop="$6" justifyContent="center" gap="$1.5">
          <Text color="$gray10" fontSize={14}>
            Already have an account?
          </Text>
          <Text color="white" fontSize={14} fontWeight="800">
            Log In
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default OnboardingScreen;
