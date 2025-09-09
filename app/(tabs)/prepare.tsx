import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckSquare } from 'lucide-react-native';

type Status = 'pending' | 'in progress' | 'done';

interface ChecklistItem {
  id: string;
  text: string;
  status: Status;
  sectionId: string;
}

interface Section {
  id: string;
  label: string;
  items: ChecklistItem[];
  colorDot: string;
}

const StatusPill = ({ status }: { status: Status }) => {
  const bgColor = {
    'pending': '#E5E7EB',
    'in progress': '#FBBF24',
    'done': '#10B981',
  }[status];

  const textColor = {
    'pending': '#374151',
    'in progress': '#92400E',
    'done': '#065F46',
  }[status];
  return (
    <View style={[styles.statusPill, { backgroundColor: `${bgColor}40` }]}>
      <Text style={[styles.statusText, { color: textColor }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

export default function PrepareScreen() {
  const [showIntro, setShowIntro] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [counts, setCounts] = useState({ 
    done: 0, 
    inprog: 0, 
    pending: 0, 
    total: 0 
  });
  const { width } = Dimensions.get('window');

  // Initialize data
  useEffect(() => {
    const initialSections: Section[] = [
      {
        id: 'critical',
        label: 'Critical – Must Do for Pension & Separation',
        colorDot: '#EF4444',
        items: [
          { id: 'c1', text: 'Complete your e-performance (incl. supervised staff, if applicable).', status: 'pending', sectionId: 'critical' },
          { id: 'c2', text: 'Certify all attendance and leave records in Umoja.', status: 'pending', sectionId: 'critical' },
          { id: 'c3', text: 'Confirm and use accrued annual leave (max 60 days/18 temps).', status: 'pending', sectionId: 'critical' },
          { id: 'c4', text: 'Attend your Exit Interview and submit all required forms.', status: 'pending', sectionId: 'critical' },
          { id: 'c5', text: 'Register in the UNJSPF portal to track pension payments.', status: 'pending', sectionId: 'critical' },
          { id: 'c6', text: 'Submit Separation Payments form (F.250).', status: 'pending', sectionId: 'critical' },
          { id: 'c7', text: 'Submit UNJSPF Separation Instructions (PENS.E/6 or PENS.E/7).', status: 'pending', sectionId: 'critical' },
          { id: 'c8', text: 'Return UNLPs to UNHQ.', status: 'pending', sectionId: 'critical' },
          { id: 'c9', text: 'Finalize repatriation travel in Umoja ESS.', status: 'pending', sectionId: 'critical' },
          { id: 'c10', text: 'Submit notarized proof for Repatriation Grant.', status: 'pending', sectionId: 'critical' },
          { id: 'c11', text: 'Obtain Retiree UN Grounds Pass (SSS.160).', status: 'pending', sectionId: 'critical' },
        ],
      },
      {
        id: 'important',
        label: 'Important – Avoid Delays & Complications',
        colorDot: '#F59E0B',
        items: [
          { id: 'i1', text: 'Cancel G-5 visas for household employees.', status: 'pending', sectionId: 'important' },
          { id: 'i2', text: 'Review US residency/G-4 visa options if based in the US.', status: 'pending', sectionId: 'important' },
          { id: 'i3', text: 'Update/join medical & life insurance (within 31 days of separation).', status: 'pending', sectionId: 'important' },
          { id: 'i4', text: 'Clear all education grant & dependency allowance claims.', status: 'pending', sectionId: 'important' },
          { id: 'i5', text: 'Provide proof of payment for rental subsidies, if applicable.', status: 'pending', sectionId: 'important' },
          { id: 'i6', text: 'Settle staff obligations (Emergency Fund, OICT devices, Garage, Locksmith, etc.).', status: 'pending', sectionId: 'important' },
          { id: 'i7', text: 'Submit Annex to Exit Interview (ST/SGB/2006/15) (if in procurement).', status: 'pending', sectionId: 'important' },
          { id: 'i8', text: 'Clear any UNFCU loans to avoid delays in separation payments.', status: 'pending', sectionId: 'important' },
        ],
      },
      {
        id: 'optional',
        label: 'Optional / Conditional',
        colorDot: '#6B7280',
        items: [
          { id: 'o1', text: 'US income tax: If a US taxpayer, notify the UN Tax Unit.', status: 'pending', sectionId: 'optional' },
          { id: 'o2', text: 'Guidance on US Permanent Residency (P.323): Only if applying for G-4 visa residency conversion.', status: 'pending', sectionId: 'optional' },
        ],
      },
    ];

    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('retirementChecklist');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setSections(parsedData.sections || initialSections);
          setShowIntro(parsedData.showIntro ?? true);
        } else {
          setSections(initialSections);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setSections(initialSections);
      }
    };

    loadData();
  }, []);

  const cycleStatus = (item: ChecklistItem) => {
    setSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        items: section.items.map(i => 
          i.id === item.id 
            ? { 
                ...i, 
                status: i.status === 'pending' 
                  ? 'in progress' 
                  : i.status === 'in progress' 
                    ? 'done' 
                    : 'pending' 
              } 
            : i
        )
      }))
    );
  };

  const setAll = (status: Status) => {
    setSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        items: section.items.map(item => ({
          ...item,
          status
        }))
      }))
    );
  };

  // Update the useEffect for counts to include save functionality
  useEffect(() => {
    if (sections.length === 0) return;
    
    let done = 0;
    let inprog = 0;
    let pending = 0;
    let total = 0;

    sections.forEach(section => {
      section.items.forEach(item => {
        if (item.status === 'done') done++;
        else if (item.status === 'in progress') inprog++;
        else pending++;
        total++;
      });
    });

    setCounts({ done, inprog, pending, total });
    const { width } = Dimensions.get('window');

    // Save data
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('retirementChecklistV2', 
          JSON.stringify({ sections, showIntro })
        );
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [sections, showIntro]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
          <CheckSquare size={32} color="#2563EB" strokeWidth={2} />
        </View>
        <Text style={styles.title}>Prepare to Retire</Text>
        <Text style={styles.subtitle}>Actions Checklist, Timelines, Submissions</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {showIntro ? (
          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              Your retirement process officially begins the moment HR issues your Separation Notification (PF4/SEP) and Separation Personnel Action (SEPPA). Once you separate, all access to official portals and emails is cut off instantly—with no way to retrieve them later. Save every essential email, document, and message to your personal email ID immediately. 
              Delaying this step may result in <Text style={styles.bold}>permanent loss of critical records</Text>.
            </Text>
            <TouchableOpacity
              onPress={() => setShowIntro(false)}
              style={styles.hideButton}
            >
              <Text style={styles.hideButtonText}>Hide intro</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setShowIntro(true)}
            style={styles.showButton}
          >
            <Text style={styles.showButtonText}>Show intro</Text>
          </TouchableOpacity>
        )}

        {/* Progress Toolbar */}
        <View style={styles.progressContainer}>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#9CA3AF' }]} />
              <Text style={styles.legendText}>Pending</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>In Progress</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Done</Text>
            </View>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(counts.done / Math.max(1, counts.total)) * 100}%` }
              ]} 
            />
          </View>
          
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{counts.done} done</Text>
            <Text style={styles.progressText}>{counts.inprog} in progress</Text>
            <Text style={styles.progressText}>{counts.pending} pending</Text>
          </View>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              onPress={() => setAll('pending')}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setAll('in progress')}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Mark All In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setAll('done')}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Mark All Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sections */}
        <View style={styles.sectionsContainer}>
          {sections.map(section => (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionDot, { backgroundColor: section.colorDot }]} />
                <Text style={styles.sectionTitle}>{section.label}</Text>
              </View>
              <View style={styles.itemsContainer}>
                {section.items.map(item => (
                  <View key={item.id} style={styles.item}>
                    <TouchableOpacity
                      style={[
                        styles.checkbox,
                        item.status === 'done' && styles.checkboxChecked
                      ]}
                      onPress={() => cycleStatus(item)}
                      accessibilityLabel={`Set status for ${item.text}`}
                    >
                      {item.status === 'done' && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemText}>{item.text}</Text>
                      <StatusPill status={item.status} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            Tip: Tap a box to cycle status. Use the toolbar to bulk-update.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  headerIconContainer: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgb(70 106 209)',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  introContainer: {
    padding: 20,
    backgroundColor: '#FFFBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#FEF3C7',
  },
  introText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#92400E',
    marginBottom: 12,
  },
  bold: {
    fontWeight: '600',
  },
  hideButton: {
    alignSelf: 'flex-start',
  },
  hideButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  showButton: {
    margin: 16,
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  showButtonText: {
    fontSize: 12,
    color: '#4B5563',
  },
  progressContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#4B5563',
  },
  sectionsContainer: {
    paddingBottom: 20,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  itemsContainer: {
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tipContainer: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 11,
    color: '#6B7280',
  },
});