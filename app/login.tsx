import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // Redirect to home or main tab
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Login Error', e.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Google Login Error', e.message);
    }
  };

  const handleApple = async () => {
    try {
      await signInWithApple();
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Apple Login Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => router.push('/signup')} style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <Button title="Sign in with Google" onPress={handleGoogle} />
      <Button title="Sign in with Apple" onPress={handleApple} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  link: { marginTop: 12, alignItems: 'center' },
  linkText: { color: '#2563EB', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 24 },
}); 