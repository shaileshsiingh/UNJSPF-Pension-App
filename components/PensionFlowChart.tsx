import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArrowDown, ArrowRight, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react-native';

export default function PensionFlowChart() {
  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.flowChart}>
        {/* Start Node */}
        <View style={styles.startNode}>
          <Text style={styles.startText}>Employee Separation</Text>
        </View>

        <ArrowDown size={20} color="#6B7280" style={styles.arrow} />

        {/* Years of Service Decision */}
        <View style={styles.decisionNode}>
          <Text style={styles.decisionText}>Years of Service?</Text>
        </View>

        <View style={styles.branchContainer}>
          {/* Less than 5 years branch */}
          <View style={styles.branch}>
            <ArrowDown size={16} color="#6B7280" />
            <View style={styles.conditionNode}>
              <Text style={styles.conditionText}>{'< 5 Years'}</Text>
            </View>
            <ArrowDown size={16} color="#6B7280" />
            <View style={[styles.resultNode, styles.withdrawalNode]}>
              <XCircle size={16} color="#DC2626" />
              <Text style={styles.resultText}>Withdrawal Settlement Only</Text>
              <Text style={styles.resultSubtext}>Contributions + Interest</Text>
            </View>
          </View>

          {/* 5-15 years branch */}
          <View style={styles.branch}>
            <ArrowDown size={16} color="#6B7280" />
            <View style={styles.conditionNode}>
              <Text style={styles.conditionText}>5-15 Years</Text>
            </View>
            <ArrowDown size={16} color="#6B7280" />
            <View style={[styles.resultNode, styles.choiceNode]}>
              <Clock size={16} color="#D97706" />
              <Text style={styles.resultText}>Choice Available</Text>
              <Text style={styles.resultSubtext}>Deferred Pension OR Withdrawal</Text>
            </View>
          </View>

          {/* 15+ years branch */}
          <View style={styles.branch}>
            <ArrowDown size={16} color="#6B7280" />
            <View style={styles.conditionNode}>
              <Text style={styles.conditionText}>15+ Years</Text>
            </View>
            <ArrowDown size={16} color="#6B7280" />
            
            {/* Age sub-decision */}
            <View style={styles.subDecisionNode}>
              <Text style={styles.subDecisionText}>Age Check</Text>
            </View>

            <View style={styles.subBranchContainer}>
              {/* Under 50 */}
              <View style={styles.subBranch}>
                <Text style={styles.ageText}>{'< 50'}</Text>
                <View style={[styles.resultNode, styles.deferredNode]}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.smallResultText}>Deferred Only</Text>
                </View>
              </View>

              {/* 50-59 */}
              <View style={styles.subBranch}>
                <Text style={styles.ageText}>50-59</Text>
                <View style={[styles.resultNode, styles.earlyNode]}>
                  <CheckCircle size={14} color="#D97706" />
                  <Text style={styles.smallResultText}>Early Retirement</Text>
                </View>
              </View>

              {/* 60+ */}
              <View style={styles.subBranch}>
                <Text style={styles.ageText}>60+</Text>
                <View style={[styles.resultNode, styles.fullNode]}>
                  <CheckCircle size={14} color="#059669" />
                  <Text style={styles.smallResultText}>Full Benefits</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  flowChart: {
    alignItems: 'center',
    minWidth: 800,
  },
  startNode: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  startText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  arrow: {
    marginVertical: 10,
  },
  decisionNode: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F59E0B',
    marginBottom: 20,
  },
  decisionText: {
    color: '#92400E',
    fontSize: 16,
    fontWeight: '600',
  },
  branchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  branch: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  conditionNode: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
  conditionText: {
    color: '#3730A3',
    fontSize: 14,
    fontWeight: '500',
  },
  resultNode: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    marginTop: 10,
  },
  withdrawalNode: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
  },
  choiceNode: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
    borderWidth: 1,
  },
  deferredNode: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  earlyNode: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
    borderWidth: 1,
  },
  fullNode: {
    backgroundColor: '#ECFDF5',
    borderColor: '#BBF7D0',
    borderWidth: 1,
  },
  resultText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  resultSubtext: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  subDecisionNode: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginVertical: 10,
  },
  subDecisionText: {
    color: '#0C4A6E',
    fontSize: 12,
    fontWeight: '500',
  },
  subBranchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  subBranch: {
    alignItems: 'center',
    flex: 1,
  },
  ageText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
  },
  smallResultText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
});