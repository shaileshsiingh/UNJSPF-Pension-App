import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BookOpen, SquareCheck as CheckSquare, FileText, Clock, TriangleAlert as AlertTriangle, Check, Workflow } from 'lucide-react-native';
import PensionFlowChart from '@/components/PensionFlowChart';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  urgent: boolean;
  formRequired?: string;
  deadline?: string;
}

export default function ResourcesScreen() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'examples' | 'flowchart'>('checklist');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      title: 'Review Pension Statement',
      description: 'Verify your years of service, salary history, and beneficiary information',
      completed: false,
      urgent: true,
      deadline: '90 days before separation'
    },
    {
      id: '2',
      title: 'Update Beneficiary Information',
      description: 'Ensure your beneficiary details are current and accurate',
      completed: false,
      urgent: true,
      formRequired: 'Form PENS.B/1',
      deadline: '30 days before separation'
    },
    {
      id: '3',
      title: 'Submit Pension Application',
      description: 'Complete and submit the appropriate pension application form',
      completed: false,
      urgent: true,
      formRequired: 'Form PENS.E/7 or PENS.D/1',
      deadline: '90 days before separation'
    },
    {
      id: '4',
      title: 'Medical Examination',
      description: 'Complete required medical examination if applicable',
      completed: false,
      urgent: false,
      deadline: '60 days before separation'
    },
    {
      id: '5',
      title: 'Calculate Benefit Options',
      description: 'Use the calculator to compare different pension options',
      completed: false,
      urgent: false,
    },
    {
      id: '6',
      title: 'Tax Planning Consultation',
      description: 'Consult with a tax advisor about pension tax implications',
      completed: false,
      urgent: false,
    },
    {
      id: '7',
      title: 'Health Insurance Transition',
      description: 'Plan for health insurance coverage after retirement',
      completed: false,
      urgent: false,
      deadline: '30 days before separation'
    },
    {
      id: '8',
      title: 'Property Return',
      description: 'Return all government property and equipment',
      completed: false,
      urgent: false,
      deadline: 'Last working day'
    },
    {
      id: '9',
      title: 'Final Pay Arrangements',
      description: 'Arrange for final salary payment and leave encashment',
      completed: false,
      urgent: false,
      deadline: 'Last working day'
    },
    {
      id: '10',
      title: 'Pension Commencement',
      description: 'Arrange start date for pension payments',
      completed: false,
      urgent: false,
      formRequired: 'Form PENS.C/1'
    },
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const retirementExamples = [
    {
      title: 'Less than 5 Years Service',
      scenario: 'Employee with 3 years service, age 35',
      outcome: 'Withdrawal Settlement Only',
      calculation: 'Contributions + Interest',
      details: [
        'Lump sum payment of all contributions plus accrued interest',
        'No monthly pension benefits available',
        'Process typically takes 30-60 days after application',
        'Tax implications may apply to withdrawal amount',
        'No survivor benefits for dependents'
      ],
      forms: ['Form PENS.W/1 - Withdrawal Application'],
      timeline: 'Submit 30 days before separation'
    },
    {
      title: '5-15 Years Service - Choice Available',
      scenario: 'Employee with 10 years service, age 45',
      outcome: 'Deferred Pension OR Withdrawal Settlement',
      calculation: 'Deferred: FAR × 2.5% × 10 years = 25% of FAR at age 60',
      details: [
        'Option 1: Deferred pension payable from age 60',
        'Option 2: Immediate withdrawal with interest',
        'Deferred pension includes COLA adjustments',
        'Consider long-term vs immediate financial needs',
        'Survivor benefits available with deferred pension'
      ],
      forms: ['Form PENS.D/1 - Deferred Pension', 'Form PENS.W/1 - Withdrawal'],
      timeline: 'Decision required within 90 days of separation'
    },
    {
      title: '15+ Years, Age 50-59 - Early Retirement',
      scenario: 'Employee with 20 years service, age 55',
      outcome: 'Early Retirement with Actuarial Reduction',
      calculation: 'FAR × 2.5% × 20 years = 50% of FAR, reduced by 25% (5 years × 5%)',
      details: [
        'Immediate pension with actuarial reduction (5% per year before age 60)',
        'Option for 30% lump sum with reduced monthly pension',
        'Full medical benefits continuation',
        'Survivor benefits for spouse and dependents',
        'COLA adjustments apply to pension payments'
      ],
      forms: ['Form PENS.E/7 - Early Retirement Application'],
      timeline: 'Submit 90 days before intended retirement date'
    },
    {
      title: '15+ Years, Age 60+ - Full Normal Retirement',
      scenario: 'Employee with 25 years service, age 62',
      outcome: 'Full Retirement Benefits',
      calculation: 'FAR × 2.5% × 25 years = 62.5% of FAR (no reduction)',
      details: [
        'Full immediate pension with no actuarial reduction',
        'Maximum pension cap of 75% of FAR (30 years service)',
        'Optional 30% lump sum with reduced monthly pension',
        'Full medical and dental benefits continuation',
        'Enhanced survivor benefits package',
        'Annual COLA adjustments'
      ],
      forms: ['Form PENS.E/7 - Retirement Application', 'Form PENS.L/1 - Lump Sum Option'],
      timeline: 'Submit 90 days before intended retirement date'
    },
  ];

  const renderTabButton = (tab: 'checklist' | 'examples' | 'flowchart', title: string, icon: React.ReactNode) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      {icon}
      <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BookOpen size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Checklists, examples, flowchart, and important information</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('checklist', 'Checklist', <CheckSquare size={20} color={activeTab === 'checklist' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />)}
        {renderTabButton('examples', 'Examples', <FileText size={20} color={activeTab === 'examples' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />)}
        {renderTabButton('flowchart', 'Flowchart', <Workflow size={20} color={activeTab === 'flowchart' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />)}
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'checklist' && (
          <>
            {/* Progress Section */}
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  Progress: {completedCount} of {totalCount} completed
                </Text>
                <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { width: `${progressPercentage}%` }]}
                />
              </View>
            </View>

            {/* Checklist Items */}
            {checklistItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.checklistItem,
                  item.completed && styles.checklistItemCompleted
                ]}
                onPress={() => toggleChecklistItem(item.id)}
              >
                <View style={styles.checklistHeader}>
                  <View style={styles.checklistTitleContainer}>
                    {item.urgent && (
                      <AlertTriangle size={16} color="#DC2626" strokeWidth={2} />
                    )}
                    <Text style={[
                      styles.checklistTitle,
                      item.completed && styles.checklistTitleCompleted,
                      item.urgent && styles.checklistTitleUrgent
                    ]}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={[
                    styles.checkbox,
                    item.completed && styles.checkboxCompleted
                  ]}>
                    {item.completed ? (
                      <Check size={16} color="#FFFFFF" strokeWidth={2} />
                    ) : (
                      <View style={styles.checkboxEmpty} />
                    )}
                  </View>
                </View>
                <Text style={[
                  styles.checklistDescription,
                  item.completed && styles.checklistDescriptionCompleted
                ]}>
                  {item.description}
                </Text>
                {item.formRequired && (
                  <Text style={styles.formRequired}>Required: {item.formRequired}</Text>
                )}
                {item.deadline && (
                  <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
                )}
              </TouchableOpacity>
            ))}
          </>
        )}

        {activeTab === 'examples' && (
          <>
            {retirementExamples.map((example, index) => (
              <View key={index} style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>{example.title}</Text>
                <Text style={styles.exampleScenario}>{example.scenario}</Text>
                <Text style={styles.exampleOutcome}>{example.outcome}</Text>
                <Text style={styles.exampleCalculation}>{example.calculation}</Text>
                
                <View style={styles.exampleDetails}>
                  <Text style={styles.exampleDetailsTitle}>Details:</Text>
                  {example.details.map((detail, detailIndex) => (
                    <View key={detailIndex} style={styles.exampleDetailItem}>
                      <View style={styles.exampleBullet} />
                      <Text style={styles.exampleDetailText}>{detail}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.formsSection}>
                  <Text style={styles.formsSectionTitle}>Required Forms:</Text>
                  {example.forms.map((form, formIndex) => (
                    <Text key={formIndex} style={styles.formItem}>• {form}</Text>
                  ))}
                </View>

                <View style={styles.timelineSection}>
                  <Clock size={16} color="#D97706" strokeWidth={2} />
                  <Text style={styles.timelineText}>{example.timeline}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === 'flowchart' && (
          <View style={styles.flowchartContainer}>
            <Text style={styles.flowchartTitle}>Pension Eligibility Flowchart</Text>
            <Text style={styles.flowchartDescription}>
              This flowchart shows the complete decision process for pension eligibility based on years of service and age.
            </Text>
            <PensionFlowChart />
            
            <View style={styles.flowchartLegend}>
              <Text style={styles.legendTitle}>Legend:</Text>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FEF2F2' }]} />
                <Text style={styles.legendText}>Withdrawal Settlement Only</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FEF3C7' }]} />
                <Text style={styles.legendText}>Choice Available / Early Retirement</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#ECFDF5' }]} />
                <Text style={styles.legendText}>Full Retirement Benefits</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#F3F4F6' }]} />
                <Text style={styles.legendText}>Deferred Pension Only</Text>
              </View>
            </View>
          </View>
        )}

        {/* Important Deadlines - Always visible */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color="#DC2626" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Critical Deadlines</Text>
          </View>

          <View style={styles.deadlineCard}>
            <View style={styles.deadlineItem}>
              <Text style={styles.deadlineTitle}>90 Days Before Separation</Text>
              <Text style={styles.deadlineDescription}>Submit pension application (Form PENS.E/7 or PENS.D/1)</Text>
            </View>
            
            <View style={styles.deadlineItem}>
              <Text style={styles.deadlineTitle}>60 Days Before Separation</Text>
              <Text style={styles.deadlineDescription}>Complete medical examination (if required)</Text>
            </View>
            
            <View style={styles.deadlineItem}>
              <Text style={styles.deadlineTitle}>30 Days Before Separation</Text>
              <Text style={styles.deadlineDescription}>Finalize beneficiary information and health insurance</Text>
            </View>
            
            <View style={styles.deadlineItem}>
              <Text style={styles.deadlineTitle}>Last Working Day</Text>
              <Text style={styles.deadlineDescription}>Return all government property and complete final arrangements</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  activeTabButton: {
    backgroundColor: '#2563EB',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 8,
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  checklistItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  checklistItemCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderWidth: 1,
  },
  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  checklistTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  checklistTitleCompleted: {
    color: '#059669',
    textDecorationLine: 'line-through',
  },
  checklistTitleUrgent: {
    color: '#DC2626',
  },
  checklistDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  checklistDescriptionCompleted: {
    color: '#059669',
    textDecorationLine: 'line-through',
  },
  formRequired: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginBottom: 4,
  },
  deadline: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  checkboxEmpty: {
    width: 12,
    height: 12,
  },
  exampleCard: {
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
  exampleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  exampleScenario: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  exampleOutcome: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '600',
    marginBottom: 8,
  },
  exampleCalculation: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  exampleDetails: {
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    paddingTop: 12,
    marginBottom: 12,
  },
  exampleDetailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  exampleDetailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  exampleBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6B7280',
    marginTop: 8,
    marginRight: 12,
  },
  exampleDetailText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  formsSection: {
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  formsSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0C4A6E',
    marginBottom: 6,
  },
  formItem: {
    fontSize: 13,
    color: '#0C4A6E',
    marginBottom: 2,
  },
  timelineSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
  },
  timelineText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
    marginLeft: 8,
  },
  flowchartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  flowchartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  flowchartDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  flowchartLegend: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  legendText: {
    fontSize: 14,
    color: '#374151',
  },
  deadlineCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  deadlineItem: {
    paddingVertical: 12,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 4,
  },
  deadlineDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerSpace: {
    height: 24,
  },
});