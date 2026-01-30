import { FoodEntry, getPaginatedUserFoodEntries } from "@/lib/firestore";
import { useAuth } from "@/lib/store";
import { ListFilter, MapPin, Search, ThumbsUp } from "@tamagui/lucide-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  Button,
  Image,
  Spinner,
  styled,
  Text,
  useTheme,
  View,
  XStack,
  YStack,
  ZStack
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
  const { session } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // Using TanStack Query v5 Infinite Query
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching
  } = useInfiniteQuery({
    queryKey: ["home-feed-food-entries", session?.uid],
    queryFn: ({ pageParam }: { pageParam: QueryDocumentSnapshot }) => getPaginatedUserFoodEntries(session?.uid as string, 1, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: any) => lastPage.lastDoc || undefined,
    enabled: !!session?.uid,
  });



  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Helper to generate tags from entry data
  const getTagsForEntry = (entry: FoodEntry): Tag[] => {
    const tags: Tag[] = [];
    if (entry.spiciness > 5) tags.push({ label: "Spicy", emoji: "🔥", active: true });
    if (entry.sweetness > 5) tags.push({ label: "Sweet", emoji: "🍬" });
    if (entry.umami > 5) tags.push({ label: "Umami", emoji: "🍄" });
    if (entry.saltiness > 5) tags.push({ label: "Salty", emoji: "🧂" });
    if (entry.mustTry) tags.push({ label: "Must Try", emoji: "🌟", active: true });
    return tags;
  };

  const entries = data?.pages.flatMap((page) => page.entries) || [];
  console.log(entries)

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

      {isLoading ? (
        <YStack f={1} jc="center" ai="center">
          <Spinner size="large" color="$primary" />
        </YStack>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item: entry }) => (
            <View paddingHorizontal="$4">
              <FoodItem
                title={entry.dishName}
                location={entry.restaurant}
                distance={entry.location?.name || ""}
                rating={entry.recommend ? "Rec" : ""}
                image={entry.image || "https://picsum.photos/800/600"}
                tags={getTagsForEntry(entry)}
                recommend={entry.recommend}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
            console.log("end reached");
            loadMore();
          }}
          onEndReachedThreshold={0.9}
          ListFooterComponent={
            isFetchingNextPage ? (
              <YStack py="$4" ai="center">
                <Spinner size="small" color="$primary" />
              </YStack>
            ) : null
          }
          ListEmptyComponent={
            <YStack padding="$8" alignItems="center" gap="$4">
              <Text fontSize="$6" color="$colorSecondary" textAlign="center">
                No eats logged yet.
              </Text>
              <Text fontSize="$4" color="$text-muted" textAlign="center">
                Go to the 'Add' tab to log your first delicious meal!
              </Text>
            </YStack>
          }
        />
      )}
    </YStack>
  );
}

interface Tag {
  label: string;
  emoji: string;
  active?: boolean;
}

interface FoodItemProps {
  title: string;
  location: string;
  distance: string;
  rating: string;
  image: string;
  tags: Tag[];
  recommend?: boolean;
}

/**
 * Card Sub-Component
 */
function FoodItem({
  title,
  location,
  distance,
  rating,
  image,
  tags,
  recommend,
}: FoodItemProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <FoodCard
      onPress={() => {
        // router.push(`/details/${id}`); // TODO: Link to detail page
      }}
    >
      <ZStack w="100%" height={220}>
        <Image source={{ uri: image }} width="100%" height="100%" objectFit="cover" />
        {/* Recommend Badge */}
        {recommend && (
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
            <ThumbsUp size={14} fill={theme.primary?.get() || "#6CB231"} color={theme.primary?.get() || "#6CB231"} />
            <Text color="white" fontWeight="700" fontSize={12}>
              Recommended
            </Text>
          </XStack>
        )}
      </ZStack>

      <YStack p="$4" gap="$2">
        <YStack>
          <Text fontSize={18} fontWeight="700">
            {title}
          </Text>
          <XStack ai="center" gap="$1">
            <MapPin size={14} color={theme.colorSecondary?.get() || "#9FA19E"} />
            <Text color="$colorSecondary" fontSize={14}>
              {location} {distance ? `• ${distance}` : ""}
            </Text>
          </XStack>
        </YStack>

        <XStack gap="$2" flexWrap="wrap" marginTop="$2">
          {tags?.map((tag) => (
            <FlavorTag
              key={tag.label}
              backgroundColor={tag.active ? theme.accent?.get() || "#88CD4E" : "$backgroundHover"}
              borderWidth={1}
              borderColor={tag.active ? theme.primary?.get() || "#6CB231" : "transparent"}
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
