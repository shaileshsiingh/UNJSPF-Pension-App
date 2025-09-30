import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {
  User,
  FileText,
  Smartphone,
  ArrowRight,
  Building,
  Shield,
  Calculator,
  Users,
  TrendingUp,
  LogOut,
  MapPin,
  CheckSquare,
  Briefcase,
  Book,
  Workflow,
  Link,
  Plane,
  Info,
  BookOpen
} from 'lucide-react-native';
import { useAuth } from '../../components/AuthContext';
import { getRobotoFont } from '@/utils/fonts';
import { router } from 'expo-router';
// App logo (re-use same asset as landing page)
const LOGO_URL = 'https://res.cloudinary.com/djd2pcr44/image/upload/v1758718205/ChatGPT_Image_Sep_24_2025_06_11_37_PM_uo4doa.png';

export default function HomeScreen() {
  const { signOut, user } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={signOut}
          style={styles.logoutButton}
          accessibilityLabel="Logout"
        >
          <View style={{ transform: [{ scaleX: -1 }] }}>
            <LogOut size={24} color="#2563EB" strokeWidth={2} />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Image
                source={{ uri: LOGO_URL }}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* <Text style={styles.heroTitle}>MyUNPension</Text> */}
            {/* <Building size={48} color="#2563EB" strokeWidth={2} /> */}
            <Text style={styles.welcomeTitle}>Welcome{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}!</Text>
            <Text style={styles.welcomeSubtitle}>
              Begin your pension journey with these essential steps</Text>
          </View>
        </View>
        {/* Quick Actions Section */}
        {/* <View style={styles.section}> */}
        {/* <Text style={styles.sectionTitle}>Get Started</Text>
          <Text style={styles.sectionSubtitle}>
            Begin your pension journey with these essential steps
          </Text> */}

        {/* <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.primaryButton, { width: '80%', height: 85 }]}
              onPress={() => {
                Scroll to Quick Tools section or stay on current screen
                router.push('/about-app');
              }}
            >
              <View style={styles.buttonContent}>
                <User size={24} color="#FFFFFF" strokeWidth={2} />
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.primaryButtonText}>Benefit Estimator Guide</Text>
                  <Text style={styles.primaryButtonSubtext}>
                  Learn the concepts, methodology & formulas behind your retirement benefit calculations.
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View> */}
        {/* </View> */}



        {/* Quick Tools Section */}
        {/* needs to center-aligned */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle1}>Quick Tools</Text>
          <Text style={styles.sectionSubtitle1}>
            Access essential pension tools and resources here
          </Text>

          <View style={styles.toolsGrid}>
            <TouchableOpacity
              style={styles.toolCard}
              onPress={() => router.push('/about-app' as any)}
            >
              <BookOpen size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>Pension Guide</Text>
              <Text style={styles.toolDescription}>
                Concepts • Formulas  {'\n'} Options • About
              </Text>
            </TouchableOpacity>
            {/* 1. Prepare to Retire (old: Planner) */}
            <TouchableOpacity
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/prepare' as any)}
            >
              <CheckSquare size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>Prepare to Retire</Text>
              <Text style={styles.toolDescription}>
                Actions • Checklist  {'\n'} Timelines • Submissions
              </Text>
            </TouchableOpacity>

            {/* 2. UNJSF Benefits (kept route used previously) */}
            <TouchableOpacity
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Shield size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>Pension Calculator</Text>
              <Text style={styles.toolDescription}>
                Eligibility • Amounts • {'\n'} Next steps
              </Text>
            </TouchableOpacity>

            {/* 3. My Pension (old: Pension) */}
            <TouchableOpacity
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/eligibility')}
            >
              <TrendingUp size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>Pension Snapshot</Text>
              <Text style={styles.toolDescription}>
                Scenarios • Options
              </Text>
            </TouchableOpacity>

            {/* 4. HR Benefits (old: Benefits from your employing organization) */}
            <TouchableOpacity
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/employer-benefits')}
            >
              <Plane size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>HR Benefits</Text>
              <Text style={styles.toolDescription}>
                Relocation • Repatriation {'\n'} Leave • Home travel
              </Text>
            </TouchableOpacity>

            {/* 5. Post-UN Life Planner (old: Relocation) */}
            <TouchableOpacity
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/post-un-life' as any)}
            >
              <Workflow size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>Post-UN {'\n'} Life Planner</Text>
              <Text style={styles.toolDescription}>
                Design your next chapter
              </Text>
            </TouchableOpacity>

            {/* 6. Resources (old: Community) */}
            <TouchableOpacity
              style={styles.toolCard}
              onPress={() => router.push('/(tabs)/resources')}
            >

              <Link size={32} color="#059669" strokeWidth={2} />
              <Text style={styles.toolTitle}>Resources</Text>
              <Text style={styles.toolDescription}>
                Useful links
              </Text>
            </TouchableOpacity>
          </View>
        </View>



        {/* Stats Section */}
        {/* <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <TrendingUp size={24} color="#059669" strokeWidth={2} />
              <Text style={styles.statNumber}>240K+</Text>
              <Text style={styles.statLabel}>UNJSPF Members</Text>
            </View>
            <View style={styles.statCard}>
              <Shield size={24} color="#2563EB" strokeWidth={2} />
              <Text style={styles.statNumber}>100%+</Text>
              <Text style={styles.statLabel}>Funding Ratio</Text>
            </View>
          </View>
        </View> */}

        {/* Footer */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 2,
    paddingTop: 2,
    marginBottom: 0,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    // paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerLogo: {
    width: 120,
    height: 120,
    marginBottom: 22,
    marginTop: -16,   // a bit more spacing from the title
  },
  heroTitle: {
    color: '#0072CE',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -1.2,
    fontFamily: getRobotoFont('bold'),
    // textShadowColor: 'rgba(0, 0, 0, 0.3)',
    // textShadowOffset: { width: 0, height: 2 },
    // textShadowRadius: 8,
    marginTop: -32,
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: 'rgb(175, 149, 0)',
    marginTop: -52,
    // marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 11,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 16,
    maxWidth: 300,
    marginLeft: 35
  },
  section: {
    padding: 14,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,

  },
  sectionTitle1: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgb(5, 150, 105)',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionSubtitle1: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  primaryButtonSubtext: {
    fontSize: 11,
    color: '#E0E7FF',
    lineHeight: 18,
    textAlign: 'center',

  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  toolDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    paddingTop: 0,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});