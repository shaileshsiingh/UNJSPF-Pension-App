import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { User as FirebaseUser } from 'firebase/auth';
import { Platform } from 'react-native';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<any>;
  signInWithApple: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Check for redirect result on app load
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User successfully signed in via redirect
          console.log('Google sign-in successful via redirect');
        }
      } catch (error) {
        console.error('Redirect result error:', error);
      }
    };
    
    if (Platform.OS === 'web') {
      checkRedirectResult();
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name if provided
    if (name && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name
      });
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  // Google sign-in implementation with mobile-friendly approach
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    
    try {
      if (Platform.OS === 'web') {
        // For web, try popup first, fallback to redirect if popup fails
        try {
          const result = await signInWithPopup(auth, provider);
          return result;
        } catch (popupError: any) {
          // If popup fails (blocked, etc.), use redirect
          if (popupError.code === 'auth/popup-blocked' || 
              popupError.code === 'auth/popup-closed-by-user') {
            await signInWithRedirect(auth, provider);
            // The result will be handled by the redirect result listener
            return null;
          }
          throw popupError;
        }
      } else {
        // For mobile (React Native), use redirect which works better
        await signInWithRedirect(auth, provider);
        // The result will be handled by the redirect result listener
        return null;
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };
  
  const signInWithApple = async () => {
    // TODO: Implement Apple sign-in
    throw new Error('Apple sign-in not implemented yet');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
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