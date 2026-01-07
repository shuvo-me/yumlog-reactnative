import { LinearGradient } from "@tamagui/linear-gradient";
import {
  Calendar,
  ChevronLeft,
  Heart,
  Map as MapIcon,
  MapPin,
  MessageSquareQuote,
  Share2,
  Star,
} from "@tamagui/lucide-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { Button, Image, Text, View, XStack, YStack, ZStack } from "tamagui";

/**
 * Progress Bar using your exact shorthands
 */
const FlavorBar = ({ label, value, percentage }) => (
  <XStack ai="center" gap="$3" w="100%">
    <Text color="$darkTextSec" fontSize="$3" fontWeight="600" w={80}>
      {label}
    </Text>
    <View f={1} h={8} backgroundColor="rgba(0,0,0,0.4)" br={999} ov="hidden">
      <View h="100%" w={`${percentage}%`} backgroundColor="$primary" br={999} />
    </View>
    <Text color="$primary" fontSize="$3" fontWeight="800" w={40} ta="right">
      {value}
    </Text>
  </XStack>
);

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View f={1} backgroundColor="$darkBg">
      {/* 1. Hero Section */}
      <ZStack w="100%" h={450}>
        <Image
          source={{ uri: "https://picsum.photos/id/199/800/800" }}
          w="100%"
          h="100%"
        />

        <LinearGradient
          pos="absolute"
          fullscreen
          colors={["rgba(0,0,0,0.6)", "transparent", "$darkBg"]}
          locations={[0, 0.5, 1]} // Start, Middle (via), End
          start={[0, 0]} // Top
          end={[0, 1]} // Bottom
        />

        {/* Navigation Overlays */}
        <XStack pos="absolute" pt="$10" px="$4" jc="space-between" w="100%">
          <Button
            circular
            icon={ChevronLeft}
            backgroundColor="rgba(0,0,0,0.2)"
            bc="rgba(255,255,255,0.1)"
            bw={1}
            onPress={() => router.back()}
          />
          <XStack gap="$3">
            <Button
              circular
              icon={Heart}
              backgroundColor="rgba(0,0,0,0.2)"
              bc="rgba(255,255,255,0.1)"
              bw={1}
            />
            <Button
              circular
              icon={Share2}
              backgroundColor="rgba(0,0,0,0.2)"
              bc="rgba(255,255,255,0.1)"
              bw={1}
            />
          </XStack>
        </XStack>

        {/* Glassmorphism Location Card */}
        <XStack
          pos="absolute"
          b={24}
          l={16}
          r={16}
          p="$4"
          br="$4"
          backgroundColor="rgba(44, 32, 24, 0.7)"
          ai="center"
          jc="space-between"
          boc={"$borderColor"}
          bw={1}
        >
          <YStack gap="$2">
            <XStack ai="center" gap="$2">
              <Calendar size={20} color="$colorSecondary" />
              <Text
                color="$colorSecondary"
                fontSize="$3"
                fontWeight="700"
                tt="uppercase"
              >
                Jan 07, 2026
              </Text>
            </XStack>
            <XStack ai="center" gap="$2">
              <MapPin size={16} color="$primary" />
              <Text color="$color" fontSize="$3" fontWeight="600">
                Momofuku Noodle Bar, NYC
              </Text>
            </XStack>
          </YStack>
          <View backgroundColor="$darkBg" p="$2" br={999} bc="$darkBorder">
            <MapIcon size={20} color="$primary" />
          </View>
        </XStack>
      </ZStack>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <YStack p="$5" gap="$6" pb={150}>
          {/* Header */}
          <YStack gap="$3">
            <Text color="$darkTextMain" fontSize="$8" fontWeight="900">
              Spicy Miso Ramen
            </Text>
            <XStack gap="$2" fw="wrap">
              <View
                backgroundColor="rgba(242, 108, 13, 0.2)"
                px="$3"
                py="$2"
                br={999}
                bc="rgba(242, 108, 13, 0.2)"
                bw={1}
              >
                <Text color="$primary" fontSize="$3" fontWeight="800">
                  Spicy Level 4
                </Text>
              </View>
              <View
                backgroundColor="rgba(163, 230, 53, 0.1)"
                px="$3"
                py="$2"
                br={999}
                bc="rgba(163, 230, 53, 0.2)"
                bw={1}
              >
                <Text color="$limeGreen" fontSize="$3" fontWeight="800">
                  Umami Bomb
                </Text>
              </View>
            </XStack>
          </YStack>

          {/* Taste Score Section */}
          <YStack
            backgroundColor="$cardBackground"
            p="$5"
            br="$4"
            boc={"$borderColor"}
            bw={1}
            bs={"solid"}
          >
            <XStack jc="space-between" ai="center" mb="$6">
              <YStack>
                <Text
                  color="$colorSecondary"
                  fontSize="$3"
                  fontWeight="800"
                  tt="uppercase"
                >
                  Total Score
                </Text>
                <XStack ai="baseline" gap="$2">
                  <Text color="$primary" fontSize="$10" fontWeight="900">
                    9.2
                  </Text>
                  <Text color="$darkTextSec" fontSize="$4">
                    / 10
                  </Text>
                </XStack>
              </YStack>
              <XStack gap={2}>
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={20} fill="$primary" color="$primary" />
                ))}
                <Star size={20} color="$primary" />
              </XStack>
            </XStack>

            <YStack gap="$4">
              <FlavorBar label="Spiciness" value="8.5" percentage={85} />
              <FlavorBar label="Richness" value="9.5" percentage={95} />
              <FlavorBar label="Texture" value="9.0" percentage={90} />
              <FlavorBar label="Value" value="7.0" percentage={70} />
            </YStack>
          </YStack>

          {/* Review Section */}
          <YStack
            backgroundColor="$cardBackground"
            p="$5"
            br="$4"
            boc="$borderColor"
            bw={1}
            gap="$3"
          >
            <XStack ai="center" gap="$2">
              <MessageSquareQuote size={20} color="$primary" />
              <Text color="$darkTextMain" fontSize="$5" fontWeight="800">
                How it tasted
              </Text>
            </XStack>
            <Text color="$darkTextSec" fontSize="$3" lineHeight={22}>
              The broth was incredibly rich and creamy with a perfect level of
              spice. The chashu melted in my mouth, absolutely divine. The
              noodles had a great snap.
            </Text>
          </YStack>

          <YStack
            h={128}
            w="100%"
            br="$4"
            ov="hidden"
            bw={1}
            boc="rgba(255, 255, 255, 0.05)"
            pos="relative"
            mt="$4"
          >
            {/* 1. Background Image */}
            <Image
              source={{ uri: "https://picsum.photos/id/240/800/400" }}
              pos="absolute"
              w="100%"
              h="100%"
              opacity={0.6}
              resizeMode="cover"
            />

            {/* 2. Overlay & Button Container */}
            <YStack f={1} ai="center" jc="center" bg="rgba(0,0,0,0.2)">
              <Button
                // Styling to match: bg-black/60 backdrop-blur-sm
                backgroundColor="rgba(0,0,0,0.6)"
                boc="rgba(255,255,255,0.15)"
                bw={1}
                br="$3"
                px="$4"
                h={45} // Explicit height for the button
                // Icon and Text color
                icon={<MapIcon size={18} color="white" />}
                // Hover/Press feedback
                pressStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  scale: 0.96,
                }}
                // Navigation Logic
                onPress={() => {
                  console.log("Opening Map...");
                  // You can add Linking.openURL here later
                }}
              >
                <Button.Text color="white" fontSize="$3" fontWeight="600">
                  View on Map
                </Button.Text>
              </Button>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <YStack
        pos="absolute"
        b={0}
        l={0}
        r={0}
        px="$6"
        py={"$4"}
        backgroundColor="$cardBackground"
        boc="$darkBorder"
        borderTopWidth={1}
      >
        <XStack gap="$3">
          <Button
            f={1}
            backgroundColor="$cardBackground"
            bc="$darkBorder"
            bw={1}
            h={55}
            br="$4"
          >
            <Text color="$darkTextMain" fontWeight="700">
              Edit Entry
            </Text>
          </Button>
          <Button f={1} backgroundColor="$primary" h={55} br="$4">
            <Text color="white" fontWeight="800">
              Add Photo
            </Text>
          </Button>
        </XStack>
      </YStack>
    </View>
  );
}
