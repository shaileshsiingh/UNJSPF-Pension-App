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

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={scaleFont(24)} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What we collect</Text>
          <Text style={styles.sectionContent}>
            By default, we do not require personal data to use calculators. If you contact us, we may receive your name, email, and the content of your message. Basic, privacy-friendly analytics may capture device and usage data.
          </Text>

          <Text style={styles.sectionTitle}>How we use it</Text>
          <Text style={styles.sectionContent}>
            To operate the app, respond to inquiries, improve features, and ensure security. We do not sell your data.
          </Text>

          <Text style={styles.sectionTitle}>Cookies</Text>
          <Text style={styles.sectionContent}>
            We use only essential cookies and limited analytics cookies if enabled.
          </Text>

          <Text style={styles.sectionTitle}>Sharing</Text>
          <Text style={styles.sectionContent}>
            We distribute the app through trusted platforms such as Google Play and Apple iOS App Store. These platforms may collect limited technical data needed to deliver and update the app. They cannot use your information for other purposes under our control. We do not share your data with advertisers.
          </Text>

          <Text style={styles.sectionTitle}>Retention</Text>
          <Text style={styles.sectionContent}>
            We keep data only as long as necessary for the purposes above or as required by law, then delete or anonymize it.
          </Text>

          <Text style={styles.sectionTitle}>Security</Text>
          <Text style={styles.sectionContent}>
            We apply reasonable technical and organizational measures, but no method is 100% secure. Please avoid entering sensitive personal information.
          </Text>

          <Text style={styles.sectionTitle}>Your rights</Text>
          <Text style={styles.sectionContent}>
            You may request access, correction, or deletion of your personal data by contacting us.
          </Text>

          <Text style={styles.sectionTitle}>Changes</Text>
          <Text style={styles.sectionContent}>
            We may update this policy. Material changes will be posted with a new “Last updated” date.
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
