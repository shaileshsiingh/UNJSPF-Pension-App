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

export default function AboutUsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={scaleFont(24)} color="#2563EB" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>About Us</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionContent}>
           <Text style={styles.bold}>MyUNPension</Text> provides independent tools that help UN staff and retirees understand separation and pension options. The project was started by a former UN staff member to make complex rules easier to navigate. We are not affiliated with, endorsed by, or speaking for the UNJSPF or the United Nations.
          </Text>
          <Text style={styles.sectionContent}>
            Our goal is to offer clear, educational content so you can prepare better conversations with official sources and advisors.
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
  sectionContent: {
    fontSize: scaleFont(14),
    color: '#374151',
    lineHeight: scaleFont(22),
    fontFamily: getRobotoFont('regular'),
    marginBottom: 12,
  },
  bold: {
    fontWeight: '600',
    color: '#0072CE',
    marginTop:10,
  },
});
