import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
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

export default function ContactScreen() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:info.myunpension@harpandcode.io');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={scaleFont(24)} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Contact</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions or feedback?</Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.emailLink}>Email: wilson.jandrajupalli@gmail.com</Text>
          </TouchableOpacity>
          <Text style={styles.sectionContent}>
            We aim to reply within 3–5 business days.
          </Text>
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
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: scaleFont(14),
    color: '#374151',
    lineHeight: scaleFont(22),
    fontFamily: getRobotoFont('regular'),
    marginTop: 8,
  },
  emailLink: {
    fontSize: scaleFont(14),
    color: '#2563EB',
    lineHeight: scaleFont(22),
    fontFamily: getRobotoFont('regular'),
    textDecorationLine: 'underline',
  },
});
