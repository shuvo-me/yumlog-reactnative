import FoodCard from "@/components/FoodCard";
import FilterModal, { FilterOptions } from "@/components/FilterModal";
import SearchModal from "@/components/SearchModal";
import { 
  FoodEntry, 
  getPaginatedUserFoodEntries, 
  getPaginatedSearchResults 
} from "@/lib/firestore";
import { useAuth } from "@/lib/store";
import { ListFilter, Search, X } from "@tamagui/lucide-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { FlatList, RefreshControl, ScrollView } from "react-native";
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
  const { session } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce
  const [filters, setFilters] = useState<FilterOptions>({
    spiciness: 0,
    sweetness: 0,
    saltiness: 0,
    umami: 0,
    mustTry: false,
    recommend: false,
  });

  // Using TanStack Query v5 Infinite Query with search and filter support
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,

  } = useInfiniteQuery({
    queryKey: ["home-feed-food-entries", session?.uid, debouncedSearchQuery, filters],
    queryFn: ({ pageParam }: { pageParam: QueryDocumentSnapshot }) => {
      if (debouncedSearchQuery.trim()) {
        return getPaginatedSearchResults(session?.uid as string, debouncedSearchQuery, 2, pageParam);
      } else {
        return getPaginatedUserFoodEntries(session?.uid as string, 2, pageParam);
      }
    },
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

  // Client-side filtering for taste profiles (applied after search)
  const filteredEntries = useMemo(() => {
    const entries = data?.pages.flatMap((page) => page.entries) || [];
    let filtered = entries;
    
    // Apply taste profile filters
    if (filters.spiciness > 0) {
      filtered = filtered.filter(entry => entry.spiciness >= filters.spiciness);
    }
    if (filters.sweetness > 0) {
      filtered = filtered.filter(entry => entry.sweetness >= filters.sweetness);
    }
    if (filters.saltiness > 0) {
      filtered = filtered.filter(entry => entry.saltiness >= filters.saltiness);
    }
    if (filters.umami > 0) {
      filtered = filtered.filter(entry => entry.umami >= filters.umami);
    }
    if (filters.mustTry) {
      filtered = filtered.filter(entry => entry.mustTry === filters.mustTry);
    }
    if (filters.recommend) {
      filtered = filtered.filter(entry => entry.recommend === filters.recommend);
    }
    
    return filtered;
  }, [data, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      spiciness: 0,
      sweetness: 0,
      saltiness: 0,
      umami: 0,
      mustTry: false,
      recommend: false,
    });
    setSearchQuery("");
  };

  const hasActiveFilters = debouncedSearchQuery.trim() || 
    filters.spiciness > 0 || 
    filters.sweetness > 0 || 
    filters.saltiness > 0 || 
    filters.umami > 0 || 
    filters.mustTry || 
    filters.recommend;

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
          <Button 
            circular 
            icon={Search} 
            chromeless 
            size="$4"
            backgroundColor={debouncedSearchQuery.trim() ? "$primary" : "transparent"}
            onPress={() => setShowSearchModal(true)}
          />
          <Button 
            circular 
            icon={ListFilter} 
            chromeless 
            size="$4"
            backgroundColor={
              filters.spiciness > 0 || 
              filters.sweetness > 0 || 
              filters.saltiness > 0 || 
              filters.umami > 0 || 
              filters.mustTry || 
              filters.recommend
                ? "$primary" 
                : "transparent"
            }
            onPress={() => setShowFilterModal(true)}
          />
        </XStack>
      </XStack>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <XStack
          paddingHorizontal="$4"
          paddingVertical="$3"
          bg="$surfaceDark"
          borderBottomWidth={1}
          borderColor="$borderColor"
          alignItems="center"
          gap="$2"
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2" alignItems="center">
              <Text fontSize="$3" color="$colorSecondary">
                Active:
              </Text>
              {debouncedSearchQuery.trim() && (
                <XStack
                  bg="$primary"
                  px="$2"
                  py="$1"
                  br="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2" color="white">
                    &quot;{debouncedSearchQuery}&quot;
                  </Text>
                  <Button
                    size="$1"
                    circular
                    chromeless
                    icon={X}
                    color="white"
                    onPress={() => setSearchQuery("")}
                  />
                </XStack>
              )}
              {filters.spiciness > 0 && (
                <XStack
                  bg="#ff4444"
                  px="$2"
                  py="$1"
                  br="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2" color="white">
                    🔥 {filters.spiciness}+
                  </Text>
                  <Button
                    size="$1"
                    circular
                    chromeless
                    icon={X}
                    color="white"
                    onPress={() => setFilters(prev => ({ ...prev, spiciness: 0 }))}
                  />
                </XStack>
              )}
              {filters.sweetness > 0 && (
                <XStack
                  bg="#ff69b4"
                  px="$2"
                  py="$1"
                  br="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2" color="white">
                    🍬 {filters.sweetness}+
                  </Text>
                  <Button
                    size="$1"
                    circular
                    chromeless
                    icon={X}
                    color="white"
                    onPress={() => setFilters(prev => ({ ...prev, sweetness: 0 }))}
                  />
                </XStack>
              )}
              {filters.mustTry && (
                <XStack
                  bg="$primary"
                  px="$2"
                  py="$1"
                  br="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2" color="white">
                    🌟 Must Try
                  </Text>
                  <Button
                    size="$1"
                    circular
                    chromeless
                    icon={X}
                    color="white"
                    onPress={() => setFilters(prev => ({ ...prev, mustTry: false }))}
                  />
                </XStack>
              )}
              <Button
                size="$2"
                chromeless
                onPress={clearFilters}
              >
                <Text fontSize="$3" color="$primary">
                  Clear All
                </Text>
              </Button>
            </XStack>
          </ScrollView>
        </XStack>
      )}

      {isLoading ? (
        <YStack f={1} jc="center" ai="center">
          <Spinner size="large" color="$primary" />
        </YStack>
      ) : (
        <FlatList
          data={filteredEntries}
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
              {hasActiveFilters ? (
                <>
                  <Text fontSize="$6" color="$colorSecondary" textAlign="center">
                    No results found
                  </Text>
                  <Text fontSize="$4" color="$text-muted" textAlign="center">
                    Try adjusting your search or filters
                  </Text>
                  <Button
                    bg="$primary"
                    br="$3"
                    onPress={clearFilters}
                  >
                    <Text fontSize="$4" color="white" fontWeight="600">
                      Clear Filters
                    </Text>
                  </Button>
                </>
              ) : (
                <>
                  <Text fontSize="$6" color="$colorSecondary" textAlign="center">
                    No eats logged yet.
                  </Text>
                  <Text fontSize="$4" color="$text-muted" textAlign="center">
                    Go to the &apos;Add&apos; tab to log your first delicious meal!
                  </Text>
                </>
              )}
            </YStack>
          }
        />
      )}

      {/* Search Modal */}
      <SearchModal
        visible={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSearch={handleSearch}
        initialValue={debouncedSearchQuery}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilter}
        initialFilters={filters}
      />
    </YStack>
  );
}
