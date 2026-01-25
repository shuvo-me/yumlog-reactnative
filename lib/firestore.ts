import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// ============= TYPES =============

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  dietary_restrictions?: string[];
  cuisine_preferences?: string[];
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface FoodEntry {
  id: string;
   dishName: string;
    price: string;
    restaurant: string;
    sweetness: number;
    spiciness: number;
    saltiness: number;
    umami: number;
    mustTry: boolean;
    recommend: boolean;
    image?: string | undefined;
    location?: {
        name?: string | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
    } | undefined;
    created_at: Timestamp;
    updated_at: Timestamp;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  cuisine_type: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  average_rating: number;
  visit_count: number;
  photo_urls: string[];
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ============= USER PROFILE OPERATIONS =============

/**
 * Create or update user profile
 */
export const createOrUpdateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    const now = Timestamp.now();

    const profileData = {
      ...data,
      uid,
      updated_at: now,
      created_at: data.created_at || now,
    };

    await setDoc(userRef, profileData, { merge: true });
    console.log("✅ User profile created/updated");
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    throw error;
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as UserProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...updates,
      updated_at: Timestamp.now(),
    });
    console.log("✅ User profile updated");
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// ============= FOOD ENTRY OPERATIONS =============

/**
 * Create a new food entry
 */
export const createFoodEntry = async (
  uid: string,
  data: Omit<FoodEntry, "id" | "created_at" | "updated_at">
): Promise<string> => {
  try {
    const now = Timestamp.now();
    const entriesRef = collection(db, "users", uid, "food_entries");
    const newEntryRef = doc(entriesRef);

    const entryData: FoodEntry = {
      ...data,
      id: newEntryRef.id,
      created_at: now,
      updated_at: now,
    };

    await setDoc(newEntryRef, entryData);
    console.log("✅ Food entry created:", newEntryRef.id);
    return newEntryRef.id;
  } catch (error) {
    console.error("Error creating food entry:", error);
    throw error;
  }
};

/**
 * Get a single food entry
 */
export const getFoodEntry = async (
  uid: string,
  entryId: string
): Promise<FoodEntry | null> => {
  try {
    const entryRef = doc(db, "users", uid, "food_entries", entryId);
    const snapshot = await getDoc(entryRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as FoodEntry;
  } catch (error) {
    console.error("Error fetching food entry:", error);
    throw error;
  }
};

/**
 * Get all food entries for a user
 */
export const getUserFoodEntries = async (
  uid: string,
  limitCount: number = 20
): Promise<FoodEntry[]> => {
  try {
    const entriesRef = collection(db, "users", uid, "food_entries");
    const q = query(
      entriesRef,
      orderBy("created_at", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as FoodEntry);
  } catch (error) {
    console.error("Error fetching user food entries:", error);
    throw error;
  }
};

/**
 * Update a food entry
 */
export const updateFoodEntry = async (
  uid: string,
  entryId: string,
  updates: Partial<FoodEntry>
): Promise<void> => {
  try {
    const entryRef = doc(db, "users", uid, "food_entries", entryId);
    await updateDoc(entryRef, {
      ...updates,
      updated_at: Timestamp.now(),
    });
    console.log("✅ Food entry updated");
  } catch (error) {
    console.error("Error updating food entry:", error);
    throw error;
  }
};

/**
 * Delete a food entry
 */
export const deleteFoodEntry = async (
  uid: string,
  entryId: string
): Promise<void> => {
  try {
    const entryRef = doc(db, "users", uid, "food_entries", entryId);
    await deleteDoc(entryRef);
    console.log("✅ Food entry deleted");
  } catch (error) {
    console.error("Error deleting food entry:", error);
    throw error;
  }
};

/**
 * Get food entries by rating (for favorites)
 */
export const getUserFavoriteEntries = async (
  uid: string,
  minRating: number = 8,
  limitCount: number = 20
): Promise<FoodEntry[]> => {
  try {
    const entriesRef = collection(db, "users", uid, "food_entries");
    const q = query(
      entriesRef,
      where("rating", ">=", minRating),
      orderBy("rating", "desc"),
      orderBy("created_at", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as FoodEntry);
  } catch (error) {
    console.error("Error fetching favorite entries:", error);
    throw error;
  }
};

/**
 * Get food entries by cuisine type
 */
export const getFoodEntriesByCuisine = async (
  uid: string,
  cuisineType: string,
  limitCount: number = 20
): Promise<FoodEntry[]> => {
  try {
    const entriesRef = collection(db, "users", uid, "food_entries");
    const q = query(
      entriesRef,
      where("cuisine_type", "==", cuisineType),
      orderBy("created_at", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as FoodEntry);
  } catch (error) {
    console.error("Error fetching entries by cuisine:", error);
    throw error;
  }
};

/**
 * Get food entries by date range
 */
export const getFoodEntriesByDateRange = async (
  uid: string,
  startDate: Date,
  endDate: Date,
  limitCount: number = 20
): Promise<FoodEntry[]> => {
  try {
    const entriesRef = collection(db, "users", uid, "food_entries");
    const q = query(
      entriesRef,
      where("visited_date", ">=", Timestamp.fromDate(startDate)),
      where("visited_date", "<=", Timestamp.fromDate(endDate)),
      orderBy("visited_date", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as FoodEntry);
  } catch (error) {
    console.error("Error fetching entries by date range:", error);
    throw error;
  }
};

// ============= RESTAURANT OPERATIONS =============

/**
 * Create or update restaurant
 */
export const createOrUpdateRestaurant = async (
  data: Partial<Restaurant>
): Promise<string> => {
  try {
    const restaurantsRef = collection(db, "restaurants");
    const restaurantRef = data.id
      ? doc(restaurantsRef, data.id)
      : doc(restaurantsRef);

    const now = Timestamp.now();
    const restaurantData = {
      ...data,
      updated_at: now,
      created_at: data.created_at || now,
    };

    if (data.id) {
      await updateDoc(restaurantRef, restaurantData);
    } else {
      await setDoc(restaurantRef, restaurantData);
    }

    console.log("✅ Restaurant created/updated");
    return restaurantRef.id;
  } catch (error) {
    console.error("Error creating/updating restaurant:", error);
    throw error;
  }
};

/**
 * Get restaurant by ID
 */
export const getRestaurant = async (
  restaurantId: string
): Promise<Restaurant | null> => {
  try {
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const snapshot = await getDoc(restaurantRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as Restaurant;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
};

/**
 * Get restaurants by location (simple - would need geospatial queries in production)
 */
export const getRestaurantsByCity = async (
  city: string,
  limitCount: number = 20
): Promise<Restaurant[]> => {
  try {
    const restaurantsRef = collection(db, "restaurants");
    const q = query(
      restaurantsRef,
      where("city", "==", city),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as Restaurant);
  } catch (error) {
    console.error("Error fetching restaurants by city:", error);
    throw error;
  }
};

/**
 * Get restaurants by cuisine type
 */
export const getRestaurantsByCuisine = async (
  cuisineType: string,
  limitCount: number = 20
): Promise<Restaurant[]> => {
  try {
    const restaurantsRef = collection(db, "restaurants");
    const q = query(
      restaurantsRef,
      where("cuisine_type", "array-contains", cuisineType),
      orderBy("average_rating", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as Restaurant);
  } catch (error) {
    console.error("Error fetching restaurants by cuisine:", error);
    throw error;
  }
};

// ============= STATS & ANALYTICS =============

/**
 * Get user food entry statistics
 */
export const getUserStats = async (uid: string) => {
  try {
    const entries = await getUserFoodEntries(uid, 1000);

    const stats = {
      total_entries: entries.length,
      average_rating:
        entries.length > 0
          ? entries.reduce((sum, e) => sum + e.rating, 0) / entries.length
          : 0,
      favorite_cuisine: getFavoriteCuisine(entries),
      restaurant_count: new Set(entries.map((e) => e.restaurant_name)).size,
      total_spent: entries.reduce((sum, e) => sum + (e.price || 0), 0),
    };

    return stats;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
};

/**
 * Helper: Get most frequently visited cuisine
 */
function getFavoriteCuisine(entries: FoodEntry[]): string {
  const cuisineCounts = entries.reduce((acc, entry) => {
    acc[entry.cuisine_type] = (acc[entry.cuisine_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    Object.keys(cuisineCounts).reduce((a, b) =>
      cuisineCounts[a] > cuisineCounts[b] ? a : b
    ) || "Not determined"
  );
}
