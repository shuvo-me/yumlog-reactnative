import FoodCard from '@/components/FoodCard';
import { Filter, Plus } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Button,
    Text,
    XStack,
    YStack,
} from 'tamagui';


export default function MyEntriesScreen() {
    const insets = useSafeAreaInsets()

    return (
        <YStack backgroundColor="$background" pt={insets.top} pb={insets.bottom}>
            {/* Header */}
            <XStack
                padding="$4"
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth={1}
                borderBottomColor="$borderColor"
            >
                <Text fontSize="$5" fontWeight="700" color="$color">Your Eats</Text>
                <XStack gap="$2">
                    <Button circular icon={Filter} chromeless color="$color" />
                </XStack>
            </XStack>

            {/* Feed */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <YStack padding="$4" paddingBottom="$10">

                    <FoodCard
                        title="Spicy Miso Ramen"
                        location="Ramen Danbo"
                        distance="2.4 mi"
                        rating="4.8"
                        tags={[{ emoji: '🔥', label: 'Spicy' }, { emoji: '🍜', label: 'Savory' }]}
                        image="https://picsum.photos/id/199/600/400"
                    />

                    <FoodCard
                        title="Truffle Parmesan Fries"
                        location="The Burger Joint"
                        distance="0.8 mi"
                        rating="4.2"
                        tags={[{ emoji: '🧂', label: 'Salty' }, { emoji: '🥔', label: 'Crispy' }]}
                        image="https://picsum.photos/id/493/600/400"
                    />

                    <FoodCard
                        title="Matcha Soft Serve"
                        location="Nana's Green Tea"
                        distance="5.1 mi"
                        rating="5.0"
                        tags={[{ emoji: '🍦', label: 'Sweet' }, { emoji: '🍵', label: 'Earthy' }]}
                        image="https://picsum.photos/id/225/600/400"
                    />

                </YStack>
            </ScrollView>

            {/* Floating Action Button */}
            <Button
                onPress={() => router.push('/add')}
                position="absolute"
                bottom={100}
                right={30}
                circular
                size="$6"
                backgroundColor="$accent"
                elevation={5}
                icon={<Plus size="$2" color="white" />}
                pressStyle={{ scale: 0.9, opacity: 0.9 }}
            />
        </YStack>
    );
}