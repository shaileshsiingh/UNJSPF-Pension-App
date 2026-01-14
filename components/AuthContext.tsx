import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { User as FirebaseUser } from 'firebase/auth';
import { router } from 'expo-router';
import { Alert, Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import { GOOGLE_CLIENT_IDS } from '../config/googleClientIds';

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
        // Native (Android/iOS): Use expo-auth-session with Google OAuth
        console.log('🔄 Starting Google OAuth for native platform...');
        console.log('📱 Platform:', Platform.OS);
        
        // Complete the auth session for expo-auth-session
        WebBrowser.maybeCompleteAuthSession();

        // Create redirect URI - use app scheme for production, Expo proxy for development
        const redirectUri = AuthSession.makeRedirectUri();
        
        console.log('🔗 Redirect URI:', redirectUri);

        // Use platform-specific Client ID
        // IMPORTANT: Make sure these client IDs have the redirect URI added in Google Cloud Console
        const clientId = Platform.OS === 'ios' 
          ? GOOGLE_CLIENT_IDS.ios 
          : GOOGLE_CLIENT_IDS.android;

        console.log('🔑 Using Client ID for', Platform.OS, ':', clientId);

        // Create Google OAuth request
        const request = new AuthSession.AuthRequest({
          clientId: clientId,
          scopes: ['openid', 'profile', 'email'],
          responseType: ResponseType.IdToken,
          redirectUri,
          extraParams: {},
        });

        const discovery = {
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
          tokenEndpoint: 'https://oauth2.googleapis.com/token',
          revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
        };

        console.log('📱 Prompting for Google OAuth...');
        console.log('🔍 Request details:', {
          clientId,
          redirectUri,
          scopes: ['openid', 'profile', 'email'],
        });

        const result = await request.promptAsync(discovery, {
          showInRecents: true,
        });

        console.log('📥 OAuth result type:', result.type);
        console.log('📥 OAuth result:', JSON.stringify(result, null, 2));

        if (result.type === 'success') {
          const { id_token, error, error_description } = result.params;
          
          if (error) {
            console.error('❌ OAuth error:', error, error_description);
            throw new Error(`Google OAuth error: ${error} - ${error_description || ''}`);
          }
          
          if (id_token) {
            // Sign in with Firebase using the Google credential
            console.log('✅ Got ID token, signing in with Firebase...');
            const googleCredential = GoogleAuthProvider.credential(id_token);
            const firebaseResult = await signInWithCredential(auth, googleCredential);
            setGoogleLoading(false);
            console.log('✅ Google sign-in successful:', firebaseResult.user.email);
            return firebaseResult;
          } else {
            throw new Error('No ID token received from Google');
          }
        } else if (result.type === 'cancel') {
          console.log('ℹ️ User cancelled sign-in');
          setGoogleLoading(false);
          return null;
        } else if (result.type === 'error') {
          const errorMsg = result.error?.message || 'Unknown error';
          console.error('❌ OAuth error result:', result.error);
          throw new Error(`Google sign-in failed: ${errorMsg}`);
        } else {
          console.error('❌ Unexpected result type:', result.type);
          throw new Error(`Google sign-in failed: ${result.type}`);
        }
      }
    } catch (error: any) {
      console.error('❌ Google sign-in error:', error);
      setGoogleLoading(false);

      if (error.code === 'auth/popup-closed-by-user' || error.message?.includes('cancel')) {
        console.log('ℹ️ User cancelled sign-in');
        return null; // Don't throw error for user cancellation
      }

      // Provide helpful error message
      const errorMessage = error.message || 'Google sign-in failed. Please try again.';
      throw new Error(errorMessage);
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