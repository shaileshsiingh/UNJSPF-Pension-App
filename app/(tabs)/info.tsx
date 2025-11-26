import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  Info,
  Phone,
  Mail,
  MapPin,
  Heart,
  Users,
  TrendingUp,
  ExternalLink
} from 'lucide-react-native';

export default function InfoScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Pension Helpline',
      value: '1-800-PENSION',
      description: 'Monday - Friday, 8 AM - 6 PM EST',
    },
    {
      icon: Mail,
      title: 'Email Support',
      value: 'pension@gov.agency',
      description: 'Response within 24-48 hours',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      value: '123 Federal Plaza, Washington, DC 20001',
      description: 'Walk-in consultations by appointment',
    },
  ];

  const benefitTypes = [
    {
      icon: Heart,
      title: 'Spouse Benefits',
      description: 'Survivors may be eligible for continuing pension benefits',
      details: [
        'Surviving spouse pension (50-75% of member pension)',
        'Minimum age requirements may apply',
        'Must be married for specified duration',
        'Medical benefits may continue'
      ]
    },
    {
      icon: Users,
      title: 'Dependent Benefits',
      description: 'Children and other dependents may qualify for benefits',
      details: [
        'Unmarried children under age 18 (or 22 if student)',
        'Disabled children of any age',
        'Dependent parents in some cases',
        'Benefits end when eligibility criteria no longer met'
      ]
    },
    {
      icon: TrendingUp,
      title: 'COLA Adjustments',
      description: 'Cost of Living Adjustments help maintain purchasing power',
      details: [
        'Annual adjustments based on inflation rates',
        'Typically applied in January each year',
        'Protects against inflation over time',
        'Historical average of 2-3% annually'
      ]
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Info size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Information</Text>
        <Text style={styles.subtitle}>Contact details, benefits info, and helpful resources</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        {contactInfo.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <contact.icon size={24} color="#2563EB" strokeWidth={2} />
              <Text style={styles.contactTitle}>{contact.title}</Text>
            </View>
            <Text style={styles.contactValue}>{contact.value}</Text>
            <Text style={styles.contactDescription}>{contact.description}</Text>
          </View>
        ))}
      </View>

      {/* Benefit Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Benefits</Text>

        {benefitTypes.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={styles.benefitHeader}>
              <benefit.icon size={24} color="#059669" strokeWidth={2} />
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
            </View>
            <Text style={styles.benefitDescription}>{benefit.description}</Text>

            <View style={styles.benefitDetails}>
              {benefit.details.map((detail, detailIndex) => (
                <View key={detailIndex} style={styles.benefitDetailItem}>
                  <View style={styles.benefitBullet} />
                  <Text style={styles.benefitDetailText}>{detail}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => openLink('https://www.opm.gov/retirement-services/')}
        >
          <View style={styles.linkContent}>
            <Text style={styles.linkTitle}>Official Retirement Services</Text>
            <Text style={styles.linkDescription}>Visit the official government retirement portal</Text>
          </View>
          <ExternalLink size={20} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => openLink('https://www.tsp.gov/')}
        >
          <View style={styles.linkContent}>
            <Text style={styles.linkTitle}>Thrift Savings Plan</Text>
            <Text style={styles.linkDescription}>Manage your TSP account and investments</Text>
          </View>
          <ExternalLink size={20} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => openLink('https://www.ssa.gov/')}
        >
          <View style={styles.linkContent}>
            <Text style={styles.linkTitle}>Social Security Administration</Text>
            <Text style={styles.linkDescription}>Information about Social Security benefits</Text>
          </View>
          <ExternalLink size={20} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Legal Disclaimer */}
      <View style={styles.disclaimerSection}>
        <Text style={styles.disclaimerTitle}>Important Notice</Text>
        <Text style={styles.disclaimerText}>
          This application provides general information and estimates only. All pension calculations,
          eligibility determinations, and benefit amounts are subject to official review and may vary
          based on current regulations, individual circumstances, and final employment records.
          {'\n\n'}
          For official determinations and binding calculations, please contact the pension office
          directly or submit formal applications through official channels.
          {'\n\n'}
          The information in this app is current as of the last update and may not reflect recent
          regulatory changes or policy updates.
        </Text>
      </View>

      <View style={styles.footerSpace} />
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
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    margin: 24,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  benefitCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  benefitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  benefitDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 24,
  },
  benefitDetails: {
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  benefitDetailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  benefitBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#059669',
    marginTop: 8,
    marginRight: 12,
  },
  benefitDetailText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  linkCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 4,
  },
  linkDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  disclaimerSection: {
    margin: 24,
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 12,
    borderColor: '#FCD34D',
    borderWidth: 1,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  footerSpace: {
    height: 24,
  },
});