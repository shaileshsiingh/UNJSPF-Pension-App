// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ToastAndroid, 
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getRobotoFont, getRobotoLikeFont } from '../utils/fonts';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;

export default function LoginScreen() {
  const { signIn, signInWithGoogle, googleLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const LOGO_URL = 'https://res.cloudinary.com/dnvdqfz5r/image/upload/v1754235912/United_Nations_Peace_Emblem_opjti4.png';

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  // Password validation function
  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  // Cross-platform toast function
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert('', message);
    }
  };

  // Handle email input change
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  // Handle password input change
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    
    return !emailErr && !passwordErr;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      showToast('Please fix the errors before continuing');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      showToast('Login successful!');
      router.replace('/');
    } catch (e: any) {
      console.error('Login error:', e);
      
      // Handle specific error types
      let errorMessage = 'Login failed. Please try again.';
      
      if (e.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format';
      } else if (e.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else if (e.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('🎯 handleGoogleSignIn called');
    
    try {
      // Check if we're on mobile to provide appropriate feedback
      const isMobile = Platform.OS !== 'web' || 
        (typeof window !== 'undefined' && (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent.toLowerCase()) ||
          ('ontouchstart' in window && (window.innerWidth <= 768 || 'orientation' in window))
        ));

      console.log(`📱 Mobile detected: ${isMobile}`);

      if (isMobile) {
        // On mobile, let user know they'll be redirected
        showToast('Redirecting to Google...');
      }

      const result = await signInWithGoogle();
      
      // If signInWithGoogle returns a result, it means the popup was successful (desktop)
      if (result) {
        console.log('✅ Popup sign-in successful');
        showToast('Google sign-in successful!');
        router.replace('/');
      } else {
        console.log('ℹ️ Redirect flow initiated or cancelled');
        // For redirect flow, don't show success message here
        // It will be handled when the user returns to the app
        // The auth state change will trigger navigation
      }
      
    } catch (e: any) {
      console.error('❌ Google sign-in error:', e);
      
      // Don't show error for user cancellation
      if (e.message && (
        e.message.includes('cancelled') || 
        e.message.includes('closed') ||
        !e.message.trim()
      )) {
        console.log('ℹ️ User cancelled sign-in, not showing error');
        return;
      }
      
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      if (e.message) {
        errorMessage = e.message;
      }
      
      console.log(`🚨 Showing error: ${errorMessage}`);
      showToast(errorMessage);
    }
  };

  // Add useEffect to handle successful auth after redirect
  useEffect(() => {
    if (user && !loading && googleLoading) {
      // User successfully signed in via redirect
      console.log('✅ User signed in after redirect, navigating to home');
      showToast('Google sign-in successful!');
      router.replace('/');
    }
  }, [user, loading, googleLoading, router]);

  return (
    <View style={styles.container}>
      {/* Clean gradient background */}
      <LinearGradient
        colors={['#ffffff', '#f8fafc', '#ffffff']}
        style={styles.background}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.heroIconContainer}>
                <TouchableOpacity onPress={() => router.push('/')}>
                <Image 
                  source={{
                    uri: LOGO_URL }}
                  style={styles.heroLogo}
                  resizeMode="contain"
                />
                </TouchableOpacity>
              </View>
              <Text style={styles.appName}>MyUNPension</Text>
            </View>

            {/* Login Card */}
            <View style={styles.card}>
              <Text style={styles.subtitle}>Sign in to continue</Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, emailError ? styles.inputError : null]}
                  placeholder="Email"
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="#9CA3AF"
                  autoCorrect={false}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, passwordError ? styles.inputError : null]}
                  placeholder="Password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                  autoCorrect={false}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>

              <Pressable 
                style={[styles.button, loading ? styles.buttonDisabled : null]} 
                onPress={handleLogin} 
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Logging in...' : 'Login'}
                </Text>
              </Pressable>
              
              <Pressable onPress={() => router.push('/signup')} style={styles.link}>
                <Text style={styles.linkText}>Don't have an account? Sign up</Text>
              </Pressable>

              {/* Social Login Options */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <Pressable 
                  style={[styles.googleButton, googleLoading ? styles.buttonDisabled : null]} 
                  onPress={handleGoogleSignIn}
                  disabled={googleLoading}
                >
                  <View style={styles.googleButtonContent}>
                    <View style={styles.googleIcon}>
                      <Text style={styles.googleIconText}>G</Text>
                    </View>
                    <Text style={styles.googleButtonText}>
                      {googleLoading ? 'Signing in...' : 'Continue with Google'}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

            {/* Bottom Spacing */}
            <View style={styles.bottomSpacing} />
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? 30 : 40,
  },
  heroIconContainer: {
    width: isSmallScreen ? 120 : 140,
    height: isSmallScreen ? 120 : 140,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLogo: {
    width: 80,
    height: 80,
    marginBottom: -20,
  },
  appName: {
    fontSize: isSmallScreen ? 17 : 17,
    fontWeight: '700',
    color: '#0072CE',
    marginTop: -30,
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: getRobotoFont('bold'),
  },

  // Login Card - Restored simpler styling
  card: {
    width: isSmallScreen ? width - 40 : 300,
    height: 470, 
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: isSmallScreen ? 24 : 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
    alignSelf: 'center',
    marginTop: -28,
  },
  subtitle: {
    fontSize: isSmallScreen ? 15 : 16,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: getRobotoFont('medium'),
  },
  
  // Input Styles
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 4,
    fontSize: isSmallScreen ? 15 : 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#1f2937',
    fontFamily: getRobotoFont('regular'),
    fontWeight: '400',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(254, 242, 242, 0.95)',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 6,
    fontWeight: '600',
    fontFamily: getRobotoFont('medium'),
  },
  
  // Button Styles
  button: {
    width: '100%',
    backgroundColor: '#0EA5E9', // Match the blue theme
    paddingVertical: isSmallScreen ? 14 : 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: isSmallScreen ? 16 : 18,
    letterSpacing: 0.5,
    fontFamily: getRobotoFont('bold'),
  },
  
  // Link Styles
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: isSmallScreen ? 14 : 15,
    textAlign: 'center',
    fontFamily: getRobotoFont('medium'),
  },

  // Social Login Styles
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(229, 231, 235, 0.8)',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: getRobotoFont('medium'),
  },
  socialButtons: {
    width: '100%',
    gap: 12,
  },
  
  // Enhanced Google Button Styles
  googleButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dadce0',
    paddingVertical: isSmallScreen ? 12 : 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285f4',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: getRobotoFont('medium'),
  },
  googleButtonText: {
    color: '#3c4043',
    fontWeight: '500',
    fontSize: isSmallScreen ? 14 : 15,
    fontFamily: getRobotoFont('medium'),
  },

  // Bottom spacing
  bottomSpacing: {
    height: isSmallScreen ? 20 : 40,
  },
});