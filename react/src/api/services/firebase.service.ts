import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export namespace FirebaseService {
  export const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
  });

  export const db = getFirestore(app);
}
