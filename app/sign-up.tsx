import { FOOD_IMAGE_URL, GOOGLE_ICON } from "@/constants";
import { useAuth } from "@/lib/store";
import { registerUser, signInWithGoogle } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Apple, ArrowLeft } from "@tamagui/lucide-icons";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  H1,
  Image,
  Input,
  ScrollView,
  Separator,
  Spinner,
  Text,
  XStack,
  YStack,
  ZStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.email("Please enter a valid email!"),
  password: z.string().min(6, "Password must be at least 6 characters long!"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;


const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const setSession = useAuth((state) => state.setSession);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "" },
  });
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      console.log("✅ register success");
      setSession(res);
      router.replace("/");
    },
    onError: (err) => console.log({ "register error: ": err }),
  });

  const {mutate: mutateGoogle, isPending: isGooglePending} = useMutation({
    mutationKey: ['user_signup_google'],
    mutationFn: signInWithGoogle,
    onSuccess: (res) => {
      console.log("✅ Google sign up success");
      setSession(res);
      router.replace("/");
    },
    onError: (err) => {
      console.log({ "Google Sign Up error: ": err });
    }
  })

  const onSubmit = (data: SignUpSchemaType) => mutate(data);

  return (
    // Base container with background color
    <YStack f={1} bg="$background">
      {/* 1. Background Image Section */}
      <ZStack position="absolute" top={0} left={0} right={0} height="45%">
        <Image
          source={{ uri: FOOD_IMAGE_URL }}
          width="100%"
          height="100%"
          objectFit="cover"
          opacity={0.7}
        />
        <LinearGradient
          fullscreen
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          start={[0.5, 0]}
          end={[0.5, 1]}
        />
        <LinearGradient
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={200}
          colors={["$background", "rgba(34, 21, 16, 0.8)", "transparent"]}
          start={[0.5, 1]}
          end={[0.5, 0]}
        />
      </ZStack>

      {/* 2. Scrollable Content Layer */}
      <ScrollView
        f={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Navigation Bar */}
        <XStack px="$6" pt={insets.top + 10}>
          <Button
            size="$4"
            circular
            bg="rgba(255, 255, 255, 0.1)"
            style={{ backdropFilter: "blur(10px)" }}
            icon={<ArrowLeft color="white" />}
            pressStyle={{ scale: 0.95, bg: "rgba(255, 255, 255, 0.2)" }}
            borderWidth={0}
          />
        </XStack>

        {/* Form Content */}
        <YStack f={1} jc="flex-end" px="$6" pb={insets.bottom + 20} pt={100}>
          <YStack mb="$8">
            <H1 color="white" fow="800" fontSize="$9" ls={-1}>
              Create Account
            </H1>
            <Text color="$gray10" fontSize="$4" fow="500">
              Sign up to start your culinary journey.
            </Text>
          </YStack>

          {/* Form Fields */}
          <YStack gap="$4">
            <YStack gap="$2">
              <Text color="white" fow="600" ml="$1">
                Email
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    keyboardType="email-address"
                    h={55}
                    br="$4"
                    bg="$borderColor"
                    placeholder="foodie@example.com"
                    color="white"
                    borderWidth={1}
                    borderColor="rgba(255,255,255,0.1)"
                    focusStyle={{ borderColor: "$primary" }}
                    value={value}
                    onChangeText={(email) => onChange(email.toLowerCase())}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.email && (
                <Text color="red" fos="$3">
                  {errors.email.message}
                </Text>
              )}
            </YStack>

            <YStack gap="$2">
              <Text color="white" fow="600" ml="$1">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    h={55}
                    br="$4"
                    bg="$borderColor"
                    secureTextEntry
                    placeholder="••••••••"
                    color="white"
                    borderColor="$borderColor"
                    focusStyle={{ borderColor: "$primary" }}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password && (
                <Text color="red" fos="$3">
                  {errors.password.message}
                </Text>
              )}
            </YStack>

            <Button
              mt="$4"
              h={60}
              br="$4"
              bg="$primary"
              pressStyle={{ scale: 0.98, opacity: 0.9 }}
              onPress={handleSubmit(onSubmit)}
            >
              {isPending ? (
                <Spinner color={"$color"} />
              ) : (
                <Text color="white" fow="700" fontSize="$4">
                  Sign Up
                </Text>
              )}
            </Button>
          </YStack>

          {/* Divider */}
          <XStack ai="center" my="$8" gap="$4">
            <Separator borderColor="rgba(255,255,255,0.1)" />
            <Text
              color="$gray9"
              fontSize="$2"
              fow="700"
              textTransform="uppercase"
            >
              Or continue with
            </Text>
            <Separator borderColor="rgba(255,255,255,0.1)" />
          </XStack>

          {/* Social Logins */}
          <XStack gap="$4">
            <Button
              f={1}
              h={55}
              br="$4"
              bg="$backgroundSecondary"
              pressStyle={{ opacity: 0.5 }}
              onPress={()=> mutateGoogle()}
            >
              <XStack gap={"$2"} ai={"center"} jc={"center"}>
                <Image
                  source={{
                    uri: GOOGLE_ICON,
                  }}
                  style={{ width: 20, height: 20 }}
                />
                <Text color="$color" fow="600">
                  Google
                </Text>
              </XStack>
            </Button>
            <Button
              f={1}
              h={55}
              br="$4"
              bg="$backgroundSecondary"
              icon={<Apple size={20} color="$color" />}
              pressStyle={{ opacity: 0.5 }}
            >
              <Text color="$color" fow="600">
                Apple
              </Text>
            </Button>
          </XStack>

          {/* Footer Link */}
          <XStack jc="center" mt="$10" gap="$2">
            <Text color="$gray10">Already have an account?</Text>
            <Link href={"/sign-in"}>
              <Text color="$primary" fow="700">
                Sign In
              </Text>
            </Link>
          </XStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default SignUpScreen;
