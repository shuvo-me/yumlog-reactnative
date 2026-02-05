import { LinearGradient } from "@tamagui/linear-gradient";
import {
  Calendar,
  ChevronLeft,
  Edit3,
  Heart,
  Map as MapIcon,
  MapPin,
  MessageSquareQuote,
  Plus,
  Share2,
  Star,
} from "@tamagui/lucide-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Dimensions, Linking, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, Image, Text, View, XStack, YStack, ZStack } from "tamagui";

/**
 * Enhanced Fallback Map Component with Styled Background (reliable fallback)
 */
const FallbackMap = ({ restaurantLocation, handleOpenMap }: {
  restaurantLocation: any;
  handleOpenMap: () => void;
}) => (
  <YStack 
    w="100%" 
    h="100%" 
    backgroundColor="$backgroundSecondary"
    ai="center" 
    jc="center"
    overflow="hidden"
  >
    {/* Styled Map Background with Grid Pattern */}
    <YStack 
      w="100%" 
      h="100%" 
      backgroundColor="$backgroundSecondary"
      pos="relative"
    >
      {/* Background Pattern */}
      <View 
        w="100%" 
        h="100%" 
        opacity={0.1}
        style={{
          backgroundImage: 'linear-gradient(45deg, #f26c0d 25%, transparent 25%), linear-gradient(-45deg, #f26c0d 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f26c0d 75%), linear-gradient(-45deg, transparent 75%, #f26c0d 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0, 10px 10px, -10px -10px',
        }}
      />
      
      {/* Road Lines */}
      <View pos="absolute" w="100%" h={2} backgroundColor="$surfaceDark" top="30%" />
      <View pos="absolute" w={2} h="100%" backgroundColor="$surfaceDark" left="40%" />
      <View pos="absolute" w="100%" h={2} backgroundColor="$surfaceDark" top="60%" />
      <View pos="absolute" w={2} h="100%" backgroundColor="$surfaceDark" left="70%" />
    </YStack>
    
    {/* Overlay with Location Info */}
    <YStack 
      pos="absolute" 
      w="100%" 
      h="100%" 
      ai="center" 
      jc="center"
      backgroundColor="rgba(0,0,0,0.1)"
    >
      <YStack ai="center" gap="$3">
        <View w={70} h={70} br="$3" backgroundColor="$surfaceDark" ai="center" jc="center" borderColor="rgba(255,255,255,0.1)" borderWidth={1}>
          <MapPin size={28} color="$primary" fill="$primary" />
        </View>
        <Text color="$color" fontSize="$3" fontWeight="600" ta="center">
          {restaurantLocation.title}
        </Text>
        <Text color="$colorSecondary" fontSize="$2" fontWeight="500" ta="center">
          {restaurantLocation.address}
        </Text>
      </YStack>
    </YStack>
  </YStack>
);

/**
 * Progress Bar with gradient like HTML design
 */
const FlavorBar = ({ label, value, percentage }: {
  label: string;
  value: string;
  percentage: number;
}) => (
  <XStack ai="center" gap="$3" w="100%">
    <Text color="$colorSecondary" fontSize="$3" fontWeight="500" w={80}>
      {label}
    </Text>
    <View f={1} h={8} backgroundColor="rgba(0,0,0,0.4)" br={999} ov="hidden">
      <LinearGradient
        colors={["#ea580c", "$primary"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{
          width: `${percentage}%`,
          height: '100%',
          borderRadius: 999
        }}
      />
    </View>
    <Text color="$primary" fontSize="$3" fontWeight="700" w={40} ta="right">
      {value}
    </Text>
  </XStack>
);

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = Dimensions.get('window');

  // Restaurant location for map
  const restaurantLocation = {
    latitude: 40.7128, // NYC coordinates for Momofuku
    longitude: -74.0060,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    title: "Momofuku Noodle Bar",
    address: "New York, NY"
  };

  // Map region state
  const [region, setRegion] = React.useState({
    latitude: restaurantLocation.latitude,
    longitude: restaurantLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Check if MapView is available (for debugging)
  const [mapAvailable, setMapAvailable] = React.useState(true);

  React.useEffect(() => {
    // Check if react-native-maps is properly available
    if (!MapView) {
      console.warn('MapView is not available - using fallback map');
      setMapAvailable(false);
    }
  }, []);

  const handleOpenMap = () => {
    const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(restaurantLocation.title + ' ' + restaurantLocation.address)}`;

    Alert.alert(
      "Open in Maps",
      `Would you like to open ${restaurantLocation.title} in your maps app?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Open",
          onPress: () => Linking.openURL(mapUrl)
        }
      ]
    );
  };

  return (
    <View f={1} backgroundColor="$background" paddingTop={insets.top} paddingBottom={insets.bottom + 10}>
      {/* 1. Hero Section */}
      <ZStack w="100%" h="45vh" minHeight={400}>
        <Image
          source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNW90gR_dKIHvdkPYdLWSfNnWZrTz2UJ6w4ar2u0W1qoLsgoTCtM9HPQa7dPhBLw32kJXGyEFxUQb712fNO6ftrFhU4kY0gCcrLyDoAODD-qXSezWWa0TQF2tJ-vptRo-1VFMUylDMcGXOWR5YvU8DH1gej8NG88Q1qRoCl1YnYIxNg6UA5Twg_5ep_FoPkfOdCvCOCfQUGNxiIVexUGSpawgRBxgJwltCaTEnxF8V50tVTQ4awoiDmSKPQpQeo2J3dnDhWELT2Q" }}
          w="100%"
          h="100%"
        />

        <LinearGradient
          pos="absolute"
          fullscreen
          colors={["rgba(0,0,0,0.6)", "transparent", "$background"]}
          locations={[0, 0.3, 1]}
          start={[0, 0]}
          end={[0, 1]}
        />
        {/* Navigation Overlays */}
        <XStack pos="absolute" px="$4" pt={'$4'} jc="space-between" w="100%" alignItems="center">
          <Button
            circular
            size="$4"
            backgroundColor="rgba(0,0,0,0.2)"
            bc="rgba(255,255,255,0.1)"
            bw={1}
            onPress={() => router.back()}
            chromeless
          >
            <ChevronLeft size="$2" color="$color" />
          </Button>
          <XStack gap="$3">
            <Button
              circular
              size="$4"
              backgroundColor="rgba(0,0,0,0.2)"
              bc="rgba(255,255,255,0.1)"
              bw={1}
              chromeless
            >
              <Heart size="$2" color="$color" />
            </Button>
            <Button
              circular
              size="$4"
              backgroundColor="rgba(0,0,0,0.2)"
              bc="rgba(255,255,255,0.1)"
              bw={1}
              chromeless
            >
              <Share2 size="$2" color="$color" />
            </Button>
          </XStack>
        </XStack>

        {/* Glassmorphism Location Card */}
        <XStack
          pos="absolute"
          bottom={24}
          left={16}
          right={16}
          p="$4"
          br="$4"
          backgroundColor="rgba(44, 32, 24, 0.4)"
          ai="center"
          jc="space-between"
          borderColor="rgba(255, 255, 255, 0.1)"
          borderWidth={1}
        >
          <YStack gap="$2">
            <XStack ai="center" gap="$2">
              <Calendar size={20} color="$colorSecondary" opacity={0.8} />
              <Text
                color="$colorSecondary"
                fontSize="$4"
                fontWeight="600"
                tt="uppercase"
                letterSpacing={1}
              >
                Oct 24, 2023
              </Text>
            </XStack>
            <XStack ai="center" gap="$2">
              <MapPin size={16} color="$primary" />
              <Text color="$color" fontSize="$3" fontWeight="500">
                Momofuku Noodle Bar, NYC
              </Text>
            </XStack>
          </YStack>
          <Button
            backgroundColor="$surfaceDark"
            w={40}
            h={40}
            br={999}
            ai="center"
            jc="center"
            borderColor="rgba(255, 255, 255, 0.1)"
            borderWidth={1}
            chromeless
            onPress={handleOpenMap}
          >
            <MapIcon size={20} color="$primary" />
          </Button>
        </XStack>
      </ZStack>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <YStack px="$5" pt="$2" gap="$6" pb={150}>
          {/* Header */}
          <YStack gap="$3">
            <Text color="$color" fontSize="$5" fontWeight="900" lineHeight={36} letterSpacing={-0.5}>
              Spicy Miso Ramen
            </Text>
            <XStack gap="$2" flexWrap="wrap">
              <View
                backgroundColor="$primary_20"
                px="$3"
                py="$2"
                br={999}
                borderColor={'$primary_20'}
                borderWidth={1}
              >
                <Text color="$primary" fontSize="$3" fontWeight="700">
                  Spicy Level 4
                </Text>
              </View>
              <View
                backgroundColor="$success_20"
                px="$3"
                py="$2"
                br={999}
                borderColor={"$success_20"}
                borderWidth={1}
              >
                <Text color="#bfeb66" fontSize="$3" fontWeight="700">
                  Umami Bomb
                </Text>
              </View>
              <View
                backgroundColor="rgba(255, 255, 255, 0.05)"
                px="$3"
                py="$2"
                br={999}
                borderColor="rgba(255, 255, 255, 0.1)"
                borderWidth={1}
              >
                <Text color="$colorSecondary" fontSize="$3" fontWeight="500">
                  Dinner
                </Text>
              </View>
            </XStack>
          </YStack>

          {/* Taste Score Section */}
          <YStack
            backgroundColor="$surfaceDark"
            p="$5"
            br="$4"
            borderColor="rgba(255, 255, 255, 0.05)"
            borderWidth={1}
          >
            <XStack jc="space-between" ai="center" marginBottom="$6">
              <YStack>
                <Text
                  color="$colorSecondary"
                  fontSize="$3"
                  fontWeight="500"
                  tt="uppercase"
                  letterSpacing={1}
                >
                  Total Score
                </Text>
                <XStack ai="baseline" gap="$2">
                  <Text color="$primary" fontSize="$6" fontWeight="900" letterSpacing={-1}>
                    9.2
                  </Text>
                  <Text color="$colorSecondary" fontSize="$4" fontWeight="500">
                    / 10
                  </Text>
                </XStack>
              </YStack>
              <XStack gap="$2">
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
            backgroundColor="$surfaceDark"
            p="$5"
            br="$4"
            borderColor="rgba(255, 255, 255, 0.05)"
            borderWidth={1}
            gap="$3"
          >
            <XStack ai="center" gap="$2">
              <MessageSquareQuote size={20} color="$primary" />
              <Text color="$color" fontSize="$5" fontWeight="700">
                How it tasted
              </Text>
            </XStack>
            <Text color="$colorSecondary" fontSize="$3" lineHeight={20}>
              The broth was incredibly rich and creamy with a perfect level of spice that didn't overpower other flavors. The chashu melted in my mouth, absolutely divine. The noodles had a great snap to them. Definitely coming back for truffle version next time, although wait time was a bit long (45 mins).
            </Text>
          </YStack>

<YStack
            h={240}
            w="100%"
            br="$4"
            ov="hidden"
            borderWidth={1}
            borderColor="rgba(255, 255, 255, 0.05)"
            pos="relative"
          >
            {/* Enhanced Map with Static Image Fallback */}
            <FallbackMap 
              restaurantLocation={restaurantLocation} 
              handleOpenMap={handleOpenMap} 
            />

            {/* Overlay & Button Container */}
            <YStack 
              pos="absolute" 
              bottom="$4" 
              left="$4" 
              right="$4" 
              ai="center" 
              jc="center"
            >
              <Button
                backgroundColor="rgba(0,0,0,0.6)"
                borderColor="rgba(255,255,255,0.1)"
                borderWidth={1}
                br="$3"
                px="$4"
                py="$2"
                pressStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  scale: 0.96,
                }}
                onPress={handleOpenMap}
              >
                <MapIcon size={18} color="white" />
                <Button.Text color="white" fontSize="$3" fontWeight="500" marginLeft="$2">
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
        p="$4"
        backgroundColor="linear-gradient(to top, $background, $background 95%, transparent)"
      >
        <XStack gap="$3" maxWidth={480} mx="auto">
          <Button
            f={1}
            backgroundColor="$surfaceDark"
            borderColor="rgba(255, 255, 255, 0.1)"
            borderWidth={1}
            h={56}
            br="$4"
            pressStyle={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            <Edit3 size={20} color="$color" />
            <Button.Text color="$color" fontSize="$3" fontWeight="600" marginLeft="$2">
              Edit Entry
            </Button.Text>
          </Button>
          <Button
            f={1}
            backgroundColor="$primary"
            h={56}
            br="$4"
            pressStyle={{ backgroundColor: "#dc6803" }}
            shadowColor="rgba(220, 104, 3, 0.2)"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={5}
          >
            <Plus size={20} color="white" />
            <Button.Text color="white" fontSize="$3" fontWeight="700" marginLeft="$2">
              Add Photo
            </Button.Text>
          </Button>
        </XStack>
        <YStack h={insets.bottom} />
      </YStack>
    </View>
  );
}
