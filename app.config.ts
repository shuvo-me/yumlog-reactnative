import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "YumLog",
  slug: "YumLog",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "yumlog",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY
    },
    supportsTablet: true,
    bundleIdentifier: "com.yumlog.app",
    googleServicesFile: "./GoogleService-Info.plist",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSPhotoLibraryUsageDescription: "The app accesses your photos to let you share food dish logs with your friends.",
      NSCameraUsageDescription: "The app uses your camera to take photos of the food you want to log.",
      NSLocationWhenInUseUsageDescription: "This app uses your location to tag where you ate!",
      NSLocationAlwaysAndWhenInUseUsageDescription: "This app uses your location to tag where you ate!",
      NSLocationAlwaysUsageDescription: "This app uses your location to tag where you ate!"
    }
  },
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY
      }
    },
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png"
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.yumlog.app"
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "@react-native-google-signin/google-signin",
    "expo-router",
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff",
        "dark": {
          "backgroundColor": "#000000"
        }
      }
    ],
    [
      "expo-image-picker",
      {
        "photosPermission": "The app accesses your photos to let you share them with your friends."
      }
    ]
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true
  }
});
