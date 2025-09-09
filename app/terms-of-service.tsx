import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { getRobotoFont } from '../utils/fonts';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const isSmallScreen = width < 414;

const scaleFont = (small: number, large = small * 1.3) => {
  return isSmallScreen ? small : large;
};

const getHorizontalPadding = () => {
  return isSmallScreen ? 20 : 32;
};

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={scaleFont(24)} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Terms of Service</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acceptance</Text>
          <Text style={styles.sectionContent}>
            By accessing or using MyUNPension, you agree to these Terms.
          </Text>

          <Text style={styles.sectionTitle}>Non-affiliation & No advice</Text>
          <Text style={styles.sectionContent}>
            The app is independent and not affiliated with the UN or UNJSPF. Content is educational only and does not constitute legal, financial, or pension advice.
          </Text>

          <Text style={styles.sectionTitle}>License</Text>
          <Text style={styles.sectionContent}>
            We grant you a personal, non-exclusive, revocable license to use the app. You may not reverse engineer, resell, or misuse the service.
          </Text>

          <Text style={styles.sectionTitle}>User responsibilities</Text>
          <Text style={styles.sectionContent}>
            You are responsible for inputs you provide and for verifying outputs with official sources. Do not upload confidential or personal data.
          </Text>

          <Text style={styles.sectionTitle}>Prohibited use</Text>
          <Text style={styles.sectionContent}>
            No unlawful, infringing, or harmful activities, including attempts to disrupt or scrape the service.
          </Text>

          <Text style={styles.sectionTitle}>Warranties & liability</Text>
          <Text style={styles.sectionContent}>
            The service is provided “as is” and “as available.” To the fullest extent permitted by law, we disclaim all warranties and limit liability for indirect or consequential damages.
          </Text>

          <Text style={styles.sectionTitle}>Third-party links</Text>
          <Text style={styles.sectionContent}>
            We are not responsible for third-party sites or services.
          </Text>

          <Text style={styles.sectionTitle}>Termination</Text>
          <Text style={styles.sectionContent}>
            We may suspend or end access for misuse or legal reasons.
          </Text>

          <Text style={styles.sectionTitle}>Governing law</Text>
          <Text style={styles.sectionContent}>
            These Terms are governed by the laws of Panama. Disputes will be resolved by the courts of Panama City, Panama.
          </Text>

          <Text style={styles.sectionTitle}>Changes</Text>
          <Text style={styles.sectionContent}>
            We may update these Terms. Continued use after changes means acceptance.
          </Text>

          <Text style={styles.lastUpdated}>Last updated: 08 Sep 2025</Text>
        </View>
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
    padding: getHorizontalPadding(),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#111827',
    fontFamily: getRobotoFont('bold'),
  },
  content: {
    padding: getHorizontalPadding(),
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#111827',
    fontFamily: getRobotoFont('medium'),
    marginBottom: 8,
    marginTop: 8,
  },
  sectionContent: {
    fontSize: scaleFont(14),
    color: '#374151',
    lineHeight: scaleFont(22),
    fontFamily: getRobotoFont('regular'),
  },
  lastUpdated: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    fontFamily: getRobotoFont('regular'),
    marginTop: 16,
    fontStyle: 'italic',
  },
});
