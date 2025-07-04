import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, Smartphone, Target, Shield, Users, Calculator, Clock } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AboutAppScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>About This App</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Smartphone size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Pension Calculator App</Text>
          </View>
          <Text style={styles.description}>
            This mobile application is designed to help employees understand and calculate their pension benefits 
            based on their organization's specific pension scheme rules and regulations.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Key Features</Text>
          </View>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Calculator size={20} color="#6B7280" strokeWidth={2} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>UNJSPF Pension Calculator</Text>
                <Text style={styles.featureDescription}>
                  Calculate your estimated pension benefits based on UNJSPF formula and your service details
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Shield size={20} color="#6B7280" strokeWidth={2} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Separation Scenario Analysis</Text>
                <Text style={styles.featureDescription}>
                  Check eligibility and benefits for different separation scenarios (before/after retirement ages)
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Users size={20} color="#6B7280" strokeWidth={2} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>UN Organization Profiles</Text>
                <Text style={styles.featureDescription}>
                  Select your UN organization to get accurate UNJSPF calculations
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Clock size={20} color="#6B7280" strokeWidth={2} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Benefit Options Comparison</Text>
                <Text style={styles.featureDescription}>
                  Compare withdrawal settlement vs deferred retirement benefits
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>UNJSPF-Specific Features</Text>
          </View>
          <Text style={styles.description}>
            This app is specifically designed for UNJSPF participants, incorporating the fund's defined benefit formula, 
            vested rights criteria (5+ years), and separation scenarios. All calculations follow UNJSPF regulations 
            and provide estimates based on your contributory service and final average remuneration.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Data Privacy & Security</Text>
          </View>
          <Text style={styles.description}>
            Your personal information is stored locally on your device and is not transmitted to external servers. 
            All calculations are performed on your device to ensure maximum privacy and security.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>How to Use</Text>
          </View>
          
          <View style={styles.stepList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Complete your profile with employment details</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Select your organization from the dropdown</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Check your eligibility for pension benefits</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>Use the calculator to estimate your pension</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ color: '#B91C1C', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>UN Pension Application</Text>
          <Text style={{ color: '#B91C1C', fontSize: 14 }}>
            This app is designed specifically for UNJSPF participants. It incorporates the Fund's defined benefit formula, vested rights criteria (5 or more years of contributory service), and a range of separation options. Available on iOS, Android, and web platforms, it provides benefit estimates based on official UNJSPF regulations, using your contributory service and final average remuneration.
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This application provides estimates only. Actual pension benefits may vary based on your organization's 
            specific rules, regulations, and any changes to the pension scheme. Always consult with your HR department 
            or pension administrator for official calculations and advice.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => router.back()}
        >
          <Text style={styles.startButtonText}>Start Using the App</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  featureList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  featureItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  featureContent: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  stepList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    padding: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  stepText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  disclaimer: {
    backgroundColor: '#FEF2F2',
    padding: 20,
    borderRadius: 12,
    borderColor: '#FECACA',
    borderWidth: 1,
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#991B1B',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 