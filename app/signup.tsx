// SignupScreen.js
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

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 380;
const LOGO_URL = 'https://res.cloudinary.com/dnvdqfz5r/image/upload/v1754235912/United_Nations_Peace_Emblem_opjti4.png';

export default function SignupScreen() {
  const { signUp, signInWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Name validation function
  const validateName = (name) => {
    if (!name) {
      return 'Name is required';
    }
    if (name.length < 2) {
      return 'Name must be at least 2 characters long';
    }
    return '';
  };

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
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  // Confirm password validation
  const validateConfirmPassword = (confirmPass) => {
    if (!confirmPass) {
      return 'Please confirm your password';
    }
    if (confirmPass !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  // Cross-platform toast function
  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert('Error', message);
    }
  };

  // Handle input changes
  const handleNameChange = (text) => {
    setName(text);
    if (nameError) {
      setNameError('');
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
    // Also validate confirm password if it exists
    if (confirmPassword && confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);
    
    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);
    
    return !nameErr && !emailErr && !passwordErr && !confirmPasswordErr;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      showToast('Please fix the errors before continuing');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      showToast('Account created successfully!');
      router.replace('/');
    } catch (e) {
      console.error('Signup error:', e);
      console.error('Error code:', e.code);
      console.error('Error message:', e.message);
      
      // Handle specific error types with improved error detection
      let errorMessage = 'Signup failed. Please try again.';
      
      if (e.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please use a different email or try logging in.';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format';
      } else if (e.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (e.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled';
      } else if (e.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (e.message && e.message.toLowerCase().includes('email-already-in-use')) {
        errorMessage = 'An account with this email already exists. Please use a different email or try logging in.';
      } else if (e.message && e.message.toLowerCase().includes('already exists')) {
        errorMessage = 'An account with this email already exists. Please use a different email or try logging in.';
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
      {/* Clean gradient background - same as login */}
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
            {/* Logo Section - same as login */}
            <View style={styles.logoSection}>
              <View style={styles.heroIconContainer}>
                <TouchableOpacity onPress={() => router.push('/')}>
                               <Image 
                                 source={{ 
                                   uri: LOGO_URL
                                 }}
                                 style={styles.heroLogo}
                                 resizeMode="contain"
                               />
                               </TouchableOpacity>
              </View>
              <Text style={styles.appName}>MyUNPension</Text>
              {/* <Text style={styles.appTagline}>UN Retirement Benefits Calculator</Text> */}
            </View>

            {/* Signup Card - keeping existing styling */}
            <View style={styles.card}>
              <Text style={styles.title}>Create Account</Text>
              {/* <Text style={styles.subtitle}>Join us today</Text> */}
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, nameError ? styles.inputError : null]}
                  placeholder="Name"
                  value={name}
                  onChangeText={handleNameChange}
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholderTextColor="#9CA3AF"

                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
              </View>

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

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, confirmPasswordError ? styles.inputError : null]}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                  autoCorrect={false}
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
              </View>

              <Pressable 
                style={[styles.button, loading ? styles.buttonDisabled : null]} 
                onPress={handleSignup} 
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </Pressable>
              
              <Pressable onPress={() => router.push('/login')} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
              </Pressable>
            </View>
            {/* <Pressable onPress={() => router.push('/login')} style={styles.link}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
              </Pressable> */}

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
  
  // Logo Section - same as login
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
    marginTop: -25,
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

  // Signup Card - keeping existing styling but updating to match login structure
  card: {
    width: isSmallScreen ? width - 40 : 340,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
    borderRadius: 24,
    padding: isSmallScreen ? 24 : 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
  },
  title: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: '800',
    marginBottom: 8,
    color: '#F59E42', // Orange color for signup
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: isSmallScreen ? 15 : 16,
    color: '#6B7280',
    marginBottom: 24,
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
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.8)',
    borderRadius: 12,
    padding: isSmallScreen ? 14 : 16,
    fontSize: isSmallScreen ? 15 : 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#1f2937',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(254, 242, 242, 0.9)',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Button Styles
  button: {
    width: '100%',
    backgroundColor: '#F59E42', // Orange color for signup
    paddingVertical: isSmallScreen ? 14 : 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#F59E42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: isSmallScreen ? 16 : 18,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  // Link Styles
  link: {
    marginTop: 8,
  },
  linkText: {
    color: '#F59E42', // Orange color for signup
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