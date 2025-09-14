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
  Animated,
  Linking
} from 'react-native';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';
import { getRobotoFont, typography } from '../utils/fonts';
import { LinearGradient } from 'expo-linear-gradient';

const LOGO_URL = 'https://res.cloudinary.com/dnvdqfz5r/image/upload/v1754235912/United_Nations_Peace_Emblem_opjti4.png';
const { width, height } = Dimensions.get('window');

// Enhanced responsive breakpoints
const isXSmallScreen = width < 360;
const isSmallScreen = width < 414;
const isMediumScreen = width < 768;
const isLargeScreen = width < 1024;
const isTablet = width >= 768;

// Responsive scaling functions
const scaleFont = (small, medium = small * 1.2, large = small * 1.4) => {
  if (isXSmallScreen) return small * 0.9;
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const scaleSize = (small, medium = small * 1.2, large = small * 1.4) => {
  if (isXSmallScreen) return small * 0.9;
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const getHorizontalPadding = () => {
  if (isXSmallScreen) return 16;
  if (isSmallScreen) return 20;
  if (isMediumScreen) return 32;
  return 40;
};

const getCardGap = () => {
  if (isXSmallScreen) return 4;
  if (isSmallScreen) return 6;
  if (isMediumScreen) return 8;
  return 10;
};

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
        <Animated.View style={[styles.heroSection]}>
          <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBackground}
          />
          <View style={styles.heroContent}>
            <View style={styles.heroIconContainer}>
              <Image
                source={{ uri: LOGO_URL }}
                style={styles.heroLogo}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.heroTitle}>MyUNPension</Text>
            <Text style={styles.heroSubtitle}>All your pension benefits in one place.</Text>
           
            
             {/* Who is MyUNPension for? Section */}
        <View style={styles.whoSection}>
          <LinearGradient
            colors={['#ffffff', '#f8fafc', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.whoCard1}
          >
            <View style={styles.whoHeader}>
              <Text style={styles.whoTitle1}>Who is
              <Text style={styles.whoTitle}> MyUNPension </Text>for?</Text>
            </View>
            <Text style={styles.whoDesc}>
            Whether you are new to the UN system, planning for early retirement, preparing for separation, or already retired, <Text style={styles.boldText}>MyUNPension</Text> helps you understand, estimate, and track your separation benefits with confidence.
            </Text>
          </LinearGradient>
        </View>
          </View>
        </Animated.View>

        {/* App at a Glance Section */}
        <LinearGradient
          colors={['#fefefe', '#f9fafb', '#fefefe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.whoCard}
        >
          <View style={styles.appGlanceSection}>
            <Text style={styles.sectionTitleCenter}>App Features</Text>
            {/* <Text style={styles.heroDesc}>
            This App brings together your UN Pension Fund and employing organization benefits            
            </Text> */}
            <View style={styles.glanceCardsContainer}>
              {[
                {
                  icon: "📊",
                  title: "UNJSPF Bnefits",
                  desc: "Preparation • Withdrawal • Pension • Options ",
                  gradient: ['#ddd6fe', '#e0e7ff', '#dbeafe']
                },
                {
                  icon: "✈️",
                  title: "Employer Benefits",
                  desc: "HR Entitlements • Calculator • Actions •Timelines",
                  gradient: ['#dcfce7', '#d1fae5', '#a7f3d0']
                },
                {
                  icon: "👥",
                  title: "Post-Retirement",
                  desc: "Best country to Retire • Pursue your passion with AI •Easy Travel • And many more.",
                  gradient: ['#fef3c7', '#fde68a', '#fcd34d']
                }
              ].map((item, idx) => (
                <LinearGradient
                  key={idx}
                  colors={item.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.glanceCard}
                >
                  <Text style={styles.glanceIcon}>{item.icon}</Text>
                  <Text style={styles.glanceTitle}>{item.title}</Text>
                  <Text style={styles.glanceDesc}>{item.desc}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>
        </LinearGradient>
        
        {/* Visual Gap */}
        {/* <LinearGradient
          colors={['#f1f5f9', '#e2e8f0', '#f1f5f9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.visualGap}
        /> */}

        {/* UNJSPF Overview Section */}
        <LinearGradient
          colors={['#fefefe', '#f8fafc', '#fefefe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.whoCard}
        >
        <View style={styles.overviewSection}>
          {/* Title */}

          <Text style={styles.overviewMainTitle}>About United Nations Joint Staff Pension Fund</Text>
          {/* <Text style={styles.overviewSubtitle}>Key facts</Text> */}
          {/* <Text style={styles.overviewNote}>Figures based on latest actuarial valuation</Text> */}

          {/* Financials */}
          <Text style={styles.categoryTitle}>Financials</Text>
          <View style={styles.twoCardRow}>
            <LinearGradient
              colors={['#dbeafe', '#bfdbfe', '#93c5fd']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>$96B</Text>
              <Text style={styles.statLabel}>Assets</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#dbeafe', '#bfdbfe', '#93c5fd']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Text style={styles.statIcon}>📈</Text>
              <Text style={styles.statValue}>111%</Text>
              <Text style={styles.statLabel}>Funded Ratio</Text>
            </LinearGradient>
          </View>

          {/* Membership */}
          <Text style={[styles.categoryTitle, styles.membershipTitle]}>Membership</Text>
          <View style={styles.threeCardRow}>
            <LinearGradient
              colors={['#dcfce7', '#bbf7d0', '#86efac']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Text style={styles.statIcon}>🏢</Text>
              <Text style={styles.statValue2}>25</Text>
              <Text style={styles.statLabel}>Organizations</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#dcfce7', '#bbf7d0', '#86efac']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statValue1}>150K</Text>
              <Text style={styles.statLabel}>Active Staff</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#dcfce7', '#bbf7d0', '#86efac']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}
            >
              <Text style={styles.statIcon}>💼</Text>
              <Text style={styles.statValue1}>89K</Text>
              <Text style={styles.statLabel}>Retirees</Text>
            </LinearGradient>
          </View>

          {/* About the Fund */}
          {/* <Text style={[styles.categoryTitle, styles.aboutTitle]}>About the Fund</Text> */}
          <View style={styles.aboutCardsContainer}>
            {[
              "Established in 1949 by the General Assembly, UNJSPF is a defined benefit plan providing retirement, death, disability, and related benefits.",
              "The Fund currently pays out an average of $40,000 per pensioner annually to over 89,000 pensioners.",
              "In its 75-year history, the Fund has never missed a pension payment and has adequate resources to meet obligations in the next 30-40 years.",
              "UN retirees, typically aged 60-65, have an average post-retirement life expectancy of about 24–28 years at the time of retirement.",
              "Your age, contributory service, and salary grade/step determine your pension value.",
              "You can receive your pension in your home country's currency.",
              "Your pension is adjusted based on cost of living and paid for life.",
              "After death, benefits transfer to your dependent spouse or eligible survivors.",
              "You can separate at any time you want.",
              "Your pension is managed by a globally trusted institution."
            ].map((point, idx) => (
              <LinearGradient
                key={idx}
                colors={['#fefefe', '#f8fafc', '#f1f5f9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aboutCard}
              >
                <Text style={styles.aboutText}>{point}</Text>
              </LinearGradient>
              
            ))}
                            <Text style={{textAlign:'center',fontStyle:'italic', fontSize:'8px', color:'rgb(50 50 61)'}}>Source : UNJSPF</Text>

          </View>

          {/* CTA Section */}
          <Text style={styles.ctaTitle}>Ready to see your retirement future?</Text>
          <View
         
            style={styles.ctaButton}
          >
            <TouchableOpacity 
              style={styles.ctaButtonInner}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.ctaButtonText}>Get Started for Free</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Links */}
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => router.push('/about-us')}>
              <Text style={styles.footerLink}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/contact')}>
              <Text style={styles.footerLink}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/privacy-policy')}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.footerLinksSmall}>
            <TouchableOpacity onPress={() => router.push('/terms-of-service')}>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
          
          {/* Disclaimer Section */}
          <LinearGradient
            colors={['#fef2f2', '#fee2e2', '#fecaca']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.disclaimerContainer}
          >
            <View style={styles.disclaimerHeader}>
              <View style={styles.disclaimerContent}>
                <Text style={styles.disclaimerTitle}>Disclaimer</Text>
                <Text style={styles.disclaimerText}>
                This app was independently developed by a former UN staff member and is not an official tool of the UNJSPF or the United Nations. Pension estimates should always be verified through the UNJSPF Member Self-Service portal. The app may include links to HR benefit calculators (such as those provided by UNDP for employing organizations) and post-retirement resources like relocation, travel, or creative engagement via AI tools. These are supportive references only, not official determinations. Do not share personal or confidential information in this app.
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Footer Copyright */}
          <Text style={styles.copyright}>
            @2025 MyUNPension. All Rights Reserved.
          </Text>
        </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Enhanced Hero Section - Fully Responsive
  heroSection: {
    position: 'relative',
    paddingVertical: scaleSize(8, 8, 8),
    paddingHorizontal: getHorizontalPadding(),
    minHeight: height * (isSmallScreen ? 0.30 : isTablet ? 0.30 : 0.30),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: isTablet ? 800 : 600,
    width: '100%',
    alignSelf: 'center',
    zIndex: 1,
  },
  heroIconContainer: {
    width: scaleSize(100, 120, 140),
    height: scaleSize(100, 120, 140),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoShadow: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: scaleSize(40, 45, 50),
    padding: scaleSize(12, 15, 18),
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  heroLogo: {
    width: scaleSize(70, 70, 70),
    height: scaleSize(55, 55, 55),
    borderRadius: 0,
  },
  heroTitle: {
    color: '#0072CE',
    fontSize: scaleFont(17, 17, 17),
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: scaleFont(28, 32, 36),
    letterSpacing: -1.2,
    fontFamily: getRobotoFont('bold'),
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginTop: scaleSize(-27, -37, -37),
    marginBottom: scaleSize(4, 4, 4),
  },
  heroSubtitle: {
    color: '#1e40af',
    fontSize: scaleFont(12, 14, 16),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: scaleSize(3, 3, 3),
    letterSpacing: 0.5,
    fontFamily: getRobotoFont('regular'),
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  heroDesc: {
    color: 'rgba(30, 64, 175, 0.8)',
    fontSize: scaleFont(14, 15, 16),
    lineHeight: scaleFont(20, 21, 22),
    textAlign: 'center',
    marginBottom: scaleSize(8, 10, 12),
    paddingHorizontal: scaleSize(10, 15, 20),
    maxWidth: isTablet ? 600 : 520,
    fontFamily: getRobotoFont('regular'),
    fontWeight: '400',
  },

  // Enhanced Who Section - Fully Responsive
  whoSection: {
    paddingHorizontal: getHorizontalPadding(),
    backgroundColor: 'transparent',
  },
  whoCard: {
    maxWidth: isTablet ? 700 : 600,
    width: '111%',
    borderRadius: scaleSize(50, 50, 50),
    padding: scaleSize(20, 20, 20),
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
    alignSelf: 'center',
    // marginVertical: scaleSize(8, 10, 12),
  },
  whoCard1: {
    maxWidth: isTablet ? 700 : 600,
    width: '125%',
    borderRadius: scaleSize(20, 24, 28),
    padding: scaleSize(20, 20, 20),
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
    alignSelf: 'center',
  },
 
  whoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(-10, -10, -10),
  },
  whoTitle: {
    color: '#0072CE',
    fontSize: scaleFont(17, 17, 17),
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: scaleFont(28, 32, 36),
    letterSpacing: -1.2,
    fontFamily: getRobotoFont('bold'),
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginTop: scaleSize(-30, -30, -30),
    marginBottom: scaleSize(4, 4, 4),
  },
  whoTitle1: {
    fontSize: scaleFont(17, 17, 17),
    fontWeight: '500',
    color: '#1e40af',
    flex: 1,
    lineHeight: scaleFont(0, 0, 0),
    letterSpacing: -0.8,
    fontFamily: getRobotoFont('medium'),
    textAlign: 'center',
  },
  whoDesc: {
    color: '#475569',
    fontSize: scaleFont(14, 15, 16),
    lineHeight: scaleFont(20, 21, 22),
    fontFamily: getRobotoFont('regular'),
    fontWeight: '400',
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: '600',
    color: '#0072CE',
    fontFamily: getRobotoFont('medium'),
  },

  // App at a Glance Section - Fully Responsive
  appGlanceSection: {
    paddingVertical: 0,
    paddingHorizontal: getHorizontalPadding(),
    backgroundColor: 'transparent',
  },
  sectionTitleCenter: {
    fontSize: scaleFont(19, 19, 19),
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: scaleSize(8, 10, 12),
    fontFamily: getRobotoFont('bold'),
  },
  glanceCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: getCardGap(),
    marginBottom: 0,
    flexWrap: isXSmallScreen ? 'wrap' : 'nowrap',
  },
  glanceCard: {
    borderRadius: scaleSize(12, 14, 16),
    padding: scaleSize(8, 10, 12),
    alignItems: 'center',
    width: isXSmallScreen ? (width - getHorizontalPadding() * 2 - getCardGap() * 2) / 2 : 
           (width - getHorizontalPadding() * 2 - getCardGap() * 2) / 3,
    minWidth: isXSmallScreen ? 140 : 109,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  glanceIcon: {
    fontSize: scaleSize(16, 18, 20),
    marginBottom: scaleSize(2, 3, 4),
  },
  glanceTitle: {
    fontSize: scaleFont(11.5, 11.5, 11.5),
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
    lineHeight: scaleFont(20, 21, 22),
    marginBottom: scaleSize(2, 3, 4),
    fontFamily: getRobotoFont('bold'),
  },
  glanceDesc: {
    fontSize: scaleFont(10.3, 10.3, 10.3),
    color: '#475569',
    textAlign: 'center',
    lineHeight: scaleFont(12, 13, 14),
    fontFamily: getRobotoFont('regular'),
  },

  // Visual Gap
  visualGap: {
    height: scaleSize(12, 14, 16),
    marginHorizontal: getHorizontalPadding(),
    borderRadius: scaleSize(8, 10, 12),
    // marginVertical: scaleSize(8, 10, 12),
  },

  // UNJSPF Overview Section - Fully Responsive
  overviewSection: {
    paddingVertical: 0,
    paddingHorizontal: getHorizontalPadding(),
    backgroundColor: 'transparent',
  },
  overviewMainTitle: {
    fontSize: scaleFont(16, 18, 22),
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
    fontFamily: getRobotoFont('bold'),
  },
  overviewSubtitle: {
    fontSize: scaleFont(12, 14, 16),
    color: '#1e40af',
    textAlign: 'center',
    fontFamily: getRobotoFont('regular'),
    fontWeight: '600',
  },
  overviewNote:{
    textAlign:'center',
    fontFamily:getRobotoFont('regular'),
    fontSize:11,
    color: '#64748b',
  },
  overviewSubtitle2: {
    fontSize: scaleFont(12, 14, 16),
    color: '#1e40af',
    textAlign: 'center',
    marginTop: scaleSize(2, 3, 4),
    marginBottom: scaleSize(8, 10, 12),
    fontFamily: getRobotoFont('medium'),
    fontWeight: '600',
  },

  // Category Titles
  categoryTitle: {
    fontSize: scaleFont(14, 16, 18),
    fontWeight: '600',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: scaleSize(4, 5, 6),
    marginTop: scaleSize(6, 8, 10),
    fontFamily: getRobotoFont('medium'),
  },
  membershipTitle: {
    color: '#16a34a',
    fontSize: scaleFont(16, 18, 20),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: scaleSize(4, 5, 6),
    marginTop: scaleSize(6, 8, 10),
    fontFamily: getRobotoFont('bold'),
  },
  aboutTitle: {
    fontSize: scaleFont(16, 18, 22),
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
    fontFamily: getRobotoFont('bold'),
  },

  // Card Containers - Responsive
  twoCardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: getCardGap(),
    marginBottom: scaleSize(6, 8, 10),
    paddingHorizontal: isSmallScreen ? 50 : 70,
  },
  threeCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: getCardGap(),
    marginBottom: scaleSize(6, 8, 10),
  },

  // Stat Cards - Responsive
  statCard: {
    borderRadius: scaleSize(12, 14, 16),
    padding: scaleSize(8, 10, 12),
    alignItems: 'center',
    flex: 1,
    minHeight: scaleSize(70, 80, 90),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  statIcon: {
    fontSize: scaleSize(16, 18, 20),
    marginBottom: scaleSize(2, 3, 4),
  },
  statValue: {
    fontSize: scaleFont(14, 16, 18),
    fontWeight: 'bold',
    color: '#1d4ed8',
    fontFamily: getRobotoFont('bold'),
  },
  statValue1: {
    fontSize: scaleFont(15, 17,19),
    fontWeight: 'bold',
    color: 'rgb(22, 163, 74)',
    fontFamily: getRobotoFont('bold'),
  },
  statValue2: {
    fontSize: scaleFont(18, 18,18),
    fontWeight: 800,
    color: 'rgb(22, 163, 74)',
    fontFamily: getRobotoFont('bold'),
  },
  statLabel: {
    fontSize: scaleFont(10, 11, 12),
    color: '#475569',
    textAlign: 'center',
    fontFamily: getRobotoFont('medium'),
    fontWeight: '600',
  },

  // About Cards - Responsive
  aboutCardsContainer: {
    gap: scaleSize(6, 7, 8),
    marginBottom: scaleSize(8, 10, 12),
  },
  aboutCard: {
    borderRadius: scaleSize(10, 12, 14),
    padding: scaleSize(12, 14, 16),
    marginHorizontal:scaleSize(8,8,8),
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    gap: scaleSize(8, 10, 12),
  },
  aboutIcon: {
    fontSize: scaleSize(14, 16, 18),
    color: '#7c3aed',
    marginTop: scaleSize(2, 3, 4),
  },
  aboutText: {
    fontSize: scaleFont(12, 13, 14),
    color: '#374151',
    lineHeight: scaleFont(16, 17, 18),
    flex: 1,
    fontFamily: getRobotoFont('regular'),
    textAlign:'justify'
  },

  // CTA Section - Responsive
  ctaTitle: {
    fontSize: scaleFont(16, 18, 20),
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: scaleSize(18, 18, 18),
    marginTop: scaleSize(12, 14, 16),
    fontFamily: getRobotoFont('bold'),
  },
  ctaSubtitle: {
    fontSize: scaleFont(12, 13, 14),
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: scaleSize(12, 14, 16),
    paddingHorizontal: scaleSize(16, 20, 24),
    fontFamily: getRobotoFont('regular'),
  },
  ctaButton: {
    paddingHorizontal: scaleSize(60, 70, 80),
    paddingVertical: scaleSize(16, 18, 20),
    borderRadius: scaleSize(25, 27, 30),
    alignSelf: 'center',
    minWidth: scaleSize(200, 220, 240),
    // shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: scaleSize(12, 14, 16),
    backgroundColor: '#0EA5E9'
  },

  ctaButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: scaleFont(16, 17, 18),
    fontWeight: '600',
    fontFamily: getRobotoFont('medium'),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Footer Links - Responsive
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scaleSize(16, 20, 24),
    marginTop: scaleSize(8, 10, 12),
    marginBottom: scaleSize(12, 14, 16),
    flexWrap: 'wrap',
  },
  footerLinksSmall: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaleSize(6, 8, 10),
  },
  footerLink: {
    fontSize: scaleFont(12, 13, 14),
    color: '#1e40af',
    fontWeight: '700',
    fontFamily: getRobotoFont('bold'),
  },
  footerLinkSmall: {
    fontSize: scaleFont(10, 11, 12),
    color: '#64748b',
    fontFamily: getRobotoFont('regular'),
  },

  // Disclaimer Section - Responsive
  disclaimerContainer: {
    borderWidth: 1,
    borderColor: 'rgba(254, 202, 202, 0.8)',
    borderRadius: scaleSize(12, 14, 16),
    padding: scaleSize(12, 14, 16),
    margin:scaleSize(8, 8, 8),
    marginTop: scaleSize(12, 14, 16),
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scaleSize(8, 10, 12),
  },
  disclaimerContent: {
    flex: 1,
  },
  disclaimerTitle: {
    fontSize: scaleFont(12, 13, 14),
    fontWeight: '700',
    color: 'rgb(115 22 22)',
    marginBottom: scaleSize(4, 5, 6),
    textAlign: 'center',
    fontFamily: getRobotoFont('bold'),
  },
  disclaimerText: {
    fontSize: scaleFont(10, 11, 12),
    color: 'rgb(115 22 22)',
    lineHeight: scaleFont(14, 15, 16),
    fontFamily: getRobotoFont('regular'),
    textAlign: 'justify',
    fontStyle:'italic'
  },

  // Copyright - Responsive
  copyright: {
    fontSize: scaleFont(10, 11, 12),
    color: '#64748b',
    textAlign: 'center',
    marginTop: scaleSize(8, 10, 12),
    marginBottom: scaleSize(6, 8, 10),
    fontFamily: getRobotoFont('regular'),
  },
});