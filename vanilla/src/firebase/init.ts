import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp({
  apiKey: process.env.CAMP_API_KEY,
  authDomain: process.env.CAMP_AUTH_DOMAIN,
  projectId: process.env.CAMP_PROJECT_ID,
});

export const db = getFirestore(app);
