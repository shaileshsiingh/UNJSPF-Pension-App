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
      console.log('Checking for redirect result...');
      const result = await getRedirectResult(auth);
      if (result) {
        console.log('Google sign-in successful via redirect:', result.user.email);
        // The auth state will be updated automatically via onAuthStateChanged
      } else {
        console.log('No redirect result found');
      }
    } catch (error) {
      console.error('Redirect result error:', error);
      // Handle specific redirect errors
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User cancelled the redirect flow');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Redirect request was cancelled');
      } else {
        console.error('Unexpected redirect error:', error);
      }
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

  const isMobileDevice = () => {
    if (Platform.OS !== 'web') return true; // React Native is always mobile
    
    if (typeof window === 'undefined') return false;
    
    // More comprehensive mobile detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      'android', 'webos', 'iphone', 'ipad', 'ipod', 
      'blackberry', 'iemobile', 'opera mini', 'mobile',
      'phone', 'touch'
    ];
    
    const isMobileAgent = mobileKeywords.some(keyword => userAgent.includes(keyword));
    
    // Check for touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check screen dimensions
    const isSmallScreen = window.innerWidth <= 768 || window.screen.width <= 768;
    
    // Check for mobile-specific features
    const hasMobileFeatures = 'orientation' in window || 'DeviceMotionEvent' in window;
    
    return isMobileAgent || (isTouchDevice && (isSmallScreen || hasMobileFeatures));
  };

  const signInWithGoogle = async () => {
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

    // For React Native apps or mobile browsers, ALWAYS use redirect
    if (Platform.OS !== 'web' || isMobileDevice()) {
      console.log('Mobile detected - using redirect flow');
      try {
        await signInWithRedirect(auth, provider);
        // Note: signInWithRedirect doesn't return a result immediately
        // The result will be handled by checkRedirectResult in useEffect
        return null;
      } catch (error) {
        console.error('Google sign-in redirect error:', error);
        setGoogleLoading(false);
        throw new Error('Authentication failed. Please try again.');
      }
    }

    // For desktop web only - try popup
    try {
      console.log('Desktop detected - attempting popup...');
      const result = await signInWithPopup(auth, provider);
      setGoogleLoading(false);
      console.log('Google sign-in successful with popup');
      return result;
    } catch (error: any) {
      console.error('Google sign-in popup error:', error);

      // If popup fails, fallback to redirect
      if (
        error.code === 'auth/popup-blocked' || 
        error.code === 'auth/cancelled-popup-request' ||
        error.code === 'auth/popup-closed-by-user'
      ) {
        console.log('Popup blocked, falling back to redirect...');
        try {
          await signInWithRedirect(auth, provider);
          return null;
        } catch (redirectError) {
          setGoogleLoading(false);
          console.error('Google sign-in redirect fallback error:', redirectError);
          throw new Error('Authentication failed. Please try again.');
        }
      }

      setGoogleLoading(false);
      
      if (error.code === 'auth/popup-closed-by-user') {
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