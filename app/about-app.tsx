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
  Target 
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function CombinedAboutScreen() {
  const [activeTab, setActiveTab] = useState('pension'); // 'pension' or 'app'

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'pension' && styles.activeTab]}
        onPress={() => setActiveTab('pension')}
      >
        <Building size={20} color={activeTab === 'pension' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'pension' && styles.activeTabText]}>
          UN Pension Fund
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'app' && styles.activeTab]}
        onPress={() => setActiveTab('app')}
      >
        <Smartphone size={20} color={activeTab === 'app' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.tabText, activeTab === 'app' && styles.activeTabText]}>
          About This App
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPensionContent = () => (
    <View>
      {/* <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Building size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>UNJSPF Pension Fund</Text>
        </View>
        <Text style={styles.description}>
          The United Nations Joint Staff Pension Fund (UNJSPF) is a defined benefit plan serving over 240,000 members worldwide. 
          It provides retirement, disability, and survivor benefits with a funding ratio exceeding 100%, ensuring long-term solvency.
        </Text>
      </View> */}

      {/* <View style={styles.section}> */}
        {/* <View style={styles.sectionHeader}>
          <Info size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>About the UNJSPF</Text>
        </View> */}
        {/* <View style={styles.card}>
          <Text style={styles.cardDescription}>
            • <Text style={{ fontWeight: 'bold' }}>Established in 1949 by the United Nations General Assembly</Text>, UNJSPF is a defined benefit plan providing retirement, death, disability, and related benefits for staff of the United Nations and other member organizations.{"\n\n"}
            • <Text style={{ fontWeight: 'bold' }}>Strong Funding:</Text> The Fund is one of the world's strongest, with over $35 billion in assets and a 111% funded ratio—more than enough to meet obligations for the next 30 to 40 years.{"\n\n"}
            • <Text style={{ fontWeight: 'bold' }}>Reliable Payments:</Text> The Fund pays an average of $400,000 per year to over 83,000 retirees. In its 75-year history, the Fund has never missed a pension payment.{"\n\n"}
            • <Text style={{ fontWeight: 'bold' }}>Retirement Age:</Text> UN retirement age is 60 to 65 (typically 24 to 25 years for men and 26 to 28 years for women), with life expectancy decreasing by 2 to 3 years if retiring at age 65.{"\n\n"}
            • <Text style={{ fontWeight: 'bold' }}>Flexible Separation:</Text> You can separate at any time you want.{"\n\n"}
            • <Text style={{ fontWeight: 'bold' }}>Pension Calculation:</Text> Your pension is based on your wages, years of contributions, salary grade, and step.{"\n\n"}
            • <Text style={{ fontWeight: 'bold' }}>Global Payments:</Text> It is institution-adjusted, paid for life, and deposited directly into your bank account in your local currency.{"\n\n"}
            • <Text style={{ fontWeight: 'bold' }}>Survivor Benefits:</Text> After your death, benefits are transferred to your dependent spouse.
          </Text>
        </View> */}
      {/* </View> */}

      {/* <View style={styles.section}> */}
        {/* <View style={styles.sectionHeader}>
          <Calculator size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>Benefit Calculation</Text>
        </View> */}
        
        {/* <View style={styles.factorList}>
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
        </View> */}
      {/* </View> */}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>Separation Scenarios & Options</Text>
        </View>
        
        {/* Less than 5 years of Contributory Service: No Pension Rights */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: '#B91C1C' }]}>Less than 5 years of Contributory Service: No Pension Rights</Text>
          <Text style={{ fontStyle: 'italic', color: '#6B7280', marginBottom: 4 }}>You have 2 options:</Text>
          <Text style={styles.cardDescription}>
            <Text style={{ fontWeight: 'bold' }}>Option 1: Withdrawal Settlement (Article 31){'\n'}</Text>
            One-time payment equal to your own contributions plus 3.25% compound interest. This is a final decision—no more pension from the Fund after this. No child benefit is paid under this option.{"\n\n"}
            <Text style={{ fontWeight: 'bold' }}>Option 2: Deferment or Benefit for 36 Months (Article 32){'\n'}</Text>
            You can delay taking your withdrawal settlement for up to 36 months. If you go back to work with the same pension plan within those 36 months, your membership is treated as continuous (as long as you haven't taken the money). If you don't go back to work, you must submit your payment instructions before the 36 months end. If you do nothing by the end of 36 months, the Fund will automatically give you a Withdrawal Settlement.
          </Text>
        </View>

        {/* 5+ years before Early Retirement Age */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: '#2563EB' }]}>5+ Years of Contributory Service Before Early Retirement Age</Text>
          <Text style={{ fontStyle: 'italic', color: '#6B7280', marginBottom: 4 }}>You have 3 options:</Text>
          <Text style={styles.cardDescription}>
            <Text style={{ fontWeight: 'bold' }}>Option 1: Deferred Retirement Benefit (Article 30){'\n'}</Text>
            Receive your benefit at normal retirement age (or earlier with a reduction). This gives you a monthly pension when you're older. No child benefit is paid under this option.{"\n\n"}
            <Text style={{ fontWeight: 'bold' }}>Option 2: Withdrawal Settlement (Article 31){'\n'}</Text>
            One-time payment equal to your own contributions plus interest. You give up all rights to future pension benefits. This is a final decision—no more pension from the Fund after this.{"\n\n"}
            <Text style={{ fontWeight: 'bold' }}>Option 3: Deferment of Choice or Benefit for 36 Months (Article 32){'\n'}</Text>
            Delay your decision (between Option 1 and 2) for up to 36 months from when you leave your job. If you go back to work with the same pension plan within those 36 months, your membership is treated as continuous. If you do nothing by the end of 36 months, the Fund will automatically give you a Deferred Retirement Benefit.
          </Text>
        </View>

        {/* 5+ years after Early Retirement Age but before Normal Retirement Age */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: '#F59E42' }]}>5+ Years of Contributory Service After Early Retirement Age but Before Normal Retirement Age</Text>
          <Text style={{ fontStyle: 'italic', color: '#6B7280', marginBottom: 4 }}>You have 4 options:</Text>
          <Text style={styles.cardDescription}>
            <Text style={{ fontWeight: 'bold' }}>Option 1: Early Retirement Benefit (Article 29){'\n'}</Text>
            Start receiving monthly payments before reaching normal retirement age. These payments may be reduced since you retire early. You can choose to commute (convert) up to one-third of the pension into a lump sum (one-time payment). The rest will be paid as monthly pension for life.{"\n\n"}
            <Text style={{ fontWeight: 'bold' }}>Option 2: Deferred Retirement Benefit (Article 30){'\n'}</Text>
            Delay your pension until you reach normal retirement age (or take it earlier with reductions). No child benefit is included with this option.{"\n\n"}
            <Text style={{ fontWeight: 'bold' }}>Option 3: Withdrawal Settlement (Article 31){'\n'}</Text>
            One-time payment equal to your own contributions plus interest. You give up all rights to any future rights to pension benefits. This is a final decision—no more pension from the Fund after this.{"\n\n"}
            <Text style={{ fontWeight: 'bold' }}>Option 4: Deferment of Choice for 36 Months (Article 32){'\n'}</Text>
            You can take up to 36 months to choose between the above 3 options. If you go back to work and rejoin the Fund within those 36 months, your service is treated as continuous. If you do nothing by the end of 36 months, the Fund will automatically give you a Deferred Retirement Benefit (Option 2).
          </Text>
        </View>

        {/* 5+ years at Normal Retirement Age */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: '#059669' }]}>5+ Years of Contributory Service at Normal Retirement Age</Text>
          <Text style={{ fontStyle: 'italic', color: '#6B7280', marginBottom: 4 }}>Your only option:</Text>
          <Text style={styles.cardDescription}>
            <Text style={{ fontWeight: 'bold' }}>Option: Normal Retirement Benefit (Article 28){'\n'}</Text>
            You are eligible for the Normal Retirement Benefit, paid as a monthly pension for life. You can choose to commute (convert) up to one-third of this benefit into a lump sum (one-time payment). The rest will be paid as monthly income for the rest of your life. If you prefer, you can take the full benefit as monthly payments with no lump sum.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderAppContent = () => (
    <View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Smartphone size={24} color="#2563EB" strokeWidth={2} />
          <Text style={styles.sectionTitle}>UN Pension Application</Text>
        </View>
        <Text style={styles.description}>
          This app is designed specifically for UNJSPF participants. It incorporates the Fund's defined benefit formula, vested rights criteria (5 or more years of contributory service), and a range of separation options. Available on iOS, Android, and web platforms, it provides benefit estimates based on official UNJSPF regulations, using your contributory service and final average remuneration.
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

      {/* <View style={styles.section}>
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
      </View> */}

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

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>Disclaimer</Text>
        <Text style={styles.disclaimerText}>
          This application provides estimates only. Actual pension benefits may vary based on your organization's 
          specific rules, regulations, and any changes to the pension scheme. Always consult with your HR department 
          or pension administrator for official calculations and advice.
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>About UN Pension</Text>
      </View>

      {renderTabButtons()}

      <View style={styles.content}>
        {activeTab === 'pension' ? renderPensionContent() : renderAppContent()}

        {/* Common Important Note Section */}
        <View style={styles.importantNote}>
          <Text style={styles.importantTitle}>Important Note</Text>
          <Text style={styles.importantText}>
            This app created by a former UN staff member who recently completed the retirement process. It walks you through key steps to take before retirement and provides benefit estimates based on the official UNJSPF Regulations and Rules.{"\n\n"}
            {/* <Text style={{ fontWeight: 'bold' }}>Please note:</Text>{"\n"} */}
            While we aim to provide accurate and current guidance, we are not official representatives of the United Nations Joint Staff Pension Fund and cannot speak on its behalf. Do not enter or share your personal information on this app. For official and personalized pension estimates, always refer to the UNJSPF Member Self-Service.{"\n\n"}
            <Text style={{ fontWeight: 'bold' }}>We're here to help make your retirement journey easier—let's get started!</Text>{"\n"}
            Your suggestions for improvements are welcome. <Text style={{ color: '#2563EB', textDecorationLine: 'underline' }}>Contact us</Text> (link coming soon).
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
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
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
});