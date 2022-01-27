import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
});

export const db = getFirestore(app);
