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
  ArrowLeft
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function BenefitGuideScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Benefit Calculation Methodology</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Key Pension Concepts */}
      

        {/* Key Formulae */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Formulae:</Text>
        </View>

        {/* 1. Withdrawal Settlement Formula (Article 31) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Withdrawal Settlement Formula (Article 31)</Text>
          <Text style={styles.content}>
            <Text style={styles.bold}>Applicable to all staff separating from service (mandatory for CS &lt; 5 years; optional for CS ≥ 5 years)</Text>
            {'\n'}For CS &lt; 5 years = Own Contributions + Compound Interest (3.25% per year) +No Bonus
            {'\n'}For CS ≥ 5 years = Own Contributions + Compound Interest (3.25% per year) + Bonus (if CS ≥ 5 years)
            {'\n'}
            {'\n'}• 5 ≤ CS ≤ 15 years: + 10% per year of CS after year 5, up to 100%
            {'\n'}• CS &gt; 15 years: + 100% bonus (maximum allowed)
          </Text>
        </View>

        {/* 2. Periodic Retirement Benefit Formula (Annual Pension Amount) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Periodic Retirement Benefit Formula (Annual Pension Amount)</Text>
          <Text style={styles.content}>
            <Text style={styles.bold}>Applicable to Staff with CS ≥ 5 years, opting for Normal, Early, or Deferred Retirement Benefit:</Text>
            {'\n'}Annual Pension = FAR X ROA X Years of CS
            {'\n'}
            {'\n'}Notes: FAR is typically based on the average pensionable remuneration over the highest 36 consecutive months in the last 5 years of CS.
          </Text>
        </View>

        {/* 3. Early Retirement Reduction (Applied to Periodic Benefit) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Early Retirement Reduction (Applied to Periodic Benefit)</Text>
          <Text style={styles.content}>
            Reduced Pension = Annual Pension x (1 - Reduction Factor)
            {'\n'}
            {'\n'}The Reduction Factor is determined based on how many years/months before NRA the benefit begins.
            {'\n'}The reduction typically ranges between 3% to 6% per year depending on actuarial rules at the time of entry.
          </Text>
        </View>

        {/* 4. Deferred Retirement Benefit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Deferred Retirement Benefit</Text>
          <Text style={styles.content}>
            No additional formula — same as periodic pension, but deferred until ERA or NRA
            {'\n'}
            {'\n'}• No actuarial reduction if collected at NRA
            {'\n'}• Payable at choice of staff at ERA or NRA
          </Text>
        </View>

        {/* 5. Lump Sum */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Lump Sum</Text>
          <Text style={styles.content}>
            Lump Sum = 1/3 X Annual Pension X Commutation Factor
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
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 4,
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 12,
    lineHeight: 24,
  },
  content: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  bold: {
    fontWeight: '700',
    color: '#111827',
  },
});