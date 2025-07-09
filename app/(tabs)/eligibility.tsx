import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { CircleCheck as CheckCircle, CircleAlert as AlertCircle, Clock, Calculator, Info, FileSliders as Sliders } from 'lucide-react-native';
import CustomSlider from '../../components/CustomSlider';
import DatePicker from '../../components/DatePicker';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EligibilityResult {
  eligible: boolean;
  category: string;
  options: string[];
  description: string;
  nextSteps: string[];
  withdrawalAmount?: number;
  pensionAmount?: number;
  lumpSumOption?: boolean;
  earlyRetirementReduction?: number;
}

// Add commutation factors and function
const COMMUTATION_FACTORS = [
  { age: 55, factor: 13.5 },
  { age: 60, factor: 12.3 },
  { age: 62, factor: 11.7 },
  { age: 65, factor: 10.2 },
  { age: 67, factor: 8.8 },
  { age: 70, factor: 8.7 },
];

function getCommutationFactor(age: number) {
  let closest = COMMUTATION_FACTORS[0];
  for (const entry of COMMUTATION_FACTORS) {
    if (Math.abs(entry.age - age) < Math.abs(closest.age - age)) {
      closest = entry;
    }
  }
  return closest.factor;
}

// Helper to calculate years of service as years, months, days (calendar-accurate)
function getServiceLengthParts(entry: string, separation: string) {
  if (!entry || !separation) return { years: 0, months: 0, days: 0 };
  const [entryDay, entryMonth, entryYear] = entry.split('-').map(Number);
  const [sepDay, sepMonth, sepYear] = separation.split('-').map(Number);
  if ([entryDay, entryMonth, entryYear, sepDay, sepMonth, sepYear].some(isNaN)) return { years: 0, months: 0, days: 0 };
  let years = sepYear - entryYear;
  let months = sepMonth - entryMonth;
  let days = sepDay - entryDay;
  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = sepMonth - 1 === 0 ? 12 : sepMonth - 1;
    const prevYear = prevMonth === 12 ? sepYear - 1 : sepYear;
    days += new Date(prevYear, prevMonth, 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  // Roll days into months
  if (days >= 30) {
    months += Math.floor(days / 30);
    days = days % 30;
  }
  // Roll months into years
  if (months >= 12) {
    years += Math.floor(months / 12);
    months = months % 12;
  }
  return { years, months, days };
}

function formatServiceLength(parts: { years: number, months: number, days: number }) {
  return `${parts.years} years, ${parts.months} months, ${parts.days} days`;
}

export default function EligibilityScreen() {
  const params = useLocalSearchParams();
  const [inputMode, setInputMode] = useState<'manual' | 'slider'>('slider');
  const [yearsOfService, setYearsOfService] = useState(15);
  const [currentAge, setCurrentAge] = useState(55);
  const [far, setFar] = useState(0);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [separationDate, setSeparationDate] = useState('');
  const [serviceLength, setServiceLength] = useState({ years: 0, months: 0, days: 0 });
  const [entryDate, setEntryDate] = useState('');

  // Pre-populate fields from params if present
  React.useEffect(() => {
    if (params) {
      if (params.dateOfBirth) {
        // Calculate age from DOB (DD-MM-YYYY)
        const dob = params.dateOfBirth as string;
        const [dobDay, dobMonth, dobYear] = dob.split('-').map(Number);
        if (!isNaN(dobYear) && !isNaN(dobMonth) && !isNaN(dobDay)) {
          const today = new Date();
          let age = today.getFullYear() - dobYear;
          if (
            today.getMonth() + 1 < dobMonth ||
            (today.getMonth() + 1 === dobMonth && today.getDate() < dobDay)
          ) {
            age--;
          }
          setCurrentAge(age);
        }
      }
      if (params.dateOfEntry) {
        setEntryDate(params.dateOfEntry as string);
      } else {
        AsyncStorage.getItem('profileData').then(data => {
          if (data) {
            try {
              const profile = JSON.parse(data);
              if (profile.dateOfEntry) {
                setEntryDate(profile.dateOfEntry);
              }
            } catch {}
          }
        });
      }
      if (params.dateOfSeparation) {
        setSeparationDate(params.dateOfSeparation as string);
      }
    }
  }, [params]);

  // On mount, load entry date from params or AsyncStorage
  React.useEffect(() => {
    if (params.dateOfEntry) {
      setEntryDate(params.dateOfEntry as string);
    } else {
      AsyncStorage.getItem('profileData').then(data => {
        if (data) {
          try {
            const profile = JSON.parse(data);
            if (profile.dateOfEntry) {
              setEntryDate(profile.dateOfEntry);
            }
          } catch {}
        }
      });
    }
  }, [params.dateOfEntry]);

  // Recalculate service length whenever separationDate or entryDate changes
  React.useEffect(() => {
    if (entryDate && separationDate) {
      setServiceLength(getServiceLengthParts(entryDate, separationDate));
    }
  }, [entryDate, separationDate]);

  const checkEligibility = () => {
    const years = yearsOfService;
    const age = currentAge;
    const salary = far;

    let eligibilityResult: EligibilityResult;

    // UNJSPF-specific eligibility criteria based on video transcripts
    if (years < 5) {
      // Less than 5 years - Withdrawal Settlement Only (UNJSPF Rule)
      const withdrawalAmount = salary * years * 0.08; // Own contributions + 3.25% interest
      eligibilityResult = {
        eligible: false,
        category: 'Withdrawal Settlement Only (UNJSPF)',
        options: [
          'Lump sum withdrawal of own contributions + 3.25% compound interest',
          'Defer payment for up to 36 months (if planning to return)'
        ],
        description: 'With less than 5 years of contributory service, you are only eligible for withdrawal settlement. No vested pension rights.',
        nextSteps: [
          'Submit withdrawal application via Member Self-Service portal',
          'Provide valid government-issued ID and bank statement',
          'Complete payment instruction form (Pens E6)',
          'Processing takes ~15 business days after complete documentation'
        ],
        withdrawalAmount
      };
    } else if (years >= 5 && age < 55) {
      // 5+ years but before early retirement age (UNJSPF: typically 55 or 58)
      const withdrawalAmount = salary * years * 0.08 * (1 + Math.min(years - 5, 20) * 0.1); // With bonus up to 100%
      const deferredPension = (salary * 0.025 * years) / 12; // Monthly deferred pension
      
      eligibilityResult = {
        eligible: true,
        category: 'Vested Rights - Before Early Retirement Age (UNJSPF)',
        options: [
          'Withdrawal settlement with bonus (10% per year beyond 5 years, up to 100%)',
          'Deferred retirement benefit (monthly pension starting at early retirement age)',
          '36-month deferment option to decide'
        ],
        description: 'You have vested pension rights (5+ years) but must wait until early retirement age for pension payments.',
        nextSteps: [
          'Compare withdrawal settlement vs deferred retirement benefit',
          'Consider survivor benefits (only available with deferred option)',
          'Use Member Self-Service portal for benefit estimates',
          'Submit benefit election within 36 months of separation'
        ],
        withdrawalAmount,
        pensionAmount: deferredPension
      };
    } else if (years >= 5 && age >= 55 && age < 60) {
      // Between early and normal retirement age (UNJSPF: 55-60)
      const fullPension = (salary * 0.025 * years) / 12;
      const earlyReduction = Math.max(0, (60 - age) * 0.05); // Reduction depends on service length
      const reducedPension = fullPension * (1 - earlyReduction);
      const withdrawalAmount = salary * years * 0.08 * (1 + Math.min(years - 5, 20) * 0.1);
      
      eligibilityResult = {
        eligible: true,
        category: 'Early Retirement Available (UNJSPF)',
        options: [
          'Early retirement benefit (with reduction factors)',
          'Deferred retirement benefit (no reduction)',
          'Withdrawal settlement with bonus',
          '36-month deferment option'
        ],
        description: `You qualify for early retirement with ${(earlyReduction * 100).toFixed(1)}% reduction for taking pension before normal retirement age.`,
        nextSteps: [
          'Calculate benefit amounts for each option',
          'Consider reduction factors based on service length',
          'Review cost-of-living adjustment provisions',
          'Submit benefit election via Member Self-Service'
        ],
        pensionAmount: reducedPension,
        lumpSumOption: true,
        earlyRetirementReduction: earlyReduction * 100
      };
    } else if (years >= 5 && age >= 60) {
      // Normal retirement age or later (UNJSPF: 60+)
      const fullPension = (salary * 0.025 * years) / 12;
      const withdrawalAmount = salary * years * 0.08 * (1 + Math.min(years - 5, 20) * 0.1);
      
      eligibilityResult = {
        eligible: true,
        category: 'Normal Retirement Benefits (UNJSPF)',
        options: [
          'Full immediate pension (no reduction)',
          'Withdrawal settlement with bonus',
          'Survivor benefits for spouse',
          'Cost-of-living adjustments'
        ],
        description: 'You qualify for full retirement benefits with maximum pension and no actuarial reductions.',
        nextSteps: [
          'Submit retirement application via Member Self-Service',
          'Choose payment currency (18 options available)',
          'Designate beneficiaries for survivor benefits',
          'Arrange pension commencement date'
        ],
        pensionAmount: fullPension,
        lumpSumOption: true
      };
    } else {
      // Edge case - insufficient service for pension
      eligibilityResult = {
        eligible: false,
        category: 'Insufficient Service (UNJSPF)',
        options: ['Withdrawal settlement only'],
        description: 'Based on your service record, you do not meet the minimum requirements for UNJSPF pension benefits.',
        nextSteps: [
          'Verify contributory service records with HR',
          'Submit withdrawal application if no other options',
          'Consider restoration option if returning to UN service'
        ]
      };
    }

    setResult(eligibilityResult);
  };

  React.useEffect(() => {
    checkEligibility();
  }, [yearsOfService, currentAge, far]);

  const getStatusIcon = () => {
    if (!result) return <Clock size={24} color="#6B7280" strokeWidth={2} />;
    return result.eligible ? 
      <CheckCircle size={24} color="#059669" strokeWidth={2} /> : 
      <AlertCircle size={24} color="#DC2626" strokeWidth={2} />;
  };

  const getStatusColor = () => {
    if (!result) return '#6B7280';
    return result.eligible ? '#059669' : '#DC2626';
  };

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

  // Calculate ROA based on UNJSPF rules
  function calculateROA(years: number) {
    let roa = 0;
    let remaining = years;
    if (remaining > 0) {
      const first5 = Math.min(5, remaining);
      roa += first5 * 1.5;
      remaining -= first5;
    }
    if (remaining > 0) {
      const next5 = Math.min(5, remaining);
      roa += next5 * 1.75;
      remaining -= next5;
    }
    if (remaining > 0) {
      const next25 = Math.min(25, remaining);
      roa += next25 * 2.0;
      remaining -= next25;
    }
    return Math.min(roa, 70);
  }

  // Use currentAge as age at retirement for eligibility
  const commutationFactor = getCommutationFactor(currentAge);
  const roa = calculateROA(yearsOfService); // in percent
  const annualPension = far * (roa / 100);
  const lumpSum = (annualPension * 0.3) * commutationFactor;
  const monthlyPension = (annualPension - (annualPension * 0.3)) / 12;

  function getSeparationDateObj() {
    if (!separationDate) return new Date();
    const [year, month, day] = separationDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  function getYearRows(separationDate: string) {
    const rows = [];
    let date = new Date(separationDate);
    // Find the July before or equal to separation date
    if (date.getMonth() !== 6) {
      date.setMonth(6);
      if (date > new Date(separationDate)) date.setFullYear(date.getFullYear() - 1);
    }
    for (let y = 0; y < 3; y++) {
      const row = [];
      for (let m = 0; m < 12; m++) {
        const monthDate = new Date(date.getFullYear(), 6 + m, 1);
        row.push({
          label: monthDate.toLocaleString('default', { month: 'short', year: '2-digit' }),
          absIndex: y * 12 + m,
        });
      }
      rows.push(row);
      date.setFullYear(date.getFullYear() - 1);
    }
    return rows;
  }
  const yearRows = getYearRows(separationDate);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CheckCircle size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Pension Eligibility</Text>
        <Text style={styles.subtitle}>Interactive eligibility assessment with real-time results</Text>
      </View>

      {renderInputModeToggle()}

      <View style={styles.form}>
        {inputMode === 'slider' ? (
          <>
            <CustomSlider
              min={0}
              max={40}
              value={yearsOfService}
              onValueChange={setYearsOfService}
              step={1}
              label="Length of Contributory Service"
              unit=" years"
              color="#2563EB"
            />
            <Text style={styles.sliderHelpText}>Include all pensionable service periods</Text>

            <CustomSlider
              min={25}
              max={70}
              value={currentAge}
              onValueChange={setCurrentAge}
              step={1}
              label="Current Age"
              unit=" years"
              color="#059669"
            />

            <Text style={styles.sliderHelpText}>For benefit amount estimates</Text>
          </>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length of Contributory Service</Text>
              <TextInput
                style={styles.input}
                value={formatServiceLength(serviceLength)}
                onChangeText={(text) => {
                  const num = parseFloat(text);
                  if (!isNaN(num) && num >= 0) {
                    setYearsOfService(num);
                  } else if (text === '' || text === '.') {
                    setYearsOfService(0);
                  }
                }}
                placeholder="Enter total years of service"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
              />
              <Text style={styles.helpText}>Include all pensionable service periods</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Age</Text>
              <TextInput
                style={styles.input}
                value={currentAge.toString()}
                onChangeText={(text) => {
                  const num = parseFloat(text);
                  if (!isNaN(num) && num >= 0) {
                    setCurrentAge(num);
                  } else if (text === '' || text === '.') {
                    setCurrentAge(0);
                  }
                }}
                placeholder="Enter your current age"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Separation</Text>
              <DatePicker
                value={separationDate}
                onDateChange={setSeparationDate}
                // label="Separation Date"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Final Average Remuneration (FAR)</Text>
              <TextInput
                style={styles.input}
                value={far.toString()}
                onChangeText={text => {
                  const num = parseFloat(text);
                  if (!isNaN(num) && num >= 0) setFar(num);
                  else if (text === '' || text === '.') setFar(0);
                }}
                placeholder="Enter FAR"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
              />
              <Text style={styles.helpText}>Average of your highest 36 months' pensionable remuneration.</Text>
            </View>
          </>
        )}
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            {getStatusIcon()}
            <Text style={[styles.resultTitle, { color: getStatusColor() }]}>
              {result.category}
            </Text>
          </View>

          <Text style={styles.resultDescription}>{result.description}</Text>

          {/* Benefit Estimates */}
          {(result.withdrawalAmount || result.pensionAmount) && (
            <View style={styles.estimatesContainer}>
              <Text style={styles.estimatesTitle}>Estimated Benefits</Text>

              {/* Show ROA */}
              <View style={styles.estimateItem}>
                <Text style={styles.estimateLabel}>Rate of Accumulation (ROA):</Text>
                <Text style={styles.estimateValue}>{roa.toFixed(2)}%</Text>
              </View>

              {/* Show Annual Pension */}
              <View style={styles.estimateItem}>
                <Text style={styles.estimateLabel}>Annual Pension:</Text>
                <Text style={styles.estimateValue}>{formatCurrency(annualPension)}</Text>
              </View>

              {/* Show Lump Sum */}
              <View style={styles.estimateItem}>
                <Text style={styles.estimateLabel}>Lump Sum (30% × Commutation Factor):</Text>
                <Text style={styles.estimateValue}>{formatCurrency(lumpSum)}</Text>
              </View>

              {/* Show Monthly Pension */}
              <View style={styles.estimateItem}>
                <Text style={styles.estimateLabel}>Monthly Pension (after lump sum):</Text>
                <Text style={styles.estimateValue}>{formatCurrency(monthlyPension)}</Text>
              </View>

              {/* Show Commutation Factor */}
              <View style={styles.estimateItem}>
                <Text style={styles.estimateLabel}>Commutation Factor:</Text>
                <Text style={styles.estimateValue}>{commutationFactor}</Text>
              </View>

              {result.earlyRetirementReduction && (
                <View style={styles.warningBox}>
                  <AlertCircle size={16} color="#DC2626" strokeWidth={2} />
                  <Text style={styles.warningText}>
                    Early retirement reduction: {result.earlyRetirementReduction.toFixed(1)}%
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Available Options:</Text>
            {result.options.map((option, index) => (
              <View key={index} style={styles.optionItem}>
                <View style={styles.optionBullet} />
                <Text style={styles.optionText}>{option}</Text>
              </View>
            ))}
          </View>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>Required Next Steps:</Text>
            {result.nextSteps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.infoBox}>
        <Info size={20} color="#2563EB" strokeWidth={2} />
        <Text style={styles.infoText}>
          This assessment follows the official pension scheme rules. For binding determinations and official calculations, contact the Pension Office directly with your complete service records.
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
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
  resultContainer: {
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
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
  },
  resultDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  estimatesContainer: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#BAE6FD',
    borderWidth: 1,
  },
  estimatesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0C4A6E',
    marginBottom: 12,
  },
  estimateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  estimateLabel: {
    fontSize: 14,
    color: '#0C4A6E',
  },
  estimateValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0C4A6E',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#DC2626',
    marginLeft: 8,
    fontWeight: '500',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  optionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
    marginTop: 8,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  stepsContainer: {
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    paddingTop: 20,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  infoBox: {
    margin: 24,
    backgroundColor: '#EBF8FF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderColor: '#93C5FD',
    borderWidth: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    flex: 1,
    marginLeft: 12,
    lineHeight: 20,
  },
});