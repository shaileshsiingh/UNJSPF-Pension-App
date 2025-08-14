import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Home, Calculator, TrendingUp, FileSliders, FileText, Info } from 'lucide-react-native';
import { useAuth } from '../../components/AuthContext';
import { useRouter } from 'expo-router';

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading]);

  if (loading) return null;
  if (!user) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          paddingBottom: 8,
          height: 88,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ size, color }) => (
            <Calculator size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="eligibility"
        options={{
          title: 'Pension',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'Planner',
          tabBarIcon: ({ size, color }) => (
            <FileSliders size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Entitlement',
          tabBarIcon: ({ size, color }) => (
            <FileText size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ size, color }) => (
            <Info size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}