import React from 'react';
import { Tabs } from 'expo-router';
import { Home, CheckSquare, Shield, TrendingUp, Plane, Workflow, Link, BookOpen } from 'lucide-react-native';
import { useAuth } from '../../components/AuthContext';

export default function TabsLayout() {
  const { loading } = useAuth();

  // While auth is initializing, avoid rendering tabs to prevent flicker
  if (loading) return null;

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
      {/* <Tabs.Screen
        name="about-app"
        options={{
          title: 'Guide',
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} strokeWidth={2} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="prepare"
        options={{
          title: 'Checklist',
          tabBarIcon: ({ size, color }) => (
            <CheckSquare size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ size, color }) => (
            <Shield size={size} color={color} strokeWidth={2} />
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
        name="employer-benefits"
        options={{
          title: 'HR',
          tabBarIcon: ({ size, color }) => (
            <Plane size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="post-un-life"
        options={{
          title: 'Planner',
          tabBarIcon: ({ size, color }) => (
            <Workflow size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          tabBarIcon: ({ size, color }) => (
            <Link size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      {/* Hide extra routes from the tab bar but keep them navigable */}
      <Tabs.Screen name="planner" options={{ href: null }} />
      <Tabs.Screen name="info" options={{ href: null }} />
      <Tabs.Screen name="calculator" options={{ href: null }} />
    </Tabs>
  );
}