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
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';

const LOGO_URL = 'https://res.cloudinary.com/dnvdqfz5r/image/upload/v1754235912/United_Nations_Peace_Emblem_opjti4.png';
const { width, height } = Dimensions.get('window');


const isTablet = width > 768;
const isSmallScreen = width < 380;
const isMediumScreen = width < 480;

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    if (!loading && user) {
      router.replace('/(tabs)');
    }
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [user, loading]);

  if (loading) return null;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0EA5E9" />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Enhanced Hero Section */} 
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
          <View style={styles.heroBackground} />
          <View style={styles.heroContent}>
            <View style={styles.heroIconContainer}>
              <Image
                source={{ uri: LOGO_URL }}
                style={styles.heroLogo}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.heroTitle}>MyUNPension</Text>
            <Text style={styles.heroSubtitle}>Your Complete Guide to UN Separation Benefits</Text>
            <Text style={styles.heroDesc}>
           Take Control of your retirement planning. <br/> This app gives you a complete overview of all your retirment benefits from UN Pension Fund and Employing Organization            </Text>
            {/* <TouchableOpacity 
              style={styles.primaryBtn} 
              onPress={() => router.push('/calculator')}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryBtnText}>Calculate Your Pension Now</Text>
              <Text style={styles.primaryBtnIcon}>→</Text>
            </TouchableOpacity> */}
            
            {/* Enhanced trust indicators */}
            {/* <View style={styles.trustIndicators}>
              <View style={styles.trustItem}>
                <Text style={styles.trustIcon}>🔒</Text>
                <Text style={styles.trustText}>Secure</Text>
              </View>
              <View style={styles.trustItem}>
                <Text style={styles.trustIcon}>💯</Text>
                <Text style={styles.trustText}>Free</Text>
              </View>
              <View style={styles.trustItem}>
                <Text style={styles.trustIcon}>⚡</Text>
                <Text style={styles.trustText}>Instant</Text>
              </View>
            </View> */}
             {/* Who is MyUNPension for? Section */}
        <View style={styles.whoSection}>
          <View style={styles.whoCard}>
            <View style={styles.whoHeader}>
              {/* <View style={styles.whoIconContainer}>
                <Text style={styles.whoIcon}>👥</Text>
              </View> */}
              <Text style={styles.whoTitle}>Who is MyUNPension for?</Text>
            </View>
            {/* <Text style={styles.whoSubtitle}>MyUNPension was built for UN staff members at every stage of their career.</Text> */}
            <Text style={styles.whoDesc}>
            Whether you're a new UN staff member, planning early retirement, approaching separation or already retired. <Text style={styles.boldText}>MyUNPension</Text> helps you understand, estimate, and track your UNJSPF benefits with confidence.
            </Text>
          </View>
        </View>
          </View>
        </Animated.View>

       

        {/* Enhanced Key Features */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Key Features Of This Application</Text>
            <Text style={styles.sectionSubtitle}>Everything you need to estimate and manage your UN pension</Text>
          </View>
          
          {/* Compact Features List */}
          <View style={styles.featureCard}>
            <View style={styles.featureListCompact}>
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Actuarial Age Calculator</Text>{'\n'}
                  Find your Actuarial Age, Early, and Normal Retirement Ages based on UNJSPF rules
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Pension Calculator</Text>{'\n'}
                  Get precise estimates of your monthly pension using your salary and service history
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Monthly Pension Snapshot</Text>{'\n'}
                  Apply Adjustments for Cost-of-Living and After-Service Health Insurance contributions
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Required Documents</Text>{'\n'}
                  Access a checklist of mandatory documents for timely processing of your pension
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>HR Entitlements from Your Employing Organization</Text>{'\n'}
                  Procedures to help you claim HR benefits of separation
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Organization Grant</Text>{'\n'}
                  Separation Grant
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Leave Encashment</Text>{'\n'}
                  End-of-Assignment Travel
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Post Retirement Resources</Text>{'\n'}
                  Support for life after UN service
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Financial Planning Tools</Text>{'\n'}
                  Smart strategies to maximize your pension income effectively
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Relocation Support</Text>{'\n'}
                  Information on settling in your retirement destination
                </Text>
              </View>
              
              <View style={styles.featureItemTight}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureTextTight}>
                  <Text style={styles.boldText}>Community & Services</Text>{'\n'}
                  Connect with UN retirees and access country-specific support
                </Text>
              </View>
            </View>
          </View>
        </View>


        {/* Enhanced About UN Pension Fund */}
        <View style={styles.aboutSectionCompact}> 
          <View style={styles.sectionHeaderCompact}>
            <Text style={styles.sectionTitleCompact}>United Nations Joint Staff Pension Fund</Text>
            <Text style={styles.aboutSubtitleCompact}>Your pension is managed by a globally trusted institution</Text>
          </View>
          
          <View style={styles.statsContainerCompact}>
            <View style={styles.statCardCompact}>
              <Text style={styles.statNumberCompact}>$96B</Text>
              <Text style={styles.statLabelCompact}>Asset Value</Text>
            </View>
            <View style={styles.statCardCompact}>
              <Text style={styles.statNumberCompact}>111%</Text>
              <Text style={styles.statLabelCompact}>Funded Ratio</Text>
            </View>
            <View style={styles.statCardCompact}>
              <Text style={styles.statNumberCompact}>24</Text>
              <Text style={styles.statLabelCompact}>Participating Organizations</Text>  
            </View>
            <View style={styles.statCardCompact}>
              <Text style={styles.statNumberCompact}>1,50,000</Text>
              <Text style={styles.statLabelCompact}>Active staff</Text>
            </View>
            <View style={styles.statCardCompact}>
              <Text style={styles.statNumberCompact}>89,000</Text>
              <Text style={styles.statLabelCompact}>Retirees</Text>
            </View>
          </View>

          <View style={styles.aboutCardCompact}>
            {[
              { text: 'Established in 1949 by the General Assembly, UNJSPF is a defined benefit plan providing retirement, death, disability, and related benefits' },
              { text: 'The Fund currently pays out an average of $40,000 per pensioner annually to over 89,000 pensioners' },
              { text: 'In its 75-year history, the Fund has never missed a pension payment. It has adequate resources to meet the obligations in the next 30-40 years' },
              { text: 'UN retirees, typically aged 60-65, have an average post-retirement life expectancy of about 24-28 years at the time of their retirement besides the value of your pension' },
              { text: 'Your age, length of contributory service, salary grade and step at the time of retirement decides the value of your pension' },
              { text: 'You can receive your pension in your home country\'s currency in your preferred bank account' },
              { text: 'Your Pension is adjusted based on cost of living and paid for life' },
              { text: 'After your death, benefits are transferred to your dependent spouse or eligible survivors' },
              { text: 'You can separate at any time you want' }
            ].map((item, index) => (
              <View key={index} style={styles.aboutItemCompact}>
                <View style={styles.aboutBulletContainerCompact}>
                  <Text style={styles.aboutBulletCompact}></Text>
                </View>
                <Text style={styles.aboutTextCompact}>{item.text}</Text>
              </View>
            ))}
            <Text style={styles.sourceTextCompact}>Source: UNJSPF</Text>
          </View>
        </View>

        {/* Enhanced How It Works */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <Text style={styles.sectionSubtitle}>Ready in 3 Simple Steps</Text>
          </View>
          
          <View style={[styles.stepsContainer, {borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 20}]}>
            {[
              { title: 'Create Your Free Account', desc: 'Sign up in seconds to get started.', icon: '👤' },
              { title: 'Input Your Service Details', desc: 'Enter your key information like years of contribution, salary, grade, and step.', icon: '📝' },
              { title: 'Explore & Compare', desc: 'Instantly see your pension projections and model different retirement scenarios to plan your future.', icon: '📊' }
            ].map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Enhanced Final Call to Action */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaBackground} />
          <Text style={styles.ctaTitle}>Ready to see your retirement future?</Text>
          <Text style={styles.ctaDesc}>Take control of your retirement planning today. Make informed decisions with clear, accurate data.</Text>
          <TouchableOpacity 
            style={styles.ctaBtn} 
            onPress={() => router.push('/signup')}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaBtnText}>Get Started for Free</Text>
            {/* <Text style={styles.ctaBtnIcon}>🚀</Text> */}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerWrapper}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// Updated Styles
const getCardWidth = () => {
  if (isSmallScreen) {
    return (width - 60) / 3 - 10; // 2 cards per row on very small screens
  } else if (isMediumScreen) {
    return (width - 80) / 3 - 10; // 3 cards per row on medium screens
  } else if (isTablet) {
    return (width - 120) / 5 - 12; // 5 cards per row on tablets
  } else {
    return (width - 100) / 4 - 10; // 4 cards per row on regular screens
  }
};
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

  // Enhanced Hero Section with Sky Blue Theme
  heroSection: {
    position: 'relative',
    paddingVertical: isSmallScreen ? 20 : 50,
    paddingHorizontal: 20,
    minHeight: height * 0.7,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f4f6f8', // soft light grey similar to reference
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    zIndex: 1,
  },
  heroIconContainer: {
    width: isSmallScreen ? 120 : 140,
    height: isSmallScreen ? 120 : 140,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 32,
  },
  heroLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  heroTitle: {
    color: '#0072CE',
    fontSize: isSmallScreen ? 24 : isTablet ? 32 : 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: isSmallScreen ? 40 : isTablet ? 56 : 44,
    letterSpacing: -1.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginTop:-12,
  },
  aboutBulletContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
  },
  aboutBullet: {
    color: '#0EA5E9',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'black',
    fontSize: isSmallScreen ? 18 : isTablet ? 26 : 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  heroDesc: {
    color: '#rgba(62, 88, 112, 0.9)',
    fontSize: isSmallScreen ? 16 : 18,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 24 : 28,
    marginBottom: 40,
    paddingHorizontal: 10,
    maxWidth: 520,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  primaryBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: isSmallScreen ? 16 : 20,
    paddingHorizontal: isSmallScreen ? 28 : 40,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
    marginBottom: 36,
    minWidth: isSmallScreen ? 280 : 320,
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#0EA5E9',
    fontWeight: '800',
    fontSize: isSmallScreen ? 16 : 18,
    marginRight: 8,
    letterSpacing: -0.3,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  primaryBtnIcon: {
    color: '#0EA5E9',
    fontSize: 20,
    fontWeight: '700',
  },
  trustIndicators: {
    flexDirection: 'row',
    gap: isSmallScreen ? 24 : 32,
    marginTop: 8,
  },
  trustItem: {
    alignItems: 'center',
    opacity: 0.95,
  },
  trustIcon: {
    fontSize: isSmallScreen ? 20 : 24,
    marginBottom: 8,
  },
  trustText: {
    color: 'rgba(49, 47, 47, 0.9)',
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Enhanced Who Section
  whoSection: {
    paddingVertical: isSmallScreen ? 1 : 26,
    paddingHorizontal: 20,
    backgroundColor: '#f0f9ff',
  },
  whoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: isSmallScreen ? 24 : 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
  },
  whoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  whoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.2)',
  },
  whoIcon: {
    fontSize: 28,
  },
  whoTitle: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '800',
    color: '#0072CE',
    flex: 1,
    lineHeight: 32,
    letterSpacing: -0.8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  whoSubtitle: {
    fontSize: isSmallScreen ? 16 : 18,
    color: '#0072CE',
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 26,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  whoDesc: {
    color: '#6b7280',
    fontSize: isSmallScreen ? 15 : 16,
    lineHeight: isSmallScreen ? 22 : 26,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },

  // Enhanced Sections
  section: {
    paddingVertical: isSmallScreen ? 40 : 56,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  aboutSection: {
    paddingVertical: isSmallScreen ? 40 : 56,
    paddingHorizontal: 20,
    backgroundColor: '#f0f9ff',
  },
  sectionHeader: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 16 : isTablet ? 24 : 22,
    fontWeight: '900',
    color: '#0072CE',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: isSmallScreen ? 36 : 42,
    letterSpacing: -1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  sectionSubtitle: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '500',
  },

  // Enhanced Feature Cards

  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: isSmallScreen ? 24 : 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.2)',
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: isSmallScreen ? 20 : 24,
    fontWeight: '800',
    color: '#0072CE',
    flex: 1,
    lineHeight: 30,
    letterSpacing: -0.6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  featureDesc: {
    color: '#374151',
    fontSize: isSmallScreen ? 15 : 16,
    lineHeight: isSmallScreen ? 22 : 26,
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.3)',
  },
  bullet: {
    color: '#0EA5E9',
    fontSize: 14,
    fontWeight: '800',
  },
  featureText: {
    color: '#374151',
    fontSize: isSmallScreen ? 14 : 15,
    lineHeight: isSmallScreen ? 20 : 24,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  boldText: {
    fontWeight: '900',
    color: '#0072CE',
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  featureSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(14, 165, 233, 0.1)',
  },
  featureSubTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '700',
    color: '#0EA5E9',
    flex: 1,
    lineHeight: 28,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  
  featureItemCompact: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6, // Reduced from default
    paddingVertical: 2, // Reduced padding
  },
  featureTextCompact: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18, // Reduced line height
    color: '#4B5563',
    paddingLeft: 8,
  },
  featureSubHeaderCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 4, // Reduced spacing
  },
  featureDescCompact: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8, // Reduced spacing
    lineHeight: 16,
  },
  featureListCompact: {
    marginTop: 0, // No extra margin
  },
  featureItemTight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3, // Very tight spacing
    paddingVertical: 1,
  },
  featureTextTight: {
    fontSize: 13,
    lineHeight: 16,
    color: '#4B5563',
    marginLeft: 6, // Direct margin instead of padding
  },

  // Enhanced About Section
  aboutSectionCompact: {
    paddingVertical: isSmallScreen ? 40 : 56,
    paddingHorizontal: 20,
    backgroundColor: '#f0f9ff',
  },
  sectionHeaderCompact: {
    marginBottom: 16,
  },
  sectionTitleCompact: {
    fontSize: isSmallScreen ? 16 : isTablet ? 20 : 18,
    fontWeight: '900',
    color: '#0072CE',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: isSmallScreen ? 28 : 32,
    letterSpacing: -0.8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  aboutSubtitleCompact: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '500',
  },
  statsContainerCompact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginBottom: 24,
    paddingHorizontal: isSmallScreen ? 20 : 30,
    gap: isSmallScreen ? 8 : 12,
  },
  statCardCompact: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: isSmallScreen ? 8 : isMediumScreen ? 10 : 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: getCardWidth(),
    minHeight: isSmallScreen ? 60 : 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
    marginBottom: isSmallScreen ? 12 : 8,
  },
  statNumberCompact: {
    fontSize: isSmallScreen ? 12 : isMediumScreen ? 14 : 16,
    fontWeight: '900',
    color: '#0EA5E9',
    marginBottom: 2,
    letterSpacing: -0.5,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statLabelCompact: {
    fontSize: isSmallScreen ? 8 : isMediumScreen ? 9 : 10,
    color: '#6b7280',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    lineHeight: isSmallScreen ? 10 : 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  aboutCardCompact: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: isSmallScreen ? 16 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
  },
  aboutItemCompact: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  aboutBulletContainerCompact: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
  },
  aboutBulletCompact: {
    color: '#0EA5E9',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  aboutTextCompact: {
    color: '#374151',
    fontSize: isSmallScreen ? 12 : 14,
    lineHeight: isSmallScreen ? 18 : 20,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  sourceTextCompact: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(14, 165, 233, 0.1)',
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  aboutSubtitle: {
    color: '#0072CE',
    fontSize: isSmallScreen ? 16 : 18,
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: -0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '500',
  },
   statsContainer: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
     alignItems: 'stretch',
     marginBottom: 40,
     paddingHorizontal: isSmallScreen ? 20 : 30,
     gap: isSmallScreen ? 8 : 12,
   },
   statCard: {
     backgroundColor: '#ffffff',
     borderRadius: 20,
     padding: isSmallScreen ? 12 : isMediumScreen ? 14 : 18,
     alignItems: 'center',
     justifyContent: 'center',
     width: getCardWidth(),
     minHeight: isSmallScreen ? 80 : 90,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 6 },
     shadowOpacity: 0.1,
     shadowRadius: 16,
     elevation: 6,
     borderWidth: 1,
     borderColor: 'rgba(14, 165, 233, 0.1)',
     marginBottom: isSmallScreen ? 12 : 8,
   },
   statNumber: {
     fontSize: isSmallScreen ? 14 : isMediumScreen ? 16 : 18,
     fontWeight: '900',
     color: '#0072CE',
     marginBottom: 4,
     letterSpacing: -0.5,
     textAlign: 'center',
     fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
   },
   statLabel: {
     fontSize: isSmallScreen ? 9 : isMediumScreen ? 10 : 11,
     color: '#0072CE',
     fontWeight: '700',
     textAlign: 'center',
     letterSpacing: 0.3,
     textTransform: 'uppercase',
     lineHeight: isSmallScreen ? 12 : 14,
     fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
   },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: isSmallScreen ? 24 : 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aboutIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  aboutText: {
    color: '#0072CE',
    fontSize: isSmallScreen ? 14 : 15,
    lineHeight: isSmallScreen ? 20 : 24,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  sourceText: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(14, 165, 233, 0.1)',
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Enhanced Step Cards - Removed numbering, made icons prominent
  stepsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
    gap: 16,
  },
  stepCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: isSmallScreen ? 16 : 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
  },
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 24,
  //   shadowColor: '#0EA5E9',
  //   shadowOffset: { width: 0, height: 8 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 16,
  //   elevation: 8,
  //   borderWidth: 3,
  //   borderColor: 'rgba(14, 165, 233, 0.2)',
  // },
  stepMainEmoji: {
    fontSize: isSmallScreen ? 32 : 40,
  },
  stepTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '600',
    color: 'black',
    marginBottom: 6,
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  stepDesc: {
    color: '#374151',
    fontSize: isSmallScreen ? 15 : 16,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 22 : 26,
    maxWidth: 300,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },

  // Enhanced CTA Section
  ctaSection: {
    position: 'relative',
    backgroundColor: '#ffffff',
    paddingVertical: isSmallScreen ? 24 : 32,
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
    color: 'black',
    fontSize: isSmallScreen ? 30 : 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: isSmallScreen ? 36 : 40,
    letterSpacing: -1,
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  ctaDesc: {
    color: 'black',
    fontSize: isSmallScreen ? 16 : 18,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 24 : 28,
    marginBottom: 48,
    maxWidth: 420,
    zIndex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },
  ctaBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: isSmallScreen ? 16 : 20,
    paddingHorizontal: isSmallScreen ? 32 : 44,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
    zIndex: 1,
    minWidth: isSmallScreen ? 240 : 280,
    justifyContent: 'center',
  },
  ctaBtnText: {
    color: '#0072CE',
    fontWeight: '800',
    fontSize: isSmallScreen ? 16 : 18,
    marginRight: 8,
    letterSpacing: -0.3,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  ctaBtnIcon: {
    fontSize: 18,
  },

  // Enhanced Footer
  footerWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8fafc',
  },
  footer: {
    backgroundColor: 'rgb(66, 65, 65)',
    paddingVertical: isSmallScreen ? 40 : 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
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