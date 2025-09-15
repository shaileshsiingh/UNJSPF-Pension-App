import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
  Animated,
} from 'react-native';
import { Calculator, DollarSign, TrendingUp, Info, FileSliders as Sliders, ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, LogOut } from 'lucide-react-native';
import CustomSlider from '../../components/CustomSlider';

// In the Date fields, auto-insert '-' as user types
function formatDateInput(text: string): string {
  // Remove all non-digits
  let digits = text.replace(/\D/g, '');
  let parts = [];
  if (digits.length > 2) {
    parts.push(digits.slice(0, 2));
    if (digits.length > 4) {
      parts.push(digits.slice(2, 4));
      parts.push(digits.slice(4, 8));
    } else {
      parts.push(digits.slice(2));
    }
  } else {
    parts.push(digits);
  }
  return parts.join('-');
}

// Format numbers with commas
function formatNumberWithCommas(text: string): string {
  // Remove all non-digits
  const digits = text.replace(/\D/g, '');
  if (digits === '') return '';
  
  // Add commas every 3 digits from the right
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Remove commas from formatted number
function removeCommas(text: string): string {
  return text.replace(/,/g, '');
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
  finalPeriodicBenefit?: number;
  eligibilityType?: string;
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
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;
  if (parts[0].length === 4) {
    const [year, month, day] = parts;
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
  } else {
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
    [year, month, day] = parts.map(Number);
  } else {
    [day, month, year] = parts.map(Number);
  }
  if ([day, month, year].some(isNaN)) return null;
  return new Date(year, month - 1, day);
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
  
  // Roll days into months (30 days = 1 month for consistency)
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

// Helper to calculate age at retirement
function calculateAgeAtRetirement(dob: string, separation: string) {
  if (!dob || !separation) return 0;
  const dobParts = dob.split('-').map(Number);
  const sepParts = separation.split('-').map(Number);
  let dobDay, dobMonth, dobYear, sepDay, sepMonth, sepYear;
  
  if (dobParts[0] > 1000) {
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
  
  let months = sepMonth - dobMonth;
  if (months < 0) months += 12;
  let days = sepDay - dobDay;
  if (days < 0) days += 30;
  
  return +(age + months / 12 + days / 365.25).toFixed(2);
}

// Helper to get service length parts
function getServiceLengthParts(entry: string, separation: string) {
  if (!entry || !separation) return { years: 0, months: 0, days: 0 };
  const [entryDay, entryMonth, entryYear] = entry.split('-').map(Number);
  const [sepDay, sepMonth, sepYear] = separation.split('-').map(Number);
  
  if ([entryDay, entryMonth, entryYear, sepDay, sepMonth, sepYear].some(isNaN)) 
    return { years: 0, months: 0, days: 0 };
  
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

// Calculate withdrawal settlement with interest and bonus - FIXED LOGIC
function calculateWithdrawalSettlement(
  ownContributions: number, 
  yearsOfService: number,
  separationDate: string,
  entryDate: string
) {
  const INTEREST_RATE = 0.0325; // 3.25%
  
  // Calculate compounded interest
  const futureValue = ownContributions * Math.pow((1 + INTEREST_RATE), yearsOfService);
  const calculatedInterest = futureValue - ownContributions;
  const baseAmount = ownContributions + calculatedInterest;
  
  // Calculate bonus percentage based on years of service - FIXED LOGIC
  let bonusPercentage = 0;
  if (yearsOfService < 5) {
    bonusPercentage = 0; // No bonus for less than 5 years
  } else if (yearsOfService >= 5 && yearsOfService <= 15) {
    const yearsOver5 = yearsOfService - 5;
    bonusPercentage = Math.min(yearsOver5 * 0.10, 1.0); // 10% per year over 5, capped at 100%
  } else if (yearsOfService > 15) {
    bonusPercentage = 1.0; // 100% bonus for over 15 years
  }
  
  const bonusAmount = baseAmount * bonusPercentage;
  const totalSettlement = baseAmount + bonusAmount;
  
  return {
    ownContributions,
    calculatedInterest,
    baseAmount,
    bonusPercentage: bonusPercentage * 100,
    bonusAmount,
    totalSettlement
  };
}

// Determine benefit eligibility and type - CORRECTED LOGIC
function determineBenefitType(
  ageAtSeparation: number,
  yearsOfService: number,
  entryDate: string
) {
  if (!entryDate) return { type: 'Unknown', nra: 65, era: 58 };
  
  const [day, month, year] = entryDate.split('-').map(Number);
  const entryDateObj = new Date(year, month - 1, day);
  
  let nra = 65, era = 58;
  
  // Determine NRA and ERA based on entry date - CORRECTED LOGIC
  const jan1990 = new Date(1990, 0, 1);
  const jan2014 = new Date(2014, 0, 1);
  
  if (entryDateObj < jan1990) {
    nra = 60;
    era = 55;
  } else if (entryDateObj < jan2014) {
    nra = 62;
    era = 55;
  } else {
    nra = 65;
    era = 58;
  }
  
  let benefitType = '';
  
  if (yearsOfService < 5) {
    benefitType = 'Withdrawal Settlement Only';
  } else if (ageAtSeparation >= nra) {
    benefitType = 'Normal Retirement Benefit (Article 28)';
  } else if (ageAtSeparation >= era) {
    benefitType = 'Early Retirement Benefit (Article 29)';
  } else {
    benefitType = 'Deferred Retirement Benefit (Article 30)';
  }
  
  return { type: benefitType, nra, era };
}

// Calculate early retirement reduction factor - CORRECTED LOGIC
function calculateReductionFactor(
  ageAtSeparation: number,
  yearsOfService: number,
  nra: number,
  era: number
) {
  if (ageAtSeparation >= nra) return 0; // No reduction for normal retirement
  if (ageAtSeparation < era) return 0; // Deferred benefit, no immediate reduction
  
  const yearsToNRA = nra - ageAtSeparation;
  let reductionRate = 0;
  
  // Determine reduction rate based on ERA and years of service
  if (era === 55) {
    if (yearsOfService < 25) {
      reductionRate = 0.06; // 6%
    } else if (yearsOfService >= 25 && yearsOfService <= 30) {
      reductionRate = 0.03; // 3%
    } else {
      reductionRate = 0.01; // 1%
    }
  } else if (era === 58) {
    if (yearsOfService < 25) {
      reductionRate = 0.06; // 6%
    } else {
      reductionRate = 0.04; // 4%
    }
  }
  
  // Apply smaller rate for first 5 years, then 6% for remaining years
  const yearsForSmallerRate = Math.min(yearsToNRA, 5);
  const yearsFor6PercentRate = Math.max(0, yearsToNRA - 5);
  
  return (yearsForSmallerRate * reductionRate) + (yearsFor6PercentRate * 0.06);
}

export default function CalculatorScreen() {
  // State variables
  const [separationDate, setSeparationDate] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ownContributions, setOwnContributions] = useState(0);
  const [finalAverageRemuneration, setFinalAverageRemuneration] = useState(0); // NEW: FAR input
  const [actuarialFactor, setActuarialFactor] = useState('12.694'); // NEW: Manual actuarial factor
  const [prValues, setPrValues] = useState(Array(36).fill(''));
  const [yearsOfService, setYearsOfService] = useState(20);
  const [ageAtRetirement, setAgeAtRetirement] = useState(62);
  const [lumpSum, setLumpSum] = useState(0);
  const [lumpSumPercentage, setLumpSumPercentage] = useState(33.33);
  const [electLumpSum, setElectLumpSum] = useState(false);
  const [calculation, setCalculation] = useState<PensionCalculation | null>(null);
  const [ashiContribution, setAshiContribution] = useState(0);
  const [serviceLength, setServiceLength] = useState('');
  const [withdrawalSettlement, setWithdrawalSettlement] = useState<any>(null);
  const [calculatedInterest, setCalculatedInterest] = useState(0); // NEW: Display calculated interest
  const [useFarInput, setUseFarInput] = useState(false); // NEW: Toggle between FAR input and PR values
  const [scrollPositions, setScrollPositions] = useState([0, 0, 0]); // Track scroll positions for each row
  
  // NEW: Option selection state and animations
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'both' | null>(null);
  const blinkAnimA = useRef(new Animated.Value(1)).current;
  const blinkAnimB = useRef(new Animated.Value(1)).current;
  const scaleAnimA = useRef(new Animated.Value(1)).current;
  const scaleAnimB = useRef(new Animated.Value(1)).current;

  // Animation effects
  useEffect(() => {
    // Blinking animation for unselected options
    const createBlinkAnimation = (animValue: Animated.Value) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
    };

    if (selectedOption === null) {
      // Both options blink when none selected
      const blinkA = createBlinkAnimation(blinkAnimA);
      const blinkB = createBlinkAnimation(blinkAnimB);
      blinkA.start();
      blinkB.start();
      return () => {
        blinkA.stop();
        blinkB.stop();
      };
    } else {
      // Stop blinking and reset opacity
      blinkAnimA.setValue(1);
      blinkAnimB.setValue(1);
    }
  }, [selectedOption]);

  // Helper functions
  function getSeparationDateObj() {
    if (!separationDate) return new Date();
    const parts = separationDate.split('-');
    if (parts.length !== 3) return new Date();
    const [day, month, year] = parts.map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return new Date();
    return new Date(year, month - 1, day);
  }

  function getMonthLabels(separationDate: Date) {
    const labels = [];
    let date = new Date(separationDate);
    date.setDate(1);
    for (let i = 0; i < 36; i++) {
      labels.push(date.toLocaleString('default', { month: 'short', year: '2-digit' }));
      date.setMonth(date.getMonth() - 1);
    }
    return labels;
  }

  const monthLabels = getMonthLabels(getSeparationDateObj()).slice(0, 36);
  const rows = monthLabels && monthLabels.length > 0 
    ? [monthLabels.slice(0, 12), monthLabels.slice(12, 24), monthLabels.slice(24, 36)]
    : [[], [], []];

  // Calculate FAR - either from input or PR values
  const far = useFarInput 
    ? finalAverageRemuneration
    : (prValues.filter(v => v !== '').length === 36
        ? prValues.reduce((sum, v) => sum + parseFloat(v || '0'), 0) / 36
        : 0);

  // Calculate ROA (tiered system) - SAME AS ORIGINAL
  function calculateROA(years: number) {
    let roa = 0;
    let remaining = years;
    
    // First 5 years: 1.50% per year
    if (remaining > 0) {
      const first5 = Math.min(5, remaining);
      roa += first5 * 1.5;
      remaining -= first5;
    }
    
    // Next 5 years (6-10): 1.75% per year
    if (remaining > 0) {
      const next5 = Math.min(5, remaining);
      roa += next5 * 1.75;
      remaining -= next5;
    }
    
    // Next 25 years (11-35): 2.00% per year
    if (remaining > 0) {
      const next25 = Math.min(25, remaining);
      roa += next25 * 2.0;
      remaining -= next25;
    }
    
    // Excess over 35 years: 1.00% per year (max 3.75% from this tier)
    if (remaining > 0) {
      const excessROA = remaining * 1.00;
      roa += Math.min(excessROA, 3.75);
    }
    
    return Math.min(roa, 70); // Cap at 70%
  }

  const roa = calculateROA(yearsOfService);
  const annualPension = far * (roa / 100);
  
  // Use manual actuarial factor instead of age-based lookup
  const maxLumpSum = (annualPension * (lumpSumPercentage / 100)) * parseFloat(actuarialFactor);

  // Main calculations - UPDATED TO MATCH HTML LOGIC
  useEffect(() => {
    if (far > 0 && yearsOfService >= 0) {
      // Calculate interest on contributions
      const INTEREST_RATE = 0.0325;
      const futureValue = ownContributions * Math.pow((1 + INTEREST_RATE), yearsOfService);
      const interest = futureValue - ownContributions;
      setCalculatedInterest(interest);

      // Determine benefit type
      const benefitInfo = determineBenefitType(ageAtRetirement, yearsOfService, entryDate);
      
      // Calculate withdrawal settlement
      const wsData = calculateWithdrawalSettlement(ownContributions, yearsOfService, separationDate, entryDate);
      setWithdrawalSettlement(wsData);
      
      // Calculate periodic benefits if eligible (5+ years service)
      if (yearsOfService >= 5) {
        let reductionFactor = 0;
        if (benefitInfo.type === 'Early Retirement Benefit (Article 29)') {
          reductionFactor = calculateReductionFactor(ageAtRetirement, yearsOfService, benefitInfo.nra, benefitInfo.era);
        }
        
        // Initial annual pension (FAR * ROA)
        const initialAnnualPension = far * (roa / 100);
        
        // Annual pension after reduction factor
        const annualPensionAfterReduction = initialAnnualPension * (1 - reductionFactor);
        
        // Monthly pension before commutation
        const monthlyPensionBeforeCommutation = annualPensionAfterReduction / 12;
        
        // Lump sum calculations
        let totalLumpSumAmount = 0;
        let monthlyCommutedValue = 0;
        let reducedMonthlyPension = monthlyPensionBeforeCommutation;
        
        // Only allow lump sum for non-deferred benefits
        if (electLumpSum && benefitInfo.type !== 'Deferred Retirement Benefit (Article 30)') {
          // Use initial annual pension (before reduction) for lump sum calculation
          totalLumpSumAmount = initialAnnualPension * (lumpSumPercentage / 100) * parseFloat(actuarialFactor);
          monthlyCommutedValue = monthlyPensionBeforeCommutation * (lumpSumPercentage / 100);
          reducedMonthlyPension = monthlyPensionBeforeCommutation - monthlyCommutedValue;
        }
        
        // COLA adjustment (2.8%)
        const colaAmount = reducedMonthlyPension * 0.028;
        const monthlyPensionAfterCOLA = reducedMonthlyPension + colaAmount;
        
        // Final periodic benefit after ASHI deduction
        const finalPeriodicBenefit = monthlyPensionAfterCOLA - ashiContribution;
        
        setCalculation({
          annualPension: initialAnnualPension,
          monthlyPension: monthlyPensionBeforeCommutation,
          lumpSum: totalLumpSumAmount,
          reducedMonthlyPension,
          colaAdjustedPension: monthlyPensionAfterCOLA,
          finalPeriodicBenefit,
          eligibilityType: benefitInfo.type,
          earlyRetirementReduction: reductionFactor * 100,
        });
      } else {
        setCalculation(null);
      }
    }
  }, [far, roa, yearsOfService, ageAtRetirement, electLumpSum, lumpSumPercentage, actuarialFactor, ashiContribution, ownContributions, entryDate, separationDate]);

  // --- Live update yearsOfService and ageAtRetirement ---
  useEffect(() => {
    // Calculate years of service
    if (entryDate && separationDate) {
      const years = calculateYearsOfService(entryDate, separationDate);
      if (!isNaN(years) && Math.abs(years - yearsOfService) > 0.01) {
        setYearsOfService(years);
      }
    }
    // Calculate age at retirement (separation)
    if (dateOfBirth && separationDate) {
      const age = calculateAgeAtRetirement(dateOfBirth, separationDate);
      if (!isNaN(age) && Math.abs(age - ageAtRetirement) > 0.01) {
        setAgeAtRetirement(age);
      }
    }
  }, [entryDate, separationDate, dateOfBirth]);

  // Load profile data
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('profileData').then(data => {
        if (data) {
          try {
            const profile = JSON.parse(data);
            if (profile.dateOfEntry) {
              setEntryDate(formatDateDDMMYYYY(profile.dateOfEntry));
            }
            if (profile.dateOfSeparation) {
              setSeparationDate(formatDateDDMMYYYY(profile.dateOfSeparation));
            }
            if (profile.dateOfBirth) {
              setDateOfBirth(formatDateDDMMYYYY(profile.dateOfBirth));
            }
          } catch (error) {
            console.error('Error parsing profile data:', error);
          }
        }
      });
    }, [])
  );

  // Update service length display
  useEffect(() => {
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

  // NEW: Handle option selection with animation
  const handleOptionSelect = (option: 'A' | 'B') => {
    const scaleAnim = option === 'A' ? scaleAnimA : scaleAnimB;
    
    // Scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (selectedOption === option) {
      // If same option clicked, show both
      setSelectedOption('both');
    } else if (selectedOption === 'both') {
      // If both selected, select only this option
      setSelectedOption(option);
    } else {
      // If different option or none selected, select this option
      setSelectedOption(option);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16, gap: 16 }}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/(tabs)')}
          >
            <View style={{ transform: [{ scaleX: -1 }] }}>
              <LogOut size={24} color="#2563EB" strokeWidth={2} />
            </View>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.headerIconContainer}>
              <Calculator size={32} color="#2563EB" strokeWidth={2} />
            </View>
            <Text style={styles.title}>Pension Calculator</Text>
            <Text style={styles.subtitle}>Your benefits calculator</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.form}>
        {/* Date inputs - inline layout */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>Date of Birth:</Text>
          <View style={{ position: 'relative', flex: 1 }}>
            <TextInput
              style={[styles.inlineInput, styles.dateInput]}
              value={dateOfBirth}
              onChangeText={value => setDateOfBirth(formatDateInput(value))}
              placeholder="DD-MM-YYYY"
              placeholderTextColor="#9CA3AF"
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
            {dateOfBirth ? (
              <TouchableOpacity
                style={{ position: 'absolute', right: 12, top: 16, zIndex: 2 }}
                onPress={() => setDateOfBirth('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={{ fontSize: 18, color: '#9CA3AF' }}>×</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>Date of Entry:</Text>
          <View style={{ position: 'relative', flex: 1 }}>
            <TextInput
              style={[styles.inlineInput, styles.dateInput]}
              value={entryDate}
              onChangeText={value => setEntryDate(formatDateInput(value))}
              placeholder="DD-MM-YYYY"
              placeholderTextColor="#9CA3AF"
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
            {entryDate ? (
              <TouchableOpacity
                style={{ position: 'absolute', right: 12, top: 16, zIndex: 2 }}
                onPress={() => setEntryDate('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={{ fontSize: 18, color: '#9CA3AF' }}>×</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>Date of Separation:</Text>
          <View style={{ position: 'relative', flex: 1 }}>
            <TextInput
              style={[styles.inlineInput, styles.dateInput]}
              value={separationDate}
              onChangeText={value => setSeparationDate(formatDateInput(value))}
              placeholder="DD-MM-YYYY"
              placeholderTextColor="#9CA3AF"
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
            {separationDate ? (
              <TouchableOpacity
                style={{ position: 'absolute', right: 12, top: 16, zIndex: 2 }}
                onPress={() => setSeparationDate('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={{ fontSize: 18, color: '#9CA3AF' }}>×</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Own Contributions Input */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>Own Contributions (USD):</Text>
          <TextInput
            style={[styles.inlineInput, styles.amountInput]}
            value={formatNumberWithCommas(ownContributions.toString())}
            onChangeText={text => {
              const cleanText = removeCommas(text);
              const num = parseFloat(cleanText);
              if (!isNaN(num) && num >= 0) setOwnContributions(num);
              else if (cleanText === '' || cleanText === '.') setOwnContributions(0);
            }}
            placeholder="Enter total contributions"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Get this from your Annual Pension Statement.</Text>
        </View>

        {/* Calculated Interest Display */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.longLabel]}>Calculated Interest:</Text>
          <Text style={[styles.inlineInput, styles.readOnlyInput]}>{formatCurrency(calculatedInterest)}</Text>
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Your contributions earn compound interest at 3.25% for every completed year of contributory service.</Text>
        </View>

        {/* PR Values Grid - Only show if not using direct FAR input */}
        {!useFarInput && (
          <View style={{ marginVertical: 14 }}>
            <Text style={styles.boldLabel}>Final Average Remuneration (FAR) Calculator</Text>
            
            <Text style={styles.label}>Enter your highest pensionable remuneration over 36 months within 5 years before retirng month.</Text>
            {rows.map((row, rowIdx) => {
              const scrollViewRef = React.useRef<ScrollView>(null);
              const isFirstVisible = scrollPositions[rowIdx] <= 0;
              const isLastVisible = scrollPositions[rowIdx] >= (row.length * 78 - 300); // Approximate calculation
              
              const scrollLeft = () => {
                scrollViewRef?.current?.scrollTo({ x: Math.max(0, scrollPositions[rowIdx] - 200), animated: true });
              };
              
              const scrollRight = () => {
                const maxScroll = row.length * 78 - 300;
                scrollViewRef?.current?.scrollTo({ x: Math.min(maxScroll, scrollPositions[rowIdx] + 200), animated: true });
              };
              
              return (
                <View key={rowIdx} style={{ marginBottom: rowIdx < rows.length - 1 ? 20 : 0 }}>
                  <View style={styles.scrollContainer}>
                    {!isFirstVisible && (
                      <TouchableOpacity style={styles.scrollArrowLeft} onPress={scrollLeft}>
                        <ChevronLeft size={20} color="#6B7280" />
                      </TouchableOpacity>
                    )}
                    <ScrollView
                      ref={scrollViewRef}
                      horizontal
                      showsHorizontalScrollIndicator={true}
                      style={{ flex: 1, paddingHorizontal: 8 }}
                      contentContainerStyle={{ flexDirection: 'row', paddingLeft: 4, paddingRight: 4 }}
                      keyboardShouldPersistTaps="handled"
                      scrollEnabled={true}
                      onScroll={(event) => {
                        const newPositions = [...scrollPositions];
                        newPositions[rowIdx] = event.nativeEvent.contentOffset.x;
                        setScrollPositions(newPositions);
                      }}
                      scrollEventThrottle={16}
                    >
                      {row.map((label, colIdx) => {
                        const absIndex = rowIdx * 12 + colIdx;
                        return (
                          <View key={label + absIndex} style={{ alignItems: 'center', marginRight: 8 }}>
                            <Text style={{ fontSize: width < 300 ? 10 : 11, color: '#6B7280' }}>{label}</Text>
                            <TextInput
                              style={{
                                borderWidth: 1,
                                borderColor: '#D1D5DB',
                                borderRadius: 8,
                                width: width < 300 ? 60 : 70,
                                height: width < 300 ? 32 : 36,
                                textAlign: 'center',
                                marginTop: 2,
                                backgroundColor: '#FFF',
                                color: '#111827',
                                fontSize: width < 300 ? 10 : 11,
                              }}
                              value={formatNumberWithCommas(prValues[absIndex] || '')}
                              onChangeText={text => {
                                const cleanText = removeCommas(text);
                                const newValues = [...prValues];
                                if (/^\d*\.?\d*$/.test(cleanText)) {
                                  for (let i = absIndex; i < Math.min(absIndex + 12, 36); i++) {
                                    newValues[i] = cleanText;
                                  }
                                  setPrValues(newValues);
                                }
                              }}
                              placeholder="0"
                              keyboardType="numeric"
                              maxLength={10}
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                    {!isLastVisible && (
                      <TouchableOpacity style={styles.scrollArrowRight} onPress={scrollRight}>
                        <ChevronRight size={20} color="#6B7280" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
            <Text style={styles.helpText}>Enter your PR (shown on your monthly payslip) for all 36 months to calculate your FAR.{'\n'}The calculator will auto-fill the next 12 months, but you can adjust any field if needed.{'\n'}Your FAR is the key factor in determining your lifetime pension.</Text>
          </View>
        )}

        {/* Service Length Display */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label]}>Length of Your Contributory Service:</Text>
          <Text style={styles.displayValue}>{serviceLength}</Text>
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Calculated from your entry to separation dates. Maximum recognized service is 38.75 years.</Text>
        </View>

        {/* Age at Retirement Display */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>Age at Separation:</Text>
          <Text style={[styles.inlineInput, styles.readOnlyInput]}>{Math.floor(ageAtRetirement)} years</Text>
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Calculated from your birth date and separation date.</Text>
        </View>

        {/* FAR (calculated) Display */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>FAR (calculated):</Text>
          <Text style={[styles.inlineInput, styles.readOnlyInput]}>
            {isNaN(far) || far === 0 ? '$0' : formatCurrency(far)}
          </Text>
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Average of your 36 months pensionable remuneration values.</Text>
        </View>

        {/* Rate of Accumulation Display */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.longLabel]}>Rate of Accumulation (%):</Text>
          <Text style={[styles.inlineInput, styles.readOnlyInput]}>{roa.toFixed(2)}%</Text>
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Calculated based on your years of service and entry date.</Text>
        </View>

        {/* Actuarial Factor Input */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>Actuarial Factor:</Text>
          <TextInput
            style={[styles.inlineInput, styles.numberInput]}
            value={actuarialFactor}
            onChangeText={setActuarialFactor}
            placeholder="e.g., 12.694"
            placeholderTextColor="#9CA3AF"
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Default actuarial factor in use. Change it manually if another applies.</Text>
        </View>

        {/* Lump Sum Election */}
        <View style={styles.switchContainer}>
          <View style={styles.switchLabelContainer}>
            <Text style={styles.switchLabel}>Elect Lump Sum Option</Text>
            <Text style={styles.switchDescription}>For Periodic Benefits (not available for Deferred Retirement)</Text>
          </View>
          <Switch
            value={electLumpSum}
            onValueChange={setElectLumpSum}
            trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
            thumbColor={electLumpSum ? '#FFFFFF' : '#F3F4F6'}
          />
        </View>

        {electLumpSum && (
          <>
            <View style={styles.inlineInputGroup}>
              <Text style={[styles.inlineLabel, styles.longLabel]}>Lump Sum Percentage:</Text>
              <TextInput
                style={[styles.inlineInput, styles.numberInput]}
                value={lumpSumPercentage.toString()}
                onChangeText={text => {
                  const num = parseFloat(text);
                  if (!isNaN(num) && num >= 0 && num <= 33.33) setLumpSumPercentage(num);
                  else if (text === '' || text === '.') setLumpSumPercentage(0);
                }}
                placeholder="33.33"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.helpTextContainer}>
              <Text style={styles.helpText}>You may commute up to 1/3 (33.33%) of your annual pension as a lump sum.</Text>
            </View>
          </>
        )}

        {/* ASHI Contribution */}
        <View style={styles.inlineInputGroup}>
          <Text style={[styles.inlineLabel, styles.mediumLabel]}>ASHI Contribution (USD):</Text>
          <TextInput
            style={[styles.inlineInput, styles.amountInput]}
            value={formatNumberWithCommas(ashiContribution.toString())}
            onChangeText={text => {
              const cleanText = removeCommas(text);
              const num = parseFloat(cleanText);
              if (!isNaN(num) && num >= 0) setAshiContribution(num);
              else if (cleanText === '' || cleanText === '.') setAshiContribution(0);
            }}
            placeholder="0"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>
            If you have 10+ years of contributory service, you and your spouse are eligible for lifetime UN-subsidized After-Service Health Insurance (ASHI).{'\n'} Click here to see your monthly premium contribution. Enrollment is optional.<Text 
              style={styles.link}
              onPress={() => Linking.openURL('https://www.un.org/insurance/sites/www.un.org.insurance/files/ashi_rates_2025-2026.pdf')}
            >
              <Text style={{display:'none'}}>l</Text> ASHI rates
            </Text>
          </Text>
        </View>

        {/* NEW: Results Section with Interactive Selection */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.resultsTitle}>Snapshot of your estimated benefits</Text>
          
          {/* NEW: Option Selection Interface */}
          <View style={styles.optionSelectionContainer}>
            <Text style={styles.resultsTitle1}>Select your preferred option to retire:</Text>
            
            <View style={styles.optionButtonsContainer}>
  <Animated.View
    style={[
      styles.optionButtonWrapper,
      {
        opacity: selectedOption === null ? blinkAnimA : 1,
        transform: [{ scale: scaleAnimA }],
      }
    ]}
  >
    <TouchableOpacity
      style={[
        styles.optionButton,
        styles.optionA,
        (selectedOption === 'A' || selectedOption === 'both') && styles.optionSelected,
      ]}
      onPress={() => handleOptionSelect('A')}
    >
      <Text style={[
        styles.optionButtonText,
        (selectedOption === 'A' || selectedOption === 'both') && styles.optionButtonTextSelected,
      ]}>
        Option A
      </Text>
      <Text style={[
        styles.optionButtonSubtext,
        (selectedOption === 'A' || selectedOption === 'both') && styles.optionButtonSubtextSelected,
      ]}>
        Click here to retire now
      </Text>
    </TouchableOpacity>
  </Animated.View>

  <View style={styles.separatorContainer}>
    <Text style={styles.optionSeparator}>OR</Text>
  </View>

  <Animated.View
    style={[
      styles.optionButtonWrapper,
      {
        opacity: selectedOption === null ? blinkAnimB : 1,
        transform: [{ scale: scaleAnimB }],
      }
    ]}
  >
    <TouchableOpacity
      style={[
        styles.optionButton,
        styles.optionB,
        (selectedOption === 'B' || selectedOption === 'both') && styles.optionSelected,
      ]}
      onPress={() => handleOptionSelect('B')}
    >
      <Text style={[
        styles.optionButtonText,
        (selectedOption === 'B' || selectedOption === 'both') && styles.optionButtonTextSelected,
      ]}>
        Option B
      </Text>
      <Text style={[
        styles.optionButtonSubtext,
        (selectedOption === 'B' || selectedOption === 'both') && styles.optionButtonSubtextSelected,
      ]}>
        Click here to retire later
      </Text>
    </TouchableOpacity>
  </Animated.View>
</View>

            {selectedOption && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => setSelectedOption(null)}
              >
                <Text style={styles.resetButtonText}>Compare Both Options</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Withdrawal Settlement - Option A */}
          {withdrawalSettlement && (selectedOption === 'A' || selectedOption === 'both' || selectedOption === null) && (
            <Animated.View style={[
              styles.benefitSection,
              (selectedOption === 'B') && styles.blurredSection,
            ]}>
              <Text style={styles.benefitTitle}>A. Withdrawal Settlement (one-time payment)</Text>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Your Own Contributions</Text>
                <Text style={styles.resultValue}>{formatCurrency(withdrawalSettlement.ownContributions)}</Text>
              </View>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Calculated Interest (3.25%)</Text>
                <Text style={styles.resultValue}>{formatCurrency(withdrawalSettlement.calculatedInterest)}</Text>
              </View>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Base Amount</Text>
                <Text style={styles.resultValue}>{formatCurrency(withdrawalSettlement.baseAmount)}</Text>
              </View>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Bonus ({withdrawalSettlement.bonusPercentage.toFixed(0)}%)</Text>
                <Text style={styles.resultValue}>{formatCurrency(withdrawalSettlement.bonusAmount)}</Text>
              </View>
              <View style={[styles.resultCard, styles.highlightCard]}>
                <Text style={styles.resultLabel}>Total Withdrawal Settlement</Text>
                <Text style={[styles.resultValue, styles.highlightValue]}>{formatCurrency(withdrawalSettlement.totalSettlement)}</Text>
              </View>

              {/* Scenario Summary */}
              <View style={styles.scenarioSummary}>
                <Text style={styles.scenarioText}>
                  {yearsOfService < 5
                    ? 'Less than 5 years of service. Only contributions plus interest are returned.'
                    : yearsOfService <= 15
                    ? `Between 5 and 15 years of service. Bonus applied based on years over 5.`
                    : 'More than 15 years of service. Maximum 100% bonus applied.' 
                  }
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Periodic Benefits - Option B */}
          {calculation && yearsOfService >= 5 && (selectedOption === 'B' || selectedOption === 'both' || selectedOption === null) && (
            <Animated.View style={[
              styles.benefitSection,
              (selectedOption === 'A') && styles.blurredSection,
            ]}>
              <Text style={styles.benefitTitle}>B. Periodical Benefit (Lifetime pension)</Text>

              <Text style={styles.benefitTitle1}>{calculation.eligibilityType}</Text>

              {/* A) Annual Pension Amount (for normal retirement) */}
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Annual Pension Amount (for normal retirement)</Text>
                <Text style={styles.resultValue}>{formatCurrency(calculation.annualPension)}</Text>
              </View>

              {/* B) Annual Pension (early retirement...) */}
              {calculation.earlyRetirementReduction && calculation.earlyRetirementReduction > 0? (
                <View style={styles.resultCard}>
                  <Text style={styles.resultLabel}>
                    Annual Pension (early retirement at {Math.floor(ageAtRetirement)} reduction factor {calculation.earlyRetirementReduction?.toFixed(2)}%)
                  </Text>
                  <Text style={styles.resultValue}>
                    {formatCurrency(calculation.annualPension * (1 - (calculation.earlyRetirementReduction ?? 0) / 100))}
                  </Text>
                </View>
              ) : null}

              {/* C) Monthly Pension (before commutation) */}
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Monthly Pension (before commutation)</Text>
                <Text style={styles.resultValue}>{formatCurrency(calculation.monthlyPension)}</Text>
              </View>

              {/* D/E) Lump Sum and Commuted Value, only if electLumpSum and not deferred */}
              {electLumpSum && calculation.eligibilityType !== 'Deferred Retirement Benefit (Article 30)' && (
                <>
                  <View style={styles.resultCard}>
                    <Text style={styles.resultLabel}>Total Lump Sum Received ({lumpSumPercentage.toFixed(2)}%)</Text>
                    <Text style={styles.resultValue}>{formatCurrency(calculation.lumpSum)}</Text>
                  </View>
                  <View style={styles.resultCard}>
                    <Text style={styles.resultLabel}>Monthly Pension Commuted Value</Text>
                    <Text style={[styles.resultValue, { color: '#DC2626' }]}>-{formatCurrency(calculation.monthlyPension - calculation.reducedMonthlyPension)}</Text>
                  </View>
                </>
              )}

              {/* F) Reduced Monthly Pension */}
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Reduced Monthly Pension</Text>
                <Text style={styles.resultValue}>{formatCurrency(calculation.reducedMonthlyPension)}</Text>
              </View>

              {/* G) Add: COLA (2.8%) */}
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Add: COLA (2.8%)</Text>
                <Text style={styles.resultValue}>{formatCurrency(calculation.colaAdjustedPension - calculation.reducedMonthlyPension)}</Text>
              </View>

              {/* H) Monthly Pension (after COLA) */}
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Monthly Pension (after COLA)</Text>
                <Text style={styles.resultValue}>{formatCurrency(calculation.colaAdjustedPension)}</Text>
              </View>

              {/* I) Less: ASHI Contribution */}
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Less: ASHI Contribution</Text>
                <Text style={[styles.resultValue, { color: '#DC2626' }]}>-{formatCurrency(ashiContribution)}</Text>
              </View>

              {/* J) Your Periodic Retirement Benefit */}
              <View style={[styles.resultCard, styles.highlightCard]}>
                <Text style={styles.resultLabel}>Your Periodic Retirement Benefit</Text>
                <Text style={[styles.resultValue, styles.highlightValue]}>{formatCurrency(calculation.finalPeriodicBenefit || 0)}</Text>
              </View>

              {/* Scenario Summary */}
              <View style={styles.scenarioSummary}>
                <Text style={styles.scenarioText}>
                  {calculation.eligibilityType === 'Normal Retirement Benefit (Article 28)' &&
                    'You are eligible for a Normal Retirement Benefit as you are at or above your Normal Retirement Age.'}
                  {calculation.eligibilityType === 'Early Retirement Benefit (Article 29)' &&
                    'You are eligible for an Early Retirement Benefit as you are between your Early Retirement Age and Normal Retirement Age.'}
                  {calculation.eligibilityType === 'Deferred Retirement Benefit (Article 30)' &&
                    'You are eligible for a Deferred Retirement Benefit as you have 5+ years of service but are below your Early Retirement Age.'}
                </Text>
              </View>
            </Animated.View>
          )}
        </View>
      </View>

      {/* Information Sections - Blur when Option A is selected */}
      <Animated.View style={[
        styles.infoSection,
        selectedOption === 'A' && styles.blurredSection,
      ]}>
        <Text style={styles.infoTitle}>Important Information</Text>
        
        {/* Deferment Option - Show conditionally */}
        {yearsOfService >= 5 && yearsOfService < 15 && (
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Deferment of Choice ("Freeze" Option - Article 32)</Text>
            <Text style={styles.infoText}>
              You can choose to defer making a benefit election for up to 36 months from your separation date. 
              Note: You do not earn interest on your contributions during this deferment period.
            </Text>
            <Text style={styles.infoText}>
              This option is useful if you expect to re-enter the UNJSPF within 36 months, as your participation 
              is considered continuous with a break in service (BIS).
            </Text>
          </View>
        )}
        
        {/* Restoration Eligibility - Show conditionally */}
        {yearsOfService >= 5 && (
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Eligibility for Restoration</Text>
            <Text style={styles.infoText}>
              Should you re-join a UNJSPF member organization later, your Withdrawal Settlement is eligible 
              for Restoration (strict deadlines apply!). This applies to those who had 5 or more years of 
              Contributory Service and vested pension rights.
            </Text>
          </View>
        )}
        
        {/* Benefit Type Information */}
        {calculation?.eligibilityType && (
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>About Your Benefit Type</Text>
            {calculation.eligibilityType === 'Normal Retirement Benefit (Article 28)' && (
              <Text style={styles.infoText}>
                A monthly benefit payable for life without reduction factors. Monthly amount is adjusted 
                for cost of living over time and carries Survivors Benefits for eligible survivors. 
                Your entitlement starts as of the date following your separation date.
              </Text>
            )}
            {calculation.eligibilityType === 'Early Retirement Benefit (Article 29)' && (
              <>
                <Text style={styles.infoText}>
                  A monthly benefit payable for life but reduced based on your age and length of service 
                  at separation. The reduction is permanent but the benefit still includes cost of living 
                  adjustments and survivor benefits.
                </Text>
                <Text style={[styles.infoCardTitle, { marginTop: 12 }]}>Reduction Factors:</Text>
                <Text style={styles.infoText}>
                  • If Early Retirement Age is 55:{'\n'}
                  - Less than 25 years: 6% per year{'\n'}
                  - 25-30 years: 3% per year{'\n'}
                  - More than 30 years: 1% per year{'\n'}
                  • If Early Retirement Age is 58:{'\n'}
                  - Less than 25 years: 6% per year{'\n'}
                  - More than 25 years: 4% per year{'\n'}
                  Note: Smaller rates apply for max 5 years, then 6% for remaining years.
                </Text>
              </>
            )}
            {calculation.eligibilityType === 'Deferred Retirement Benefit (Article 30)' && (
              <Text style={styles.infoText}>
                A periodic benefit offering lifelong monthly payments, adjusted for cost of living. 
                NO lump sum option available and NO Child's benefits (except for surviving children 
                under Survivor's Benefits). You determine when the benefit starts by submitting payment 
                instructions after reaching Early Retirement Age.
              </Text>
            )}
          </View>
        )}
      </Animated.View>

      <View style={styles.disclaimerBox}>
        <Info size={20} color="#D97706" strokeWidth={2} />
        <Text style={styles.disclaimerText}>
          These estimates are based on current UNJSPF Regulations and Rules. Your actual entitlements may vary 
          depending on your final options and regulatory changes. For official calculations, please refer to 
          your Member Self-Service portal or consult with your HR department. Processing typically takes 
          15 business days after complete documentation is received.
        </Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.calculatorButton}
          onPress={() => router.push('/(tabs)/eligibility')}
        >
          <View style={styles.calculatorButtonContent}>
            <View style={styles.calculatorButtonTextContainer}>
              <Text style={styles.calculatorButtonText}>See your best available options</Text>
            </View>
          </View>
          <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
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
    paddingTop: width < 300 ? 12 : width < 350 ? 16 : 20,
    paddingBottom: width < 300 ? 16 : width < 350 ? 20 : 24,
    paddingHorizontal: width < 300 ? 12 : width < 350 ? 16 : 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: width < 300 ? 12 : width < 350 ? 16 : 24,
    top: width < 300 ? 20 : width < 350 ? 24 : 28,
    padding: 8,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
  },
  headerIconContainer: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
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
  form: {
    padding: width < 300 ? 12 : width < 350 ? 16 : 20,
  },
  inputGroup: {
    marginBottom: 6,
  },
  inlineInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: width < 300 ? 6 : width < 350 ? 8 : 12,
    flexWrap: 'nowrap',
  },
  label: {
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    fontWeight: '600',
    color: '#374151',
  },
  boldLabel: {
    fontSize: width < 300 ? 12 : width < 350 ? 13 : 13,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  inlineLabel: {
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    fontWeight: '600',
    color: '#374151',
    flexShrink: 0,
    textAlign: 'left',
  },
  // Label width classes for different label lengths
  shortLabel: {
    width: width < 300 ? 60 : 70, // Short labels
  },
  mediumLabel: {
    width: width < 300 ? 56 : 106, // Date of Birth, Age at Separation
  },
  longLabel: {
    width: width < 300 ? 90 : 131, // Date of Entry, Own Contributions, etc.
  },
  veryLongLabel: {
    width: width < 300 ? 100 : 143, // Very long labels
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: width < 300 ? 12 : 12,
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  inlineInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: width < 300 ? 10 : width < 350 ? 12 : 16,
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    color: '#111827',
    flex: 1,
    minWidth: 0,
  },
  // Input flex values to match label sizes
  dateInput: {
    flex: 1,
  },
  amountInput: {
    flex: 1,
  },
  numberInput: {
    flex: 1,
  },
  readOnlyInput: {
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
  },
  link: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  displayValue: {
    padding: width < 300 ? 12 : 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    color: '#374151',
    fontWeight: '600',
    marginTop: 12,
  },
  helpText: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 11,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  helpTextContainer: {
    marginBottom: 12,
    marginLeft: 4,
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
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 11,
    color: '#6B7280',
    fontStyle:'italic'
  },
  resultsTitle: {
    fontSize: width < 300 ? 13 : width < 350 ? 14 : 16,
    fontWeight: '700',
    color: 'blue',
    marginBottom: 6,
    textAlign: 'center',
  },
  resultsTitle1: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 12,
    fontWeight: '500',
    color: 'blue',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  // NEW: Option Selection Styles
  optionSelectionContainer: {
    backgroundColor: '#F8FAFC',
    padding: width < 300 ? 12 : width < 350 ? 16 : 20,
    borderRadius: 16,
    marginBottom: 16,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: width < 320 ? 12 : width < 380 ? 16 : 20,
    paddingHorizontal: width < 320 ? 4 : width < 380 ? 6 : 8,
    gap: width < 320 ? 6 : width < 380 ? 8 : 12,
  },
  
  optionButtonWrapper: {
    flex: 1,
    maxWidth: width < 320 ? '38%' : width < 380 ? '40%' : '42%',
    minWidth: width < 320 ? 100 : width < 380 ? 110 : 120,
  },
  
  optionButton: {
    width: '100%',
    paddingVertical: width < 320 ? 10 : width < 380 ? 12 : 16,
    paddingHorizontal: width < 320 ? 6 : width < 380 ? 8 : 12,
    borderRadius: width < 320 ? 8 : width < 380 ? 10 : 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: width < 320 ? 65 : width < 380 ? 75 : 85,
  },
  
  separatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width < 320 ? 4 : width < 380 ? 6 : 8,
    minWidth: width < 320 ? 35 : width < 380 ? 40 : 45,
  },
  
  optionSeparator: {
    fontSize: width < 320 ? 11 : width < 380 ? 12 : 14,
    fontWeight: '700',
    color: '#6B7280',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: width < 320 ? 6 : width < 380 ? 8 : 10,
    paddingVertical: width < 320 ? 3 : width < 380 ? 4 : 5,
    borderRadius: width < 320 ? 6 : width < 380 ? 8 : 10,
    textAlign: 'center',
  },
  
  optionButtonText: {
    fontSize: width < 320 ? 10 : width < 380 ? 11 : 13,
    fontWeight: '700',
    marginBottom: width < 320 ? 2 : width < 380 ? 3 : 4,
    textAlign: 'center',
    color: '#374151',
  },
  
  optionButtonSubtext: {
    fontSize: width < 320 ? 8 : width < 380 ? 9 : 10,
    fontWeight: '500',
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: width < 320 ? 10 : width < 380 ? 12 : 14,
  },
  optionButtonTextSelected: {
    color: '#1D4ED8',
  },
  optionButtonSubtextSelected: {
    color: '#1E40AF',
  },
  resetButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: width < 300 ? 12 : 16,
    paddingVertical: width < 300 ? 6 : 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: width < 300 ? 11 : 12,
    fontWeight: '600',
  },
  
  // NEW: Blur Effect Style
  blurredSection: {
    opacity: 0.3,
  },
  
  benefitSection: {
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
  benefitTitle: {
    fontSize: width < 300 ? 12 : width < 350 ? 13 : 14,
    fontWeight: '700',
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  benefitTitle1: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 13,
    fontWeight: '600',
    color: 'black',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  highlightCard: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3B82F6',
    borderWidth: 1,
  },
  resultLabel: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 12,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  resultValue: {
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    fontWeight: '700',
    color: '#111827',
  },
  highlightValue: {
    color: '#1D4ED8',
    fontSize: width < 300 ? 12 : width < 350 ? 13 : 14,
  },
  scenarioSummary: {
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderColor: '#BAE6FD',
    borderWidth: 1,
  },
  scenarioText: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 11,
    color: '#0C4A6E',
    fontStyle: 'italic',
  },
  orSeparator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  orText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  warningCard: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderColor: '#FCA5A5',
    borderWidth: 1,
  },
  warningText: {
    fontSize: 14,
    color: '#DC2626',
    flex: 1,
    marginLeft: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
  infoSection: {
    padding: 24,
    paddingTop: 0,
  },
  infoTitle: {
    fontSize: width < 300 ? 13 : width < 350 ? 14 : 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    borderColor: '#BAE6FD',
    borderWidth: 1,
  },
  infoCardTitle: {
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 12,
    fontWeight: '600',
    color: '#0C4A6E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 11,
    color: '#0F172A',
    lineHeight: 16,
  },
  disclaimerBox: {
    margin: 10,
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  disclaimerText: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 11,
    color: '#92400E',
    flex: 1,
    marginLeft: 12,
    lineHeight: 16,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scrollArrowLeft: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollArrowRight: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculatorButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  calculatorButtonContent: {
    alignItems: 'center',
  },
  calculatorButtonTextContainer: {
  },
  calculatorButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  calculatorButtonSubtext: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  section: {
    margin: 16,
  },
});