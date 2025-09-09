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
  }, [googleLoading]);

  // Add a timeout mechanism for Google loading
  useEffect(() => {
    if (googleLoading) {
      console.log('Google sign-in loading started, setting timeout...');
      const timeout = setTimeout(() => {
        console.log('⚠️ Google sign-in timeout - resetting loading state');
        setGoogleLoading(false);
      }, 30000); // 30 second timeout

      return () => {
        console.log('Clearing Google sign-in timeout');
        clearTimeout(timeout);
      };
    }
  }, [googleLoading]);

  const checkRedirectResult = async () => {
    try {
      console.log('Checking for redirect result...');
      const result = await getRedirectResult(auth);
      if (result) {
        console.log('✅ Google sign-in successful via redirect:', result.user.email);
        // The auth state will be updated automatically via onAuthStateChanged
        // Reset loading state since we got a successful result
        setGoogleLoading(false);
        return result;
      } else {
        console.log('No redirect result found - user may not have completed auth');
        // Reset loading state if no result after checking
        setGoogleLoading(false);
        return null;
      }
    } catch (error) {
      console.error('❌ Redirect result error:', error);
      // Always reset loading state on error
      setGoogleLoading(false);
      
      // Handle specific redirect errors
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User cancelled the redirect flow');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Redirect request was cancelled');
      } else {
        console.error('Unexpected redirect error:', error);
        // You might want to show this error to the user
        throw error;
      }
      return null;
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      console.log('Web platform detected, checking for redirect result...');
      checkRedirectResult().catch(error => {
        console.error('Failed to check redirect result:', error);
        setGoogleLoading(false); // Ensure loading is reset even on error
      });
    } else {
      // For React Native, we don't need to check redirect results the same way
      setGoogleLoading(false);
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

    // For React Native apps or mobile browsers, ALWAYS use redirect
    if (Platform.OS !== 'web' || isMobileDevice()) {
      console.log('📱 Mobile detected - using redirect flow');
      try {
        console.log('🔄 Calling signInWithRedirect...');
        await signInWithRedirect(auth, provider);
        console.log('✅ signInWithRedirect completed - user should be redirected');
        // Note: signInWithRedirect doesn't return a result immediately
        // The result will be handled by checkRedirectResult when user returns
        // Don't reset loading here - it will be reset when user returns or times out
        return null;
      } catch (error) {
        console.error('❌ Google sign-in redirect error:', error);
        setGoogleLoading(false);
        throw new Error(`Authentication failed: ${error.message || 'Please try again.'}`);
      }
    }

    // For desktop web only - try popup
    try {
      console.log('🖥️ Desktop detected - attempting popup...');
      const result = await signInWithPopup(auth, provider);
      setGoogleLoading(false);
      console.log('✅ Google sign-in successful with popup:', result.user.email);
      return result;
    } catch (error: any) {
      console.error('❌ Google sign-in popup error:', error);

      // If popup fails, fallback to redirect
      if (
        error.code === 'auth/popup-blocked' || 
        error.code === 'auth/cancelled-popup-request' ||
        error.code === 'auth/popup-closed-by-user'
      ) {
        console.log('🔄 Popup blocked, falling back to redirect...');
        try {
          await signInWithRedirect(auth, provider);
          console.log('✅ Redirect fallback initiated');
          // Don't reset loading here - will be reset when user returns
          return null;
        } catch (redirectError) {
          setGoogleLoading(false);
          console.error('❌ Google sign-in redirect fallback error:', redirectError);
          throw new Error(`Authentication failed: ${redirectError.message || 'Please try again.'}`);
        }
      }

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