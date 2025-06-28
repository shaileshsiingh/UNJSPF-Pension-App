import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, Info, Shield, Calculator, Clock, Users, Building } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AboutPensionScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>About Pension Schemes</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Building size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>UNJSPF Pension Fund</Text>
          </View>
          <Text style={styles.description}>
            The United Nations Joint Staff Pension Fund (UNJSPF) is a defined benefit plan serving over 240,000 members worldwide. 
            It provides retirement, disability, and survivor benefits with a funding ratio exceeding 100%, ensuring long-term solvency.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Key Principles</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vested Rights</Text>
            <Text style={styles.cardDescription}>
              Participants with 5+ years of contributory service have vested pension rights, 
              entitling them to retirement benefits payable for life.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Defined Benefit Plan</Text>
            <Text style={styles.cardDescription}>
              Benefits are calculated using a fixed formula based on service length and final average remuneration, 
              not dependent on investment returns.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Guaranteed Benefits</Text>
            <Text style={styles.cardDescription}>
              The fund guarantees lifelong retirement income regardless of market fluctuations, 
              providing financial security to participants.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calculator size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Benefit Calculation</Text>
          </View>
          
          <View style={styles.factorList}>
            <View style={styles.factorItem}>
              <Clock size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.factorText}>Rate of Accumulation (Years of Service)</Text>
            </View>
            <View style={styles.factorItem}>
              <Text style={styles.factorText}>• Final Average Remuneration (Best 36 months in last 60 months)</Text>
            </View>
            <View style={styles.factorItem}>
              <Text style={styles.factorText}>• Early Retirement Reduction Factors</Text>
            </View>
            <View style={styles.factorItem}>
              <Text style={styles.factorText}>• Cost of Living Adjustments</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={24} color="#2563EB" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Separation Scenarios</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Less than 5 Years Service</Text>
            <Text style={styles.cardDescription}>
              Withdrawal settlement (own contributions + interest) or defer payment for up to 36 months.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>5+ Years, Before Early Retirement Age</Text>
            <Text style={styles.cardDescription}>
              Withdrawal settlement with bonus (up to 100% increase) or deferred retirement benefit.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Between Early and Normal Retirement Age</Text>
            <Text style={styles.cardDescription}>
              Withdrawal settlement, early retirement benefit, or deferred retirement benefit.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>After Normal Retirement Age</Text>
            <Text style={styles.cardDescription}>
              Normal retirement benefit (no reduction factors applied).
            </Text>
          </View>
        </View>

        <View style={styles.importantNote}>
          <Text style={styles.importantTitle}>Important Note</Text>
          <Text style={styles.importantText}>
            This application is designed for pension schemes outside the United States, with special focus on UNJSPF. 
            The calculations and rules are based on UNJSPF regulations and may vary from other pension systems. 
            Please consult with your organization's pension administrator for specific details about your scheme.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => router.push('/about-app')}
        >
          <Text style={styles.nextButtonText}>Learn About This App</Text>
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
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  factorList: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  factorText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  importantNote: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 12,
    borderColor: '#F59E0B',
    borderWidth: 1,
    marginBottom: 24,
  },
  importantTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 8,
  },
  importantText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  nextButton: {
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 