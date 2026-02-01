import { MapPin, Star } from "@tamagui/lucide-icons";
import { Image, styled, Text, XStack, YStack, ZStack } from "tamagui";


const Tag = styled(XStack, {
    backgroundColor: '$backgroundSecondary',
    borderRadius: '$2',
    gap: '$1.5',
    alignItems: 'center',
});

const Card = styled(YStack, {
    backgroundColor: '$cardBackground',
    borderRadius: '$4',
    overflow: 'hidden',
    marginBottom: '$4',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    pressStyle: { scale: 0.98 },
    animation: 'quick',
});

export default function FoodCard({ title, location, distance, rating, tags, image }: {
    title: string;
    location: string;
    distance: string;
    rating: string;
    tags: { emoji: string; label: string }[];
    image: string;
}) {
    return (
        <Card>
            <ZStack width="100%" height={220}>
                <Image
                    source={{ uri: image, width: 400, height: 220 }}
                    width="100%"
                    height="100%"
                />
                <XStack
                    position="absolute"
                    top="$3"
                    right="$3"
                    backgroundColor="rgba(0,0,0,0.6)"
                    paddingHorizontal="$2.5"
                    paddingVertical="$1.5"
                    borderRadius="$2"
                    alignItems="center"
                    gap="$1"
                >
                    <Star size={14} fill="#f26c0d" color="#f26c0d" />
                    <Text color="white" fontWeight="700" fontSize="$3">{rating}</Text>
                </XStack>
            </ZStack>

            <YStack p={'$3'} gap="$3">
                <YStack gap="$1">
                    <Text color="$color" fontSize="$4" fontWeight="700">{title}</Text>
                    <XStack alignItems="center" gap="$1">
                        <MapPin size={12} color="$colorSecondary" />
                        <Text color="$colorSecondary" fontSize="$3">{location} • {distance}</Text>
                    </XStack>
                </YStack>

                <XStack gap="$2" flexWrap="wrap">
                    {tags.map((tag) => (
                        <Tag key={tag.label}>
                            <Text fontSize="$3">{tag.emoji}</Text>
                            <Text fontSize="$3" fontWeight="700" color="$color" textTransform="uppercase">
                                {tag.label}
                            </Text>
                        </Tag>
                    ))}
                </XStack>
            </YStack>
        </Card>
    );
}