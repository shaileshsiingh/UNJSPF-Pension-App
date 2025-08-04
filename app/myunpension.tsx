import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView,
  StatusBar,
  Platform,
  Animated
} from 'react-native';
// import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';

const LOGO_URL = 'https://res.cloudinary.com/dnvdqfz5r/image/upload/v1754235912/United_Nations_Peace_Emblem_opjti4.png';
const { width, height } = Dimensions.get('window');


const isTablet = width > 768;
const isSmallScreen = width < 380;
const isMediumScreen = width < 480;

export default function LandingPage() {
//   const { user, loading } = useAuth();
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

//   React.useEffect(() => {
//     if (!loading && user) {
//       router.replace('/(tabs)');
//     }
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
//   }, [user, loading]);

//   if (loading) return null;



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0EA5E9" />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
          <View style={styles.heroContent}>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: LOGO_URL }}
                style={styles.logo}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.heroTitle}>MyUNPension</Text>
            <Text style={styles.heroSubtitle}>Your Complete Guide to UN Separation Benefits</Text>
            <Text style={styles.heroDescription}>
              Take Control of your retirement planning. This app gives you a complete overview of all your retirement benefits from UN Pension Fund and Employing Organization
            </Text>

            {/* Who Section - Moved into Hero */}
            <View style={styles.whoCard}>
              <Text style={styles.whoTitle}>Who is MyUNPension for?</Text>
              <Text style={styles.whoDescription}>
                Whether you're a new UN staff member, planning early retirement, approaching separation or already retired. <Text style={styles.boldText}>MyUNPension</Text> helps you understand, estimate, and track your UNJSPF benefits with confidence.
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Key Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Key Features Of This Application</Text>
            <Text style={styles.sectionSubtitle}>Everything you need to estimate and manage your UN pension</Text>
          </View>
          
          <View style={styles.featuresGrid}>
            {/* Core Calculations */}
            <View style={styles.featureCategory}>
              <Text style={styles.categoryTitle}>Core Calculations</Text>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Actuarial Age Calculator</Text>
                <Text style={styles.featureDesc}>Find your Actuarial Age, Early, and Normal Retirement Ages based on UNJSPF rules</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Pension Calculator</Text>
                <Text style={styles.featureDesc}>Get precise estimates of your monthly pension using your salary and service history</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Monthly Pension Snapshot</Text>
                <Text style={styles.featureDesc}>Apply Adjustments for Cost-of-Living and After-Service Health Insurance contributions</Text>
              </View>
            </View>

            {/* Documentation & Benefits */}
            <View style={styles.featureCategory}>
              <Text style={styles.categoryTitle}>Documentation & Benefits</Text>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Required Documents</Text>
                <Text style={styles.featureDesc}>Access a checklist of mandatory documents for timely processing of your pension</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>HR Entitlements</Text>
                <Text style={styles.featureDesc}>Procedures to help you claim HR benefits of separation from your Employing Organization</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Organization Grant & Leave Encashment</Text>
                <Text style={styles.featureDesc}>Separation Grant and End-of-Assignment Travel benefits</Text>
              </View>
            </View>

            {/* Support & Planning */}
            <View style={styles.featureCategory}>
              <Text style={styles.categoryTitle}>Support & Planning</Text>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Post Retirement Resources</Text>
                <Text style={styles.featureDesc}>Support for life after UN service</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Financial Planning Tools</Text>
                <Text style={styles.featureDesc}>Smart strategies to maximize your pension income effectively</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Relocation & Community Support</Text>
                <Text style={styles.featureDesc}>Information on settling in your retirement destination and connecting with UN retirees</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About UN Pension Fund */}
        <View style={styles.aboutSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>United Nations Joint Staff Pension Fund</Text>
            <Text style={styles.sectionSubtitle}>Your pension is managed by a globally trusted institution</Text>
          </View>
          
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>$96B</Text>
              <Text style={styles.statLabel}>Asset Value</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>111%</Text>
              <Text style={styles.statLabel}>Funded Ratio</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Organizations</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>150K</Text>
              <Text style={styles.statLabel}>Active Staff</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>89K</Text>
              <Text style={styles.statLabel}>Retirees</Text>
            </View>
          </View>

          {/* Key Facts */}
          <View style={styles.factsCard}>
            <Text style={styles.factsTitle}>Key Facts About Your Pension</Text>
            {[
              'Established in 1949 by the General Assembly, UNJSPF is a defined benefit plan providing retirement, death, disability, and related benefits',
              'The Fund currently pays out an average of $40,000 per pensioner annually to over 89,000 pensioners',
              'In its 75-year history, the Fund has never missed a pension payment. It has adequate resources to meet the obligations in the next 30-40 years',
              'UN retirees, typically aged 60-65, have an average post-retirement life expectancy of about 24-28 years at the time of their retirement besides the value of your pension',
              'Your age, length of contributory service, salary grade and step at the time of retirement decides the value of your pension',
              'You can receive your pension in your home country\'s currency in your preferred bank account',
              'Your Pension is adjusted based on cost of living and paid for life',
              'After your death, benefits are transferred to your dependent spouse or eligible survivors',
              'You can separate at any time you want'
            ].map((fact, index) => (
              <View key={index} style={styles.factItem}>
                <View style={styles.factDot} />
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
            <Text style={styles.sourceText}>Source: UNJSPF</Text>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <Text style={styles.sectionSubtitle}>Ready in 3 Simple Steps</Text>
          </View>
          
          <View style={styles.stepsContainer}>
            {[
              { 
                title: 'Create Your Free Account', 
                desc: 'Sign up in seconds to get started.',
                icon: '👤'
              },
              { 
                title: 'Input Your Service Details', 
                desc: 'Enter your key information like years of contribution, salary, grade, and step.',
                icon: '📝'
              },
              { 
                title: 'Explore & Compare', 
                desc: 'Instantly see your pension projections and model different retirement scenarios to plan your future.',
                icon: '📊'
              }
            ].map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaBackground} />
          <Text style={styles.ctaTitle}>Ready to see your retirement future?</Text>
          <Text style={styles.ctaDesc}>Take control of your retirement planning today. Make informed decisions with clear, accurate data.</Text>
          <TouchableOpacity 
            style={styles.ctaButton} 
            onPress={() => router.push('/signup')}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaButtonText}>Get Started for Free</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Disclaimer</Text>
          <Text style={styles.footerText}>
            MyUNPension is an independent, third-party tool, developed by a former UN staff member who recently retired, and is not affiliated with, endorsed by, or in any way officially connected with the United Nations, the UNJSPF, or any of its subsidiary organizations. All calculations are estimates provided for planning purposes only and should be verified with the UNJSPF before making any financial decisions.
          </Text>
          
          <View style={styles.footerLinks}>
            <TouchableOpacity style={styles.footerLinkItem} activeOpacity={0.7}>
              <Text style={styles.footerLink}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerLinkItem} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerLinkItem} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerLinkItem} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.footerCopyright}>© 2025 MyUNPension. All Rights Reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero Section
  heroSection: {
    backgroundColor: '#f8fafc',
    paddingVertical: isSmallScreen ? 40 : 60,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
  },
  logoContainer: {
    width: isSmallScreen ? 100 : 120,
    height: isSmallScreen ? 100 : 120,
    marginBottom: 24,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  heroTitle: {
    color: '#0EA5E9',
    fontSize: isSmallScreen ? 32 : 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  heroSubtitle: {
    color: '#1f2937',
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  heroDescription: {
    color: '#6b7280',
    fontSize: isSmallScreen ? 16 : 17,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 500,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Who Card (in Hero)
  whoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
  },
  whoTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    color: '#0EA5E9',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  whoDescription: {
    color: '#4b5563',
    fontSize: isSmallScreen ? 15 : 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  boldText: {
    fontWeight: '700',
    color: '#0EA5E9',
  },

  // Sections
  section: {
    paddingVertical: isSmallScreen ? 40 : 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  sectionHeader: {
    marginBottom: 32,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: width < 350 ? 20 : isSmallScreen ? 24 : 28,
    fontWeight: '700',
    color: '#0EA5E9',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  sectionSubtitle: {
    fontSize: isSmallScreen ? 16 : 17,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Features Grid
  featuresGrid: {
    gap: 24,
  },
  featureCategory: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 20,
    borderLeft: 4,
    borderLeftColor: '#0EA5E9',
  },
  categoryTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  featureItem: {
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: isSmallScreen ? 16 : 17,
    fontWeight: '600',
    color: '#0EA5E9',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  featureDesc: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#4b5563',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // About Section
  aboutSection: {
    paddingVertical: isSmallScreen ? 40 : 50,
    paddingHorizontal: 20,
    backgroundColor: '#f0f9ff',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: isSmallScreen ? '45%' : '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: '800',
    color: '#0EA5E9',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statLabel: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Facts Card
  factsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  factsTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  factDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0EA5E9',
    marginTop: 8,
    marginRight: 12,
  },
  factText: {
    flex: 1,
    fontSize: isSmallScreen ? 14 : 15,
    color: '#4b5563',
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  sourceText: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Steps
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: isSmallScreen ? 16 : 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
  },
  stepTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  stepDesc: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // CTA Section
  ctaSection: {
    position: 'relative',
    backgroundColor: '#ffffff',
    paddingVertical: isSmallScreen ? 40 : 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  ctaBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
  ctaTitle: {
    color: '#1f2937',
    fontSize: isSmallScreen ? 28 : 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
    zIndex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  ctaDesc: {
    color: '#6b7280',
    fontSize: isSmallScreen ? 16 : 17,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 400,
    zIndex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  ctaButton: {
    backgroundColor: '#0EA5E9',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 1,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Footer
  footer: {
    backgroundColor: 'rgb(66, 65, 65)',
    paddingVertical: isSmallScreen ? 40 : 56,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerTitle: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  footerText: {
    color: 'cyan',
    fontSize: isSmallScreen ? 13 : 14,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 20 : 24,
    marginBottom: 36,
    maxWidth: 520,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 28,
    gap: 12,
  },
  footerLinkItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  footerLink: {
    color: 'cyan',
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  footerCopyright: {
    color: 'cyan',
    fontSize: isSmallScreen ? 12 : 13,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});