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
import CustomSlider from '../../components/CustomSlider';
import DatePicker from '../../components/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import { PanGestureHandler } from 'react-native-gesture-handler';

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

// Helper to format date as DD-MM-YYYY
function formatDateDDMMYYYY(dateString: string) {
  if (!dateString) return '';
  // Accepts either DD-MM-YYYY or YYYY-MM-DD and returns DD-MM-YYYY
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;
  if (parts[0].length === 4) {
    // YYYY-MM-DD
    const [year, month, day] = parts;
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
  } else {
    // DD-MM-YYYY
    const [day, month, year] = parts;
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
  }
}

// Helper to parse DD-MM-YYYY or YYYY-MM-DD to Date
function parseDateDMY(dateString: string) {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;
  let day, month, year;
  if (parts[0].length === 4) {
    // YYYY-MM-DD
    [year, month, day] = parts.map(Number);
  } else {
    // DD-MM-YYYY
    [day, month, year] = parts.map(Number);
  }
  if ([day, month, year].some(isNaN)) return null;
  return new Date(year, month - 1, day);
}

// Helper to format years as years, months, days
function formatYearsMonthsDays(yearsFloat: number) {
  const years = Math.floor(yearsFloat);
  const monthsFloat = (yearsFloat - years) * 12;
  const months = Math.floor(monthsFloat);
  const days = Math.round((monthsFloat - months) * 30); // use 30 days per month for consistency
  return `${years} years, ${months} months, ${days} days`;
}

// Helper to get commuted fraction from lump sum
function getCommutedFraction(lumpSum: number, annualPension: number, commutationFactor: number) {
  if (!annualPension || !commutationFactor) return 0;
  return lumpSum / (annualPension * commutationFactor);
}

// Helper to calculate years of service (float)
function calculateYearsOfService(entry: string, separation: string) {
  if (!entry || !separation) return 0;
  const [entryDay, entryMonth, entryYear] = entry.split('-').map(Number);
  const [sepDay, sepMonth, sepYear] = separation.split('-').map(Number);
  if ([entryDay, entryMonth, entryYear, sepDay, sepMonth, sepYear].some(isNaN)) return 0;
  let years = sepYear - entryYear;
  let months = sepMonth - entryMonth;
  let days = sepDay - entryDay;
  if (days < 0) {
    months--;
    days += new Date(sepYear, sepMonth - 1, 0).getDate();
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
  return +(years + months / 12 + days / 365.25).toFixed(2);
}

// Helper to calculate age at retirement (int, like eligibility)
function calculateAgeAtRetirement(dob: string, separation: string) {
  if (!dob || !separation) return 0;
  const dobParts = dob.split('-').map(Number);
  const sepParts = separation.split('-').map(Number);
  let dobDay, dobMonth, dobYear, sepDay, sepMonth, sepYear;
  if (dobParts[0] > 1000) {
    // YYYY-MM-DD
    [dobYear, dobMonth, dobDay] = dobParts;
  } else {
    [dobDay, dobMonth, dobYear] = dobParts;
  }
  if (sepParts[0] > 1000) {
    [sepYear, sepMonth, sepDay] = sepParts;
  } else {
    [sepDay, sepMonth, sepYear] = sepParts;
  }
  if ([dobDay, dobMonth, dobYear, sepDay, sepMonth, sepYear].some(isNaN)) return 0;
  let age = sepYear - dobYear;
  if (sepMonth < dobMonth || (sepMonth === dobMonth && sepDay < dobDay)) {
    age--;
  }
  // For decimal part (months/days)
  let months = sepMonth - dobMonth;
  if (months < 0) months += 12;
  let days = sepDay - dobDay;
  if (days < 0) days += 30; // Approximate
  return +(age + months / 12 + days / 365.25).toFixed(2);
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
    days += new Date(sepYear, sepMonth - 1, 0).getDate();
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

export default function CalculatorScreen() {
  // New state for Excel logic
  const [separationDate, setSeparationDate] = useState('');
  const [prValues, setPrValues] = useState(Array(36).fill(''));
  const [yearsOfService, setYearsOfService] = useState(20);
  const [ageAtRetirement, setAgeAtRetirement] = useState(62);
  const [lumpSum, setLumpSum] = useState(0);
  const [calculation, setCalculation] = useState<PensionCalculation | null>(null);
  const [ashiContribution, setAshiContribution] = useState(0);
  const [serviceLength, setServiceLength] = useState('');
  // Add a state for entry date if not present
  const [entryDate, setEntryDate] = useState('');

  // Helper to parse separationDate string to Date
  function getSeparationDateObj() {
    if (!separationDate) return new Date();
    const [year, month, day] = separationDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function getMonthLabels(separationDate: Date) {
    const labels = [];
    let date = new Date(separationDate);
    date.setDate(1); // Always start at the 1st of the month to avoid overflow issues
    for (let i = 0; i < 36; i++) {
      labels.push(date.toLocaleString('default', { month: 'short', year: '2-digit' }));
      date.setMonth(date.getMonth() - 1);
    }
    return labels;
  }
  const monthLabels = getMonthLabels(getSeparationDateObj()).slice(0, 36);
  const rows = [monthLabels.slice(0, 12), monthLabels.slice(12, 24), monthLabels.slice(24, 36)];

  // Calculate FAR
  const far = prValues.filter(v => v !== '').length === 36
    ? prValues.reduce((sum, v) => sum + parseFloat(v || '0'), 0) / 36
    : 0;

  // Calculate ROA (tiered)
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
      const next15 = Math.min(15, remaining);
      roa += next15 * 2.0;
      remaining -= next15;
    }
    // Cap at 70%
    return Math.min(roa, 70);
  }
  const roa = calculateROA(yearsOfService);
 // Commutation factor
  const commutationFactor = getCommutationFactor(ageAtRetirement);
  // Calculate max lump sum
  const annualPension = far * (roa / 100);
  const lumpBeforcf = (annualPension *30)/100
  const maxLumpSum = ((annualPension *30)/100)*commutationFactor;

  // Calculate commuted fraction
  const commutedFraction = getCommutedFraction(lumpSum, annualPension, commutationFactor);
  // Calculate reduced annual and monthly pension
  const reducedAnnualPension = annualPension * (1 - commutedFraction);
  const reducedMonthlyPension = reducedAnnualPension / 12;
  // COLA adjustment (2%)
  const colaAdjustedMonthlyPension = reducedMonthlyPension * 1.02;

  // Calculate monthly pension (before commutation)
  const monthlyPension = annualPension / 12;

  // Net monthly pension after ASHI deduction
  const netMonthlyPension = colaAdjustedMonthlyPension - ashiContribution;

  useEffect(() => {
    setCalculation({
      annualPension,
      monthlyPension,
      lumpSum,
      reducedMonthlyPension: reducedMonthlyPension, // for compatibility
      colaAdjustedPension: colaAdjustedMonthlyPension, // not used in Excel logic
    });
  }, [far, roa, yearsOfService, lumpSum, ageAtRetirement, reducedMonthlyPension, colaAdjustedMonthlyPension]);

  // Auto-populate lump sum to max by default, but allow user override
  useEffect(() => {
    if (lumpSum === 0 && annualPension > 0) {
      setLumpSum(maxLumpSum);
    }
    // eslint-disable-next-line
  }, [annualPension]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('profileData').then(data => {
        if (data) {
          try {
            const profile = JSON.parse(data);
            if (profile.dateOfEntry) {
              setEntryDate(profile.dateOfEntry);
            }
            if (profile.dateOfSeparation) {
              // Always store as DD-MM-YYYY
              setSeparationDate(formatDateDDMMYYYY(profile.dateOfSeparation));
            }
            // Compute and set yearsOfService and ageAtRetirement if all dates are present
            if (profile.dateOfEntry && profile.dateOfSeparation) {
              const entry = formatDateDDMMYYYY(profile.dateOfEntry);
              const sep = formatDateDDMMYYYY(profile.dateOfSeparation);
              const computedYears = calculateYearsOfService(entry, sep);
              if (computedYears && Math.abs(computedYears - yearsOfService) > 0.01) {
                setYearsOfService(computedYears);
              }
            }
            if (profile.dateOfBirth && profile.dateOfSeparation) {
              const dob = formatDateDDMMYYYY(profile.dateOfBirth);
              const sep = formatDateDDMMYYYY(profile.dateOfSeparation);
              const computedAge = calculateAgeAtRetirement(dob, sep);
              if (computedAge && Math.abs(computedAge - ageAtRetirement) > 0.01) {
                setAgeAtRetirement(computedAge);
              }
            }
          } catch {}
        }
      });
    }, [yearsOfService, ageAtRetirement])
  );

  // Recalculate service length whenever separationDate or entryDate changes
  React.useEffect(() => {
    if (entryDate && separationDate) {
      setServiceLength(formatServiceLength(getServiceLengthParts(entryDate, separationDate)));
    }
  }, [entryDate, separationDate]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Calculator size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Pension Calculator</Text>
        <Text style={styles.subtitle}>Calculate your estimated pension benefits with interactive controls</Text>
      </View>

      <View style={styles.form}>
        <DatePicker
          value={formatDateDDMMYYYY(separationDate)}
          onDateChange={date => {
            setSeparationDate(formatDateDDMMYYYY(date));
          }}
          label="Date of Separation"
        />
        {/* <Text style={styles.sliderHelpText}>This automatically displays from the profile setup page in DD-MM-YYYY format. Use the button to change/delete.</Text> */}

        <View style={{ marginVertical: 16 }}>
          <Text style={styles.label}>Enter your highest pensionable remuneration figures for the last 60 months before retiring month.</Text>
          <Text style={styles.helpText}>You may find these figures in your monthly pay slips.</Text>
          {rows.map((row, rowIdx) => (
            <ScrollView
              key={rowIdx}
              horizontal
              showsHorizontalScrollIndicator={true}
              style={{ marginBottom: rowIdx < rows.length - 1 ? 20 : 0, paddingHorizontal: 8 }}
              contentContainerStyle={{ flexDirection: 'row', paddingLeft: 4, paddingRight: 4 }}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={true}
            >
              {row.map((label, colIdx) => {
                const absIndex = rowIdx * 12 + colIdx;
                return (
                  <View key={label + absIndex} style={{ alignItems: 'center', marginRight: 8 }}>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>{label}</Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: '#D1D5DB',
                        borderRadius: 8,
                        width: 70,
                        height: 36,
                        textAlign: 'center',
                        marginTop: 2,
                        backgroundColor: '#FFF',
                        color: '#111827',
                      }}
                      value={prValues[absIndex]}
                      onChangeText={text => {
                        const newValues = [...prValues];
                        if (/^\d*\.?\d*$/.test(text)) {
                          // If any cell is changed, copy value to next 12 boxes (or until end)
                          for (let i = absIndex; i < Math.min(absIndex + 12, 36); i++) {
                            newValues[i] = text;
                          }
                          setPrValues(newValues);
                        }
                      }}
                      placeholder="0"
                      keyboardType="decimal-pad"
                      maxLength={8}
                    />
                  </View>
                );
              })}
            </ScrollView>
          ))}
          <Text style={styles.helpText}>All 36 months must be filled for calculation. Enter any cell to auto-fill the next 12 months with that value.</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Length of Contributory Service</Text>
          <TextInput
            style={styles.input}
            value={serviceLength}
            onChangeText={text => {
              const num = parseFloat(text);
              if (!isNaN(num) && num >= 0) setYearsOfService(num);
              else if (text === '' || text === '.') setYearsOfService(0);
            }}
            placeholder="Enter years of service"
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
          />
          <Text style={styles.helpText}>{serviceLength} (Maximum recognized service is 38.75 years).</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age at Retirement</Text>
          <TextInput
            style={styles.input}
            value={Math.floor(ageAtRetirement).toString()}
            onChangeText={text => {
              const num = parseInt(text);
              if (!isNaN(num) && num > 0) setAgeAtRetirement(num);
              else if (text === '' || text === '.') setAgeAtRetirement(0);
            }}
            placeholder="Enter age at retirement"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
          />
          <Text style={styles.helpText}>Commutation factor is based on your age at separation.</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lump Sum Amount in USD (commutable up to one-third of your annual pension)</Text>
          <TextInput
            style={styles.input}
            value={maxLumpSum.toString()}
            onChangeText={text => {
              const num = parseFloat(text);
              if (!isNaN(num) && num >= 0 && num <= maxLumpSum) setLumpSum(num);
              else if (text === '' || text === '.') setLumpSum(0);
            }}
            placeholder={`Max: ${formatCurrency(maxLumpSum)}`}
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
          />
          <Text style={styles.helpText}>You may commute any amount up to a maximum of 1/3 of your annual pension as a lump sum.</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ASHI Contribution (USD, if applicable)</Text>
          <TextInput
            style={styles.input}
            value={ashiContribution.toString()}
            onChangeText={text => {
              const num = parseFloat(text);
              if (!isNaN(num) && num >= 0) setAshiContribution(num);
              else if (text === '' || text === '.') setAshiContribution(0);
            }}
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
          />
          <Text style={styles.helpText}>Enter your monthly ASHI deduction, if applicable. Leave as 0 if not applicable.</Text>
        </View>

        {/* Debug Section: Show raw calculation values */}
        {/* <View style={{ marginTop: 16, backgroundColor: '#FFF7ED', padding: 12, borderRadius: 8 }}>
          <Text style={{ color: '#92400E', fontWeight: 'bold' }}>Debug Info</Text>
          <Text>Annual Pension: {annualPension}</Text>
          <Text>Lump Sum: {lumpSum}</Text>
          <Text>Commutation Factor: {commutationFactor}</Text>
          <Text>(Annual Pension - Lump Sum) / 12: {((annualPension - lumpSum) / 12).toFixed(2)}</Text>
          <Text>Monthly Pension (final): {monthlyPension}</Text>
        </View> */}

        <View style={{ marginTop: 24 }}>
          <Text style={styles.resultsTitle}>Calculation Results</Text>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Final Average Remuneration (FAR)</Text>
            <Text style={styles.resultValue}>{formatCurrency(far)}</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Rate of Accumulation (ROA)</Text>
            <Text style={styles.resultValue}>{roa.toFixed(2)}%</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Annual Pension</Text>
            <Text style={styles.resultValue}>{formatCurrency(annualPension)}</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Maximum Lump Sum</Text>
            <Text style={styles.resultValue}>{formatCurrency(maxLumpSum)}</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Commutation Factor</Text>
            <Text style={styles.resultValue}>{commutationFactor}</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Monthly Pension</Text>
            <Text style={styles.resultValue}>{formatCurrency(monthlyPension)}</Text>
          </View>
          {/* New: Reduced Monthly Pension After Lump Sum (correct logic) */}
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Reduced Monthly Pension After Lump Sum</Text>
            <Text style={styles.resultValue}>{formatCurrency(reducedMonthlyPension)}</Text>
          </View>
          {/* New: Add Cost of Living Adjustment @ 2% (on reduced monthly pension) */}
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Add: Cost of Living Adjustment @ 2%</Text>
            <Text style={styles.resultValue}>{formatCurrency(colaAdjustedMonthlyPension)}</Text>
          </View>
          {/* New: Deduct ASHI Contribution (if applicable) */}
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Deduct: ASHI Contribution (if applicable)</Text>
            <Text style={styles.resultValue}>-{formatCurrency(ashiContribution)}</Text>
          </View>
          {/* New: Net Monthly Pension (USD) */}
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Net Monthly Pension (USD)</Text>
            <Text style={styles.resultValue}>{formatCurrency(netMonthlyPension)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.disclaimerBox}>
        <Info size={20} color="#D97706" strokeWidth={2} />
        <Text style={styles.disclaimerText}>
          These estimates are based on most recently published UNJSPF Regulations and Rules. Your actual entitlements may vary depending on your final options. For official version, you are strongly encouraged to refer to your Member Self-Service portal. Actual pension amounts may vary based on final employment terms, regulatory changes, and other factors. For official calculations, use the Member Self-Service portal or consult with your HR department. Processing typically takes 15 business days after complete documentation is received.
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