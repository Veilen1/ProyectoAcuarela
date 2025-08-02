import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB61oOfUw8Y77Bt5miT3DOUHNhln8J1hIY",
  authDomain: "proyectomercha.firebaseapp.com",
  projectId: "proyectomercha",
  storageBucket: "proyectomercha.firebasestorage.app",
  messagingSenderId: "433430867164",
  appId: "1:433430867164:web:061a687272325b3e459819",
  measurementId: "G-GXE7XC6J0Q",
}

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Storage
export const storage = getStorage(app)

// Check if Firebase is configured
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

export default app
