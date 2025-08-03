

// ==========================================
// SIGNUP SCREEN - SEPARATE FILE
// ==========================================

// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ToastAndroid, ImageBackground } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);
    
    return !emailErr && !passwordErr && !confirmPasswordErr;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      showToast('Please fix the errors before continuing');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
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

  return (
    <ImageBackground 
    source={{ uri: 'https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjg3NDViOWYyOGY0ODE5MWJjMjI0ODRiYTI0ZjFjZTM6ZmlsZV8wMDAwMDAwMGVhZjA2MWZkOGJjNWQxMjVjODdlZGU4MyIsInRzIjoiNDg3MjgyIiwicCI6InB5aSIsInNpZyI6ImJlOTlkZDgxZjY4MDI1OWFmYzMxYjc0ZDJmOTU1ODQ0ODIyNzJlNTUzNWQ3MGJkMDkyN2M4MDJiYTkxYjA2YjIiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==' }} // Replace with your image URL
    style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay for better readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
        style={styles.overlay}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today</Text>
            
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
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  card: {
    width: 340,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F59E42', // Orange color for signup
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.8)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#222',
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
  },
  button: {
    width: '100%',
    backgroundColor: '#F59E42', // Orange color for signup
    paddingVertical: 16,
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
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: '#F59E42', // Orange color for signup
    fontWeight: '600',
    fontSize: 15,
  },
});