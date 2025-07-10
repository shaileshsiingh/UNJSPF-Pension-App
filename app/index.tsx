import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Dimensions } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

function AnimatedButton({ title, onPress, color1, color2 }: { title: string; onPress: () => void; color1: string; color2: string }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width: '100%', marginBottom: 12, alignItems: 'center' }}
    >
      <Animated.View style={[styles.animatedButton, { transform: [{ scale }] }]}> 
        <LinearGradient
          colors={[color1, color2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/(tabs)');
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the UNJSPF Pension App</Text>
        <Text style={styles.subtitle}>Calculate your pension, check eligibility, and more.</Text>
        <View style={styles.buttonGroup}>
          <AnimatedButton
            title="Login"
            onPress={() => router.push('/login')}
            color1="#2563EB"
            color2="#6EE7B7"
          />
          <AnimatedButton
            title="Sign Up"
            onPress={() => router.push('/signup')}
            color1="#F59E42"
            color2="#FDE68A"
          />
        </View>
        <Text style={styles.info}>You must be logged in to access personalized features.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e5e7eb', // slightly darker, warm gray
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
    color: '#000',
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  animatedButton: {
    width: 220,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  gradientButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  info: {
    marginTop: 40,
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    opacity: 0.85,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonGroup: {
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
}); 