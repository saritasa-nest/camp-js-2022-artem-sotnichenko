import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
});

export const db = getFirestore(app);
