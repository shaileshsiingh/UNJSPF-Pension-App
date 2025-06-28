import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { 
  User, 
  FileText, 
  Smartphone, 
  ArrowRight, 
  Building, 
  Shield, 
  Calculator,
  Users,
  TrendingUp
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Building size={48} color="#2563EB" strokeWidth={2} />
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeSubtitle}>
              Your Comprehensive Guide to UNJSPF Pension Benefits and Calculations
            </Text>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Started</Text>
          <Text style={styles.sectionSubtitle}>
            Begin your pension journey with these essential steps
          </Text>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/')}
          >
            <View style={styles.buttonContent}>
              <User size={24} color="#FFFFFF" strokeWidth={2} />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.primaryButtonText}>Start Profile Setup</Text>
                <Text style={styles.primaryButtonSubtext}>
                  Enter your employment details for accurate calculations
                </Text>
              </View>
            </View>
            <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Information Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learn More</Text>
          <Text style={styles.sectionSubtitle}>
            Understand your pension scheme and this application
          </Text>
          
          <TouchableOpacity 
            style={styles.infoCard}
            onPress={() => router.push('/(tabs)/about-pension')}
          >
            <View style={styles.cardIconContainer}>
              <FileText size={24} color="#2563EB" strokeWidth={2} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>About Pension Schemes</Text>
              <Text style={styles.cardDescription}>
                Learn about UNJSPF, vested rights, and separation scenarios
              </Text>
            </View>
            <ArrowRight size={20} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoCard}
            onPress={() => router.push('/(tabs)/about-app')}
          >
            <View style={styles.cardIconContainer}>
              <Smartphone size={24} color="#2563EB" strokeWidth={2} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>About This App</Text>
              <Text style={styles.cardDescription}>
                Discover features and how to use this pension calculator
              </Text>
            </View>
            <ArrowRight size={20} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Quick Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Tools</Text>
          <Text style={styles.sectionSubtitle}>
            Access essential pension tools and resources
          </Text>
          
          <View style={styles.toolsGrid}>
            <TouchableOpacity 
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/eligibility')}
            >
              <Shield size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>Eligibility</Text>
              <Text style={styles.toolDescription}>
                Check your pension eligibility
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/calculator')}
            >
              <Calculator size={32} color="#DC2626" strokeWidth={2} />
              <Text style={styles.toolTitle}>Calculator</Text>
              <Text style={styles.toolDescription}>
                Calculate your pension benefits
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/resources')}
            >
              <FileText size={32} color="#D97706" strokeWidth={2} />
              <Text style={styles.toolTitle}>Resources</Text>
              <Text style={styles.toolDescription}>
                Forms and documentation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/info')}
            >
              <Users size={32} color="#7C3AED" strokeWidth={2} />
              <Text style={styles.toolTitle}>Info</Text>
              <Text style={styles.toolDescription}>
                Contact and support
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <TrendingUp size={24} color="#059669" strokeWidth={2} />
              <Text style={styles.statNumber}>240K+</Text>
              <Text style={styles.statLabel}>UNJSPF Members</Text>
            </View>
            <View style={styles.statCard}>
              <Shield size={24} color="#2563EB" strokeWidth={2} />
              <Text style={styles.statNumber}>100%+</Text>
              <Text style={styles.statLabel}>Funding Ratio</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This app provides estimates based on UNJSPF regulations. 
            For official calculations, use the Member Self-Service portal.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
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
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  primaryButtonSubtext: {
    fontSize: 14,
    color: '#E0E7FF',
    lineHeight: 18,
  },
  infoCard: {
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
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  toolDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    paddingTop: 0,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
}); 