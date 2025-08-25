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
            <Text style={styles.heroSubtitle}>All your pension benefits in one place</Text>
            <Text style={styles.heroDesc}>
            Everything you need for retirement planning is here. {'\n'} This App brings together your UN Pension Fund and employing organization benefits            </Text>
            
             {/* Who is MyUNPension for? Section */}
        <View style={styles.whoSection}>
          <View style={styles.whoCard}>
            <View style={styles.whoHeader}>
              <Text style={styles.whoTitle1}>Who is
              <Text style={styles.whoTitle}> MyUNPension </Text>for?</Text>
            </View>
            <Text style={styles.whoDesc}>
            Whether you are new to the UN, planning for early retirement, preparing for separation, or already retired, <Text style={styles.boldText}>{'\n'}MyUNPension</Text> helps you understand, estimate, and track your separation benefits with confidence.
            </Text>
          </View>
        </View>
          </View>
        </Animated.View>

        {/* App at a Glance Section */}
        <View style={styles.appGlanceSection}>
          <Text style={styles.sectionTitleCenter}>App at a Glance</Text>
          <View style={styles.glanceCardsContainer}>
            {[
              {
                icon: "📊",
                title: "Pension Fund Benefits (From UNJSPF)",
                desc: "Your pension, explained and simplified"
              },
              {
                icon: "✈️",
                title: "Separation Benefits (From Your Employing Organization)",
                desc: "Smooth transition after UN service"
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

        {/* Visual Gap */}
        <View style={styles.visualGap} />

        {/* UNJSPF Overview Section */}
        <View style={styles.overviewSection}>
          {/* Title */}
          <Text style={styles.overviewMainTitle}>United Nations Joint Staff Pension Fund</Text>
          <Text style={styles.overviewSubtitle}>Key Facts at a Glance</Text>
          <Text style={styles.overviewNote}>Figures based on latest actuarial valuation (2024)</Text>

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
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Organizations</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statValue}>150K</Text>
              <Text style={styles.statLabel}>Active Staff</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💼</Text>
              <Text style={styles.statValue}>89K</Text>
              <Text style={styles.statLabel}>Retirees</Text>
            </View>
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
              "You can receive your pension in your home country's currency in your preferred bank account.",
              "Your pension is adjusted based on cost of living and paid for life.",
              "After death, benefits transfer to your dependent spouse or eligible survivors.",
              "You can separate at any time you want.",
              "Your pension is managed by a globally trusted institution."
            ].map((point, idx) => (
              <View key={idx} style={styles.aboutCard}>
                <Text style={styles.aboutIcon}>ℹ️</Text>
                <Text style={styles.aboutText}>{point}</Text>
              </View>
            ))}
          </View>

          {/* CTA Section */}
          <Text style={styles.ctaTitle}>Ready to see your retirement future?</Text>
          <Text style={styles.ctaSubtitle}>
            Take control of your retirement planning today. Make informed decisions with clear, accurate data.
          </Text>
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
              <Text style={styles.footerLinkSmall}>Terms of Service</Text>
            </TouchableOpacity>
          </View>

          {/* Disclaimer Section */}
          <View style={styles.disclaimerContainer}>
            <View style={styles.disclaimerHeader}>
              <Text style={styles.disclaimerIcon}>⚠️</Text>
              <View style={styles.disclaimerContent}>
                <Text style={styles.disclaimerTitle}>Disclaimer</Text>
                <Text style={styles.disclaimerText}>
                  This app is the first of its kind, offering independent guidance on all UN retirement benefits. It was developed by a former UN staff member. It is not an official product of the United Nations Joint Staff Pension Fund (UNJSPF) or the United Nations. Nothing herein should be interpreted as legal, financial, or official pension advice. For security, do not share personal information. Official and personalized pension estimates are available only through the UNJSPF Member Self-Service portal. By using this app, you accept that all information is for general guidance only, based on the latest actuarial valuation, without warranties of accuracy, completeness, or endorsement.
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

  // Enhanced Hero Section with Sky Blue Theme - ORIGINAL KEPT
  heroSection: {
    position: 'relative',
    paddingVertical: isSmallScreen ? 20 : 50,
    paddingHorizontal: 20,
    minHeight: height * 0.4,
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
    width: 90,
    height: 70,
    borderRadius: 0,
  },
  heroTitle: {
    color: '#0072CE',
    fontSize: isSmallScreen ? 20 : isTablet ? 28 : 24,
    fontWeight: '600',
    textAlign: 'center',
    // marginBottom: 16,
    lineHeight: isSmallScreen ? 28 : isTablet ? 36 : 32,
    letterSpacing: -1.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginTop: -20,
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
    fontSize: isSmallScreen ? 16 : isTablet ? 20 : 18,
    fontWeight: '500',
    textAlign: 'center',
    // marginBottom: 8,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  heroDesc: {
    color: '#rgba(62, 88, 112, 0.9)',
    fontSize: isSmallScreen ? 14 : isTablet ? 16 : 15,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 20 : isTablet ? 22 : 21,
    marginBottom: 8,
    paddingHorizontal: 10,
    maxWidth: 520,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
  },

  // Enhanced Who Section - ORIGINAL KEPT
  whoSection: {
    paddingVertical: isSmallScreen ? 16 : 26,
    paddingHorizontal: 20,
    backgroundColor: '#f0f9ff',
  },
  whoCard: {
    maxWidth: 600,
    width: '100%',
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
    alignSelf: 'center',
  },
  whoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  whoTitle: {
    fontSize: isSmallScreen ? 20 : isTablet ? 28 : 24,
    fontWeight: '800',
    color: '#0072CE',
    flex: 1,
    lineHeight: isSmallScreen ? 28 : isTablet ? 36 : 32,
    letterSpacing: -0.8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: 'center',
  },
  whoTitle1: {
    fontSize: isSmallScreen ? 20 : isTablet ? 28 : 24,
    fontWeight: '500',
    color: 'black',
    flex: 1,
    lineHeight: isSmallScreen ? 28 : isTablet ? 36 : 32,
    letterSpacing: -0.8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: 'center',
  },
  whoDesc: {
    color: '#6b7280',
    fontSize: isSmallScreen ? 14 : isTablet ? 16 : 15,
    lineHeight: isSmallScreen ? 20 : isTablet ? 22 : 21,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '400',
    textAlign:'justify',
  },
  boldText: {
    fontWeight: '600',
    color: '#0072CE',
  },

  // NEW SECTIONS - UNIFORM FONT SIZES MATCHING HERO/WHO SECTIONS
  // App at a Glance Section
  appGlanceSection: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  sectionTitleCenter: {
    fontSize: isSmallScreen ? 16 : 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  glanceCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 0,
  },
  glanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    width: (width - 52) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  glanceIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  glanceTitle: {
    fontSize: isSmallScreen ? 11 : 14,
    fontWeight: '600',
    color: '#1d4ed8',
    textAlign: 'center',
    lineHeight: isSmallScreen ? 13 : 16,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  glanceDesc: {
    fontSize: isSmallScreen ? 10 : 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: isSmallScreen ? 12 : 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Visual Gap
  visualGap: {
    height: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginHorizontal: 20,
  },

  // UNJSPF Overview Section
  overviewSection: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  overviewMainTitle: {
    fontSize: isSmallScreen ? 16 : 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  overviewSubtitle: {
    fontSize: isSmallScreen ? 12 : 16,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  overviewNote: {
    fontSize: isSmallScreen ? 10 : 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Category Titles
  categoryTitle: {
    fontSize: isSmallScreen ? 14 : 18,
    fontWeight: '600',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  membershipTitle: {
    color: '#16a34a',
  },
  aboutTitle: {
    color: '#7c3aed',
  },

  // Card Containers
  twoCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 6,
  },
  threeCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 6,
  },

  // Stat Cards
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  statValue: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: 'bold',
    color: '#1d4ed8',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statLabel: {
    fontSize: isSmallScreen ? 10 : 12,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // About Cards - INCREASED FONT SIZES TO MATCH HERO/WHO SECTIONS
  aboutCardsContainer: {
    gap: 4,
    marginBottom: 8,
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  aboutIcon: {
    fontSize: 14,
    color: '#7c3aed',
    marginTop: 2,
  },
  aboutText: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#374151',
    lineHeight: isSmallScreen ? 16 : 18,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // CTA Section
  ctaTitle: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '600',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  ctaSubtitle: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  ctaButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 12,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Footer Links
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  footerLinksSmall: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  footerLink: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#2563eb',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  footerLinkSmall: {
    fontSize: isSmallScreen ? 10 : 12,
    color: '#6b7280',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Disclaimer Section
  disclaimerContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  disclaimerIcon: {
    fontSize: 14,
    color: '#dc2626',
    marginTop: 2,
  },
  disclaimerContent: {
    flex: 1,
  },
  disclaimerTitle: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    color: '#b91c1c',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  disclaimerText: {
    fontSize: isSmallScreen ? 10 : 12,
    color: '#b91c1c',
    lineHeight: isSmallScreen ? 14 : 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Copyright
  copyright: {
    fontSize: isSmallScreen ? 10 : 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});