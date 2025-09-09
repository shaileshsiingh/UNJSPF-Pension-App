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
const { width } = Dimensions.get('window');

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

  // Initialize data
  useEffect(() => {
    const initialSections: Section[] = [
      {
        id: 'documents',
        label: 'Documents to Collect',
        colorDot: '#3B82F6',
        items: [
          { id: 'd1', text: 'Passport & ID documents', status: 'pending', sectionId: 'documents' },
          { id: 'd2', text: 'Birth certificates (yours & dependents)', status: 'pending', sectionId: 'documents' },
          { id: 'd3', text: 'Marriage/divorce certificates', status: 'pending', sectionId: 'documents' },
        ],
      },
      // ... other sections
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

    // Save data
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('retirementChecklist', 
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
        <Text style={styles.title}>Prepare to Retire</Text>
        <Text style={styles.subtitle}>Checklist and timeline for retirement preparation</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {showIntro ? (
          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              Start your retirement planning as early as possible to ensure a smooth transition. 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: width < 300 ? 14 : width < 350 ? 16 : 18,
    fontWeight: '800',
    color: 'rgb(70 106 209)',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 13,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
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