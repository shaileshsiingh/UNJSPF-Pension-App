import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { 
  ArrowLeft, 
  Info, 
  Calculator, 
  Smartphone, 
  BookOpen,
  LogOut
} from 'lucide-react-native';
import { getRobotoFont, getRobotoLikeFont } from '../utils/fonts';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Enhanced responsive breakpoints
const isXSmallScreen = width < 360;
const isSmallScreen = width < 414;
const isMediumScreen = width < 768;
const isTablet = width >= 768;

// Responsive scaling functions
const scaleFont = (small: number, medium = small * 1.15, large = small * 1.3) => {
  if (isXSmallScreen) return small * 0.9;
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const scaleSize = (small: number, medium = small * 1.15, large = small * 1.3) => {
  if (isXSmallScreen) return small * 0.9;
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const getHorizontalPadding = () => {
  if (isXSmallScreen) return 16;
  if (isSmallScreen) return 20;
  if (isMediumScreen) return 28;
  return 32;
};

export default function CombinedAboutScreen() {
  const [activeTab, setActiveTab] = useState('app');

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'app' && styles.activeTab]}
        onPress={() => setActiveTab('app')}
      >
        <Smartphone size={scaleSize(14)} color={activeTab === 'app' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'app' && styles.activeTabText]}>
          About App
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'concepts' && styles.activeTab]}
        onPress={() => setActiveTab('concepts')}
      >
        <BookOpen size={scaleSize(14)} color={activeTab === 'concepts' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'concepts' && styles.activeTabText]}>
          Concepts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'formulas' && styles.activeTab]}
        onPress={() => setActiveTab('formulas')}
      >
        <Calculator size={scaleSize(14)} color={activeTab === 'formulas' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'formulas' && styles.activeTabText]}>
          Formulas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'scenarios' && styles.activeTab]}
        onPress={() => setActiveTab('scenarios')}
      >
        <Info size={scaleSize(14)} color={activeTab === 'scenarios' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'scenarios' && styles.activeTabText]}>
          Scenarios
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderAppContent = () => (
    <View>
      {/* One App, All Devices */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>One App, All Devices</Text>
        <Text style={styles.uniformContent}>
         <Text style={styles.uniformSubtitle}>Available on Android, and iOS.</Text>{'\n'}
          A single account gives you seamless access to all features across mobile and desktop platforms.{'\n'}
          Optimized for security, speed, and accessibility.
        </Text>
      </View>

      {/* Pension Fund Benefits */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Benefits from UNJSPF</Text>
        <Text style={styles.uniformSubtitle}>Your pension, explained and simplified</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Actuarial Age Calculator</Text> - Find your actuarial, early, normal, and mandatory separation ages / dates.
          {'\n'}<Text style={styles.bold}>Pension Calculator</Text> - Estimate your monthly pension using salary and service history.
          {'\n'}<Text style={styles.bold}>Monthly Pension Snapshot</Text> - View your final monthly pension after cost-of-living and after service health insurance adjustments.
          {'\n'}<Text style={styles.bold}>Required Documents</Text> - Access a checklist for smooth pension processing.
        </Text>
      </View>

      {/* Separation Benefits */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Benefits from your employing organization</Text>
        <Text style={styles.uniformSubtitle}>Procedures to help claim HR benefits on separation</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Relocation Grant</Text> - Financial support for moving your household after separation.
          {'\n'}<Text style={styles.bold}>Repatriation Grant</Text> - Cash benefit to help you resettle in your home country.
          {'\n'}<Text style={styles.bold}>Final Payments</Text> - Accrued annual leave and any other dues owed.
          {'\n'}<Text style={styles.bold}>End-of-Assignment Travel</Text> - Travel entitlements for you and eligible family members.
        </Text>
      </View>

      {/* Post-Retirement Resources */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Post-Retirement Resources</Text>
        <Text style={styles.uniformSubtitle}>Guidance to plan, settle, and stay connected</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Financial Planning Tools</Text> - Strategies to make the most of your pension income.
          {'\n'}<Text style={styles.bold}>Relocation Support</Text> - Guidance for settling in your retirement destination.
          {'\n'}<Text style={styles.bold}>Community & Services</Text> - Connect with retirees and local support networks.
        </Text>
      </View>

      {/* Privacy & Security */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle1}>Privacy & Security</Text>
        <Text style={styles.uniformContent1}>
          Your personal information is stored locally on your device and is not transmitted to external servers.{'\n'}
          All calculations are performed on your device to ensure maximum privacy and security.
        </Text>
      </View>
    </View>
  );

  const renderConceptsContent = () => (
    <View>
      <View style={styles.uniformSection}>
        {/* <Text style={styles.uniformMainTitle}>Key Pension Concepts</Text> */}
        
        {/* A. Retirement Ages */}
        <Text style={styles.uniformSectionTitle}>Retirement Ages</Text>
        <Text style={styles.uniformContent}>
        <Text style={styles.bold}>Retirement date:</Text> Last workday of contract, or month-end at mandatory age (if born on the 1st, previous month's end).
          {'\n'} {'\n'}<Text style={styles.bold}>Mandatory Age of Separation (MAS):</Text> The age set by your employing organization at which you must retire from service, regardless of your pension eligibility. Most UN organizations now have MAS at 65, though some still keep it at 62.
          {'\n'} {'\n'}<Text style={styles.bold}>Normal Retirement Age (NRA):</Text> The age at which you are entitled to a full, unreduced pension.
          {'\n'}<Text style={styles.italic}>• Joined before 1990 = NRA 60</Text>
          {'\n'}<Text style={styles.italic}>• Joined 1990-2013 = NRA 62</Text>
          {'\n'}<Text style={styles.italic}>• Joined 2014 or later = NRA 65</Text>
          {'\n'} {'\n'}<Text style={styles.bold}>Early Retirement Age (ERA):</Text> The minimum age for early retirement with a reduction in pension.
          {'\n'}<Text style={styles.italic}>• Joined before 2014 = ERA 55</Text>
          {'\n'}<Text style={styles.italic}>• Joined 2014 or later = ERA 58</Text>
        </Text>
      </View>

      {/* B. Service & Eligibility */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformSectionTitle}>Service & Eligibility</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Contributory Service (CS):</Text> The total duration during which you contributed to the UNJSPF while in pay status.
          {'\n'} {'\n'}<Text style={styles.bold}>Vested Pension Rights:</Text> Earned after 5 years of CS. Grants access to periodic retirement benefits.
        </Text>
      </View>

      {/* C. Pension Calculation Factors */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformSectionTitle}>Pension Calculation Factors</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Final Average Remuneration (FAR):</Text> The average of your highest pensionable salaries over 36 consecutive months within the last 5 years of service.
          {'\n'} {'\n'}<Text style={styles.bold}>Rate of Accumulation (ROA):</Text> The percentage of your FAR that you earn as annual pension credit for each year of CS to the UNJSPF.
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

        <Text style={styles.uniformContent}>
        <Text style={styles.italic}>
          <Text style={styles.bold}>Notes:</Text>
         
          {'\n'}• Maximum ROA = 70% of FAR. Reached after 38.75 years of CS.
          {'\n'}• ROA doesn't increase beyond 70%, but contributions still count for lump-sum and FAR growth.
            </Text>
          {'\n'} {'\n'}<Text style={styles.bold}>Actuarial Factor (Commutation Factor) / APV:</Text> A statistical value used to convert part of your annual pension into a one-time lump sum at retirement.
          {'\n'} {'\n'}<Text style={styles.bold}>COLA:</Text> Pensions are reviewed each year on 1 April, based on the previous year's average CPI.
          {'\n'}An adjustment is applied only if inflation since the last change exceeds 2%;
          {'\n'} otherwise, it is deferred until the cumulative rise reaches at least 2%.
        </Text>
      </View>

      {/* D. Benefit Payment Options */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformSectionTitle}>Benefit Payment Options</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Lump Sum:</Text> A one-time, optional payment (up to 1/3 of pension) at retirement under Normal or Early Retirement.
          {'\n'} {'\n'}<Text style={styles.bold}>Withdrawal Settlement:</Text> A final lump-sum payout of your own contributions plus interest. Ends your rights with the Fund.
          {'\n'} {'\n'}<Text style={styles.bold}>Deferred Retirement Benefit:</Text> A future pension you elect to receive later, typically upon reaching ERA or NRA.
          {'\n'} {'\n'}<Text style={styles.bold}>Two-Track Estimate:</Text> A tool in MSS for retirees (post-Aug 2015) that compares pension values in USD vs. local currency using a 36-month average exchange rate.
        </Text>
      </View>
    </View>
  );

  const renderFormulasContent = () => (
    <View>
      {/* Withdrawal Settlement */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Withdrawal Settlement With CS</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>&lt; 5 yrs</Text> = Own Contributions + 3.25% Compound Interest (per year) + <Text style={styles.bold1}>No Bonus</Text>
          {'\n'}<Text style={styles.bold}>≥ 5 yrs</Text> = Own Contributions + 3.25% Compound Interest (per year) + <Text style={styles.bold}>Bonus</Text>
          {'\n'}<Text style={styles.bold}>5-15 yrs</Text> = Own Contributions + 3.25% Compound Interest (per year) +10% Bonus per year after year 5 (max 100%)
          {'\n'}<Text style={styles.bold}>≥ 15 yrs</Text> = Own Contributions + 3.25% Compound Interest (per year) +100% Bonus
        </Text>
      </View>

      {/* Periodic Retirement Benefit */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Periodic Retirement Benefits</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Annual Pension = FAR × ROA</Text>
          {'\n'}<Text style={styles.bold}>Monthly Pension = Annual Pension / 12 + COLA - ASHI Premium</Text>
          {'\n'}{'\n'}<Text style={styles.italic}>FAR = Final Average Remuneration (avg. of top 36 months)</Text>
          {'\n'}<Text style={styles.italic}>ROA = Rate of Accumulation</Text>
          {'\n'}<Text style={styles.italic}>CS = Contributory Service</Text>
        </Text>
      </View>

      {/* Early Retirement Reduction */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Early Retirement Reduction</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Reduced Pension = Annual Pension × (1 - Reduction Factor)</Text>
          {'\n'}Reduction Factor = 3%-6% per year before NRA
        </Text>
      </View>

      {/* Deferred Retirement Benefit */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Deferred Retirement Benefit</Text>
        <Text style={styles.uniformContent}>
          Same formula as Annual Pension, Payable at ERA or NRA
          {'\n'}No reduction if collected at NRA
        </Text>
      </View>

      {/* Lump Sum */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Lump Sum (Commutation)</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.bold}>Lump Sum = ⅓ × Annual Pension × Commutation Factor</Text>
        </Text>
      </View>
    </View>
  );

  const renderScenariosContent = () => (
    <View>
      <View style={styles.uniformSection}>
        <Text style={styles.uniformMainTitle}>Scenarios & Options</Text>
      </View>

      {/* Scenario 1: Less than 5 years of Contributory Service */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>Less than 5 years of Contributory Service: No Pension Rights</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.italic}>You have 2 options:</Text>
          {'\n'}<Text style={styles.bold}>Option 1: Withdrawal Settlement (Article 31)</Text>
          {'\n'}One-time payment equal to your own contributions plus 3.25% compound interest.
          {'\n'}This is a final decision—no more pension from the Fund after this. No child benefit
          is paid under this option.
          
          {'\n\n'}<Text style={styles.bold}>Option 2: Deferment or Benefit for 36 Months (Article 32)</Text>
          {'\n'}You can delay taking your withdrawal settlement for up to 36 months. If you go
         back to work with the same pension plan within those 36 months, your
          membership is treated as continuous (as long as you haven't taken the money).
          {'\n'}If you don't go back to work, you must submit your payment instructions before the
          36 months end. If you do nothing by the end of 36 months, the Fund will
          automatically give you a Withdrawal Settlement.
        </Text>
      </View>

      {/* Scenario 2: 5+ Years of Contributory Service Before Early Retirement Age */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>5+ Years of Contributory Service Before Early Retirement Age</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.italic}>You have 3 options:</Text>
          {'\n'}<Text style={styles.bold}>Option 1: Deferred Retirement Benefit (Article 30)</Text>
          {'\n'}Receive your benefit at normal retirement age (or earlier with a reduction).{'\n'}This
          gives you a monthly pension when you're older. No child benefit is paid under this
          option.
          
          {'\n\n'}<Text style={styles.bold}>Option 2: Withdrawal Settlement (Article 31)</Text>
          {'\n'}One-time payment equal to your own contributions plus interest. 
          {'\n'}You give up all rights to future pension benefits. This is a final decision—no more pension from
          the Fund after this.
          
          {'\n\n'}<Text style={styles.bold}>Option 3: Deferment of Choice of Benefit for 36 Months (Article 32)</Text>
          {'\n'}Delay your decision (between Option 1 and 2) for up to 36 months from when you
          leave your job.{'\n'}If you go back to work with the same pension plan within those 36
          months, your membership is treated as continuous. If you do nothing by the end of
          36 months, the Fund will automatically give you a Deferred Retirement Benefit.
        </Text>
      </View>

      {/* Scenario 3: 5+ Years of Contributory Service After Early Retirement Age but Before Normal Retirement Age */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>5+ Years of Contributory Service After Early Retirement Age but Before Normal Retirement Age</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.italic}>You have 4 options:</Text>
          {'\n'}<Text style={styles.bold}>Option 1: Early Retirement Benefit (Article 29)</Text>
          {'\n'}Start receiving monthly payments before reaching normal retirement age. These
         payments may be reduced since you retire early. {'\n'}You can choose to commute
         (convert) up to one-third of the pension into a lump sum (one-time payment). The
         rest will be paid as monthly pension for life.
          
          {'\n\n'}<Text style={styles.bold}>Option 2: Deferred Retirement Benefit (Article 30)</Text>
          {'\n'}Delay your pension until you reach normal retirement age (or take it earlier with
         reductions). No child benefit is included with this option.
          
          {'\n\n'}<Text style={styles.bold}>Option 3: Withdrawal Settlement (Article 31)</Text>
          {'\n'}One-time payment equal to your own contributions plus interest. You give up all
         rights to any future rights to pension benefits.{'\n'}This is a final decision—no more
         pension from the Fund after this.
          
          {'\n\n'}<Text style={styles.bold}>Option 4: Deferment of Choice for 36 Months (Article 32)</Text>
          {'\n'}You have up to 36 months to choose between the above 3 options. If you go
          back to work with the same pension plan within those 36 months, your service
          as continuous.{'\n'}If you do nothing by the end of 36 months, the Fund will
          automatically give you a Deferred Retirement Benefit (Option 2).
        </Text>
      </View>

      {/* Scenario 4: 5+ Years of Contributory Service at Normal Retirement Age */}
      <View style={styles.uniformSection}>
        <Text style={styles.uniformTitle}>5+ Years of Contributory Service at Normal Retirement Age</Text>
        <Text style={styles.uniformContent}>
          <Text style={styles.italic}>Your only option:</Text>
          {'\n'}<Text style={styles.bold}>Option 1: Normal Retirement Benefit (Article 28)</Text>
          {'\n'}You are eligible for the Normal Retirement Benefit, paid as a monthly pension for life. You can choose to commute (convert) up to one-third of this benefit into a lump sum (one-time payment).{'\n'}The rest will be paid as monthly income for the rest of your life. If you prefer, you can take the full benefit as monthly payments all along with.
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
            onPress={() => router.push('/(tabs)')}
          >
 <View style={{ transform: [{ scaleX: -1 }] }}>
          <LogOut size={24} color="#2563EB" strokeWidth={2} />
        </View>          </TouchableOpacity>
          <View style={styles.headerContent}>
            {/* <View style={styles.headerIconContainer}>
              <Shield size={32} color="#2563EB" strokeWidth={2} />
            </View> */}
            <Text style={styles.headerTitle}>Pension Guide</Text>
            {/* <Text style={styles.headerSubtitle}>
            Concepts, Formulas, and Options      </Text> */}
          </View>
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
    paddingTop: width < 300 ? 12 : width < 350 ? 16 : 20,
    paddingBottom: width < 300 ? 16 : width < 350 ? 20 : 24,
    paddingHorizontal: width < 300 ? 12 : width < 350 ? 16 : 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: width < 300 ? 12 : width < 350 ? 16 : 24,
    top: width < 300 ? 20 : width < 350 ? 24 : 28,
    padding: 8,
    zIndex: 1,
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#111827',
    fontFamily: getRobotoFont('bold'),
  },
  title4: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#0072CE',
    fontFamily: getRobotoFont('bold'),
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(8),
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 13,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
  },
  headerIconContainer: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: width < 300 ? 14 : width < 350 ? 16 : 18,
    fontWeight: '800',
    color: 'rgb(70 106 209)',
    marginBottom: 8,
    textAlign: 'center',
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
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(8),
    backgroundColor: '#F9FAFB',
  },
  activeTab: {
    backgroundColor: '#2563EB',
    borderRadius:25
  },
  tabText: {
    fontSize: scaleFont(10),
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: scaleSize(6),
    fontFamily: getRobotoFont('medium'),
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    padding: getHorizontalPadding(),
  },
  
  // UNIFORM STYLES - All tabs use these same styles
  uniformSection: {
    backgroundColor: '#FFFFFF',
    padding: scaleSize(12),
    borderRadius: scaleSize(8),
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: scaleSize(8),
  },
  uniformMainTitle: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#111827',
    marginBottom: scaleSize(4),
    fontFamily: getRobotoFont('bold'),
    textAlign: 'center',
  },
  uniformTitle: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#111827',
    marginBottom: scaleSize(6),
    fontFamily: getRobotoFont('medium'),
  },
  uniformTitle1: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: 'red',
    marginBottom: scaleSize(6),
    fontFamily: getRobotoFont('medium'),
  },
  uniformSectionTitle: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: 'black',
    marginTop: scaleSize(8),
    marginBottom: scaleSize(4),
    fontFamily: getRobotoFont('medium'),
  },
  uniformSubtitle: {
    fontSize: scaleFont(12),
    color: 'brown',
    marginBottom: scaleSize(6),
    fontFamily: getRobotoFont('regular'),
    fontStyle:'italic'
  },
  bold: {
    fontWeight: '600',
    color: '#374151',
    marginTop:10,
  },
  bold1: {
    fontWeight: '500',
    color: 'red',
    marginTop:10,
  },
  italic: {
    fontStyle:'italic',
    fontSize:scaleFont(10),
    color:'brown'
  },
  uniformContent: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    lineHeight: scaleFont(16),
    fontFamily: getRobotoFont('regular'),
    // fontStyle:'italic'
  },
  uniformContent1: {
    fontSize: scaleFont(12),
    color: 'red',
    lineHeight: scaleFont(16),
    fontFamily: getRobotoFont('regular'),
    // fontStyle:'italic'
  },
  
  // ROA Table - Responsive
  roaTable: {
    backgroundColor: '#F8FAFC',
    borderRadius: scaleSize(6),
    marginVertical: scaleSize(8),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  roaHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: scaleSize(6),
    paddingHorizontal: scaleSize(4),
  },
  roaHeaderText: {
    flex: 1,
    fontSize: scaleFont(11),
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
    fontFamily: getRobotoFont('medium'),
  },
  roaRow: {
    flexDirection: 'row',
    paddingVertical: scaleSize(4),
    paddingHorizontal: scaleSize(4),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  roaCell: {
    flex: 1,
    fontSize: scaleFont(10),
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: getRobotoFont('regular'),
  },
});