import FoodCard from "@/components/FoodCard";
import { FoodEntry, getPaginatedUserFoodEntries } from "@/lib/firestore";
import { useAuth } from "@/lib/store";
import { ListFilter, Search } from "@tamagui/lucide-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  Button,
  Spinner,
  Text,
  useTheme,
  View,
  XStack,
  YStack
} from "tamagui";



interface Tag {
  label: string;
  emoji: string;
  active?: boolean;
}

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
              <FoodCard
                title={entry.dishName}
                location={entry.restaurant}
                distance={entry.location?.name || ""}
                rating={entry.recommend ? "Rec" : ""}
                image={entry.image || "https://picsum.photos/800/600"}
                tags={getTagsForEntry(entry)}
                onPress={() => router.push(`/details/${entry.id}`)}
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
