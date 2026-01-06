import {
    BookOpen,
    ChevronRight,
    Heart,
    Settings,
    Share2,
} from "@tamagui/lucide-icons";
import React from "react";
import {
    Avatar,
    Button,
    ScrollView,
    styled,
    Text,
    XStack,
    YStack,
} from "tamagui";

// --- Styled Components ---

const ProfileCard = styled(YStack, {
  backgroundColor: "$background", // Inherits from theme, maps to your card-dark
  borderRadius: "$4",
  padding: "$5",
  ai: "center",
  jc: "center",
  gap: "$1",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.05)",
  elevation: 2,
  f: 1,
});

const MenuButton = styled(Button, {
  backgroundColor: "$background",
  height: 80,
  borderRadius: "$4",
  paddingHorizontal: "$4",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.05)",
  pressStyle: { scale: 0.98, backgroundColor: "$backgroundHover" },
  justifyContent: "flex-start",
});

// --- Main Screen ---

export default function ProfileScreen() {
  return (
    <YStack f={1} backgroundColor="$backgroundDark">
      {/* Header */}
      <XStack
        paddingTop={60}
        paddingHorizontal="$4"
        paddingBottom="$3"
        jc="space-between"
        ai="center"
        borderBottomWidth={1}
        borderColor="rgba(255,255,255,0.05)"
      >
        <Text fontSize="$5" fontWeight="700" color="white">
          My Profile
        </Text>
        <Button circular icon={Share2} chromeless color="white" />
      </XStack>

      <ScrollView p="$4" showsVerticalScrollIndicator={false}>
        <YStack gap="$8" pt="$4">
          {/* Avatar Section */}
          <YStack ai="center" gap="$4">
            <Avatar size="$12" circular bg="$primary">
              <Avatar.Image
                source={{
                  uri: "https://picsum.photos/id/64/400/400",
                  width: 104,
                  height: 104,
                }}
              />
            </Avatar>

            <YStack ai="center" gap="$1">
              <Text color="white" fontSize="$7" fontWeight="700">
                Sarah Jenkins
              </Text>
              <Text color="$textSecondary" fontSize="$3" fontWeight="500">
                @sarah_eats_sf
              </Text>
              <XStack bg="#392f28" px="$3" py="$1" br="$10" mt="$2">
                <Text
                  color="$primary"
                  fontSize={10}
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing={1}
                >
                  Foodie Level 5
                </Text>
              </XStack>
            </YStack>
          </YStack>

          {/* Stats Grid */}
          <XStack gap="$4">
            <ProfileCard>
              <Text color="$primary" fontSize="$7" fontWeight="800">
                142
              </Text>
              <Text
                color="$textSecondary"
                fontSize={10}
                fontWeight="700"
                textTransform="uppercase"
                ta="center"
              >
                Dishes Reviewed
              </Text>
            </ProfileCard>
            <ProfileCard>
              <Text color="$primary" fontSize="$7" fontWeight="800">
                38
              </Text>
              <Text
                color="$textSecondary"
                fontSize={10}
                fontWeight="700"
                textTransform="uppercase"
                ta="center"
              >
                Places Visited
              </Text>
            </ProfileCard>
          </XStack>

          {/* Menu List */}
          <YStack gap="$3">
            <MenuAction
              icon={BookOpen}
              iconBg="#392f28"
              iconColor="$primary"
              title="My Entries"
              subtitle="View all your past logs"
            />
            <MenuAction
              icon={Heart}
              iconBg="#392222"
              iconColor="#ef4444"
              title="Favorite Dishes"
              subtitle="Your top rated meals"
            />
            <MenuAction
              icon={Settings}
              iconBg="#322a24"
              iconColor="$gray11"
              title="Settings"
              subtitle="Preferences & Account"
            />
          </YStack>

          <YStack h={100} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}

// --- Sub-components ---

function MenuAction({ icon: Icon, iconBg, iconColor, title, subtitle }) {
  return (
    <MenuButton>
      <XStack f={1} ai="center" gap="$4">
        <SquareIcon bg={iconBg} color={iconColor} icon={Icon} />
        <YStack f={1}>
          <Text color="white" fontSize="$4" fontWeight="600">
            {title}
          </Text>
          <Text color="$gray10" fontSize="$1">
            {subtitle}
          </Text>
        </YStack>
        <ChevronRight color="$neutralMuted" size={20} />
      </XStack>
    </MenuButton>
  );
}

function SquareIcon({ bg, color, icon: Icon }) {
  return (
    <YStack w={44} h={44} br="$3" bg={bg} ai="center" jc="center">
      <Icon color={color} size={20} fill={Icon === Heart ? color : "none"} />
    </YStack>
  );
}
