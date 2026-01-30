import { Home, Plus, User } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          elevation: 10,
          backgroundColor: theme.backgroundDark?.get() || "#221710",
          borderRadius: 35,
          height: 70,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          borderCurve: "continuous",
        },
        tabBarActiveTintColor: theme.primary?.get() || "#f26c0d",
        tabBarInactiveTintColor: theme.neutralMuted?.get() || "#cfc0b8",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: 70,
          paddingVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={32} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                onPress={props.onPress || undefined}
                onLongPress={props.onLongPress || undefined}
                accessibilityLabel={props.accessibilityLabel}
                accessibilityState={
                  props.accessibilityState
                    ? {
                      selected: props.accessibilityState.selected,
                      disabled: props.accessibilityState.disabled,
                      busy: props.accessibilityState.busy,
                      expanded: props.accessibilityState.expanded,
                      checked: props.accessibilityState.checked,
                    }
                    : undefined
                }
                style={{
                  top: -30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: theme.primary?.get() || "#f26c0d",
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 5,
                    shadowColor: theme.primary?.get() || "#f26c0d",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                  }}
                >
                  <Plus color="white" size={32} />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={32} />,
        }}
      />
    </Tabs>
  );
}