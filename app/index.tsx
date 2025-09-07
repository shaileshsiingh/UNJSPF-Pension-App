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

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

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
            <Text style={styles.heroSubtitle}>All your pension benefits in one place.</Text>
           
            
             {/* Who is MyUNPension for? Section */}
        <View style={styles.whoSection}>
          <View style={styles.whoCard1}>
            <View style={styles.whoHeader}>
              <Text style={styles.whoTitle1}>Who is
              <Text style={styles.whoTitle}> MyUNPension </Text>for?</Text>
            </View>
            <Text style={styles.whoDesc}>
            Whether you are new to the UN system, planning for early retirement, preparing for separation, or already retired, <Text style={styles.boldText}>MyUNPension</Text> helps you understand, estimate, and track your separation benefits with confidence.
            </Text>
            </View>
          
        </View>
          </View>
        </Animated.View>

        {/* App at a Glance Section */}
        <View style={styles.whoCard}>

        <View style={styles.appGlanceSection}>
          <Text style={styles.sectionTitleCenter}>App at a Glance</Text>
          <Text style={styles.heroDesc}>
          This App brings together your UN Pension Fund and employing organization benefits            </Text>
          <View style={styles.glanceCardsContainer}>
            {[
              {
                icon: "📊",
                title: "UNJSPF Bnefits",
                desc: "Your pension, explained and simplified"
              },
              {
                icon: "✈️",
                title: "Employing Organization Benefits",
                desc: "Your HR entitlements"
              },
              {
                icon: "👥",
                title: "Post-Retirement Resources",
                desc: "Guidance to plan, settle, and stay connected"
              }
            ].map((item, idx) => (
              <View key={idx} style={styles.glanceCard}>
                <Text style={styles.glanceIcon}>{item.icon}</Text>
                <Text style={styles.glanceTitle}>{item.title}</Text>
                <Text style={styles.glanceDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>
        </View>
        {/* Visual Gap */}
        <View style={styles.visualGap} />

        {/* UNJSPF Overview Section */}
        <View style={styles.whoCard}>
        <View style={styles.overviewSection}>
          {/* Title */}

          <Text style={styles.overviewMainTitle}>United Nations Joint Staff Pension Fund</Text>
          <Text style={styles.overviewSubtitle}>Key facts at a glance</Text>
          <Text style={styles.overviewNote}>Figures based on latest actuarial valuation</Text>

          {/* Financials */}
          <Text style={styles.categoryTitle}>Financials</Text>
          <View style={styles.twoCardRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>$96B</Text>
              <Text style={styles.statLabel}>Assets</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📈</Text>
              <Text style={styles.statValue}>111%</Text>
              <Text style={styles.statLabel}>Funded Ratio</Text>
            </View>
          </View>

          {/* Membership */}
          <Text style={[styles.categoryTitle, styles.membershipTitle]}>Membership</Text>
          <View style={styles.threeCardRow}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏢</Text>
              <Text style={styles.statValue2}>25</Text>
              <Text style={styles.statLabel}>Organizations</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statValue1}>150K</Text>
              <Text style={styles.statLabel}>Active Staff</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💼</Text>
              <Text style={styles.statValue1}>89K</Text>
              <Text style={styles.statLabel}>Retirees</Text>
            </View>
          </View>
          <View/ >
          </View>

          {/* About the Fund */}
          <Text style={[styles.categoryTitle, styles.aboutTitle]}>About the Fund</Text>
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
              <View key={idx} style={styles.aboutCard}>
                {/* <Text style={styles.aboutIcon}>ℹ️</Text> */}
                <Text style={styles.aboutText}>{point}</Text>
              </View>
            ))}
          </View>

          {/* CTA Section */}
          <Text style={styles.ctaTitle}>Ready to see your retirement future?</Text>
          {/* <Text style={styles.ctaSubtitle}>
            Make informed decisions with clear, accurate data.
          </Text> */}
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/calculator')}
          >
            <Text style={styles.ctaButtonText}>Get Started for Free</Text>
          </TouchableOpacity>

          {/* Footer Links */}
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => handleLinkPress('#about')}>
              <Text style={styles.footerLink}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress('#contact')}>
              <Text style={styles.footerLink}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress('#privacy')}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.footerLinksSmall}>
            <TouchableOpacity onPress={() => handleLinkPress('#terms')}>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>

          {/* Disclaimer Section */}
          <View style={styles.disclaimerContainer}>
            <View style={styles.disclaimerHeader}>
              <View style={styles.disclaimerContent}>
                <Text style={styles.disclaimerTitle}>Disclaimer</Text>
                <Text style={styles.disclaimerText}>
                  This app is the first of its kind, offering independent guidance on all UN retirement benefits. It was developed by a former UN staff member. It is not an official product of the UNJSPF or the United Nations. Nothing herein should be interpreted as legal, financial, or official pension advice. For security, do not share personal information. Official and personalized pension estimates are available only through the UNJSPF Member Self-Service portal. By using this app, you accept that all information is for general guidance only, based on the latest actuarial valuation, without warranties of accuracy, completeness, or endorsement.
                </Text>
              </View>
            </View>
          </View>

          {/* Footer Copyright */}
          <Text style={styles.copyright}>
            2025 MyUNPension. All Rights Reserved.
          </Text>
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

  // Enhanced Hero Section - Fully Responsive
  heroSection: {
    position: 'relative',
    paddingVertical: scaleSize(8, 8, 8),
    paddingHorizontal: getHorizontalPadding(),
    minHeight: height * (isSmallScreen ? 0.45 : isTablet ? 0.35 : 0.4),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f4f6f8',
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
  heroLogo: {
    width: scaleSize(70, 70, 70),
    height: scaleSize(55, 55, 55),
    borderRadius: 0,
  },
  heroTitle: {
    color: 'rgb(70 106 209)',
    fontSize: scaleFont(18, 18, 18),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: scaleFont(28, 32, 36),
    letterSpacing: -1.2,
    fontFamily: 'Roboto',
    // textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginTop: scaleSize(-27, -27, -27),
    marginBottom: scaleSize(4, 4, 4),
  },
  heroSubtitle: {
    color: 'black',
    fontSize: scaleFont(14, 14, 14),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: scaleSize(3, 3, 3),
    letterSpacing: 0.5,
    fontFamily: 'Roboto',
  },
  heroDesc: {
    color: 'rgba(62, 88, 112, 0.9)',
    fontSize: scaleFont(13, 15, 16),
    textAlign: 'center',
    lineHeight: scaleFont(20, 21, 22),
    marginBottom: scaleSize(8, 10, 12),
    paddingHorizontal: scaleSize(10, 15, 20),
    maxWidth: isTablet ? 600 : 520,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },

  // Enhanced Who Section - Fully Responsive
  whoSection: {
    paddingHorizontal: getHorizontalPadding(),
    backgroundColor: '#f0f9ff',
  },
  whoCard: {
    maxWidth: isTablet ? 700 : 600,
    width: '111%',
    backgroundColor: '#ffffff',
    borderRadius: scaleSize(50, 50, 50),
    padding: scaleSize(20, 20, 20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
    alignSelf: 'center',
  },
  whoCard1: {
    maxWidth: isTablet ? 700 : 600,
    width: '125%',
    backgroundColor: '#ffffff',
    borderRadius: scaleSize(20, 24, 28),
    padding: scaleSize(20, 20, 20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.1)',
    alignSelf: 'center',
  },
 
  whoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: scaleSize(16, 20, 24),
    marginTop: scaleSize(-10, -10, -10),
  },
  whoTitle: {
    color: 'rgb(70 106 209)',
    fontSize: scaleFont(17, 17, 17),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: scaleFont(28, 32, 36),
    letterSpacing: -1.2,
    fontFamily: 'Roboto',
    // textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginTop: scaleSize(-30, -30, -30),
    marginBottom: scaleSize(4, 4, 4),
  },
  whoTitle1: {
    fontSize: scaleFont(19, 19, 19),
    fontWeight: '500',
    color: 'black',
    flex: 1,
    lineHeight: scaleFont(0, 0, 0),
    letterSpacing: -0.8,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  whoDesc: {
    color: '#6b7280',
    fontSize: scaleFont(14, 15, 16),
    lineHeight: scaleFont(20, 21, 22),
    fontFamily: 'Roboto',
    fontWeight: '400',
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: '600',
    color: '#0072CE',
  },

  // App at a Glance Section - Fully Responsive
  appGlanceSection: {
    paddingVertical: 0,
    paddingHorizontal: getHorizontalPadding(),
    backgroundColor: '#ffffff',
  },
  sectionTitleCenter: {
    fontSize: scaleFont(19, 19, 19),
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: scaleSize(8, 10, 12),
    fontFamily: 'Roboto',
  },
  glanceCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: getCardGap(),
    marginBottom: 0,
    flexWrap: isXSmallScreen ? 'wrap' : 'nowrap',
  },
  glanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: scaleSize(6, 8, 10),
    padding: scaleSize(6, 8, 10),
    alignItems: 'center',
    width: isXSmallScreen ? (width - getHorizontalPadding() * 2 - getCardGap() * 2) / 2 : 
           (width - getHorizontalPadding() * 2 - getCardGap() * 2) / 3,
    minWidth: isXSmallScreen ? 140 : 109,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  glanceIcon: {
    fontSize: scaleSize(16, 18, 20),
    marginBottom: scaleSize(2, 3, 4),
  },
  glanceTitle: {
    fontSize: scaleFont(11, 12, 14),
    fontWeight: '600',
    color: '#1d4ed8',
    textAlign: 'center',
    lineHeight: scaleFont(13, 14, 16),
    marginBottom: scaleSize(2, 3, 4),
    fontFamily: 'Roboto',
  },
  glanceDesc: {
    fontSize: scaleFont(10, 11, 12),
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: scaleFont(12, 13, 14),
    fontFamily: 'Roboto',
  },

  // Visual Gap
  visualGap: {
    height: scaleSize(8, 10, 12),
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginHorizontal: getHorizontalPadding(),
  },

  // UNJSPF Overview Section - Fully Responsive
  overviewSection: {
    paddingVertical: 0,
    paddingHorizontal: getHorizontalPadding(),
    backgroundColor: '#ffffff',
  },
  overviewMainTitle: {
    fontSize: scaleFont(16, 18, 22),
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    // marginBottom: scaleSize(8, 6, 8),
    // marginTop: scaleSize(10, 12, 14),
    fontFamily: 'Roboto',
  },
  overviewSubtitle: {
    fontSize: scaleFont(12, 14, 16),
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '600',

  },
  overviewNote: {
    fontSize: scaleFont(10, 11, 12),
    color: 'black',
    textAlign: 'center',
    marginTop: scaleSize(2, 3, 4),
    marginBottom: scaleSize(8, 10, 12),
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
  },
  membershipTitle: {
    color: '#16a34a',
  },
  aboutTitle: {
    color: '#7c3aed',
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
    backgroundColor: '#ffffff',
    borderRadius: scaleSize(6, 8, 10),
    padding: scaleSize(6, 8, 10),
    alignItems: 'center',
    flex: 1,
    minHeight: scaleSize(60, 70, 80),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statIcon: {
    fontSize: scaleSize(16, 18, 20),
    marginBottom: scaleSize(2, 3, 4),
  },
  statValue: {
    fontSize: scaleFont(14, 16, 18),
    fontWeight: 'bold',
    color: '#1d4ed8',
    fontFamily: 'Roboto',
  },
  statValue1: {
    fontSize: scaleFont(15, 17,19),
    fontWeight: 'bold',
    color: 'rgb(22, 163, 74)',
    fontFamily: 'Roboto',
  },
  statValue2: {
    fontSize: scaleFont(17, 17,17),
    fontWeight: 800,
    color: 'rgb(22, 163, 74)',
    fontFamily: 'Roboto',
  },
  statLabel: {
    fontSize: scaleFont(10, 11, 12),
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '600',
  },

  // About Cards - Responsive
  aboutCardsContainer: {
    gap: scaleSize(4, 5, 6),
    marginBottom: scaleSize(8, 10, 12),
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: scaleSize(6, 8, 10),
    padding: scaleSize(8, 10, 12),
    marginHorizontal:scaleSize(8,8,8),
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
    fontFamily: 'Roboto',
    textAlign:'justify'
  },

  // CTA Section - Responsive
  ctaTitle: {
    fontSize: scaleFont(16, 17, 18),
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginBottom: scaleSize(4, 5, 6),
    marginTop: scaleSize(12, 14, 16),
    fontFamily: 'Roboto',
  },
  ctaSubtitle: {
    fontSize: scaleFont(12, 13, 14),
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: scaleSize(12, 14, 16),
    paddingHorizontal: scaleSize(16, 20, 24),
    fontFamily: 'Roboto',
  },
  ctaButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: scaleSize(60, 70, 80),
    paddingVertical: scaleSize(16, 18, 20),
    borderRadius: scaleSize(20, 22, 24),
    alignSelf: 'center',
    minWidth: scaleSize(200, 220, 240),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: scaleSize(12, 14, 16),
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: scaleFont(16, 17, 18),
    fontWeight: '600',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },

  // Footer Links - Responsive
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scaleSize(16, 20, 24),
    marginTop: scaleSize(8, 10, 12),
    flexWrap: 'wrap',
  },
  footerLinksSmall: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaleSize(6, 8, 10),
  },
  footerLink: {
    fontSize: scaleFont(12, 13, 14),
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  footerLinkSmall: {
    fontSize: scaleFont(10, 11, 12),
    color: '#6b7280',
    fontFamily: 'Roboto',
  },

  // Disclaimer Section - Responsive
  disclaimerContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: scaleSize(8, 10, 12),
    padding: scaleSize(8, 10, 12),
    margin:scaleSize(8, 8, 8),
    marginTop: scaleSize(12, 14, 16),
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
    fontWeight: '600',
    color: 'rgb(115 22 22)',
    marginBottom: scaleSize(4, 5, 6),
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  disclaimerText: {
    fontSize: scaleFont(10, 11, 12),
    color: 'rgb(115 22 22)',
    lineHeight: scaleFont(14, 15, 16),
    fontFamily: 'Roboto',
    textAlign: 'justify',
  },

  // Copyright - Responsive
  copyright: {
    fontSize: scaleFont(10, 11, 12),
    color: '#6b7280',
    textAlign: 'center',
    marginTop: scaleSize(8, 10, 12),
    marginBottom: scaleSize(6, 8, 10),
    fontFamily: 'Roboto',
  },
});