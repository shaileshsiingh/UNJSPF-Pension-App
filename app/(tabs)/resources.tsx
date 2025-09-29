import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { BookOpen, Link, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ResourcesScreen() {
  const openUrl = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
           <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.push('/(tabs)')}
                  >
         <View style={{ transform: [{ scaleX: -1 }] }}>
                  <LogOut size={24} color="#2563EB" strokeWidth={2} />
                </View>          </TouchableOpacity>
        <View style={styles.headerIconContainer}>
          <Link size={32} color="#2563EB" strokeWidth={2} />
        </View>
        <Text style={styles.title}>Useful Resources</Text>
        <Text style={styles.subtitle}>Important links for information and separation guidance</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card1}>
          <Text style={styles.cardTitle}>UN News</Text>
          <TouchableOpacity onPress={() => openUrl('https://news.un.org/en/')}>
            <Text style={styles.link}>UN News</Text>
            <Text style={styles.url}>https://news.un.org/en/</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Pension Portal</Text>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/resources/about-member-self-service/')}>
            <Text style={styles.link}>Member Self-Service (MSS)</Text>
            <Text style={styles.url}>https://www.unjspf.org/resources/about-member-self-service/</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/pension-townhall-sessions/')}>
            <Text style={styles.link}>Pension Townhall Sessions</Text>
            <Text style={styles.url}>https://www.unjspf.org/pension-townhall-sessions/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/resources/all-videos/')}>
            <Text style={styles.link}>Pension Videos</Text>
            <Text style={styles.url}>https://www.unjspf.org/resources/all-videos/</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Separation Specific Information</Text>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/preparing-to-retire-or-leave-the-fund/')}>
            <Text style={styles.link}>Separating and Retiring</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/preparing-to-retire-or-leave-the-fund/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/benefit-options/')}>
            <Text style={styles.link}>UNJSPF Benefit Options</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/benefit-options/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/overview-of-the-separation-process/')}>
            <Text style={styles.link}>Overview of the Separation Process</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/overview-of-the-separation-process/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/separation/')}>
            <Text style={styles.link}>    — Separation</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/separation/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/retirement-age-2/')}>
            <Text style={styles.link}>Retirement Ages</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/retirement-age-2/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/how-to-submit-documents-to-the-unjspf/')}>
            <Text style={styles.link}>Submitting Documents to the UNJSPF</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/how-to-submit-documents-to-the-unjspf/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/survivors-benefit/')}>
            <Text style={styles.link}>UNJSPF Survivors Benefits</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/survivors-benefit/</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.card}>
          <Text style={styles.cardTitle}>Taxation</Text>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/taxation-of-benefits/')}>
            <Text style={styles.link}>Taxation of UNJSPF Benefits</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/taxation-of-benefits/</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.card}>
          <Text style={styles.cardTitle}>ASHI (After Service Health Insurance)</Text>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/after-service-health-insurance/')}>
            <Text style={styles.link}>ASHI (After Service Health Insurance)</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/after-service-health-insurance/</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.card}>
          <Text style={styles.cardTitle}>Expat and Retiree Networks</Text>
          <TouchableOpacity onPress={() => openUrl('https://www.fafics.org')}>
            <Text style={styles.link}>Retiree Associations / FAFICS</Text>
            <Text style={styles.url}>https://www.fafics.org</Text>
            <Text style={styles.url}>https://www.InterNations.org</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://fafics.org/member-associations/list/')}>
            <Text style={styles.link}>Member Associations</Text>
            <Text style={styles.url}>https://fafics.org/member-associations/list/</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    position: 'absolute',
    left: width < 300 ? 12 : width < 350 ? 16 : 24,
    top: width < 300 ? 20 : width < 350 ? 24 : 28,
    padding: 8,
    zIndex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  headerIconContainer: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: 'rgb(70 106 209)',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  section: {
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  card1: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    marginTop: -10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 12,
  },
  link: {
    color: '#2563EB',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '600',
  },
  url: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
    fontStyle: 'italic',
  },
});