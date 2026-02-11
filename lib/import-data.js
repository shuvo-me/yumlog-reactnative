const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });
const serviceAccount = require('../serviceAccountKey.json');
const seedData = require('./seed-data.json');

// 1. Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


const targetUid = process.env.TEST_USER_UID; 
if (!targetUid) {
  console.error("❌ Error: TEST_USER_UID is not defined in .env.local file.");
  process.exit(1);
}

const collectionPath = `users/${targetUid}/food_entries`;

async function importData() {
  console.log(`Starting import to: ${collectionPath}`);
  
  // Firestore allows batches of 500 max
  const batch = db.batch();

  seedData.forEach((entry) => {
    // Create reference with the ID from the JSON
    const docRef = db.collection(collectionPath).doc(entry.id);
    
    // Convert string dates to Firestore Timestamps for accuracy
    const dataToImport = {
      ...entry,
      created_at: admin.firestore.Timestamp.fromDate(new Date(entry.created_at)),
      updated_at: admin.firestore.Timestamp.fromDate(new Date(entry.updated_at))
    };
    
    batch.set(docRef, dataToImport);
  });

  // 3. Commit the batch
  await batch.commit();
  console.log(`Successfully imported ${seedData.length} entries!`);
}

importData().catch(console.error);