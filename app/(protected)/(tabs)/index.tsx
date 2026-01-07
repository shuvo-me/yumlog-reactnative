import { ListFilter, MapPin, Plus, Search, Star } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Button,
  Image,
  ScrollView,
  styled,
  Text,
  useTheme,
  XStack,
  YStack,
  ZStack,
} from "tamagui";

/**
 * Custom Styled Components for "Your Eats"
 */
const FoodCard = styled(YStack, {
  name: "FoodCard",
  backgroundColor: "$backgroundSecondary",
  borderRadius: "$4",
  overflow: "hidden",
  marginBottom: "$4",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  // Hover/Press effect for mobile/web
  pressStyle: { scale: 0.98 },
});

const FlavorTag = styled(XStack, {
  paddingHorizontal: "$3",
  paddingVertical: "$1.5",
  borderRadius: "$2",
  gap: "$1.5",
  alignItems: "center",
});

/**
 * Main Screen Component
 */
export default function HomeScreen() {
  const theme = useTheme();

  return (
    <YStack f={1} backgroundColor="$background">
      {/* Custom Header */}
      <XStack
        paddingTop="$8" // Adjust for Notch/Status Bar
        paddingHorizontal="$4"
        paddingBottom="$3"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="$background"
        borderBottomWidth={1}
        borderColor="$borderColor"
      >
        <Text fontSize={20} fontWeight="700">
          Your Eats
        </Text>
        <XStack gap="$2">
          <Button circular icon={Search} chromeless size="$4" />
          <Button circular icon={ListFilter} chromeless size="$4" />
        </XStack>
      </XStack>

      <ScrollView p="$4" showsVerticalScrollIndicator={false}>
        {/* Card 1: Ramen */}
        <FoodItem
          title="Spicy Miso Ramen"
          location="Ramen Danbo"
          distance="2.4 mi"
          rating="4.8"
          image="https://picsum.photos/id/199/800/600"
          tags={[
            { label: "Spicy", emoji: "🔥", active: true },
            { label: "Savory", emoji: "🍜" },
            { label: "Umami", emoji: "✨" },
          ]}
        />

        {/* Card 2: Fries */}
        <FoodItem
          title="Truffle Parmesan Fries"
          location="The Burger Joint"
          distance="0.8 mi"
          rating="4.2"
          image="https://picsum.photos/id/429/800/600"
          tags={[
            { label: "Salty", emoji: "🧂" },
            { label: "Crispy", emoji: "🥔" },
          ]}
        />

        {/* Padding for Bottom Nav */}
        <YStack h={120} />
      </ScrollView>

      {/* Floating Action Button */}
      <Button
        position="absolute"
        bottom={100}
        right={16}
        width={60}
        height={60}
        circular
        backgroundColor="#f26c0d" // primary color
        icon={<Plus size={32} color="white" />}
        elevation={5}
        pressStyle={{ scale: 0.9, opacity: 0.9 }}
      />
    </YStack>
  );
}

/**
 * Card Sub-Component
 */
function FoodItem({ title, location, distance, rating, image, tags }) {
  const router = useRouter();
  return (
    <FoodCard
      onPress={() => {
        router.push("/details/1");
      }}
    >
      <ZStack w="100%" height={220}>
        <Image source={{ uri: image }} width="100%" height="100%" />
        {/* Rating Badge */}
        <XStack
          pos="absolute"
          top={12}
          right={12}
          backgroundColor="rgba(0,0,0,0.6)"
          px="$3"
          py="$1.5"
          borderRadius="$3"
          ai="center"
          gap="$1"
        >
          <Star size={14} fill="#f26c0d" color="#f26c0d" />
          <Text color="white" fontWeight="700" fontSize={12}>
            {rating}
          </Text>
        </XStack>
      </ZStack>

      <YStack p="$4" gap="$2">
        <YStack>
          <Text fontSize={18} fontWeight="700">
            {title}
          </Text>
          <XStack ai="center" gap="$1">
            <MapPin size={14} color="$colorFocus" />
            <Text color="$colorSecondary" fontSize={14}>
              {location} • {distance}
            </Text>
          </XStack>
        </YStack>

        <XStack gap="$2" flexWrap="wrap" marginTop="$2">
          {tags?.map((tag) => (
            <FlavorTag
              key={tag.label}
              backgroundColor={tag.active ? "#392f28" : "$backgroundHover"}
              borderWidth={1}
              borderColor={tag.active ? "#f26c0d" : "transparent"}
            >
              <Text fontSize={12}>{tag.emoji}</Text>
              <Text fontSize={10} fontWeight="700" textTransform="uppercase">
                {tag.label}
              </Text>
            </FlavorTag>
          ))}
        </XStack>
      </YStack>
    </FoodCard>
  );
}
