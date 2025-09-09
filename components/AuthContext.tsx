import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { User as FirebaseUser } from 'firebase/auth';
import { Platform, Dimensions } from 'react-native';

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
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const checkRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        console.log('Google sign-in successful via redirect');
      }
    } catch (error) {
      console.error('Redirect result error:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      setGoogleLoading(true);
      checkRedirectResult();
    }
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
  };

  const isMobileWeb = () => {
    if (Platform.OS !== 'web') return false;
    
    // Check for mobile user agent strings
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // Also check screen width as fallback
    const isSmallScreen = Dimensions.get('window').width < 768;
    
    return isMobileAgent || isSmallScreen;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    
    // Configure provider for better account selection
    provider.addScope('email');
    provider.addScope('profile');
    
    // Force account selection - this shows the account picker like in your screenshot
    provider.setCustomParameters({ 
      prompt: 'select_account',
      // Add these parameters to ensure account picker appears
      hd: '', // Allow any hosted domain
      include_granted_scopes: 'true'
    });

    setGoogleLoading(true);

    // For React Native apps, always use redirect
    if (Platform.OS !== 'web') {
      try {
        await signInWithRedirect(auth, provider);
        return null;
      } catch (error) {
        console.error('Google sign-in redirect error:', error);
        setGoogleLoading(false);
        throw new Error('Authentication failed. Please try again.');
      }
    }

    // For web - try popup first, fallback to redirect
    try {
      console.log('Attempting Google sign-in with popup...');
      const result = await signInWithPopup(auth, provider);
      setGoogleLoading(false);
      console.log('Google sign-in successful with popup');
      return result;
    } catch (error: any) {
      console.error('Google sign-in popup error:', error);

      // Handle popup blocked or other popup issues
      if (
        error.code === 'auth/popup-blocked' || 
        error.code === 'auth/cancelled-popup-request' ||
        error.code === 'auth/popup-closed-by-user' ||
        isMobileWeb()
      ) {
        console.log('Popup failed or mobile detected, using redirect...');
        try {
          // Use redirect for mobile or when popup fails
          await signInWithRedirect(auth, provider);
          return null; // redirect doesn't return immediately
        } catch (redirectError) {
          setGoogleLoading(false);
          console.error('Google sign-in redirect fallback error:', redirectError);
          throw new Error('Authentication failed. Please try again.');
        }
      }

      setGoogleLoading(false);
      
      // Handle other specific errors
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled');
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