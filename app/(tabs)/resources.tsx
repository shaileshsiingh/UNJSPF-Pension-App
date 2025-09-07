import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { BookOpen } from 'lucide-react-native';

export default function ResourcesScreen() {
  const openUrl = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <BookOpen size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Useful Resources</Text>
        <Text style={styles.subtitle}>Important links for information and separation guidance</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>General information</Text>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/resources/about-member-self-service/')}>
            <Text style={styles.link}>1. Member Self-Service (MSS)</Text>
            <Text style={styles.url}>https://www.unjspf.org/resources/about-member-self-service/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/pension-townhall-sessions/')}>
            <Text style={styles.link}>2. Pension Townhall Sessions</Text>
            <Text style={styles.url}>https://www.unjspf.org/pension-townhall-sessions/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/resources/all-videos/')}>
            <Text style={styles.link}>3. Pension Videos</Text>
            <Text style={styles.url}>https://www.unjspf.org/resources/all-videos/</Text>
              </TouchableOpacity>
            </View>
            
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Separation specific information</Text>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/preparing-to-retire-or-leave-the-fund/')}>
            <Text style={styles.link}>4. Separating and Retiring</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/preparing-to-retire-or-leave-the-fund/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/benefit-options/')}>
            <Text style={styles.link}>5. UNJSPF Benefit Options</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/benefit-options/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/overview-of-the-separation-process/')}>
            <Text style={styles.link}>6. Overview of the Separation Process</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/overview-of-the-separation-process/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/separation/')}>
            <Text style={styles.link}>   — Separation</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/separation/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/retirement-age-2/')}>
            <Text style={styles.link}>7. Retirement Ages</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/retirement-age-2/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/how-to-submit-documents-to-the-unjspf/')}>
            <Text style={styles.link}>8. Submitting Documents to the UNJSPF</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/how-to-submit-documents-to-the-unjspf/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/survivors-benefit/')}>
            <Text style={styles.link}>9. UNJSPF Survivors Benefits</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/survivors-benefit/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/taxation-of-benefits/')}>
            <Text style={styles.link}>10. Taxation of UNJSPF Benefits</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/taxation-of-benefits/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.unjspf.org/for-clients/after-service-health-insurance/')}>
            <Text style={styles.link}>11. ASHI (After Service Health Insurance)</Text>
            <Text style={styles.url}>https://www.unjspf.org/for-clients/after-service-health-insurance/</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.fafics.org')}>
            <Text style={styles.link}>12. Retiree Associations / FAFICS</Text>
            <Text style={styles.url}>https://www.fafics.org</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://fafics.org/member-associations/list/')}>
            <Text style={styles.link}>   — Member Associations</Text>
            <Text style={styles.url}>https://fafics.org/member-associations/list/</Text>
          </TouchableOpacity>
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
    padding: 24,
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
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