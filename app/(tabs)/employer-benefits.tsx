import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FileText, Info } from 'lucide-react-native';

export default function EmployerBenefitsScreen() {
  const openUrl = (url: string) => Linking.openURL(url).catch(() => {});

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>        
        <FileText size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Benefits from Employing Organization</Text>
        <Text style={styles.subtitle}>Your separation benefits at a glance</Text>
      </View>

      <View style={styles.section}>        
        <View style={[styles.infoCard, styles.warningCard]}>          
          <Info size={20} color="#DC2626" strokeWidth={2} />
          <Text style={styles.warningText}>
            Important note: The issuance of the following two key documents by your HR department marks the official start of retirement preparation
          </Text>
        </View>

        <View style={styles.bulletGroup}>
          <Text style={styles.bullet}>■ Separation Notification (P4/SEP) – Sent by HR to UNJSPF.</Text>
          <Text style={styles.bullet}>■ Separation Personnel Action Form (SEPA) – Sent by HR to UNJSPF (not required for UN Agencies staff).</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This is a summary of the HR entitlements due from your employing organization, including the steps you must complete for release of payment:</Text>
          <View style={styles.orderedList}>
            <Text style={styles.item}><Text style={styles.bold}>1.Relocation grant</Text>: Submit boarding passes as proof of return, and return your UNLP.</Text>
            <Text style={styles.item}><Text style={styles.bold}>2.Travel entitlements</Text>: Submit your expense report for reimbursement of terminal expenses.</Text>
            <Text style={styles.item}><Text style={styles.bold}>3.Repatriation grant</Text> – Send an affidavit confirming your repatriation to home country.</Text>
            <Text style={styles.item}><Text style={styles.bold}>4.Final payments</Text>: encashment of accrued annual leave (upto 60 days) and other accounts payable - will be released after payroll completes audit of your service record (can be expected: 6–8 weeks after separation).</Text>
            {/* <Text style={styles.item}><Text style={styles.bold}>Clear accounts</Text> and return all organization property (equipment, ID, credit cards) and other accounts.</Text> */}
          </View>

          <Text style={styles.italicInfo}>
            Accrued leave on separation is limited to 30 days (temporary or on duty) before separation.
          </Text>

          <Text style={styles.note}>
            To calculate your separation benefits from your employing organization, you may access the widely used UNDP tool titled
            <Text> </Text>
            <Text style={styles.link} onPress={() => openUrl('https://info.undp.org/people/leaveonline/SiteAssets/Separation.aspx')}>"Separation Estimate"</Text>.
          </Text>
          <Text style={styles.urlText}>https://info.undp.org/people/leaveonline/SiteAssets/Separation.aspx</Text>
        </View>

        <View style={styles.card}>          
          <Text style={styles.cardTitle}>Documents to submit 30 days before separation</Text>
          <View style={styles.orderedList}>            
            <Text style={styles.item}><Text style={styles.bold}>1.Separation Payments Form</Text> (P.250) – For alternative bank account final pay.</Text>
            <Text style={styles.item}><Text style={styles.bold}>2.Separation Briefing Note</Text> – Review, sign, and return (scan/format).</Text>
            <Text style={styles.item}><Text style={styles.bold}>3.Exit Interview Form</Text> (P.218) & Annex – Complete and return.</Text>
            <Text style={styles.item}><Text style={styles.bold}>4.E-Performance Appraisal</Text>     – Submit most recent appraisal.</Text>
            <Text style={styles.item}><Text style={styles.bold}>5.Clearances</Text> – clearances coordinated by HR partner.</Text>
            <Text style={styles.item}><Text style={styles.bold}>6.UNLP</Text> – Return UNLP to Passport Section at HQ.</Text>
            <Text style={styles.item}><Text style={styles.bold}>7.Submit all leave requests</Text> (annual, sick, etc.) in Umoja ESS and confirm with HR by email.</Text>
          </View>
        </View>

        <View style={styles.card}>          
          <Text style={styles.permanentTitle}>Permanent document to keep for record– you may obtain upon request:</Text>
          <Text style={styles.permanentItem}>Form P.50 Certification of service from your HR – detailing a statement of duties and length of service, annual salary, and also an assessment of work quality and conduct.</Text>
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
    // lineHeight: 22,
  },
  section: {
    padding: 24,
  },
  infoCard: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderColor: '#FCA5A5',
    borderWidth: 1,
  },
  warningCard: {},
  warningText: {
    fontSize: 14,
    color: '#DC2626',
    flex: 1,
    marginLeft: 12,
    lineHeight: 20,
    fontWeight: '600',
  },
  bulletGroup: {
    marginBottom: 16,
  },
  bullet: {
    fontSize: 14,
    color: '#DC2626',
    marginBottom: 6,
    lineHeight: 20,
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
  orderedList: {},
  item: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 8,
  },
  bold: {
    fontWeight: '700',
    color: '#000000',
  },
  italicInfo: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 15,
    marginTop: 8,
    marginBottom: 12,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  note: {
    fontSize: 13,
    color: '#000000',
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 8,
    borderColor: '#BAE6FD',
    borderWidth: 1,
    marginTop: 8,
    fontStyle: 'italic',

  },
  link: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  urlText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  permanentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 12,
  },
  permanentItem: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
});