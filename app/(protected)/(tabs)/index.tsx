import { ScrollView, Text, YStack } from "tamagui";

export default function HomeScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 20 }}
    >
      <YStack gap={20}>
        {Array.from({ length: 100 }).map((_, index) => (
          <Text key={index} color={"red"}>
            Hello World {index}
          </Text>
        ))}
      </YStack>
    </ScrollView>
  );
}
