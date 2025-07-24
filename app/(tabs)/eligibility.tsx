import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CustomSlider from '../../components/CustomSlider';

export default function EligibilityScreen() {
  const [inputMode, setInputMode] = useState<'manual' | 'slider'>('slider');
  const [yearsOfService, setYearsOfService] = useState(10);
  const [currentAge, setCurrentAge] = useState(58);
  const [far, setFar] = useState(0);

  // Scenario logic
  const scenarios = [
    {
      key: 'withdrawal',
      title: 'Withdrawal Settlement (Article 31)',
      description: [
        'A one-time final lump-sum payment.',
        'Value is your own contributions plus 3.25% compound interest.',
        "Does not include the organization’s contribution.",
        'Ends all future entitlements for you and your dependents.'
      ],
      eligible: yearsOfService < 5,
    },
    {
      key: 'deferred',
      title: 'Deferred Retirement Benefit (Article 30)',
      description: [
        'A monthly pension for life, payable starting at your Normal Retirement Age (NRA).',
        'You can choose to commence the benefit as early as age 55 (or 58 for post-2014 entrants), but it will be reduced.',
        'Preserves survivor benefits for your dependents.'
      ],
      eligible: yearsOfService >= 5 && currentAge < 60,
    },
    {
      key: 'early',
      title: 'Early Retirement Benefit (Article 29)',
      description: [
        'A monthly pension for life, payable before your Normal Retirement Age (NRA).',
        'The benefit is reduced for each month you are younger than your NRA.',
        'Provides an immediate, though reduced, income stream.'
      ],
      eligible: yearsOfService >= 5 && currentAge >= 55 && currentAge < 60,
    },
    {
      key: 'normal',
      title: 'Normal Retirement Benefit',
      description: [
        'A monthly pension for life, payable at or after your Normal Retirement Age (NRA).',
        'No reduction for early payment.',
        'Full survivor benefits for your dependents.'
      ],
      eligible: yearsOfService >= 5 && currentAge >= 60,
    },
  ];

  // Calculation helpers
  function getCommutationFactor(age: number) {
    const COMMUTATION_FACTORS = [
      { age: 55, factor: 13.5 },
      { age: 60, factor: 12.3 },
      { age: 62, factor: 11.7 },
      { age: 65, factor: 10.2 },
      { age: 67, factor: 8.8 },
      { age: 70, factor: 8.7 },
    ];
    let closest = COMMUTATION_FACTORS[0];
    for (const entry of COMMUTATION_FACTORS) {
      if (Math.abs(entry.age - age) < Math.abs(closest.age - age)) {
        closest = entry;
      }
    }
    return closest.factor;
  }
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
  const commutationFactor = getCommutationFactor(currentAge);
  const roa = calculateROA(yearsOfService);
  const annualPension = far * (roa / 100);
  const lumpSum = (annualPension * 0.3) * commutationFactor;
  const monthlyPension = (annualPension - (annualPension * 0.3)) / 12;
  const withdrawalAmount = far * yearsOfService * 0.08;
  const deferredPension = (far * 0.025 * yearsOfService) / 12;
  const earlyReduction = Math.max(0, (60 - currentAge) * 0.05);
  const earlyPension = deferredPension * (1 - earlyReduction);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Benefits Estimator</Text>
        <Text style={styles.subtitle}>Interactively explore your potential retirement benefits.</Text>
      </View>
      {/* Input Mode Toggle */}
      <View style={styles.inputModeContainer}>
        <TouchableOpacity
          style={[styles.modeButton, inputMode === 'slider' && styles.activeModeButton]}
          onPress={() => setInputMode('slider')}
        >
          <Text style={[styles.modeButtonText, inputMode === 'slider' && styles.activeModeButtonText]}>Sliders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, inputMode === 'manual' && styles.activeModeButton]}
          onPress={() => setInputMode('manual')}
        >
          <Text style={[styles.modeButtonText, inputMode === 'manual' && styles.activeModeButtonText]}>Manual</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, backgroundColor: '#FFF', borderRadius: 16, margin: 20, elevation: 2 }}>
        {inputMode === 'slider' ? (
          <>
            <CustomSlider
              min={0}
              max={40}
              value={yearsOfService}
              onValueChange={setYearsOfService}
              step={1}
              label="Adjust your Contributory Service (CS):"
              unit=" years"
              color="#2563EB"
            />
            <CustomSlider
              min={25}
              max={70}
              value={currentAge}
              onValueChange={setCurrentAge}
              step={1}
              label="Adjust your Age at Separation:"
              unit=" years"
              color="#059669"
            />
          </>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contributory Service (years)</Text>
              <TextInput
                style={styles.input}
                value={yearsOfService.toString()}
                onChangeText={text => {
                  const num = parseFloat(text);
                  if (!isNaN(num) && num >= 0) setYearsOfService(num);
                  else if (text === '' || text === '.') setYearsOfService(0);
                }}
                placeholder="Enter years of service"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age at Separation</Text>
              <TextInput
                style={styles.input}
                value={currentAge.toString()}
                onChangeText={text => {
                  const num = parseFloat(text);
                  if (!isNaN(num) && num >= 0) setCurrentAge(num);
                  else if (text === '' || text === '.') setCurrentAge(0);
                }}
                placeholder="Enter age at separation"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
              />
            </View>
          </>
        )}
      </View>
      {/* Scenario Cards */}
      <View style={{ marginHorizontal: 20 }}>
        {scenarios.filter(s => s.key !== 'normal').map((scenario, idx) => (
          <View
            key={scenario.key}
            style={{
              backgroundColor: scenario.eligible ? '#F0FDF4' : '#F9FAFB',
              borderColor: scenario.eligible ? '#22C55E' : '#E5E7EB',
              borderWidth: 2,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              shadowColor: scenario.eligible ? '#22C55E' : '#000',
              shadowOpacity: scenario.eligible ? 0.08 : 0.03,
              shadowRadius: 6,
              elevation: scenario.eligible ? 2 : 0,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: scenario.eligible ? '#15803D' : '#111827', marginBottom: 8 }}>{scenario.title}</Text>
            {scenario.description.map((desc, i) => (
              <Text key={i} style={{ color: '#374151', fontSize: 15, marginBottom: 2 }}>
                • {desc}
              </Text>
            ))}
            {/* Show relevant estimate */}
            {scenario.key === 'withdrawal' && scenario.eligible && (
              <Text style={{ marginTop: 10, color: '#0C4A6E', fontWeight: '700' }}>Withdrawal Amount: {withdrawalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</Text>
            )}
            {scenario.key === 'deferred' && scenario.eligible && (
              <Text style={{ marginTop: 10, color: '#0C4A6E', fontWeight: '700' }}>Deferred Monthly Pension: {deferredPension.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</Text>
            )}
            {scenario.key === 'early' && scenario.eligible && (
              <>
                <Text style={{ marginTop: 10, color: '#0C4A6E', fontWeight: '700' }}>Early Retirement Monthly Pension: {earlyPension.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</Text>
                <Text style={{ color: '#DC2626', fontWeight: '600' }}>Early Retirement Reduction: {(earlyReduction * 100).toFixed(1)}%</Text>
              </>
            )}
          </View>
        ))}
        {/* Normal Retirement Card */}
        {scenarios.filter(s => s.key === 'normal' && s.eligible).map(scenario => (
          <View
            key={scenario.key}
            style={{
              backgroundColor: '#EFF6FF',
              borderColor: '#2563EB',
              borderWidth: 2,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              shadowColor: '#2563EB',
              shadowOpacity: 0.10,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1D4ED8', marginBottom: 8 }}>{scenario.title}</Text>
            {scenario.description.map((desc, i) => (
              <Text key={i} style={{ color: '#374151', fontSize: 15, marginBottom: 2 }}>
                • {desc}
              </Text>
            ))}
            <Text style={{ marginTop: 10, color: '#0C4A6E', fontWeight: '700' }}>Normal Retirement Monthly Pension: {deferredPension.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</Text>
          </View>
        ))}
      </View>
      <View style={styles.infoBox}>
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
  infoBox: {
    margin: 24,
    backgroundColor: '#EBF8FF',
    padding: 16,
    borderRadius: 12,
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
});