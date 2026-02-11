import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Search, X, Clock, TrendingUp } from '@tamagui/lucide-icons';
import {
  Button,
  Input,
  Text,
  View,
  XStack,
  YStack,
  ScrollView,
  Separator,
  useTheme
} from 'tamagui';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  initialValue?: string;
}

const RECENT_SEARCHES_KEY = 'yumlog_recent_searches';

export default function SearchModal({ visible, onClose, onSearch, initialValue = '' }: SearchModalProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      loadRecentSearches();
      setSearchQuery(initialValue);
    }
  }, [visible, initialValue]);

  const loadRecentSearches = () => {
    // In a real app, you'd use AsyncStorage or SecureStorage
    const saved = ['Pizza', 'Burger', 'Sushi', 'Tacos', 'Pasta'];
    setRecentSearches(saved);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      saveRecentSearch(query);
      onSearch(query.trim());
      onClose();
    }
  };

  const saveRecentSearch = (query: string) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    // In real app, save to AsyncStorage
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    // In real app, clear from AsyncStorage
  };

  const quickSearches = ['Must Try', 'Highly Rated', 'Recent', 'Spicy'];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View f={1} backgroundColor="$background">
        {/* Header */}
        <XStack
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal="$4"
          paddingTop="$8"
          paddingBottom="$3"
          borderBottomWidth={1}
          borderColor="$borderColor"
        >
          <Button
            icon={X}
            chromeless
            size="$4"
            onPress={onClose}
          />
          <Text fontSize="$6" fontWeight="600">
            Search Food
          </Text>
          <View width="$4" />
        </XStack>

        {/* Search Input */}
        <XStack padding="$4" gap="$3" alignItems="center">
          <View flex={1}>
            <Input
              h={50}
              bg="$surfaceDark"
              boc="$borderDark"
              placeholder="Search dishes, restaurants..."
              placeholderTextColor="$colorSecondary"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={() => handleSearch(searchQuery)}
              autoFocus
              fontSize="$4"
              paddingLeft="$3"
            />
          </View>
          <Button
            h={50}
            w={50}
            bg="$primary"
            br="$3"
            icon={Search}
            onPress={() => handleSearch(searchQuery)}
          />
        </XStack>

        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          {/* Quick Search Options */}
          <YStack padding="$4" gap="$3">
            <XStack alignItems="center" gap="$2" marginBottom="$2">
              <TrendingUp size={16} color="$colorSecondary" />
              <Text fontSize="$4" fontWeight="600" color="$color">
                Quick Search
              </Text>
            </XStack>
            <XStack flexWrap="wrap" gap="$2">
              {quickSearches.map((option) => (
                <Button
                  key={option}
                  size="$3"
                  bg="$surfaceDark"
                  boc="$borderDark"
                  bw={1}
                  br="$3"
                  onPress={() => handleSearch(option)}
                >
                  <Text fontSize="$3" color="$color">
                    {option}
                  </Text>
                </Button>
              ))}
            </XStack>
          </YStack>

          <Separator marginVertical="$2" />

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <YStack padding="$4" gap="$3">
              <XStack
                alignItems="center"
                justifyContent="space-between"
                marginBottom="$2"
              >
                <XStack alignItems="center" gap="$2">
                  <Clock size={16} color="$colorSecondary" />
                  <Text fontSize="$4" fontWeight="600" color="$color">
                    Recent Searches
                  </Text>
                </XStack>
                <Button
                  chromeless
                  size="$2"
                  onPress={clearRecentSearches}
                >
                  <Text fontSize="$3" color="$primary">
                    Clear
                  </Text>
                </Button>
              </XStack>
              <YStack gap="$2">
                {recentSearches.map((search) => (
                  <Button
                    key={search}
                    h={44}
                    bg="transparent"
                    jc="flex-start"
                    onPress={() => handleSearch(search)}
                  >
                    <XStack alignItems="center" gap="$3">
                      <Clock size={16} color="$colorSecondary" />
                      <Text fontSize="$4" color="$color">
                        {search}
                      </Text>
                    </XStack>
                  </Button>
                ))}
              </YStack>
            </YStack>
          )}

          {/* Search Tips */}
          <YStack padding="$4" gap="$2">
            <Text fontSize="$3" color="$colorSecondary" textAlign="center">
              💡 Try searching for dish names, restaurants, or taste preferences
            </Text>
            <Text fontSize="$3" color="$colorSecondary" textAlign="center">
              Use filters for taste profiles and ratings
            </Text>
          </YStack>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});