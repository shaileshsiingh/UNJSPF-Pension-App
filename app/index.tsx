// import React from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   Image, 
//   ScrollView, 
//   TouchableOpacity, 
//   Dimensions, 
//   SafeAreaView,
//   StatusBar,
//   Platform
// } from 'react-native';
// import { useAuth } from '../components/AuthContext';
// import { useRouter } from 'expo-router';

// const LOGO_URL = 'https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjg3NDViOWYyOGY0ODE5MWJjMjI0ODRiYTI0ZjFjZTM6ZmlsZV8wMDAwMDAwMGVhZjA2MWZkOGJjNWQxMjVjODdlZGU4MyIsInRzIjoiNDg3MDg3IiwicCI6InB5aSIsInNpZyI6ImQwMWE1ZTgzYzEyNzE1YzdhYmJlNzJkM2U5ZGE4YzA2MWFkOTc4NzQ0ZTNiMDdiMzBkZTQ3MTE3YWRkNTI0ZGQiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==';
// const { width, height } = Dimensions.get('window');

// const isTablet = width > 768;
// const isSmallScreen = width < 380;

// export default function LandingPage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   React.useEffect(() => {
//     if (!loading && user) {
//       router.replace('/(tabs)');
//     }
//   }, [user, loading]);

//   if (loading) return null;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
//       <ScrollView 
//         style={styles.scrollView} 
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Navbar */}
//         <View style={styles.navbar}>
//           <View style={styles.navLeft}>
//             <Image source={{ uri: LOGO_URL }} style={styles.logo} resizeMode="contain" />
//             <Text style={styles.appName}>MyUNPension</Text>
//           </View>
//           <View style={styles.navRight}>
//             <TouchableOpacity 
//               style={styles.navLoginBtn}
//               onPress={() => router.push('/login')}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.navLoginText}>Log In</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.navSignUpBtn} 
//               onPress={() => router.push('/signup')}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.navSignUpText}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Hero Section */}
//         <View style={styles.heroSection}>
//           <View style={styles.heroContent}>
//             <Text style={styles.heroTitle}>Welcome to MyUNPension</Text>
//             <Text style={styles.heroSubtitle}>Your UN Retirement Benefits Calculator</Text>
//             <Text style={styles.heroDesc}>
//               Empowers you to easily calculate and understand your full retirement benefits from both your employing organization and the UNJSPF — all in one place, absolutely FREE.
//             </Text>
//             <TouchableOpacity 
//               style={styles.primaryBtn} 
//               onPress={() => router.push('/calculator')}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.primaryBtnText}>Calculate Your Pension Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Key Features */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Key Features: Your Complete Retirement Guide</Text>
          
//           <View style={styles.featureCard}>
//             <Text style={styles.featureTitle}>1. Your UNJSPF Benefits</Text>
//             <Text style={styles.featureDesc}>This is the core of our App. Our powerful, easy-to-use tools help you:</Text>
//             <View style={styles.featureList}>
//               <View style={styles.featureItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.featureText}>Accurate UNJSPF Formula Application provides precise calculation based on service, remuneration, and chosen options.</Text>
//               </View>
//               <View style={styles.featureItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.featureText}>Benefit Estimator offers reliable estimates for periodic benefit, withdrawal, or deferred retirement.</Text>
//               </View>
//               <View style={styles.featureItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.featureText}>Option Comparison allows you to compare lump sum commutation versus other payment methods.</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.featureCard}>
//             <Text style={styles.featureTitle}>2. Your HR Entitlements</Text>
//             <Text style={styles.featureDesc}>While our app focuses on your pension, we also provide the procedures involved in getting your other entitlements paid by your employing organization.</Text>
//             <View style={styles.featureList}>
//               <View style={styles.featureItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.featureText}>Relocation grant</Text>
//               </View>
//               <View style={styles.featureItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.featureText}>Repatriation grant</Text>
//               </View>
//               <View style={styles.featureItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.featureText}>Leave encashment</Text>
//               </View>
//               <View style={styles.featureItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.featureText}>Travel to home country</Text>
//               </View>
//             </View>
//             <Text style={styles.featureNote}>After logging in, you'll have direct access to the official UNDP site that lets you calculate these entitlements.</Text>
//           </View>
//         </View>

//         {/* About UN Pension Fund */}
//         <View style={styles.aboutSection}> 
//           <Text style={styles.sectionTitle}>About the United Nations Joint Staff Pension Fund</Text>
//           <Text style={styles.aboutSubtitle}>Your pension is managed by a trusted global institution.</Text>
//           <View style={styles.aboutCard}>
//             {[
//               'Established in 1949 by the General Assembly, The Fund is a defined benefit plan providing retirement, death, disability, and related benefits.',
//               'The Fund is one of the strongest pension funds in the world with over $96 billion in asset value and a funded ratio of 111%, meaning it has more than enough to meet its obligations in the next 30-40 years.',
//               'The Fund currently serves over 150,000 active staff and 90,000 retirees from the United Nations and other member organizations worldwide.',
//               'Each year, the Fund pays about $40,000 on average to over 89,000 retirees.',
//               'In its 75-year history, the Fund has never missed a single pension payment.',
//               'UN retirees, typically aged 60–65, have an average post-retirement life expectancy of about 23–24 years for men and 26–28 years for women, decreasing by 2–3 years if retiring at 65.',
//               'Your age, years of pension contribution, salary grade and step at the time of retirement decides the value of your pension.',
//               'Your Pension is adjusted based on inflation and paid for life.',
//               'You can separate at any time you want and receive your pension in your home country\'s currency in your preferred bank account.',
//               'After your death, benefits are transferred to your dependent spouse or eligible survivors.'
//             ].map((item, index) => (
//               <View key={index} style={styles.aboutItem}>
//                 <Text style={styles.bullet}>•</Text>
//                 <Text style={styles.aboutText}>{item}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* How It Works */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>How It Works: Ready in 3 Simple Steps</Text>
          
//           <View style={styles.stepCard}>
//             <View style={styles.stepNumber}>
//               <Text style={styles.stepNumberText}>1</Text>
//             </View>
//             <Text style={styles.stepTitle}>Create Your Free Account</Text>
//             <Text style={styles.stepDesc}>Sign up in seconds to get started.</Text>
//           </View>

//           <View style={styles.stepCard}>
//             <View style={styles.stepNumber}>
//               <Text style={styles.stepNumberText}>2</Text>
//             </View>
//             <Text style={styles.stepTitle}>Input Your Service Details</Text>
//             <Text style={styles.stepDesc}>Enter your key information like years of contribution, salary, grade, and step.</Text>
//           </View>

//           <View style={styles.stepCard}>
//             <View style={styles.stepNumber}>
//               <Text style={styles.stepNumberText}>3</Text>
//             </View>
//             <Text style={styles.stepTitle}>Explore & Compare</Text>
//             <Text style={styles.stepDesc}>Instantly see your pension projections and model different retirement scenarios to plan your future.</Text>
//           </View>
//         </View>

//         {/* Final Call to Action */}
//         <View style={styles.ctaSection}>
//           <Text style={styles.ctaTitle}>Ready to see your retirement future?</Text>
//           <Text style={styles.ctaDesc}>Take control of your retirement planning today. Make informed decisions with clear, accurate data.</Text>
//           <TouchableOpacity 
//             style={styles.ctaBtn} 
//             onPress={() => router.push('/signup')}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.ctaBtnText}>Get Started for Free</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerTitle}>Disclaimer</Text>
//           <Text style={styles.footerText}>
//             MyUNPension is an independent, third-party tool, developed by a former UN staff member who recently retired, and is not affiliated with, endorsed by, or in any way officially connected with the United Nations, the UNJSPF, or any of its subsidiary organizations. All calculations are estimates provided for planning purposes only and should be verified with the UNJSPF before making any financial decisions.
//           </Text>
          
//           <View style={styles.footerLinks}>
//             <TouchableOpacity activeOpacity={0.7}>
//               <Text style={styles.footerLink}>About Us</Text>
//             </TouchableOpacity>
//             <Text style={styles.footerSeparator}>•</Text>
//             <TouchableOpacity activeOpacity={0.7}>
//               <Text style={styles.footerLink}>Contact</Text>
//             </TouchableOpacity>
//             <Text style={styles.footerSeparator}>•</Text>
//             <TouchableOpacity activeOpacity={0.7}>
//               <Text style={styles.footerLink}>Privacy Policy</Text>
//             </TouchableOpacity>
//             <Text style={styles.footerSeparator}>•</Text>
//             <TouchableOpacity activeOpacity={0.7}>
//               <Text style={styles.footerLink}>Terms of Service</Text>
//             </TouchableOpacity>
//           </View>
          
//           <Text style={styles.footerCopyright}>© 2025 MyUNPension. All Rights Reserved.</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
  
//   // Navbar
//   navbar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#ffffff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0,
//     borderBottomColor: '#e2e8f0',
//   },
//   navLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   logo: {
//     width: 32,
//     height: 32,
//     marginRight: 8,
//     borderRadius: 6,
//     backgroundColor: '#e5e7eb',
//   },
//   appName: {
//     fontSize: isSmallScreen ? 18 : 20,
//     fontWeight: '700',
//     color: '#1a202c',
//   },
//   navRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   navLoginBtn: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginRight: 8,
//   },
//   navLoginText: {
//     color: '#4a5568',
//     fontWeight: '500',
//     fontSize: 14,
//   },
//   navSignUpBtn: {
//     backgroundColor: '#2563eb',
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: isSmallScreen ? 12 : 16,
//   },
//   navSignUpText: {
//     color: '#ffffff',
//     fontWeight: '600',
//     fontSize: 14,
//   },

//   // Hero Section
//   heroSection: {
//     backgroundColor: '#2563eb',
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     minHeight: height * 0.5,
//     justifyContent: 'center',
//   },
//   heroContent: {
//     alignItems: 'center',
//     maxWidth: 600,
//     alignSelf: 'center',
//   },
//   heroTitle: {
//     color: '#ffffff',
//     fontSize: isSmallScreen ? 24 : isTablet ? 36 : 28,
//     fontWeight: '800',
//     textAlign: 'center',
//     marginBottom: 12,
//     lineHeight: isSmallScreen ? 32 : isTablet ? 44 : 36,
//   },
//   heroSubtitle: {
//     color: '#bfdbfe',
//     fontSize: isSmallScreen ? 16 : isTablet ? 22 : 18,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   heroDesc: {
//     color: '#dbeafe',
//     fontSize: isSmallScreen ? 14 : 16,
//     textAlign: 'center',
//     lineHeight: 24,
//     marginBottom: 32,
//     paddingHorizontal: 10,
//   },
//   primaryBtn: {
//     backgroundColor: '#1d4ed8',
//     borderRadius: 25,
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   primaryBtnText: {
//     color: '#ffffff',
//     fontWeight: '700',
//     fontSize: 16,
//     textAlign: 'center',
//   },

//   // Sections
//   section: {
//     paddingVertical: 32,
//     paddingHorizontal: 20,
//     backgroundColor: '#f8fafc',
//   },
//   aboutSection: {
//     paddingVertical: 32,
//     paddingHorizontal: 20,
//     backgroundColor: '#eff6ff',
//   },
//   sectionTitle: {
//     fontSize: isSmallScreen ? 20 : isTablet ? 28 : 24,
//     fontWeight: '800',
//     color: '#1a202c',
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 32,
//   },

//   // Feature Cards
//   featureCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   featureTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2d3748',
//     marginBottom: 8,
//   },
//   featureDesc: {
//     color: '#4a5568',
//     fontSize: 15,
//     lineHeight: 22,
//     marginBottom: 12,
//   },
//   featureList: {
//     marginLeft: 8,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     marginBottom: 8,
//     alignItems: 'flex-start',
//   },
//   bullet: {
//     color: '#2563eb',
//     fontSize: 16,
//     fontWeight: '700',
//     marginRight: 8,
//     marginTop: 2,
//   },
//   featureText: {
//     color: '#4a5568',
//     fontSize: 14,
//     lineHeight: 20,
//     flex: 1,
//   },
//   featureNote: {
//     color: '#4a5568',
//     fontSize: 14,
//     lineHeight: 20,
//     marginTop: 12,
//     fontStyle: 'italic',
//   },

//   // About Section
//   aboutSubtitle: {
//     color: '#4a5568',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   aboutCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   aboutItem: {
//     flexDirection: 'row',
//     marginBottom: 12,
//     alignItems: 'flex-start',
//   },
//   aboutText: {
//     color: '#4a5568',
//     fontSize: 14,
//     lineHeight: 20,
//     flex: 1,
//   },

//   // Step Cards
//   stepCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 24,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   stepNumber: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#2563eb',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   stepNumberText: {
//     color: '#ffffff',
//     fontSize: 24,
//     fontWeight: '800',
//   },
//   stepTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2d3748',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   stepDesc: {
//     color: '#4a5568',
//     fontSize: 14,
//     textAlign: 'center',
//     lineHeight: 20,
//   },

//   // CTA Section
//   ctaSection: {
//     backgroundColor: '#1e40af',
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   ctaTitle: {
//     color: '#ffffff',
//     fontSize: isSmallScreen ? 20 : 24,
//     fontWeight: '800',
//     textAlign: 'center',
//     marginBottom: 12,
//     lineHeight: 32,
//   },
//   ctaDesc: {
//     color: '#bfdbfe',
//     fontSize: 15,
//     textAlign: 'center',
//     lineHeight: 24,
//     marginBottom: 32,
//     maxWidth: 400,
//   },
//   ctaBtn: {
//     backgroundColor: '#ffffff',
//     borderRadius: 25,
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   ctaBtnText: {
//     color: '#1e40af',
//     fontWeight: '700',
//     fontSize: 16,
//     textAlign: 'center',
//   },

//   // Footer
//   footer: {
//     backgroundColor: '#1a202c',
//     paddingVertical: 32,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   footerTitle: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   footerText: {
//     color: '#a0aec0',
//     fontSize: 13,
//     textAlign: 'center',
//     lineHeight: 20,
//     marginBottom: 24,
//     maxWidth: 500,
//   },
//   footerLinks: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   footerLink: {
//     color: '#63b3ed',
//     fontSize: 13,
//     marginHorizontal: 4,
//   },
//   footerSeparator: {
//     color: '#4a5568',
//     fontSize: 13,
//     marginHorizontal: 4,
//   },
//   footerCopyright: {
//     color: '#718096',
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });

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

const LOGO_URL = 'https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjg3NDViOWYyOGY0ODE5MWJjMjI0ODRiYTI0ZjFjZTM6ZmlsZV8wMDAwMDAwMGVhZjA2MWZkOGJjNWQxMjVjODdlZGU4MyIsInRzIjoiNDg3MDg3IiwicCI6InB5aSIsInNpZyI6ImQwMWE1ZTgzYzEyNzE1YzdhYmJlNzJkM2U5ZGE4YzA2MWFkOTc4NzQ0ZTNiMDdiMzBkZTQ3MTE3YWRkNTI0ZGQiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==';
const { width, height } = Dimensions.get('window');

const isTablet = width > 768;
const isSmallScreen = width < 380;

// Enhanced gradient backgrounds for modern look
const gradients = {
  hero: ['#1e3a8a', '#3b82f6', '#60a5fa'],
  cta: ['#1e40af', '#2563eb', '#3b82f6'],
  card: ['#ffffff', '#f8fafc'],
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
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [user, loading]);

  if (loading) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Enhanced Navbar with glassmorphism */}
        <View style={styles.navbar}>
          <View style={styles.navLeft}>
            <View style={styles.logoContainer}>
              <Image source={{ uri: LOGO_URL }} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.appName}>MyUNPension</Text>
          </View>
          <View style={styles.navRight}>
            <TouchableOpacity 
              style={styles.navLoginBtn}
              onPress={() => router.push('/login')}
              activeOpacity={0.7}
            >
              <Text style={styles.navLoginText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navSignUpBtn} 
              onPress={() => router.push('/signup')}
              activeOpacity={0.8}
            >
              <Text style={styles.navSignUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Enhanced Hero Section with animated content */} 
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
          <View style={styles.heroBackground} />
          <View style={styles.heroContent}>
            <View style={styles.heroIconContainer}>
              <Text style={styles.heroIcon}>💼</Text>
            </View>
            <Text style={styles.heroTitle}>Welcome to MyUNPension</Text>
            <Text style={styles.heroSubtitle}>Your UN Retirement Benefits Calculator</Text>
            <Text style={styles.heroDesc}>
              Empowers you to easily calculate and understand your full retirement benefits from both your employing organization and the UNJSPF — all in one place, absolutely FREE.
            </Text>
            <TouchableOpacity 
              style={styles.primaryBtn} 
              onPress={() => router.push('/calculator')}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryBtnText}>Calculate Your Pension Now</Text>
              <Text style={styles.primaryBtnIcon}>→</Text>
            </TouchableOpacity>
            
            {/* Trust indicators */}
            <View style={styles.trustIndicators}>
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
            </View>
          </View>
        </Animated.View>

        {/* Enhanced Key Features with modern cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Text style={styles.sectionSubtitle}>Your Complete Retirement Guide</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>💰</Text>
              </View>
              <Text style={styles.featureTitle}>Your UNJSPF Benefits</Text>
            </View>
            <Text style={styles.featureDesc}>This is the core of our App. Our powerful, easy-to-use tools help you:</Text>
            <View style={styles.featureList}>
              {[
                'Accurate UNJSPF Formula Application provides precise calculation based on service, remuneration, and chosen options.',
                'Benefit Estimator offers reliable estimates for periodic benefit, withdrawal, or deferred retirement.',
                'Option Comparison allows you to compare lump sum commutation versus other payment methods.'
              ].map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.bulletContainer}>
                    <Text style={styles.bullet}>✓</Text>
                  </View>
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>📋</Text>
              </View>
              <Text style={styles.featureTitle}>Your HR Entitlements</Text>
            </View>
            <Text style={styles.featureDesc}>While our app focuses on your pension, we also provide the procedures involved in getting your other entitlements paid by your employing organization.</Text>
            <View style={styles.featureList}>
              {[
                'Relocation grant',
                'Repatriation grant', 
                'Leave encashment',
                'Travel to home country'
              ].map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.bulletContainer}>
                    <Text style={styles.bullet}>✓</Text>
                  </View>
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.noteContainer}>
              <Text style={styles.featureNote}>💡 After logging in, you'll have direct access to the official UNDP site that lets you calculate these entitlements.</Text>
            </View>
          </View>
        </View>

        {/* Enhanced About UN Pension Fund */}
        <View style={styles.aboutSection}> 
          <Text style={styles.sectionTitle}>About the United Nations Joint Staff Pension Fund</Text>
          <Text style={styles.aboutSubtitle}>Your pension is managed by a trusted global institution.</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>$96B</Text>
              <Text style={styles.statLabel}>Asset Value</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>111%</Text>
              <Text style={styles.statLabel}>Funded Ratio</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>75</Text>
              <Text style={styles.statLabel}>Years Strong</Text>
            </View>
          </View>

          <View style={styles.aboutCard}>
            {[
              { icon: '🏛️', text: 'Established in 1949 by the General Assembly, The Fund is a defined benefit plan providing retirement, death, disability, and related benefits.' },
              { icon: '💪', text: 'The Fund is one of the strongest pension funds in the world with over $96 billion in asset value and a funded ratio of 111%.' },
              { icon: '🌍', text: 'The Fund currently serves over 150,000 active staff and 90,000 retirees from the United Nations and other member organizations worldwide.' },
              { icon: '💵', text: 'Each year, the Fund pays about $40,000 on average to over 89,000 retirees.' },
              { icon: '✅', text: 'In its 75-year history, the Fund has never missed a single pension payment.' },
              { icon: '📈', text: 'Your Pension is adjusted based on inflation and paid for life.' },
              { icon: '🏠', text: 'You can separate at any time you want and receive your pension in your home country\'s currency in your preferred bank account.' },
              { icon: '👨‍👩‍👧‍👦', text: 'After your death, benefits are transferred to your dependent spouse or eligible survivors.' }
            ].map((item, index) => (
              <View key={index} style={styles.aboutItem}>
                <Text style={styles.aboutIcon}>{item.icon}</Text>
                <Text style={styles.aboutText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Enhanced How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <Text style={styles.sectionSubtitle}>Ready in 3 Simple Steps</Text>
          
          {[
            { number: '1', title: 'Create Your Free Account', desc: 'Sign up in seconds to get started.', icon: '👤' },
            { number: '2', title: 'Input Your Service Details', desc: 'Enter your key information like years of contribution, salary, grade, and step.', icon: '📝' },
            { number: '3', title: 'Explore & Compare', desc: 'Instantly see your pension projections and model different retirement scenarios to plan your future.', icon: '📊' }
          ].map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <View style={styles.stepIconContainer}>
                <Text style={styles.stepEmoji}>{step.icon}</Text>
              </View>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          ))}
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
            <Text style={styles.ctaBtnIcon}>🚀</Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Footer */}
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
  
  // Enhanced Navbar with glassmorphism
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  appName: {
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: '800',
    color: '#1a202c',
    letterSpacing: -0.5,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navLoginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  navLoginText: {
    color: '#4a5568',
    fontWeight: '600',
    fontSize: 15,
  },
  navSignUpBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: isSmallScreen ? 16 : 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  navSignUpText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },

  // Enhanced Hero Section with gradient
  heroSection: {
    position: 'relative',
    paddingVertical: 60,
    paddingHorizontal: 20,
    minHeight: height * 0.6,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1e3a8a',
    // Add gradient overlay effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    zIndex: 1,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backdropFilter: 'blur(10px)',
  },
  heroIcon: {
    fontSize: 36,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 28 : isTablet ? 40 : 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: isSmallScreen ? 36 : isTablet ? 48 : 40,
    letterSpacing: -1,
  },
  heroSubtitle: {
    color: '#bfdbfe',
    fontSize: isSmallScreen ? 18 : isTablet ? 24 : 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroDesc: {
    color: '#dbeafe',
    fontSize: isSmallScreen ? 16 : 18,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
    paddingHorizontal: 20,
    maxWidth: 500,
  },
  primaryBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 32,
  },
  primaryBtnText: {
    color: '#1e3a8a',
    fontWeight: '800',
    fontSize: 17,
    marginRight: 8,
  },
  primaryBtnIcon: {
    color: '#1e3a8a',
    fontSize: 18,
    fontWeight: '700',
  },
  trustIndicators: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
  },
  trustItem: {
    alignItems: 'center',
    opacity: 0.9,
  },
  trustIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  trustText: {
    color: '#bfdbfe',
    fontSize: 12,
    fontWeight: '500',
  },

  // Enhanced Sections
  section: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#f8fafc',
  },
  aboutSection: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#eff6ff',
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 24 : isTablet ? 32 : 28,
    fontWeight: '900',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
    letterSpacing: -1,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },

  // Enhanced Feature Cards
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e3a8a',
    flex: 1,
    lineHeight: 26,
  },
  featureDesc: {
    color: '#4b5563',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  bullet: {
    color: '#1e3a8a',
    fontSize: 12,
    fontWeight: '700',
  },
  featureText: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  noteContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  featureNote: {
    color: '#1e40af',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  // Enhanced About Section with stats
  aboutSubtitle: {
    color: '#4b5563',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    gap: 16,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    gap: 16,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aboutIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  aboutText: {
    color: '#4b5563',
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },

  // Enhanced Step Cards
  stepCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
    position: 'relative',
  },
  stepIconContainer: {
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    padding: 12,
  },
  stepEmoji: {
    fontSize: 24,
  },
  stepNumber: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 26,
  },
  stepDesc: {
    color: '#4b5563',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },

  // Enhanced CTA Section
  ctaSection: {
    position: 'relative',
    backgroundColor: '#1e40af',
    paddingVertical: 48,
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
    backgroundColor: '#1e3a8a',
  },
  ctaTitle: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
    letterSpacing: -0.5,
    zIndex: 1,
  },
  ctaDesc: {
    color: '#bfdbfe',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    maxWidth: 400,
    zIndex: 1,
  },
  ctaBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 1,
  },
  ctaBtnText: {
    color: '#1e40af',
    fontWeight: '800',
    fontSize: 17,
    marginRight: 8,
  },
  ctaBtnIcon: {
    fontSize: 16,
  },

  // Enhanced Footer
  footer: {
    backgroundColor: '#0f172a',
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    maxWidth: 500,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  footerLinkItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  footerLink: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '500',
  },
  footerCopyright: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
});