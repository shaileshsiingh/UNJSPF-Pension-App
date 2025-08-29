// LoginScreen.js
import React, { useState } from 'react';
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
// import MyImage from '../assets/images/logo.png';


const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;

export default function LoginScreen() {
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const LOGO_URL = 'https://res.cloudinary.com/dnvdqfz5r/image/upload/v1754235912/United_Nations_Peace_Emblem_opjti4.png';

  // Email validation function
  const validateEmail = (email) => {
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
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  // Cross-platform toast function
  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert('', message);
    }
  };

  // Handle email input change
  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  // Handle password input change
  const handlePasswordChange = (text) => {
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
    } catch (e) {
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
    setLoading(true);
    try {
      await signInWithGoogle();
      showToast('Google sign-in successful!');
      router.replace('/');
    } catch (e) {
      console.error('Google sign-in error:', e);
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      if (e.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled';
      } else if (e.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up was blocked. Please allow pop-ups and try again.';
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
              {/* <Text style={styles.appTagline}>UN Retirement Benefits Calculator</Text> */}
            </View>

            {/* Login Card */}
            <View style={styles.card}>
              {/* <Text style={styles.title}>Welcome Back</Text> */}
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
                  style={[styles.socialButton, loading ? styles.buttonDisabled : null]} 
                  onPress={handleGoogleSignIn}
                  disabled={loading}
                >
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </Pressable>
                
                {/* {Platform.OS === 'ios' && (
                  <Pressable style={styles.socialButton} onPress={() => signInWithApple()}>
                    <Text style={styles.socialButtonText}>Continue with Apple</Text>
                  </Pressable>
                )} */}
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
    // marginBottom: 32,
  },
  heroLogo: {
    width: 80,
    height: 80,
    marginBottom: -20,
  },
  appName: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '900',
    color: '#0072CE', // Blue color to match landing page
    marginBottom: 8,
    marginTop: -37,
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  appTagline: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#6b7280', // Gray color for subtitle
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Login Card - Restored simpler styling
  card: {
    width: isSmallScreen ? width - 40:300,
    height:  height - 30, 
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
  title: {
    fontSize: isSmallScreen ? 18 : 28,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: -12,
    color: 'rgb(29, 78, 216)',
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: isSmallScreen ? 15 : 16,
    color: '#6B7280',
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Input Styles
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgba(229, 231, 235, 0.8)',
    borderRadius: 16,
    padding: isSmallScreen ? 14 : 16,
    fontSize: isSmallScreen ? 15 : 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#1f2937',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(254, 242, 242, 0.95)',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 6,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
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
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Link Styles
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#0EA5E9', // Match the blue theme
    fontWeight: '600',
    fontSize: isSmallScreen ? 14 : 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
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
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  socialButtons: {
    width: '100%',
    gap: 12,
  },
  socialButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: 'rgba(229, 231, 235, 0.8)',
    paddingVertical: isSmallScreen ? 12 : 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: isSmallScreen ? 14 : 15,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Bottom spacing
  bottomSpacing: {
    height: isSmallScreen ? 20 : 40,
  },
});