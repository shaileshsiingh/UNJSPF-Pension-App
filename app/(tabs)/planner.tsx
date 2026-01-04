import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Calculator, TrendingUp, FileText, Info, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PlannerScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)')}
        >
          <View style={{ transform: [{ scaleX: -1 }] }}>
            <LogOut size={24} color="#2563EB" strokeWidth={2} />
          </View>
        </TouchableOpacity>
        <Calculator size={48} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Pension Planner</Text>
        <Text style={styles.subtitle}>
          Plan your retirement with comprehensive pension tools and resources
        </Text>
      </View>

      {/* Planning Tools */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planning Tools</Text>
        <Text style={styles.sectionSubtitle}>
          Access advanced calculators and planning resources
        </Text>

        <TouchableOpacity
          style={styles.toolCard}
          onPress={() => router.push('/(tabs)/calculator')}
        >
          <View style={styles.cardIconContainer}>
            <Calculator size={24} color="#2563EB" strokeWidth={2} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Pension Calculator</Text>
            <Text style={styles.cardDescription}>
              Calculate your pension benefits with detailed projections
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolCard}
          onPress={() => router.push('/(tabs)/eligibility')}
        >
          <View style={styles.cardIconContainer}>
            <TrendingUp size={24} color="#059669" strokeWidth={2} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Retirement Scenarios</Text>
            <Text style={styles.cardDescription}>
              Explore different retirement timing and benefit options
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolCard}
          onPress={() => router.push('/(tabs)/resources')}
        >
          <View style={styles.cardIconContainer}>
            <FileText size={24} color="#D97706" strokeWidth={2} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Planning Resources</Text>
            <Text style={styles.cardDescription}>
              Forms, guides, and documentation for retirement planning
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolCard}
          onPress={() => router.push('/(tabs)/info')}
        >
          <View style={styles.cardIconContainer}>
            <Info size={24} color="#7C3AED" strokeWidth={2} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Planning Support</Text>
            <Text style={styles.cardDescription}>
              Get help and support for your retirement planning
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Planning Tips</Text>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Start Early</Text>
          <Text style={styles.tipText}>
            The earlier you start planning, the more options you'll have for your retirement.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>📊 Review Regularly</Text>
          <Text style={styles.tipText}>
            Review your pension projections annually or when your circumstances change.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>📋 Keep Records</Text>
          <Text style={styles.tipText}>
            Maintain accurate records of your service dates and contributions.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  backButton: {
    position: 'absolute',
    left: width < 300 ? 12 : width < 350 ? 16 : 24,
    top: width < 300 ? 20 : width < 350 ? 24 : 28,
    padding: 8,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  tipCard: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: '#BAE6FD',
    borderWidth: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0C4A6E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20,
  },
});
