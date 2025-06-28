import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Calculator, DollarSign, TrendingUp, Info, FileSliders as Sliders } from 'lucide-react-native';
import CustomSlider from '@/components/CustomSlider';

interface PensionCalculation {
  annualPension: number;
  monthlyPension: number;
  lumpSum: number;
  reducedMonthlyPension: number;
  colaAdjustedPension: number;
  withdrawalSettlement?: number;
  deferredPension?: number;
  earlyRetirementReduction?: number;
  bonusPercentage?: number;
}

export default function CalculatorScreen() {
  const [inputMode, setInputMode] = useState<'manual' | 'slider'>('slider');
  const [far, setFar] = useState(75000); // Final Average Remuneration
  const [roa, setRoa] = useState(2.5); // Rate of Accrual
  const [yearsOfService, setYearsOfService] = useState(20);
  const [lumpSumOption, setLumpSumOption] = useState(false);
  const [colaRate, setColaRate] = useState(3); // Cost of Living Adjustment
  const [calculation, setCalculation] = useState<PensionCalculation | null>(null);

  const calculatePension = () => {
    const farValue = far;
    const roaValue = roa / 100; // Convert percentage to decimal
    const years = yearsOfService;
    const cola = colaRate / 100;

    // UNJSPF-specific calculations based on video transcripts
    
    // Basic annual pension calculation: FAR × ROA × Years of Service
    const annualPension = farValue * roaValue * years;
    const monthlyPension = annualPension / 12;

    // UNJSPF Withdrawal Settlement calculation
    const ownContributions = farValue * 0.08 * years; // 8% employee contribution
    const interestRate = 0.0325; // 3.25% compound interest
    const baseWithdrawal = ownContributions * Math.pow(1 + interestRate, years);
    
    // Bonus for service beyond 5 years (10% per year, up to 100%)
    const bonusYears = Math.max(0, years - 5);
    const bonusPercentage = Math.min(bonusYears * 10, 100);
    const withdrawalSettlement = baseWithdrawal * (1 + bonusPercentage / 100);

    // Deferred pension (same as regular pension but payable later)
    const deferredPension = monthlyPension;

    // Early retirement reduction (if applicable)
    const earlyRetirementReduction = years < 25 ? 6 : years < 30 ? 3 : 1; // % per year before normal retirement

    // Lump sum calculation (typically 30% of total pension value)
    const lumpSum = lumpSumOption ? annualPension * 5 * 0.3 : 0; // 5 years worth at 30%
    const reducedMonthlyPension = lumpSumOption 
      ? (annualPension - (lumpSum * 0.2)) / 12 // Reduced by 20% if lump sum taken
      : monthlyPension;

    // COLA adjusted pension (compound growth over time)
    const colaAdjustedPension = monthlyPension * Math.pow(1 + cola, 5); // 5 years projection

    setCalculation({
      annualPension,
      monthlyPension,
      lumpSum,
      reducedMonthlyPension,
      colaAdjustedPension,
      withdrawalSettlement,
      deferredPension,
      earlyRetirementReduction,
      bonusPercentage,
    });
  };

  useEffect(() => {
    calculatePension();
  }, [far, roa, yearsOfService, lumpSumOption, colaRate]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderInputModeToggle = () => (
    <View style={styles.inputModeContainer}>
      <TouchableOpacity
        style={[styles.modeButton, inputMode === 'slider' && styles.activeModeButton]}
        onPress={() => setInputMode('slider')}
      >
        <Sliders size={16} color={inputMode === 'slider' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
        <Text style={[styles.modeButtonText, inputMode === 'slider' && styles.activeModeButtonText]}>
          Sliders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modeButton, inputMode === 'manual' && styles.activeModeButton]}
        onPress={() => setInputMode('manual')}
      >
        <Text style={[styles.modeButtonText, inputMode === 'manual' && styles.activeModeButtonText]}>
          Manual
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Calculator size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Pension Calculator</Text>
        <Text style={styles.subtitle}>Calculate your estimated pension benefits with interactive controls</Text>
      </View>

      {renderInputModeToggle()}

      <View style={styles.form}>
        {inputMode === 'slider' ? (
          <>
            <CustomSlider
              min={30000}
              max={150000}
              value={far}
              onValueChange={setFar}
              step={1000}
              label="Final Average Remuneration (FAR)"
              unit=""
              color="#2563EB"
            />
            <Text style={styles.sliderHelpText}>Your average salary over the last 3-5 years</Text>

            <CustomSlider
              min={1.5}
              max={4.0}
              value={roa}
              onValueChange={setRoa}
              step={0.1}
              label="Rate of Accrual (ROA)"
              unit="%"
              color="#059669"
            />
            <Text style={styles.sliderHelpText}>Pension accrual rate per year of service</Text>

            <CustomSlider
              min={5}
              max={40}
              value={yearsOfService}
              onValueChange={setYearsOfService}
              step={1}
              label="Years of Service"
              unit=" years"
              color="#DC2626"
            />

            <CustomSlider
              min={1}
              max={6}
              value={colaRate}
              onValueChange={setColaRate}
              step={0.1}
              label="COLA Rate (Annual)"
              unit="%"
              color="#D97706"
            />
            <Text style={styles.sliderHelpText}>Cost of living adjustment rate</Text>
          </>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <DollarSign size={20} color="#374151" strokeWidth={2} />
                <Text style={styles.label}>Final Average Remuneration (FAR)</Text>
              </View>
              <TextInput
                style={styles.input}
                value={far.toString()}
                onChangeText={(text) => setFar(parseFloat(text) || 0)}
                placeholder="Enter annual salary"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
              <Text style={styles.helpText}>Your average salary over the last 3-5 years</Text>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <TrendingUp size={20} color="#374151" strokeWidth={2} />
                <Text style={styles.label}>Rate of Accrual (ROA) %</Text>
              </View>
              <TextInput
                style={styles.input}
                value={roa.toString()}
                onChangeText={(text) => setRoa(parseFloat(text) || 0)}
                placeholder="Enter rate (e.g., 2.5)"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
              <Text style={styles.helpText}>Pension accrual rate per year of service</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Years of Service</Text>
              <TextInput
                style={styles.input}
                value={yearsOfService.toString()}
                onChangeText={(text) => setYearsOfService(parseFloat(text) || 0)}
                placeholder="Enter years of service"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>COLA Rate % (Annual)</Text>
              <TextInput
                style={styles.input}
                value={colaRate.toString()}
                onChangeText={(text) => setColaRate(parseFloat(text) || 0)}
                placeholder="Enter COLA rate"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
              <Text style={styles.helpText}>Cost of living adjustment rate</Text>
            </View>
          </>
        )}

        <View style={styles.switchContainer}>
          <View style={styles.switchLabelContainer}>
            <Text style={styles.switchLabel}>Include Lump Sum Option</Text>
            <Text style={styles.switchDescription}>Take 30% as lump sum with reduced monthly pension</Text>
          </View>
          <Switch
            value={lumpSumOption}
            onValueChange={setLumpSumOption}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={lumpSumOption ? '#2563EB' : '#F3F4F6'}
          />
        </View>
      </View>

      {calculation && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>UNJSPF Pension Calculation Results</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Annual Pension</Text>
            <Text style={styles.resultValue}>{formatCurrency(calculation.annualPension)}</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Monthly Pension</Text>
            <Text style={styles.resultValue}>{formatCurrency(calculation.monthlyPension)}</Text>
          </View>

          {calculation.withdrawalSettlement && (
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Withdrawal Settlement</Text>
              <Text style={[styles.resultValue, styles.highlightValue]}>
                {formatCurrency(calculation.withdrawalSettlement)}
              </Text>
              {calculation.bonusPercentage && calculation.bonusPercentage > 0 && (
                <Text style={styles.bonusText}>Includes {calculation.bonusPercentage}% bonus</Text>
              )}
            </View>
          )}

          {calculation.deferredPension && (
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Deferred Pension (Monthly)</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(calculation.deferredPension)}
              </Text>
            </View>
          )}

          {calculation.earlyRetirementReduction && (
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Early Retirement Reduction</Text>
              <Text style={styles.resultValue}>
                {calculation.earlyRetirementReduction}% per year
              </Text>
            </View>
          )}

          {lumpSumOption && (
            <>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Lump Sum Payment</Text>
                <Text style={[styles.resultValue, styles.highlightValue]}>
                  {formatCurrency(calculation.lumpSum)}
                </Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Reduced Monthly Pension</Text>
                <Text style={styles.resultValue}>
                  {formatCurrency(calculation.reducedMonthlyPension)}
                </Text>
              </View>
            </>
          )}

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>COLA Adjusted (5 years)</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(calculation.colaAdjustedPension)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>UNJSPF Summary</Text>
            <Text style={styles.summaryText}>
              Based on {yearsOfService} years of contributory service with a FAR of {formatCurrency(far)} 
              and ROA of {roa}%, your estimated monthly pension would be{' '}
              <Text style={styles.summaryHighlight}>
                {formatCurrency(lumpSumOption ? calculation.reducedMonthlyPension : calculation.monthlyPension)}
              </Text>
              {lumpSumOption && (
                <Text> plus a lump sum of <Text style={styles.summaryHighlight}>
                  {formatCurrency(calculation.lumpSum)}
                </Text></Text>
              )}.
              {calculation.withdrawalSettlement && (
                <Text> Alternatively, withdrawal settlement: <Text style={styles.summaryHighlight}>
                  {formatCurrency(calculation.withdrawalSettlement)}
                </Text></Text>
              )}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.disclaimerBox}>
        <Info size={20} color="#D97706" strokeWidth={2} />
        <Text style={styles.disclaimerText}>
          These calculations are estimates based on UNJSPF regulations. Actual pension amounts may vary based on 
          final employment terms, regulatory changes, and other factors. For official calculations, use the 
          Member Self-Service portal or consult with your HR department. Processing typically takes 15 business 
          days after complete documentation is received.
        </Text>
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
  inputModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 24,
    marginBottom: 0,
    borderRadius: 12,
    padding: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeModeButton: {
    backgroundColor: '#2563EB',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },
  activeModeButtonText: {
    color: '#FFFFFF',
  },
  form: {
    padding: 24,
  },
  sliderHelpText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: -8,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  inputGroup: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  switchLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  resultsContainer: {
    margin: 24,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  highlightValue: {
    color: '#059669',
  },
  bonusText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  summaryCard: {
    backgroundColor: '#EBF8FF',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    borderColor: '#93C5FD',
    borderWidth: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#1E3A8A',
    lineHeight: 24,
  },
  summaryHighlight: {
    fontWeight: '700',
    color: '#1E40AF',
  },
  disclaimerBox: {
    margin: 24,
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    flex: 1,
    marginLeft: 12,
    lineHeight: 20,
  },
});