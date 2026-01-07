import {
  Camera,
  Check,
  LocateFixed,
  MapPin,
  Utensils,
} from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Checkbox,
  Image,
  Input,
  Label,
  Separator,
  Slider,
  Switch,
  Text,
  View,
  XStack,
  YStack,
  ZStack,
} from "tamagui";

export default function FoodEntryScreen() {
  const inset = useSafeAreaInsets();
  const [checked, setChecked] = useState(false);
  return (
    <View f={1} bg="$background" pt={inset.top + 10} pb={inset.bottom + 10}>
      {/* 1. Sticky Header */}
      <XStack height={60} ai="center" jc="space-between" px="$4">
        <Button
          chromeless
          p={0}
          onPress={() => router.back()}
          pressStyle={{ opacity: 0.5 }}
        >
          <Text color="$text-muted" fontSize="$4">
            Cancel
          </Text>
        </Button>
        <Text fontSize="$5" fow="700">
          New Entry
        </Text>
        <Button chromeless p={0} pressStyle={{ opacity: 0.5 }}>
          <Text color="$primary" fontSize="$4" fow="700">
            Save
          </Text>
        </Button>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p="$4" gap="$6" pb="$20">
          {/* Section 1: Hero Image Upload */}
          <YStack
            h={250}
            br="$4"
            bw={2}
            bs="dashed"
            boc="rgba(104, 72, 49, 0.5)"
            bg="rgba(52, 36, 24, 0.3)"
            ai="center"
            jc="center"
            gap="$3"
          >
            <View p="$4" br={999} bg="$surface-dark">
              <Camera size={32} color="$primary" />
            </View>
            <Text color="$text-muted" fow="500" fontSize="$3">
              Tap to upload photo
            </Text>
          </YStack>

          {/* Basic Info Fields */}
          <YStack gap="$4">
            <YStack gap="$2">
              <Label
                fontSize="$1"
                fow="700"
                color="$text-muted"
                tt="uppercase"
                ls={1}
              >
                Dish Name
              </Label>
              <Input
                h={50}
                bg="$surface-dark"
                boc="$border-dark"
                placeholder="e.g. Spicy Miso Ramen"
                placeholderTextColor="$colorSecondary"
              />
            </YStack>

            <XStack gap="$4">
              <YStack f={1} gap="$2">
                <Label
                  fontSize="$1"
                  fow="700"
                  color="$text-muted"
                  tt="uppercase"
                >
                  Price
                </Label>
                <ZStack ai="center">
                  <Input
                    h={50}
                    bg="$surface-dark"
                    boc="$border-dark"
                    pl="$8"
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                  <Text pos="absolute" l="$4" color="$text-muted">
                    $
                  </Text>
                </ZStack>
              </YStack>
              <YStack f={1} gap="$2">
                <Label
                  fontSize="$1"
                  fow="700"
                  color="$text-muted"
                  tt="uppercase"
                >
                  Restaurant
                </Label>
                <Input
                  h={50}
                  bg="$surface-dark"
                  boc="$border-dark"
                  placeholder="Search..."
                />
              </YStack>
            </XStack>
          </YStack>

          <Separator boc="$border-dark" opacity={0.3} />

          {/* Section 2: Taste Profile */}
          <YStack gap="$5">
            <Text fontSize="$6" fow="700">
              Taste Profile
            </Text>

            <TasteSlider label="Sweetness" value={3} />
            <TasteSlider label="Spiciness" value={7} />
            <TasteSlider label="Saltiness" value={5} />
            <TasteSlider label="Umami" value={8} />
          </YStack>

          <Separator boc="$border-dark" opacity={0.3} />

          {/* Section 3: Verdict */}
          <YStack gap="$4">
            <XStack
              ai="center"
              jc="space-between"
              p="$3"
              br="$4"
              bg="rgba(52, 36, 24, 0.5)"
              boc="rgba(104, 72, 49, 0.5)"
              bw={1}
            >
              <YStack gap={"$2"}>
                <Text fow="500">Would Recommend?</Text>
                <Text fontSize="$3" color="$text-muted">
                  Adds to your 'Top Picks' list
                </Text>
              </YStack>
              <Switch
                unstyled
                size="$3"
                checked={checked}
                onCheckedChange={setChecked}
                backgroundColor={checked ? "$primary" : "$backgroundSecondary"}
                borderColor={checked ? "$primary" : "$borderColor"}
                borderWidth={1}
                borderRadius={100}
                width={50}
                height={28}
                padding={2}
              >
                <Switch.Thumb
                  animation="quick"
                  backgroundColor="white"
                  width={22}
                  height={22}
                  borderRadius={100}
                />
              </Switch>
            </XStack>

            <XStack ai="center" gap="$3" p="$3">
              <Checkbox size="$5" boc="$borderColor" bg="$background">
                <Checkbox.Indicator>
                  <Check color="$primary" />
                </Checkbox.Indicator>
              </Checkbox>
              <Text fow="500">Must Try Again</Text>
            </XStack>
          </YStack>

          {/* Section 4: Location Map */}
          <YStack gap="$4">
            <Text fontSize="$6" fow="700">
              Location
            </Text>
            <ZStack h={180} br="$4" ov="hidden" bw={1} boc="$border-dark">
              <Image
                source={{ uri: "https://picsum.photos/id/237/600/400" }}
                w="100%"
                h="100%"
                opacity={0.6}
              />
              <YStack f={1} ai="center" jc="center">
                <MapPin size={40} color="$primary" />
                <View
                  bg="rgba(52, 36, 24, 0.9)"
                  px="$3"
                  py="$1"
                  br={999}
                  boc="$border-dark"
                  bw={1}
                >
                  <Text fontSize="$1" fow="700">
                    Momofuku Noodle Bar
                  </Text>
                </View>
              </YStack>
            </ZStack>
            <Button
              chromeless
              icon={<LocateFixed size={18} color="$primary" />}
            >
              <Text color="$primary" fontSize="$3" fow="600">
                Use Current Location
              </Text>
            </Button>
          </YStack>
        </YStack>
      </ScrollView>

      {/* Sticky Footer */}
      <YStack
        pos="absolute"
        b={0}
        l={0}
        r={0}
        p="$4"
        pb="$8"
        bg="$background-dark"
        borderTopWidth={0.5}
        boc="$borderColor"
      >
        <Button bg="$primary" h={60} br="$4" icon={<Utensils color="white" />}>
          <Text color="white" fontSize="$4" fow="800">
            Log Dish
          </Text>
        </Button>
      </YStack>
    </View>
  );
}

const TasteSlider = ({ label, value }) => (
  <YStack gap="$2">
    <XStack jc="space-between">
      <Text fow="500">{label}</Text>
      <View bg="rgba(242, 108, 13, 0.1)" px="$2" py="$0.5" br="$1">
        <Text color="$primary" fontSize="$3" fow="800">
          {value}/10
        </Text>
      </View>
    </XStack>
    <Slider defaultValue={[value]} max={10} step={1}>
      <Slider.Track h={6} bg="$backgroundSecondary" boc="$borderColor" bw={1}>
        <Slider.TrackActive bg="$primary" />
      </Slider.Track>
      <Slider.Thumb
        index={0}
        circular
        size={20}
        bw={2}
        boc="$primary"
        bg="white"
      />
    </Slider>
  </YStack>
);
