import { getApp, getApps, initializeApp, type FirebaseOptions } from '@firebase/app'
import { getAuth } from '@firebase/auth'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const missingConfig = [
  ['VITE_FIREBASE_API_KEY', firebaseConfig.apiKey],
  ['VITE_FIREBASE_AUTH_DOMAIN', firebaseConfig.authDomain],
  ['VITE_FIREBASE_PROJECT_ID', firebaseConfig.projectId],
  ['VITE_FIREBASE_APP_ID', firebaseConfig.appId],
]
  .filter(([, value]) => !value)
  .map(([key]) => key)

export const firebaseConfigError = missingConfig.length
  ? `Konfigurasi Firebase belum lengkap: ${missingConfig.join(', ')}.`
  : null

const firebaseApp =
  firebaseConfigError === null
    ? getApps().length
      ? getApp()
      : initializeApp(firebaseConfig)
    : null

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null
