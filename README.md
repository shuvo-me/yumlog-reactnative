<p align="center">
  <img src="screenshots/1.png" width="200" />
  <img src="screenshots/2.png" width="200" /> 
  <img src="screenshots/3.png" width="200" />
</p>

# YumLog 🍽️

A React Native food logging and discovery app built with Expo, Firebase, and Tamagui. Log your favorite meals, discover restaurants on a map, and build your culinary journey.

---

## 📋 Project Overview

YumLog is a mobile-first application that allows users to:
- Authenticate securely with email/password or Google Sign-In
- Log food items with details
- Browse food entries and details
- Discover restaurants and food locations on a map
- Manage their profile and preferences

**Tech Stack**:
- **Frontend**: React Native (Expo)
- **UI Framework**: Tamagui
- **Backend**: Firebase (Auth, Firestore)
- **State Management**: Zustand (via `useAuth` store)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: TanStack React Query
- **Routing**: Expo Router (file-based routing)

---

## 📁 Project Structure

```
YumLog/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx              # Root layout
│   ├── onboarding.tsx           # Onboarding screen
│   ├── sign-in.tsx              # Sign-in screen
│   ├── sign-up.tsx              # Sign-up screen
│   ├── (protected)/             # Protected routes (requires auth)
│   │   ├── _layout.tsx
│   │   ├── add.tsx              # Add new food entry
│   │   ├── (tabs)/              # Tab navigation
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx        # Home/feed
│   │   │   ├── map.tsx          # Map view
│   │   │   └── profile.tsx      # User profile
│   │   └── details/
│   │       └── [id].tsx         # Food item details
│   │
├── components/
│   ├── FoodDetails.tsx          # Food details component
│   └── ...
│
├── hooks/
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
│
├── lib/
│   ├── firebase.ts              # Firebase initialization
│   └── store.ts                 # Zustand auth store
│
├── services/
│   └── auth.service.ts          # Authentication logic
│
├── utils/
│   └── ...
│
├── constants/
│   └── index.ts
│
├── assets/
│   └── images/
│
├── tamagui.config.ts            # Tamagui theme config
├── app.json                      # Expo configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
│
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- A Firebase project configured
- Google OAuth credentials (for social login)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd YumLog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env.local` in the project root:
   ```env
   # Firebase
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Google OAuth
   EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
   EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
   EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on iOS or Android**
   - Press `i` for iOS (requires Xcode)
   - Press `a` for Android (requires Android Studio)
   - Or use Expo Go app for quick testing

---

## 📚 Documentation

- [Google Authentication Setup](./GOOGLE_AUTH_SETUP.md) - Detailed Firebase + Google OAuth configuration
- [Google Authentication Blog](./GOOGLE_AUTH_BLOG.md) - Blog-ready guide (Dev.to/Medium format)

---

## ✅ Project Todos & Roadmap

### Phase 1: Core Authentication ✨ (In Progress)
- [x] Email/password sign-in flow
- [x] Google OAuth integration with Firebase
- [x] Sign-up form with validation
- [x] Protected routes setup
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Phone number authentication (optional)

### Phase 2: User Profile & Onboarding
- [ ] User profile creation on first sign-in
- [ ] Profile picture upload
- [ ] User preferences (dietary restrictions, cuisine preferences)
- [ ] Onboarding flow with tutorial
- [ ] Profile edit screen
- [ ] Account settings

### Phase 3: Food Logging Core
- [ ] Add food entry screen
- [ ] Food item form with:
  - [ ] Food name/description
  - [ ] Category selection
  - [ ] Date/time picker
  - [ ] Rating system
  - [ ] Photo upload
  - [ ] Location tagging
- [ ] Edit food entry
- [ ] Delete food entry
- [ ] Food details modal/screen

### Phase 4: Feed & Discovery
- [ ] Home feed displaying user's food entries
- [ ] Feed sorting (latest, highest rated, etc.)
- [ ] Pull-to-refresh functionality
- [ ] Infinite scroll/pagination
- [ ] Food entry cards with images
- [ ] Like/bookmark system (optional)

### Phase 5: Map Integration
- [ ] Map view of food entries by location
- [ ] Map markers for food locations
- [ ] Clustering for many markers
- [ ] Tap marker to view food details
- [ ] Current location detection
- [ ] Filter by restaurant/cuisine type

### Phase 6: Search & Filtering
- [ ] Search food entries by name
- [ ] Filter by:
  - [ ] Date range
  - [ ] Rating
  - [ ] Category/cuisine
  - [ ] Location
- [ ] Sort options
- [ ] Saved searches

### Phase 7: Social Features
- [ ] Share food entries
- [ ] Share to social media (Instagram, Twitter, etc.)
- [ ] Follow other users (optional)
- [ ] View friend's food logs (optional)
- [ ] Comments on food entries (optional)

### Phase 8: Advanced Features
- [ ] Notifications (meal reminders, milestones)
- [ ] Statistics & insights (meals logged, favorite foods, etc.)
- [ ] Export food log data (CSV, PDF)
- [ ] Dark mode improvements
- [ ] Offline support
- [ ] Caching strategy

### Phase 9: Backend & API
- [ ] Firestore data structure optimization
- [ ] Cloud Functions for:
  - [ ] Image processing/resizing
  - [ ] User notifications
  - [ ] Data cleanup
- [ ] Firestore security rules
- [ ] Backup & recovery

### Phase 10: Testing & QA
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests with Detox
- [ ] Manual testing checklist
- [ ] Performance optimization
- [ ] Accessibility audit

### Phase 11: Deployment & Release
- [ ] EAS Build setup for iOS/Android
- [ ] App Store Connect setup
- [ ] Google Play Console setup
- [ ] Release build creation
- [ ] Beta testing (TestFlight/Google Play Beta)
- [ ] App Store & Play Store submission

### Phase 12: Maintenance & Monitoring
- [ ] Crash reporting (Sentry integration)
- [ ] Analytics setup (Firebase Analytics)
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Regular security audits
- [ ] Bug fixes & patches

---

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | Cross-platform development framework |
| `expo-router` | File-based routing for React Native |
| `firebase` | Backend services (auth, database) |
| `expo-auth-session` | OAuth authentication |
| `tamagui` | UI component library |
| `react-hook-form` | Form state management |
| `zod` | Schema validation |
| `zustand` | State management |
| `@tanstack/react-query` | Server state management |

---

## 🔐 Security Considerations

- [ ] Never commit `.env.local` (add to `.gitignore` ✅)
- [ ] Use environment variables for all secrets
- [ ] Enable Firestore security rules
- [ ] Implement rate limiting on backend
- [ ] Validate all user inputs on client and server
- [ ] Use HTTPS for all API calls
- [ ] Implement proper authentication error handling
- [ ] Regular security audits

---

## 🐛 Known Issues

(To be updated as issues are discovered)

- None currently documented

---

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub
```

---

## Contributing

We welcome contributions from the community! If you'd like to contribute to YumLog, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add feature XYZ'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

YumLog is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Acknowledgements

- [Expo](https://expo.dev/) for providing the development environment
- [Tamagui](https://tamagui.dev/) for the UI components
- [Firebase](https://firebase.google.com/) for backend services

---

## 🎯 Next Steps

1. **Complete Phase 1**: Finish remaining auth features (password reset, email verification)
2. **Design Phase 2**: Plan user profile features
3. **Setup analytics**: Integrate Firebase Analytics to track user behavior
4. **Create API docs**: Document Firestore structure and cloud functions
5. **Plan UI/UX**: Refine designs before Phase 3 development

---

**Last Updated**: January 16, 2026
- [Picsum](https://picsum.photos/) for the placeholder images
