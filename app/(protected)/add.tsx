import { createFoodEntry } from "@/lib/firestore";
import { useAuth } from "@/lib/store";
import { uploadFile } from "@/services/storage.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Camera,
  Check,
  LocateFixed,
  Utensils
} from "@tamagui/lucide-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router } from "expo-router";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { Alert, Platform, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
import z from "zod";

const FoodEntrySchema = z.object({
  dishName: z.string().min(3, "Dish name must be at least 3 characters long"),
  price: z.string().min(1, "Price is required"),
  restaurant: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters long"),
  sweetness: z
    .number()
    .min(0, "Sweetness must be between 0 and 10")
    .max(10, "Sweetness must be between 0 and 10"),
  spiciness: z
    .number()
    .min(0, "Spiciness must be between 0 and 10")
    .max(10, "Spiciness must be between 0 and 10"),
  saltiness: z
    .number()
    .min(0, "Saltiness must be between 0 and 10")
    .max(10, "Saltiness must be between 0 and 10"),
  umami: z
    .number()
    .min(0, "Umami must be between 0 and 10")
    .max(10, "Umami must be between 0 and 10"),
  wouldRecommend: z.boolean(),
  image: z.string().optional(),
  location: z.object({
    name: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }).optional(),
  mustTry: z.boolean(),
  recommend: z.boolean(),
});

type Schema = z.infer<typeof FoodEntrySchema>;

export default function FoodEntryScreen() {
  const inset = useSafeAreaInsets();
  const { session } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
    setValue
  } = useForm<Schema>({
    resolver: zodResolver(FoodEntrySchema),
    defaultValues: {
      dishName: "",
      price: "",
      restaurant: "",
      sweetness: 0,
      spiciness: 0,
      saltiness: 0,
      umami: 0,
      wouldRecommend: false,
      image: "",
      location: {
        name: "",
        latitude: 0,
        longitude: 0,
      },
      mustTry: false,
      recommend: false,
    },
  });

  const imageURI = watch("image");

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          "Permission Required",
          "We need your permission to access photos to upload a dish image. Please enable it in settings.",
          [{ text: "OK" }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setValue("image", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "An unexpected error occurred while picking the image.");
    }
  };

  const handleUseLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setValue("location", {
        ...watch("location"),
        latitude,
        longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "An unexpected error occurred while getting your location.");
    }

  };

  const onSubmit = async (data: Schema) => {
    console.log("Submit Success:", data);
    try {
      if (!session?.uid) {
        Alert.alert("Error", "You must be logged in to save entries.");
        return;
      }

      let imageUrl;
      if (data.image) {
        imageUrl = await uploadFile(data.image);
      }

      console.log("Image URL:", imageUrl);
      const foodEntry: Schema = {
        ...data,
        image: imageUrl,
      }
      console.log("Food Entry:", foodEntry);
      const res = await createFoodEntry(session.uid, foodEntry);
      console.log("Food Entry ID:", res);
      Alert.alert("Success", "Food entry added successfully");
    } catch (error) {
      console.error("Error when creating food entry:", error);
      Alert.alert("Error", "An unexpected error occurred while creating the food entry.");
    }

  };

  const onInvalid = (errors: any) => {
    console.log("Form Validation Errors:", errors);
    Alert.alert("Error", "Please fill in all required fields correctly.");
  };


  return (
    <View f={1} bg="$background" pt={inset.top + 10} pb={inset.bottom + 10}>
      {/* 1. Sticky Header */}
      <XStack height={60} ai="center" jc="space-between" px="$4">
        <Text fontSize="$5" fow="700">
          New Entry
        </Text>
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

      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p="$4" gap="$6" pb="$20">
          {/* Section 1: Hero Image Upload */}
          {imageURI ?

            <ZStack h={250}>
              <Image source={{ uri: imageURI }} width={'100%'} height={250} objectFit="cover" br="$4" />
              <Button height={'100%'} width={'100%'} chromeless p={0} onPress={pickImage} icon={<Camera size={24} color="white" />}>
                <Text color="white" fontSize="$4" fow="700">
                  Change
                </Text>
              </Button>
            </ZStack>

            : (
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
                onPress={pickImage}
                pressStyle={{ opacity: 0.7, scale: 0.98 }}
              >
                <View p="$4" br={999} bg="$surface-dark">
                  <Camera size={32} color="$primary" />
                </View>
                <Text color="$text-muted" fow="500" fontSize="$3">
                  Tap to upload photo
                </Text>
              </YStack>
            )}


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
              <Controller
                control={control}
                name="dishName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    h={50}
                    bg="$surface-dark"
                    boc="$border-dark"
                    placeholder="e.g. Spicy Miso Ramen"
                    placeholderTextColor="$colorSecondary"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.dishName && (
                <Text color={'$error'} fontSize="$3">
                  *{errors.dishName.message}
                </Text>
              )}
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
                <ZStack ai="center" jc="center">
                  <Controller
                    control={control}
                    name="price"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        h={50}
                        bg="$surface-dark"
                        boc="$border-dark"
                        pl="$8"
                        placeholder="0.00"
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  <Text pos="absolute" l="$4" t="$4" color="$text-muted">
                    $
                  </Text>
                </ZStack>
                {errors.price && (
                  <Text color={'$error'} fontSize="$3">
                    *{errors.price.message}
                  </Text>
                )}
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
                <Controller
                  control={control}
                  name="restaurant"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      h={50}
                      bg="$surface-dark"
                      boc="$border-dark"
                      placeholder="Search..."
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.restaurant && (
                  <Text color={'$error'} fontSize="$3">
                    *{errors.restaurant.message}
                  </Text>
                )}
              </YStack>
            </XStack>
          </YStack>

          <Separator boc="$border-dark" opacity={0.3} />

          {/* Section 2: Taste Profile */}
          <YStack gap="$5">
            <Text fontSize="$6" fow="700">
              Taste Profile
            </Text>
            <Controller
              control={control}
              name="sweetness"
              render={({ field: { onChange, value, } }) => (
                <TasteSlider
                  label="Sweetness"
                  value={value}
                  onChange={onChange}
                  errors={errors}
                />
              )}
            />
            <Controller
              control={control}
              name="spiciness"
              render={({ field: { onChange, value } }) => (
                <TasteSlider
                  label="Spiciness"
                  value={value}
                  onChange={onChange}
                  errors={errors}
                />
              )}
            />
            <Controller
              control={control}
              name="saltiness"
              render={({ field: { onChange, value } }) => (
                <TasteSlider
                  label="Saltiness"
                  value={value}
                  onChange={onChange}
                  errors={errors}
                />
              )}
            />
            <Controller
              control={control}
              name="umami"
              render={({ field: { onChange, value } }) => (
                <TasteSlider
                  label="Umami"
                  value={value}
                  onChange={onChange}
                  errors={errors}
                />
              )}
            />
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
              <Controller
                control={control}
                name="recommend"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    unstyled
                    size="$3"
                    checked={value}
                    onCheckedChange={onChange}
                    backgroundColor={value ? "$primary" : "$backgroundSecondary"}
                    borderColor={value ? "$primary" : "$borderColor"}
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
                )}
              />

            </XStack>

            <XStack ai="center" gap="$3" p="$3">
              <Controller
                control={control}
                name="mustTry"
                render={({ field: { onChange, value } }) => (
                  <Checkbox size="$5" boc="$borderColor" bg="$background" onCheckedChange={onChange} checked={value}>
                    <Checkbox.Indicator>
                      <Check color="$primary" />
                    </Checkbox.Indicator>
                  </Checkbox>
                )}
              />
              <Text fow="500">Must Try Again</Text>
            </XStack>
          </YStack>

          {/* Section 4: Location Map */}
          <YStack gap="$4">
            <Text fontSize="$6" fow="700">
              Location
            </Text>
            <View h={180} br="$4" ov="hidden" bw={1} boc="$borderColor">
              <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} // Use Google Maps on Android, Apple Maps on iOS
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                  latitude: watch("location")?.latitude || 37.78825,
                  longitude: watch("location")?.longitude || -122.4324,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                // Updates the location when the user moves the map
                onRegionChangeComplete={(region) => {
                  setValue("location", {
                    ...watch("location"),
                    latitude: region.latitude,
                    longitude: region.longitude,
                  });
                }}
              >
                <Marker
                  coordinate={{
                    latitude: watch("location")?.latitude || 37.78825,
                    longitude: watch("location")?.longitude || -122.4324,
                  }}
                  title={watch("restaurant") || "Select Restaurant"}
                />
              </MapView>
            </View>
            <Button
              icon={<LocateFixed size={18} color="$primary" />}
              pressStyle={{ opacity: 0.5 }}
              onPress={handleUseLocation}
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
        zIndex={100}
      >
        <Button
          bg="$primary"
          h={60}
          br="$4"
          pressStyle={{ scale: 0.95, opacity: 0.8 }}
          icon={<Utensils color="white" />}
          onPress={handleSubmit(onSubmit, onInvalid)}
        >
          <Text color="white" fontSize="$4" fow="800">
            Log Dish
          </Text>
        </Button>
      </YStack>
    </View>
  );
}

const TasteSlider = ({ label, value, onChange, errors }: { label: string; value: number; onChange: (value: number) => void; errors: FieldErrors<Schema> }) => (
  <YStack gap="$2">
    <XStack jc="space-between">
      <Text fow="500">{label}</Text>
      <View bg="rgba(242, 108, 13, 0.1)" px="$2" py="$0.5" br="$1">
        <Text color="$primary" fontSize="$3" fow="800">
          {value}/10
        </Text>
      </View>
    </XStack>
    <Slider value={[value]} max={10} step={1} onValueChange={(vals) => onChange(vals[0])}>
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
    {
      errors[label.toLowerCase() as keyof Schema] && (
        <Text color={'$error'} fontSize="$3">
          *{errors[label.toLowerCase() as keyof Schema]?.message as string}
        </Text>
      )
    }
  </YStack>
);
