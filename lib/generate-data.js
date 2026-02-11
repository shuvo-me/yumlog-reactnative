const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const NUM_ENTRIES = 100;
const entries = [];

// Realistic data pools for randomization
const restaurants = [
  { name: "McDonald's", type: "Fast Food" }, { name: "Olive Garden", type: "Casual" },
  { name: "Sakura Sushi", type: "Ethnic" }, { name: "Starbucks", type: "Coffee" },
  { name: "Chipotle", type: "Fast Food" }, { name: "Fine Dining Hub", type: "Specialty" }
];

// Verified food image URLs for testing
const foodImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300", // Burger
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&h=300", // Sushi
  "https://images.unsplash.com/photo-1551183053-bf01a1d81141?q=80&w=400&h=300", // Pizza
  "https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=400&h=300", // Salad
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&h=300", // Tacos
  "https://images.unsplash.com/photo-1598511757337-fe2cafc31da0?q=80&w=400&h=300"  // Coffee
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate() {
  const start = new Date(2025, 0, 1);
  const end = new Date(2026, 1, 11);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

for (let i = 0; i < NUM_ENTRIES; i++) {
  const restaurant = restaurants[getRandomInt(0, restaurants.length - 1)];
  const imgUrl = foodImages[getRandomInt(0, foodImages.length - 1)];
  const date = getRandomDate();

  entries.push({
    id: uuidv4(),
    dishName: `${restaurant.type} Dish Example ${i + 1}`,
    price: (Math.random() * (50 - 5) + 5).toFixed(2),
    restaurant: restaurant.name,
    sweetness: getRandomInt(0, 10),
    spiciness: getRandomInt(0, 10),
    saltiness: getRandomInt(0, 10),
    umami: getRandomInt(0, 10),
    mustTry: Math.random() < 0.3,
    recommend: Math.random() < 0.6,
    image: imgUrl,
    location: {
      name: `City Location ${getRandomInt(1, 10)}`,
      latitude: (Math.random() * (49 - 24) + 24).toFixed(4),
      longitude: (Math.random() * (-66 - -125) + -125).toFixed(4)
    },
    created_at: date,
    updated_at: date
  });
}

// Define the correct path
const outputPath = path.join(__dirname, 'seed-data.json');
fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2));
console.log(`Successfully generated ${outputPath} with 100 entries!`);