import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
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
      {/* One App, All Devices */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>One App, All Devices</Text>
        <Text style={styles.conceptContent}>
          Available on Android, iOS, and web.{'\n'}
          A single account gives you seamless access to all features across mobile and desktop platforms.{'\n'}
          Optimized for security, speed, and accessibility.
        </Text>
      </View>

      {/* Pension Fund Benefits */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>🔹 Pension Fund Benefits (From UNJSPF)</Text>
        <Text style={styles.conceptSubtitle}>Your pension, explained and simplified</Text>
        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Actuarial Age Calculator</Text> → Find your actuarial, early, normal, and mandatory separation ages / dates.
          {'\n'}<Text style={styles.bold}>Pension Calculator</Text> → Estimate your monthly pension using salary and service history.
          {'\n'}<Text style={styles.bold}>Monthly Pension Snapshot</Text> → View your final monthly pension after cost-of-living and after service health insurance adjustments.
          {'\n'}<Text style={styles.bold}>Required Documents</Text> → Access a checklist for smooth pension processing.
        </Text>
      </View>

      {/* Separation Benefits */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>🔹 Separation Benefits (From your employing organization)</Text>
        <Text style={styles.conceptSubtitle}>Procedures to help claim HR benefits on separation</Text>
        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Relocation Grant</Text> → Financial support for moving your household after separation.
          {'\n'}<Text style={styles.bold}>Repatriation Grant</Text> → Cash benefit to help you resettle in your home country.
          {'\n'}<Text style={styles.bold}>Final Payments</Text> → Accrued annual leave and any other dues owed.
          {'\n'}<Text style={styles.bold}>End-of-Assignment Travel</Text> → Travel entitlements for you and eligible family members.
        </Text>
      </View>

      {/* Post-Retirement Resources */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>🔹 Post-Retirement Resources</Text>
        <Text style={styles.conceptSubtitle}>Guidance to plan, settle, and stay connected</Text>
        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Financial Planning Tools</Text> → Strategies to make the most of your pension income.
          {'\n'}<Text style={styles.bold}>Relocation Support</Text> → Guidance for settling in your retirement destination.
          {'\n'}<Text style={styles.bold}>Community & Services</Text> → Connect with retirees and local support networks.
        </Text>
      </View>

      {/* Privacy & Security */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>Privacy & Security</Text>
        <Text style={styles.conceptContent}>
          Your personal information is stored locally on your device and is not transmitted to external servers.{'\n'}
          All calculations are performed on your device to ensure maximum privacy and security.
        </Text>
      </View>
    </View>
  );

  const renderConceptsContent = () => (
    <View>
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>📘 Key Pension Concepts</Text>
        
        {/* A. Retirement Ages */}
        <Text style={styles.subSectionTitle}>A. Retirement Ages</Text>
        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Mandatory Age of Separation (MAS):</Text> The age set by your employing organization at which you must retire from service, regardless of your pension eligibility. Most UN organizations now have MAS at 65, though some still keep it at 62.
          {'\n'}<Text style={styles.bold}>Normal Retirement Age (NRA):</Text> The age at which you are entitled to a full, unreduced pension.
          {'\n'}• Joined before 1990 → NRA = 60
          {'\n'}• Joined 1990–2013 → NRA = 62
          {'\n'}• Joined 2014 or later → NRA = 65
          {'\n'}<Text style={styles.bold}>Early Retirement Age (ERA):</Text> The minimum age for early retirement with a reduction in pension.
          {'\n'}• Joined before 2014 → ERA = 55
          {'\n'}• Joined 2014 or later → ERA = 58
        </Text>

        {/* B. Service & Eligibility */}
        <Text style={styles.subSectionTitle}>B. Service & Eligibility</Text>
        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Contributory Service (CS):</Text> The total duration during which you contributed to the UNJSPF while in pay status.
          {'\n'}<Text style={styles.bold}>Vested Pension Rights:</Text> Earned after 5 years of CS. Grants access to periodic retirement benefits.
        </Text>

        {/* C. Pension Calculation Factors */}
        <Text style={styles.subSectionTitle}>C. Pension Calculation Factors</Text>
        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Final Average Remuneration (FAR):</Text> The average of your highest pensionable salaries over 36 consecutive months within the last 5 years of service. It represents your final salary level used to calculate your pension benefit.
          {'\n'}<Text style={styles.bold}>Rate of Accumulation (ROA):</Text> The percentage of your FAR that you earn as annual pension credit for each year of CS to the UNJSPF.
        </Text>

        {/* ROA Table */}
        <View style={styles.roaTable}>
          <View style={styles.roaHeaderRow}>
            <Text style={styles.roaHeaderText}>CS</Text>
            <Text style={styles.roaHeaderText}>ROA</Text>
            <Text style={styles.roaHeaderText}>Max Accrual</Text>
          </View>
          <View style={styles.roaRow}>
            <Text style={styles.roaCell}>First 5 years</Text>
            <Text style={styles.roaCell}>1.50%</Text>
            <Text style={styles.roaCell}>7.50%</Text>
          </View>
          <View style={styles.roaRow}>
            <Text style={styles.roaCell}>Next 5 years</Text>
            <Text style={styles.roaCell}>1.75%</Text>
            <Text style={styles.roaCell}>8.75%</Text>
          </View>
          <View style={styles.roaRow}>
            <Text style={styles.roaCell}>Next 25 years</Text>
            <Text style={styles.roaCell}>2.00%</Text>
            <Text style={styles.roaCell}>50.00%</Text>
          </View>
          <View style={styles.roaRow}>
            <Text style={styles.roaCell}>Beyond 35 years</Text>
            <Text style={styles.roaCell}>1.00%</Text>
            <Text style={styles.roaCell}>3.75%</Text>
          </View>
        </View>

        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Notes:</Text>
          {'\n'}• Maximum ROA = 70% of FAR. Reached after 38.75 years of CS.
          {'\n'}• ROA doesn't increase beyond 70%, but contributions still count for lump-sum and FAR growth.
          {'\n'}<Text style={styles.bold}>Actuarial Factor (Commutation Factor) / APV:</Text> A statistical value used to convert part of your annual pension into a one-time lump sum at retirement. It represents the discounted value of your full lifetime pension benefit, based on life expectancy and interest rates.
        </Text>

        {/* D. Benefit Payment Options */}
        <Text style={styles.subSectionTitle}>D. Benefit Payment Options</Text>
        <Text style={styles.conceptContent}>
          <Text style={styles.bold}>Lump Sum:</Text> A one-time, optional payment (up to 1/3 of pension) at retirement under Normal or Early Retirement. The lump sum reduces your future monthly pension.
          {'\n'}<Text style={styles.bold}>Withdrawal Settlement:</Text> A final lump-sum payout of your own contributions plus interest. Ends your rights with the Fund.
          {'\n'}<Text style={styles.bold}>Deferred Retirement Benefit:</Text> A future pension you elect to receive later, typically upon reaching ERA or NRA.
          {'\n'}<Text style={styles.bold}>Two-Track Estimate:</Text> A tool in MSS for retirees (post–Aug 2015) that compares pension values in USD vs. local currency using a 36-month average exchange rate.
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
        <Text style={styles.title}>Quick Tools</Text>
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
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0EA5E9',
    marginTop: 12,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  roaTable: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  roaHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  roaHeaderText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#0EA5E9',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  roaRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  roaCell: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
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
  conceptSection: {
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: 12,
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  conceptSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  conceptContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});