import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithCredential, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { User as FirebaseUser } from 'firebase/auth';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { GOOGLE_CLIENT_IDS } from '../config/googleClientIds';

// Import native Google Sign-In for Android/iOS
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  googleLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<any>;
  signInWithApple: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    // Configure Google Sign-In for native platforms
    if (Platform.OS !== 'web') {
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_IDS.web, // Web client ID from Firebase Console
        offlineAccess: true,
        scopes: ['profile', 'email'],
      });
      console.log('✅ GoogleSignin configured with webClientId:', GOOGLE_CLIENT_IDS.web);
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', firebaseUser ? firebaseUser.email : 'No user');
      setUser(firebaseUser);
      setLoading(false);

      // If user is signed in and we were in the middle of Google sign-in, reset loading
      if (firebaseUser && googleLoading) {
        console.log('User signed in successfully, resetting Google loading state');
        setGoogleLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (name && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name
      });
    }
  };

  const signOut = async () => {
    // Sign out from Google if on native
    if (Platform.OS !== 'web') {
      try {
        await GoogleSignin.signOut();
      } catch (error) {
        console.log('Google sign out error (non-critical):', error);
      }
    }
    await firebaseSignOut(auth);
    router.replace('/login');
  };

  const signInWithGoogle = async () => {
    console.log('🚀 signInWithGoogle called');
    setGoogleLoading(true);

    try {
      if (Platform.OS === 'web') {
        // Web: Use Firebase popup method
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        provider.setCustomParameters({
          prompt: 'select_account',
          hd: '',
          include_granted_scopes: 'true'
        });

        console.log('🔄 Calling signInWithPopup for web...');
        const result = await signInWithPopup(auth, provider);
        setGoogleLoading(false);
        console.log('✅ Google sign-in successful:', result.user.email);
        return result;
      } else {
        // Native (Android/iOS): Use @react-native-google-signin/google-signin
        console.log('🔄 Starting native Google Sign-In...');
        console.log('📱 Platform:', Platform.OS);

        // Check if Google Play Services are available (Android only)
        if (Platform.OS === 'android') {
          try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            console.log('✅ Google Play Services available');
          } catch (error: any) {
            console.error('❌ Google Play Services error:', error);
            throw new Error('Google Play Services is not available on this device');
          }
        }

        // Sign in with Google
        console.log('📱 Prompting for Google Sign-In...');
        const signInResult = await GoogleSignin.signIn();
        console.log('✅ Google Sign-In result:', JSON.stringify(signInResult, null, 2));

        // Get the ID token
        const idToken = signInResult.data?.idToken;

        if (!idToken) {
          console.error('❌ No ID token received from Google Sign-In');
          throw new Error('No ID token received from Google Sign-In');
        }

        console.log('✅ Got ID token, signing in with Firebase...');

        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);

        // Sign in with Firebase
        const firebaseResult = await signInWithCredential(auth, googleCredential);
        setGoogleLoading(false);
        console.log('✅ Google sign-in successful:', firebaseResult.user.email);
        return firebaseResult;
      }
    } catch (error: any) {
      console.error('❌ Google sign-in error:', error);
      setGoogleLoading(false);

      // Handle specific error codes from @react-native-google-signin
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('ℹ️ User cancelled sign-in');
        return null;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('ℹ️ Sign-in already in progress');
        return null;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services is not available. Please install or update it.');
      }

      // Handle Firebase auth errors
      if (error.code === 'auth/popup-closed-by-user' || error.message?.includes('cancel')) {
        console.log('ℹ️ User cancelled sign-in');
        return null;
      }

      // Provide helpful error message
      const errorMessage = error.message || 'Google sign-in failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const signInWithApple = async () => {
    throw new Error('Apple sign-in not implemented yet');
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    loading,
    googleLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
    resetPassword,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
