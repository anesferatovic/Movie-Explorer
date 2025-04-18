import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAK1z0F_PA3MA6hPkrr8h2bHH8itMdod9k',
  authDomain: 'movie-explorer-7fbb4.firebaseapp.com',
  projectId: 'movie-explorer-7fbb4',
  storageBucket: 'movie-explorer-7fbb4.appspot.com',
  messagingSenderId: '844570493341',
  appId: '1:844570493341:web:1ccbd91478668b0bddef74',
  measurementId: 'G-ZG2HXLJSVS',
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOutUser() {
  await signOut(auth);
}
