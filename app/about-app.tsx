import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { 
  ArrowLeft, 
  Info, 
  Shield, 
  Calculator, 
  Clock, 
  Users, 
  Building, 
  Smartphone, 
  Target,
  BookOpen,
  TrendingUp,
  Settings
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function CombinedAboutScreen() {
  const [activeTab, setActiveTab] = useState('app'); // 'app', 'concepts', 'formulas', 'scenarios'

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'app' && styles.activeTab]}
        onPress={() => setActiveTab('app')}
      >
        <Smartphone size={16} color={activeTab === 'app' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'app' && styles.activeTabText]}>
          About App
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'concepts' && styles.activeTab]}
        onPress={() => setActiveTab('concepts')}
      >
        <BookOpen size={16} color={activeTab === 'concepts' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'concepts' && styles.activeTabText]}>
          Concepts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'formulas' && styles.activeTab]}
        onPress={() => setActiveTab('formulas')}
      >
        <Calculator size={16} color={activeTab === 'formulas' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'formulas' && styles.activeTabText]}>
          Formulas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'scenarios' && styles.activeTab]}
        onPress={() => setActiveTab('scenarios')}
      >
        <Info size={16} color={activeTab === 'scenarios' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'scenarios' && styles.activeTabText]}>
          Scenarios
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderAppContent = () => (
    <View>
      {/* App Features */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Target size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>Key Features Of This Application</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Everything you need to estimate and manage your UN pension</Text>
        
        <View style={styles.featureList}>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Actuarial calculator for precise pension estimates</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Pension calculator with multiple scenarios</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Essential documents and forms library</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>HR entitlements and benefits overview</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Grants and financial assistance information</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Retirement planning resources and guides</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Financial planning tools and calculators</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Relocation support and guidance</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Community services and support networks</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Offline functionality for privacy protection</Text>
          </View>
          <View style={styles.featureItemTight}>
            <View style={styles.blueDot} />
            <Text style={styles.featureTextTight}>Regular updates with latest UNJSPF regulations</Text>
          </View>
        </View>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Info size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>About This Application</Text>
        </View>
        <Text style={styles.description}>
          This comprehensive UN Pension application is designed to help current and former UN staff members 
          navigate their retirement benefits with confidence. Built by a former UN staff member who recently 
          completed the retirement process, this app provides accurate calculations and guidance based on 
          official UNJSPF regulations.
        </Text>
      </View>

      {/* Privacy & Security */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Shield size={24} color="#059669" strokeWidth={2} />
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
        </View>
        <Text style={styles.description}>
          Your personal information is stored locally on your device and is not transmitted to external servers. 
          All calculations are performed on your device to ensure maximum privacy and security.
        </Text>
      </View>

      {/* Important Note - Only in App Tab */}
      <View style={styles.importantNote}>
        <Text style={styles.importantTitle}>Important Note</Text>
        <Text style={styles.importantText}>
          This app created by a former UN staff member who recently completed the retirement process. It walks you through key steps to take before retirement and provides benefit estimates based on the official UNJSPF Regulations and Rules.{"\n\n"}
          While we aim to provide accurate and current guidance, we are not official representatives of the United Nations Joint Staff Pension Fund and cannot speak on its behalf. Do not enter or share your personal information on this app. For official and personalized pension estimates, always refer to the UNJSPF Member Self-Service.{"\n\n"}
          <Text style={{ fontWeight: 'bold' }}>We're here to help make your retirement journey easier—let's get started!</Text>{"\n"}
          Your suggestions for improvements are welcome. <Text style={{ color: '#2563EB', textDecorationLine: 'underline' }}>Contact us</Text> (link coming soon).
        </Text>
      </View>
    </View>
  );

  const renderConceptsContent = () => (
    <View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <BookOpen size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>Key Pension Concepts</Text>
        </View>
        <Text style={styles.conceptText}>
          <Text style={styles.bold}>Contributory Service (CS):</Text> The total duration during which you contributed to the UNJSPF while in pay status.
          {'\n\n'}<Text style={styles.bold}>Vested Pension Rights:</Text> Earned after 5 years of CS. Grants access to periodic retirement benefits.
          {'\n\n'}<Text style={styles.bold}>Final Average Remuneration (FAR):</Text> Is the average of your highest pensionable salaries over 36 consecutive months within the last 5 years of service. It represents your final salary level used to calculate your pension benefit.
          {'\n\n'}<Text style={styles.bold}>Rate of Accumulation (ROA):</Text> Is the percentage of your FAR that you earn as annual pension credit for each year of CS to the UNJSPF.
          {'\n\n'}<Text style={styles.bold}>Actuarial Factor (Commutation Factor):</Text> The Actuarial Factor, also called the Commutation Factor, is a statistical value used to convert part of your annual pension into a one-time lump sum payment at the time of retirement.
          {'\n\n'}<Text style={styles.bold}>Normal Retirement Age (NRA):</Text> The age at which you are entitled to a full, unreduced pension.
          {'\n\n'}<Text style={styles.bold}>Early Retirement Age (ERA):</Text> The minimum age for early retirement with a reduction in pension.
          {'\n\n'}<Text style={styles.bold}>Deferred Retirement Benefit:</Text> A future pension you elect to receive later, typically upon reaching ERA or NRA.
          {'\n\n'}<Text style={styles.bold}>Withdrawal Settlement:</Text> A final lump-sum payout of your own contributions plus interest. Ends your rights with the Fund.
          {'\n\n'}<Text style={styles.bold}>Lump Sum:</Text> A one-time, optional payment (up to 1/3 of pension) at retirement under Normal or Early Retirement, the lump sum reduces your future monthly pension proportions.
          {'\n\n'}<Text style={styles.bold}>Actuarial Present Value (APV) or Commutation Factor:</Text> The discounted value of your full lifetime pension benefit, based on life expectancy and interest rates.
        </Text>
      </View>
    </View>
  );

  const renderFormulasContent = () => (
    <View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calculator size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>Key Formulas Applied</Text>
        </View>
      </View>

      {/* 1. Withdrawal Settlement Formula */}
      <View style={styles.formulaSection}>
        <Text style={styles.formulaTitle}>1. Withdrawal Settlement Formula (Article 31)</Text>
        <Text style={styles.formulaContent}>
          <Text style={styles.bold}>Applicable to all staff separating from service (mandatory for CS &lt; 5 years; optional for CS ≥ 5 years)</Text>
          {'\n\n'}For CS &lt; 5 years = Own Contributions + Compound Interest (3.25% per year) + No Bonus
          {'\n\n'}For CS ≥ 5 years = Own Contributions + Compound Interest (3.25% per year) + Bonus (if CS ≥ 5 years)
          {'\n\n'}• 5 ≤ CS ≤ 15 years: + 10% per year of CS after year 5, up to 100%
          {'\n'}• CS > 15 years: + 100% bonus (maximum allowed)
        </Text>
      </View>

      {/* 2. Periodic Retirement Benefit Formula */}
      <View style={styles.formulaSection}>
        <Text style={styles.formulaTitle}>2. Periodic Retirement Benefit Formula (Annual Pension Amount)</Text>
        <Text style={styles.formulaContent}>
          <Text style={styles.bold}>Applicable to Staff with CS ≥ 5 years, opting for Normal, Early, or Deferred Retirement Benefit:</Text>
          {'\n\n'}Annual Pension = FAR × ROA × Years of CS
          {'\n\n'}Notes: FAR is typically based on the average pensionable remuneration over the highest 36 consecutive months in the last 5 years of CS.
        </Text>
      </View>

      {/* 3. Early Retirement Reduction */}
      <View style={styles.formulaSection}>
        <Text style={styles.formulaTitle}>3. Early Retirement Reduction (Applied to Periodic Benefit)</Text>
        <Text style={styles.formulaContent}>
          Reduced Pension = Annual Pension × (1 - Reduction Factor)
          {'\n\n'}The Reduction Factor is determined based on how many years/months before NRA the benefit begins.
          {'\n\n'}The reduction typically ranges between 3% to 6% per year depending on actuarial rules at the time of entry.
        </Text>
      </View>

      {/* 4. Deferred Retirement Benefit */}
      <View style={styles.formulaSection}>
        <Text style={styles.formulaTitle}>4. Deferred Retirement Benefit</Text>
        <Text style={styles.formulaContent}>
          No additional formula — same as periodic pension, but deferred until ERA or NRA
          {'\n\n'}• No actuarial reduction if collected at NRA
          {'\n'}• Payable at choice of staff at ERA or NRA
        </Text>
      </View>

      {/* 5. Lump Sum */}
      <View style={styles.formulaSection}>
        <Text style={styles.formulaTitle}>5. Lump Sum</Text>
        <Text style={styles.formulaContent}>
          Lump Sum = 1/3 × Annual Pension × Commutation Factor
        </Text>
      </View>
    </View>
  );

  const renderScenariosContent = () => (
    <View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Info size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>Benefits Scenarios & Options</Text>
        </View>
      </View>

      {/* Scenario 1: Normal Retirement */}
      <View style={styles.scenarioSection}>
        <Text style={styles.scenarioTitle}>Scenario 1: Normal Retirement (Age 65)</Text>
        <Text style={styles.scenarioContent}>
          <Text style={styles.bold}>Eligibility:</Text> Staff with 5+ years of contributory service
          {'\n\n'}<Text style={styles.bold}>Benefits Available:</Text>
          {'\n'}• Full periodic pension (no reduction)
          {'\n'}• Optional lump sum (up to 1/3 of pension)
          {'\n'}• Survivor benefits for eligible dependents
          {'\n\n'}<Text style={styles.bold}>Calculation:</Text> Annual Pension = FAR × ROA × Years of CS
        </Text>
      </View>

      {/* Scenario 2: Early Retirement */}
      <View style={styles.scenarioSection}>
        <Text style={styles.scenarioTitle}>Scenario 2: Early Retirement (Age 60-64)</Text>
        <Text style={styles.scenarioContent}>
          <Text style={styles.bold}>Eligibility:</Text> Staff with 25+ years of contributory service
          {'\n\n'}<Text style={styles.bold}>Benefits Available:</Text>
          {'\n'}• Reduced periodic pension
          {'\n'}• Optional lump sum (up to 1/3 of reduced pension)
          {'\n'}• Survivor benefits for eligible dependents
          {'\n\n'}<Text style={styles.bold}>Reduction Factors:</Text>
          {'\n'}• Age 60: Up to 25% reduction
          {'\n'}• Age 61: Up to 18.75% reduction
          {'\n'}• Age 62: Up to 12.5% reduction
          {'\n'}• Age 63: Up to 6.25% reduction
          {'\n'}• Age 64: Up to 3% reduction
        </Text>
      </View>

      {/* Scenario 3: Deferred Retirement */}
      <View style={styles.scenarioSection}>
        <Text style={styles.scenarioTitle}>Scenario 3: Deferred Retirement</Text>
        <Text style={styles.scenarioContent}>
          <Text style={styles.bold}>Eligibility:</Text> Staff with 5+ years of contributory service who separate before retirement age
          {'\n\n'}<Text style={styles.bold}>Benefits Available:</Text>
          {'\n'}• Pension payable at ERA (with reduction) or NRA (full pension)
          {'\n'}• No lump sum option
          {'\n'}• Survivor benefits during deferral period
          {'\n\n'}<Text style={styles.bold}>Key Features:</Text>
          {'\n'}• Pension amount frozen at separation
          {'\n'}• No cost-of-living adjustments during deferral
          {'\n'}• Can convert to withdrawal settlement before age 60
        </Text>
      </View>

      {/* Scenario 4: Withdrawal Settlement */}
      <View style={styles.scenarioSection}>
        <Text style={styles.scenarioTitle}>Scenario 4: Withdrawal Settlement</Text>
        <Text style={styles.scenarioContent}>
          <Text style={styles.bold}>Eligibility:</Text> All staff upon separation (mandatory for CS &lt; 5 years)
          {'\n\n'}<Text style={styles.bold}>Benefits Available:</Text>
          {'\n'}• Lump sum payment of contributions + interest + bonus
          {'\n'}• Immediate payment upon separation
          {'\n'}• No future pension rights
          {'\n\n'}<Text style={styles.bold}>Bonus Structure:</Text>
          {'\n'}• CS &lt; 5 years: No bonus
          {'\n'}• 5-15 years: 10% per year after year 5 (max 100%)
          {'\n'}• CS > 15 years: 100% bonus
        </Text>
      </View>

      {/* Scenario 5: Disability Benefits */}
      <View style={styles.scenarioSection}>
        <Text style={styles.scenarioTitle}>Scenario 5: Disability Benefits</Text>
        <Text style={styles.scenarioContent}>
          <Text style={styles.bold}>Eligibility:</Text> Staff who become disabled while in service
          {'\n\n'}<Text style={styles.bold}>Benefits Available:</Text>
          {'\n'}• Immediate pension regardless of age or service
          {'\n'}• Minimum pension guarantee
          {'\n'}• Survivor benefits for dependents
          {'\n\n'}<Text style={styles.bold}>Calculation:</Text>
          {'\n'}• Based on actual service and projected service to NRA
          {'\n'}• Subject to medical certification
        </Text>
      </View>
    </View>
  );

  const getTabContent = () => {
    switch (activeTab) {
      case 'app':
        return renderAppContent();
      case 'concepts':
        return renderConceptsContent();
      case 'formulas':
        return renderFormulasContent();
      case 'scenarios':
        return renderScenariosContent();
      default:
        return renderAppContent();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>About MyUNPension</Text>
      </View>

      {renderTabButtons()}

      <View style={styles.content}>
        {getTabContent()}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
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
  conceptText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  bold: {
    fontWeight: '700',
  },
  formulaSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: 12,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  formulaContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  scenarioSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: 12,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  scenarioContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  featureItemTight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTextTight: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginLeft: 8,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginRight: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
});