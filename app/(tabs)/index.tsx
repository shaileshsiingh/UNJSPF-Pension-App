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
  TrendingUp,
  LogOut
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '../../components/AuthContext';

export default function HomeScreen() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={signOut}
          style={styles.logoutButton}
          accessibilityLabel="Logout"
        >
          <LogOut size={24} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Building size={48} color="#2563EB" strokeWidth={2} />
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeSubtitle}>
              Your Comprehensive Guide to United Nations Pension
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
            onPress={() => router.push('/(tabs)/profile')}
          >
            <View style={styles.buttonContent}>
              <User size={24} color="#FFFFFF" strokeWidth={2} />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.primaryButtonText}>Start Profile Setup</Text>
                <Text style={styles.primaryButtonSubtext}>
                  Enter your employment history for accurate calculations
                </Text>
              </View>
            </View>
            <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Information Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Know Your Pension</Text>
          <Text style={styles.sectionSubtitle}>
            Understand your vested pension rights, benefit options, and separation entitlements
          </Text>
          
          <TouchableOpacity 
            style={styles.infoCard}
            onPress={() => router.push('/about-pension')}
          >
            <View style={styles.cardIconContainer}>
              <FileText size={24} color="#2563EB" strokeWidth={2} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Your Pension Fund</Text>
              <Text style={styles.cardDescription}>
                Learn about UNJSPF, vested rights, and separation scenarios
              </Text>
            </View>
            <ArrowRight size={20} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoCard}
            onPress={() => router.push('/about-app')}
          >
            <View style={styles.cardIconContainer}>
              <Smartphone size={24} color="#2563EB" strokeWidth={2} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Key features of this Application</Text>
              <Text style={styles.cardDescription}>
                Key features of this Application
              </Text>
            </View>
            <ArrowRight size={20} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Quick Tools Section */}
        {/* needs to center-aligned */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle1}>Quick Tools</Text>
          <Text style={styles.sectionSubtitle1}>
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
        {/* <View style={styles.section}>
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
        </View> */}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This app provides estimates based on your inputs.
            For official figures, please use the UNJSPF Member Self-Service portal
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 0,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: 4,
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
  sectionTitle1: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionSubtitle1: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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