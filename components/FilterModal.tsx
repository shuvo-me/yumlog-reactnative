import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, ScrollView } from 'react-native';
import { X, RotateCcw, Star, ChefHat } from '@tamagui/lucide-icons';
import {
  Button,
  Slider,
  Text,
  View,
  XStack,
  YStack,
  Separator,
  Switch,
  useTheme
} from 'tamagui';

export interface FilterOptions {
  spiciness: number;
  sweetness: number;
  saltiness: number;
  umami: number;
  mustTry: boolean;
  recommend: boolean;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

const DEFAULT_FILTERS: FilterOptions = {
  spiciness: 0,
  sweetness: 0,
  saltiness: 0,
  umami: 0,
  mustTry: false,
  recommend: false,
};

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply, 
  initialFilters 
}: FilterModalProps) {
  const theme = useTheme();
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (visible) {
      setFilters({ ...DEFAULT_FILTERS, ...initialFilters });
      setHasChanges(false);
    }
  }, [visible, initialFilters]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setHasChanges(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.spiciness > 0) count++;
    if (filters.sweetness > 0) count++;
    if (filters.saltiness > 0) count++;
    if (filters.umami > 0) count++;
    if (filters.mustTry) count++;
    if (filters.recommend) count++;
    return count;
  };

  const TasteSlider = ({ 
    label, 
    emoji, 
    value, 
    onChange, 
    color = "$primary" 
  }: {
    label: string;
    emoji: string;
    value: number;
    onChange: (value: number) => void;
    color?: string;
  }) => (
    <YStack gap="$2">
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap="$2">
          <Text fontSize="$5">{emoji}</Text>
          <Text fontSize="$4" fontWeight="500" color="$color">
            {label}
          </Text>
        </XStack>
        <Text fontSize="$3" color="$colorSecondary" fontWeight="600">
          {value === 0 ? "Any" : `${value}+`}
        </Text>
      </XStack>
      <Slider
        size="$4"
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={0}
        max={10}
        step={1}
      >
        <Slider.Track backgroundColor="$surfaceDark">
          <Slider.TrackActive backgroundColor={color} />
        </Slider.Track>
        <Slider.Thumb 
          index={0}
          size="$4" 
          backgroundColor={color} 
          bordered 
          borderColor="$background"
        />
      </Slider>
    </YStack>
  );

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
          <XStack alignItems="center" gap="$2">
            <Text fontSize="$6" fontWeight="600">
              Filters
            </Text>
            {getActiveFiltersCount() > 0 && (
              <View 
                bg="$primary" 
                px="$2" 
                py="$1" 
                br="$2"
                minWidth={24}
                minHeight={24}
                ai="center"
                jc="center"
              >
                <Text fontSize="$2" color="white" fontWeight="600">
                  {getActiveFiltersCount()}
                </Text>
              </View>
            )}
          </XStack>
          <Button
            icon={RotateCcw}
            chromeless
            size="$4"
            onPress={handleReset}
            disabled={!hasChanges}
            opacity={hasChanges ? 1 : 0.4}
          />
        </XStack>

        {/* Filter Content */}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <YStack padding="$4" gap="$4">
            {/* Taste Profiles */}
            <YStack gap="$3">
              <XStack alignItems="center" gap="$2">
                <ChefHat size={18} color="$primary" />
                <Text fontSize="$5" fontWeight="600" color="$color">
                  Taste Profiles
                </Text>
              </XStack>
              <Text fontSize="$3" color="$colorSecondary" mb="$2">
                Set minimum taste intensity (0-10 scale)
              </Text>
              
              <TasteSlider
                label="Spiciness"
                emoji="🔥"
                value={filters.spiciness}
                onChange={(value) => updateFilter('spiciness', value)}
                color="#ff4444"
              />
              
              <TasteSlider
                label="Sweetness"
                emoji="🍬"
                value={filters.sweetness}
                onChange={(value) => updateFilter('sweetness', value)}
                color="#ff69b4"
              />
              
              <TasteSlider
                label="Saltiness"
                emoji="🧂"
                value={filters.saltiness}
                onChange={(value) => updateFilter('saltiness', value)}
                color="#4169e1"
              />
              
              <TasteSlider
                label="Umami"
                emoji="🍄"
                value={filters.umami}
                onChange={(value) => updateFilter('umami', value)}
                color="#8b4513"
              />
            </YStack>

            <Separator />

            {/* Special Filters */}
            <YStack gap="$3">
              <XStack alignItems="center" gap="$2">
                <Star size={18} color="$primary" />
                <Text fontSize="$5" fontWeight="600" color="$color">
                  Special Filters
                </Text>
              </XStack>

              <XStack
                alignItems="center"
                justifyContent="space-between"
                padding="$3"
                bg="$surfaceDark"
                br="$3"
              >
                <XStack alignItems="center" gap="$3">
                  <Text fontSize="$4">🌟</Text>
                  <Text fontSize="$4" color="$color">
                    Must Try
                  </Text>
                </XStack>
                <Switch
                  size="$3"
                  checked={filters.mustTry}
                  onCheckedChange={(checked) => updateFilter('mustTry', checked)}
                >
                  <Switch.Thumb backgroundColor="$primary" />
                </Switch>
              </XStack>

              <XStack
                alignItems="center"
                justifyContent="space-between"
                padding="$3"
                bg="$surfaceDark"
                br="$3"
              >
                <XStack alignItems="center" gap="$3">
                  <Text fontSize="$4">⭐</Text>
                  <Text fontSize="$4" color="$color">
                    Recommended
                  </Text>
                </XStack>
                <Switch
                  size="$3"
                  checked={filters.recommend}
                  onCheckedChange={(checked) => updateFilter('recommend', checked)}
                >
                  <Switch.Thumb backgroundColor="$primary" />
                </Switch>
              </XStack>
            </YStack>

            {/* Filter Summary */}
            {getActiveFiltersCount() > 0 && (
              <YStack
                padding="$3"
                bg="$surfaceDark"
                br="$3"
                gap="$2"
              >
                <Text fontSize="$3" fontWeight="600" color="$color">
                  Active Filters ({getActiveFiltersCount()})
                </Text>
                {filters.spiciness > 0 && (
                  <Text fontSize="$3" color="$colorSecondary">
                    🔥 Spiciness: {filters.spiciness}+
                  </Text>
                )}
                {filters.sweetness > 0 && (
                  <Text fontSize="$3" color="$colorSecondary">
                    🍬 Sweetness: {filters.sweetness}+
                  </Text>
                )}
                {filters.saltiness > 0 && (
                  <Text fontSize="$3" color="$colorSecondary">
                    🧂 Saltiness: {filters.saltiness}+
                  </Text>
                )}
                {filters.umami > 0 && (
                  <Text fontSize="$3" color="$colorSecondary">
                    🍄 Umami: {filters.umami}+
                  </Text>
                )}
                {filters.mustTry && (
                  <Text fontSize="$3" color="$colorSecondary">
                    🌟 Must Try Only
                  </Text>
                )}
                {filters.recommend && (
                  <Text fontSize="$3" color="$colorSecondary">
                    ⭐ Recommended Only
                  </Text>
                )}
              </YStack>
            )}
          </YStack>
        </ScrollView>

        {/* Footer Actions */}
        <View padding="$4" borderTopWidth={1} borderColor="$borderColor">
          <XStack gap="$3">
            <Button
              flex={1}
              h={50}
              bg="transparent"
              boc="$borderDark"
              bw={1}
              br="$3"
              onPress={onClose}
            >
              <Text fontSize="$4" color="$color">
                Cancel
              </Text>
            </Button>
            <Button
              flex={1}
              h={50}
              bg="$primary"
              br="$3"
              onPress={handleApply}
              disabled={!hasChanges}
              opacity={hasChanges ? 1 : 0.6}
            >
              <Text fontSize="$4" color="white" fontWeight="600">
                Apply Filters
              </Text>
            </Button>
          </XStack>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});