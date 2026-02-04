import { ArrowUpDown, ChevronLeft, Heart, Search, Star } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Button, Image, ScrollView, styled, Text,
    XStack,
    YStack,
    ZStack
} from 'tamagui';

// --- Styled Components ---
const FilterButton = styled(Button, {
    backgroundColor: '$cardBackground',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: '$3',
    paddingHorizontal: '$4',
    paddingVertical: '$2',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
});

const EntryCard = styled(YStack, {
    backgroundColor: '$cardBackground',
    borderRadius: '$4',
    overflow: 'hidden',
    marginBottom: '$4',
    borderWidth: 1,
    borderColor: '$borderColor',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
});

const CompactCard = styled(YStack, {
    backgroundColor: '$cardBackground',
    borderRadius: '$4',
    overflow: 'hidden',
    marginBottom: '$4',
    borderWidth: 1,
    borderColor: '$borderColor',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 128,
});

const Tag = styled(XStack, {
    backgroundColor: '$backgroundSecondary',
    borderRadius: '$2',
    paddingHorizontal: '$2',
    paddingVertical: '$1',
    alignItems: 'center',
});

const BottomNavButton = styled(Button, {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$1',
    width: 64,
    height: 'auto',
    paddingVertical: '$2',
});

// --- Sample Data ---
const sampleEntries = [
    {
        id: 1,
        title: "Spicy Miso Ramen",
        restaurant: "Ramen Danbo",
        date: "Oct 24, 2023",
        rating: 4.8,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsBf6JmD5BrWEChmbKvjpsbuVWNBNWi1fz1OzZAA4oFF2cACBX3pIi0oCLD5vVYrJ0sJLXRfJ3Er43ISFxwkf-X21ZTKiYuAnQoc67TKWO4WKqqE-8PytVViaHNEbteegW3iiH-Lqu4Jzhv9CeagoopW-90n5-SklIQl-BRbWRpiuXgmeyqlFLzaU4t1tz0ggo0Kpon3hZNo5-KCZO-rCTcWbJIDY4zNU5Im5sEt5BFcpFxIT-rOOJhtQMcizHjICtrjWcujCFzQ",
        review: "Ideally balanced broth, not too salty. The pork chashu melted in my mouth. Definitely recommend adding the extra egg.",
        tags: ["Japanese", "Dinner"],
        price: "$$",
        isFavorite: true,
        layout: "large"
    },
    {
        id: 2,
        title: "Margherita D.O.P.",
        restaurant: "Tony's Pizza Napoletana",
        date: "Oct 20, 2023",
        rating: 4.2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4vBEpMLIxO4QR6Zw6iIpbwfVojwkxdiNu6aoBAn5gLj9UiZDWt89jn38NoDsFIYnmvAAIbEh3WFtDSyPKKxmGtABr7FeyN9gK8o-_5MtV_qACNeeeBt1QJrIBXBL3wTIzABz7NoIwgY-c82s8vUAsV5PsKI_aLmPsOl5andMx79Vgb07mbBYxXRCX9JwGmdXi1AGY1txhX_9QpCVAPEDtaeeE_S69Wadi8g8q1dmReiI3uJJxOtunj86o1sCoDfaCNZlCyPPYlg",
        review: "Crust was perfect, slightly charred. Sauce was fresh but could use a tiny bit more basil. Good for a quick lunch.",
        tags: ["Italian", "Lunch"],
        price: "$$$",
        isFavorite: true,
        layout: "large"
    },
    {
        id: 3,
        title: "Smashed Avo Toast",
        restaurant: "The Mill",
        date: "Oct 15, 2023",
        rating: 5.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZN9wgVT6A3j2TJxfkVEWTs9xSPK11Pp-nBR-NLNY21dZ6yYpqePtZCHAk9sTgCVSvfUGKfxNVEfU2obiJf3dQMIYwDmwdorDKsW215GeLPayTrjsqb_M5tm357DHGx0i8oGmPN5Wxs0mjENUN_3yTwDD3VJlJ7qUqFiI--wCCjwGAq_kOIEWjVIqxPDCVAROihRbGlVCJ1z5UfEP9XO4pg4dQaS3nerxazqfb1_dzE0eaJfD87GEWzS2xTaAcbjtSONt0ed7sTQ",
        review: "Absolutely the best toast in the city. The bread is thick cut and the toppings are generous. Coffee pairing was excellent.",
        tags: ["Breakfast", "Cafe"],
        price: "$$",
        isFavorite: true,
        layout: "large"
    },
    {
        id: 4,
        title: "Lemon Tart",
        restaurant: "Tartine Bakery",
        date: "Oct 12",
        rating: 4.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8o5NsgtlUBONN22OcpphKeQ52wtrLzvR3h8l2DBxXAz0eZ2nc-j4p0vpCjTCh17V2-pf4Xx9vG5GkwiS5a9k3eIkDv5jUc_6cRh9fyyI-VGv0wZllm7XHCNWLr1UMjMJIOzKIQI0eXGDacqSFFGQUSkeDAe9OgjY-_10q0D1MuTnHtpXQohlfUnHk7H6Ad3kRCu-oK-H0_J340lZPmrd2cg_JSUPnmTiBXEKnU9_TJqTFrUWAC5RxSF5-uFvGCkJyifdd_tc8gQ",
        review: "Very zesty and refreshing. The crust was crumbly but held together well.",
        tags: ["Dessert"],
        price: "$",
        isFavorite: true,
        layout: "compact"
    },
];

// --- Main Component ---
export default function MyEntriesScreen() {
    const insets = useSafeAreaInsets();

    return (
        <YStack backgroundColor="$background" flex={1} paddingTop={insets.top}>
            {/* Header */}
            <YStack backgroundColor="$background" borderBottomWidth={1} borderBottomColor="$borderColor">
                <XStack alignItems="center" justifyContent="space-between" paddingBottom="$3">
                    <XStack alignItems="center" gap="$1">
                        <Button circular chromeless onPress={() => router.back()}>
                            <ChevronLeft size="$1" color="$color" />
                        </Button>
                        <Text fontSize="$5" fontWeight="700" color="$color" letterSpacing={-0.5}>
                            My Entries
                        </Text>
                    </XStack>
                    <Button circular chromeless>
                        <Search size="$1" color="$color" />
                    </Button>
                </XStack>

                {/* Filter Buttons */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} paddingHorizontal="$4" paddingBottom="$4">
                    <XStack gap="$2">
                        <FilterButton backgroundColor="$accent">
                            <ArrowUpDown size="$1" color="white" />
                            <Text color="white" fontSize="$3" fontWeight="600">
                                Recent
                            </Text>
                        </FilterButton>
                        <FilterButton>
                            <Text color="$color" fontSize="$3" fontWeight="500">
                                Rating
                            </Text>
                        </FilterButton>
                        <FilterButton>
                            <Text color="$color" fontSize="$3" fontWeight="500">
                                Cuisine
                            </Text>
                        </FilterButton>
                        <FilterButton>
                            <Text color="$color" fontSize="$3" fontWeight="500">
                                Price
                            </Text>
                        </FilterButton>
                    </XStack>
                </ScrollView>
            </YStack>

            {/* Entries */}
            <ScrollView flex={1} showsVerticalScrollIndicator={false} padding="$4" paddingTop="$2">
                <YStack gap="$4" paddingBottom="$6">
                    {sampleEntries.map((entry) =>

                        <EntryCard key={entry.id}>
                            <ZStack height={192}>
                                <Image
                                    source={{ uri: entry.image, width: 400, height: 192 }}
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                />
                                <XStack
                                    position="absolute"
                                    top="$3"
                                    left="$3"
                                    backgroundColor="rgba(0,0,0,0.6)"
                                    paddingHorizontal="$2.5"
                                    paddingVertical="$1"
                                    borderRadius="$2"
                                    alignItems="center"
                                    zIndex={10}
                                >
                                    <Text color="white" fontSize="$3" fontWeight="600">
                                        {entry.date}
                                    </Text>
                                </XStack>
                                <Button
                                    position="absolute"
                                    top="$3"
                                    right="$3"
                                    circular
                                    size="$4"
                                    backgroundColor="rgba(255,255,255,0.2)"
                                    zIndex={10}
                                >
                                    <Heart size="$2" color="white" fill="white" />
                                </Button>
                            </ZStack>

                            <YStack padding="$4" gap="$3">
                                <XStack justifyContent="space-between" alignItems="flex-start">
                                    <YStack flex={1}>
                                        <Text color="$color" fontSize="$4" fontWeight="700" letterSpacing={-0.3}>
                                            {entry.title}
                                        </Text>
                                        <Text color="$accent" fontSize="$3" fontWeight="500" marginTop="$1">
                                            {entry.restaurant}
                                        </Text>
                                    </YStack>
                                    <XStack
                                        alignItems="center"
                                        gap="$2"
                                        backgroundColor="$success_10"
                                        paddingHorizontal="$2"
                                        paddingVertical="$1"
                                        borderRadius="$2"
                                    >
                                        <Text
                                            fontSize="$3"
                                            fontWeight="700"
                                            color={entry.rating >= 4.5 ? "$success" : "$color"}
                                        >
                                            {entry.rating}
                                        </Text>
                                        <Star
                                            size={16}
                                            fill={entry.rating >= 4.5 ? "$success" : "$accent"}
                                            color={entry.rating >= 4.5 ? "$success" : "$accent"}
                                        />
                                    </XStack>
                                </XStack>

                                <Text color="$colorSecondary" fontSize="$3" numberOfLines={2} lineHeight={20}>
                                    {entry.review}
                                </Text>

                                <XStack
                                    alignItems="center"
                                    gap="$3"
                                    paddingTop="$2"
                                    borderTopWidth={1}
                                    borderTopColor="$borderColor"
                                >
                                    <XStack gap="$2">
                                        {entry.tags.map((tag) => (
                                            <Tag key={tag}>
                                                <Text color="$colorSecondary" fontSize="$3" fontWeight="500">
                                                    {tag}
                                                </Text>
                                            </Tag>
                                        ))}
                                    </XStack>
                                    <Text color="$colorSecondary" fontSize="$3" marginLeft="auto">
                                        {entry.price}
                                    </Text>
                                </XStack>
                            </YStack>
                        </EntryCard>
                    )}
                </YStack>
            </ScrollView>
        </YStack>
    );
}