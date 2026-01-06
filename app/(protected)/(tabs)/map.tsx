import {
    ChevronRight,
    MapPin,
    Navigation2,
    Search,
    SlidersHorizontal,
    Star,
    Store,
    Utensils
} from '@tamagui/lucide-icons';
import React from 'react';
import {
    Button,
    Circle,
    Image,
    ScrollView,
    styled,
    Text,
    XStack,
    YStack,
    ZStack,
} from 'tamagui';

// --- Styled Components ---

const MapCanvas = styled(YStack, {
  name: 'MapCanvas',
  f: 1,
  backgroundColor: '#242f3e', // Classic dark map background
  overflow: 'hidden',
  position: 'relative',
});

// The floating restaurant card at the bottom
const FloatingPreview = styled(XStack, {
  backgroundColor: '#2c241b', // card-dark from your design
  padding: '$3',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.1)',
  gap: '$3',
  ai: 'center',
  shadowColor: '#000',
  shadowRadius: 20,
  shadowOpacity: 0.5,
  animation: 'quick',
  enterStyle: { opacity: 0, y: 20 },
});

const CategoryButton = styled(Button, {
  borderRadius: '$10',
  size: '$3',
  fontWeight: '600',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.1)',
  backgroundColor: 'rgba(0,0,0,0.6)',
  color: 'white',
});

// --- Main Screen ---

export default function MapViewScreen() {
  return (
    <ZStack f={1} backgroundColor="$backgroundDark">
      {/* 1. MAP LAYER */}
      <MapCanvas>
        {/* Decorative Map Shapes (Mocking buildings/parks) */}
        <Circle size={200} bg="#1c3a2f" pos="absolute" top="10%" left="-10%" opacity={0.5} />
        <YStack w={150} h={100} bg="rgba(255,255,255,0.05)" pos="absolute" top="40%" right="10%" rotate="15deg" br="$4" />
        
        {/* Map Markers */}
        <Marker top="42%" left="22%" color="$red10" icon="lunch" />
        <Marker top="32%" left="52%" color="$primary" icon="ramen" isLarge />
        <Marker top="62%" left="72%" color="$lime10" icon="icecream" />

        {/* My Location FAB */}
        <Button 
          pos="absolute" 
          bottom={180} 
          right={20} 
          circular 
          size="$4" 
          bg="rgba(44, 36, 27, 0.9)" 
          icon={<Navigation2 size={20} color="$blue10" fill="currentColor" />}
        />
      </MapCanvas>

      {/* 2. HEADER LAYER (Search & Filters) */}
      <YStack pos="absolute" top={0} w="100%" p="$4" paddingTop="$8" gap="$4">
        <XStack jc="space-between" ai="center">
          <Text color="white" fontSize="$6" fontWeight="700" textShadowColor="rgba(0,0,0,0.5)" textShadowRadius={2}>
            Map View
          </Text>
          <XStack gap="$2">
            <HeaderButton icon={Search} />
            <HeaderButton icon={SlidersHorizontal} />
          </XStack>
        </XStack>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} gap="$2">
          <CategoryButton bg="$primary" borderColor="$primary">All Spots</CategoryButton>
          <CategoryButton>Asian</CategoryButton>
          <CategoryButton>Burgers</CategoryButton>
          <CategoryButton>Dessert</CategoryButton>
          <CategoryButton>Top Rated</CategoryButton>
        </ScrollView>
      </YStack>

      {/* 3. SELECTED ITEM PREVIEW LAYER */}
      <YStack pos="absolute" bottom={100} left={0} right={0} px="$4">
        <FloatingPreview>
          <Image 
            source={{ uri: 'https://picsum.photos/id/199/200', width: 80, height: 80 }} 
            br="$2"
            w={80}
            h={80}
          />
          <YStack f={1} gap="$1">
            <XStack jc="space-between" ai="center">
              <Text color="white" fontWeight="700" fontSize="$4">Spicy Miso Ramen</Text>
              <XStack bg="$primary" px="$1.5" py="$0.5" br="$1" ai="center" gap="$1">
                <Star size={10} fill="white" color="white" />
                <Text color="white" fontSize={10} fontWeight="800">4.8</Text>
              </XStack>
            </XStack>
            
            <XStack ai="center" gap="$1" opacity={0.7}>
              <Store size={12} color="$gray11" />
              <Text color="$gray11" fontSize={12}>Ramen Danbo • 2.4 mi</Text>
            </XStack>

            <XStack gap="$2" mt="$1">
              <Badge color="$orange10" label="Spicy" emoji="🔥" />
              <Badge color="$gray11" label="Savory" emoji="🍜" />
            </XStack>
          </YStack>
          <Button icon={ChevronRight} chromeless color="$gray10" p={0} />
        </FloatingPreview>
      </YStack>
    </ZStack>
  );
}

// --- Helper Sub-components ---

/**
 * A small, rounded button used for the header navigation.
 * It is semitransparent with a subtle shadow and a thin border.
 * The icon color is white and can be changed via the `color` prop.
 * @param {JSX.Element} icon The icon to be rendered within the button.
 */
function HeaderButton({ icon }) {
  return (
    <Button 
      circular 
      size="$4" 
      bg="rgba(0,0,0,0.4)" 
      blurStyle="extraLight" 
      borderWidth={1} 
      borderColor="rgba(255,255,255,0.1)"
      icon={icon}
      color="white"
    />
  );
}

function Marker({ top, left, color, isLarge = false, icon }) {
  const size = isLarge ? 60 : 40;
  return (
    <YStack pos="absolute" top={top} left={left} ai="center" animation="quick" hoverStyle={{ scale: 1.1 }}>
      {isLarge && (
        <Circle 
          size={size} 
          pos="absolute" 
          bg={color} 
          opacity={0.3} 
          animation="lazy" 
          enterStyle={{ scale: 0.5, opacity: 0 }}
          // Note: for real ping animation, use a custom loop logic or @tamagui/animations
        />
      )}
      <ZStack ai="center" jc="center">
        <MapPin size={size} color={color} fill={color} />
        <Circle size={size * 0.4} bg="white" pos="absolute" top={size * 0.15}>
            <Utensils size={size * 0.25} color={color} />
        </Circle>
      </ZStack>
    </YStack>
  );
}

function Badge({ color, label, emoji }) {
  return (
    <XStack bg="#392f28" px="$2" py="$0.5" br="$2" ai="center" gap="$1" bw={1} bc="rgba(255,255,255,0.05)">
      <Text fontSize={10}>{emoji}</Text>
      <Text color={color} fontSize={10} fontWeight="600">{label}</Text>
    </XStack>
  );
}