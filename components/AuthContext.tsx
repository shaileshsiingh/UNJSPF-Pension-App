import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { User as FirebaseUser } from 'firebase/auth';
import { router } from 'expo-router';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  googleLoading: boolean;
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
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
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
    await firebaseSignOut(auth);
    router.replace('/login');
  };

  const signInWithGoogle = async () => {
    console.log('🚀 signInWithGoogle called');
    const provider = new GoogleAuthProvider();

    // Configure provider for better account selection
    provider.addScope('email');
    provider.addScope('profile');

    // Force account selection - this shows the account picker
    provider.setCustomParameters({
      prompt: 'select_account',
      hd: '',
      include_granted_scopes: 'true'
    });

    setGoogleLoading(true);
    console.log('📱 Google loading state set to true');

    try {
      console.log('🔄 Calling signInWithPopup...');
      const result = await signInWithPopup(auth, provider);
      setGoogleLoading(false);
      console.log('✅ Google sign-in successful:', result.user.email);
      return result;
    } catch (error: any) {
      console.error('❌ Google sign-in error:', error);
      setGoogleLoading(false);

      if (error.code === 'auth/popup-closed-by-user') {
        console.log('ℹ️ User cancelled sign-in');
        return null; // Don't throw error for user cancellation
      }

      throw error;
    }
  };

  const signInWithApple = async () => {
    throw new Error('Apple sign-in not implemented yet');
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