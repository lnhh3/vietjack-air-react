import { type FirebaseApp, type FirebaseOptions, initializeApp } from 'firebase/app';
import {
  type Auth,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  type NextOrObserver,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from 'firebase/auth';
import {
  deleteToken,
  getMessaging,
  getToken,
  type MessagePayload,
  type Messaging,
  type NextFn,
  type Observer,
  onMessage,
} from 'firebase/messaging';

type CallBackObserver = NextFn<MessagePayload> | Observer<MessagePayload>;

class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly auth: Auth;
  private readonly googleAuthProvider: GoogleAuthProvider;
  private readonly messaging: Messaging;

  constructor() {
    const firebaseConfig: FirebaseOptions = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.messaging = getMessaging(this.app);

    this.googleAuthProvider = new GoogleAuthProvider();
    this.googleAuthProvider.setCustomParameters({
      prompt: 'select_account',
    });
  }

  signInWithPopup() {
    return signInWithPopup(this.auth, this.googleAuthProvider);
  }

  signInWithRedirect() {
    return signInWithRedirect(this.auth, this.googleAuthProvider);
  }

  getSignInRedirectResult() {
    return getRedirectResult(this.auth);
  }

  logout() {
    return signOut(this.auth);
  }

  onAuthStateChanged(handler: NextOrObserver<User | null>) {
    return this.auth.onAuthStateChanged(handler);
  }

  async getFCMToken() {
    try {
      return await getToken(this.messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID,
      });
    } catch (e) {
      console.log('>> [getFCMToken]', e);
    }
  }

  async deleteFcmToken() {
    return await deleteToken(this.messaging);
  }

  onMessageFCM(cb: CallBackObserver) {
    return onMessage(this.messaging, cb);
  }
}

const firebaseService = new FirebaseService();

export default firebaseService;
