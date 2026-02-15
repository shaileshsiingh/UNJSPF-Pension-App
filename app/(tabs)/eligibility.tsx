import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import CustomSlider from '../../components/CustomSlider';
import { LogOut, TrendingUp } from 'lucide-react-native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function formatDateDMY(dateString: string): string {
  // This function should be implemented based on your date format requirements
  return dateString;
}

export default function EligibilityScreen() {
  // Load profile data on mount and update currentAge and yearsOfService
  const [currentAgeParts, setCurrentAgeParts] = useState<{ years: number, months: number, days: number }>({ years: 0, months: 0, days: 0 });
  const [serviceLengthParts, setServiceLengthParts] = useState<{ years: number, months: number, days: number }>({ years: 0, months: 0, days: 0 });

  // Helper to get current date in DD-MM-YYYY format
  function getCurrentDateDMY(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Navigation params support (for immediate update after profile save)
  const params = useLocalSearchParams();
  React.useEffect(() => {
    let setFromParams = false;
    if (params.dateOfBirth) {
      // Calculate age from DOB to today, not to separation date
      setCurrentAgeParts(getDateParts(params.dateOfBirth as string, getCurrentDateDMY()));
      setFromParams = true;
    }
    if (params.dateOfEntry && params.dateOfSeparation) {
      setServiceLengthParts(getDateParts(params.dateOfEntry as string, params.dateOfSeparation as string));
      setFromParams = true;
    }
    if (!setFromParams) {
      AsyncStorage.getItem('profileData').then(data => {
        if (data) {
          try {
            const profile = JSON.parse(data);
            if (profile.dateOfBirth) {
              // Calculate age from DOB to today, not to separation date
              const dob = formatDateDMY(profile.dateOfBirth);
              setCurrentAgeParts(getDateParts(dob, getCurrentDateDMY()));
            }
            if (profile.dateOfEntry && profile.dateOfSeparation) {
              const entry = formatDateDMY(profile.dateOfEntry);
              const sep = formatDateDMY(profile.dateOfSeparation);
              setServiceLengthParts(getDateParts(entry, sep));
            }
          } catch (e) {
            // ignore
          }
        }
      });
    }
  }, [params.dateOfBirth, params.dateOfSeparation, params.dateOfEntry]);

  // Update values when screen comes into focus (e.g., returning from profile screen)
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('profileData').then(data => {
        if (data) {
          try {
            const profile = JSON.parse(data);
            if (profile.dateOfBirth) {
              const dob = formatDateDMY(profile.dateOfBirth);
              setCurrentAgeParts(getDateParts(dob, getCurrentDateDMY()));
            }
            if (profile.dateOfEntry && profile.dateOfSeparation) {
              const entry = formatDateDMY(profile.dateOfEntry);
              const sep = formatDateDMY(profile.dateOfSeparation);
              setServiceLengthParts(getDateParts(entry, sep));
            }
          } catch (e) {
            // ignore
          }
        }
      });
    }, [])
  );

  // Load selectedOption from AsyncStorage (for calculator integration)
  React.useEffect(() => {
    AsyncStorage.getItem('selectedOption').then(option => {
      setSelectedOptionFromCalculator(option);
    });
  }, []);

  const [inputMode, setInputMode] = useState('slider');
  const [yearsOfService, setYearsOfService] = useState(10);
  const [currentAge, setCurrentAge] = useState(58);

  // Update yearsOfService when serviceLengthParts changes
  React.useEffect(() => {
    const decimalYears = serviceLengthParts.years + (serviceLengthParts.months / 12) + (serviceLengthParts.days / 365.25);
    setYearsOfService(decimalYears);
  }, [serviceLengthParts]);

  // Update currentAge when currentAgeParts changes
  React.useEffect(() => {
    const ageInYears = currentAgeParts.years + (currentAgeParts.months / 12) + (currentAgeParts.days / 365.25);
    setCurrentAge(Math.floor(ageInYears)); // Use floor for age since we typically use whole years for age
  }, [currentAgeParts]);
  const [far, setFar] = useState(50000); // Set default FAR for demonstration
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);
  const [entryYear, setEntryYear] = useState(2010);
  const [selectedOptionFromCalculator, setSelectedOptionFromCalculator] = useState<string | null>(null);

  // Define NRA (Normal Retirement Age) and ERA (Early Retirement Age)
  function calculateNRA(entryYear: number): number {
    // 60 if entry before 1990, 62 if entry before 2014, else 65
    if (entryYear < 1990) return 60;
    if (entryYear < 2014) return 62;
    return 65;
  }
  function calculateERA(entryYear: number): number {
    // 55 if entry before 2014, else 58
    if (entryYear < 2014) return 55;
    return 58;
  }

  const NRA = calculateNRA(entryYear);
  const ERA = calculateERA(entryYear);

  // Scenario logic - Updated with more comprehensive eligibility rules
  const scenarios = [
    {
      key: 'withdrawal',
      title: 'Withdrawal Settlement Only',
      description: [
        'With less than 5 years of contributory service, you are only eligible for withdrawal settlement. No vested pension rights.'
      ],
      availableOptions: [
        'One-time final settlement (your own contributions + 3.25% compound interest)',
        'No organization\'s contribution',
        'No further payment to you or your dependents',
        'Or:',
        'Defer payment for up to 36 months, if planning to return (Article 32)'
      ],
      eligible: yearsOfService < 5,
      priority: 4, // Lower priority
    },
    {
      key: 'deferred',
      title: 'Deferred Retirement Benefit (Article 30)',
      description: [
        'A monthly pension for life, payable starting at your Normal Retirement Age (NRA).',
        'You can choose to commence the benefit as early as age 55 (or 58 for post-2014 entrants), but it will be reduced.',
        'Preserves survivor benefits for your dependents.'
      ],
      eligible: yearsOfService >= 5 && currentAge < NRA,
      priority: 2,
    },
    {
      key: 'early',
      title: 'Early Retirement Benefit (Article 29)',
      description: [
        'A monthly pension for life, payable before your Normal Retirement Age (NRA).',
        'The benefit is reduced for each month you are younger than your NRA.',
        'Provides an immediate, though reduced, income stream.'
      ],
      eligible: yearsOfService >= 5 && currentAge >= ERA && currentAge < NRA,
      priority: 3,
    },
    {
      key: 'normal',
      title: 'Normal Retirement Benefit',
      description: [
        'A monthly pension for life, payable at or after your Normal Retirement Age (NRA).',
        'No reduction for early payment.',
        'Full survivor benefits for your dependents.'
      ],
      eligible: yearsOfService >= 5 && currentAge >= NRA,
      priority: 1, // Highest priority
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
  const earlyReduction = Math.max(0, (NRA - currentAge) * 0.05);
  const earlyPension = deferredPension * (1 - earlyReduction);

  // Filter and sort scenarios
  const getFilteredScenarios = () => {
    let filteredScenarios = scenarios;

    // Filter by calculator selection first
    if (selectedOptionFromCalculator === 'A') {
      filteredScenarios = scenarios.filter(s => s.key === 'withdrawal');
    }

    if (showEligibleOnly) {
      filteredScenarios = filteredScenarios.filter(s => s.eligible);
    }

    // Sort by eligibility first (eligible scenarios at top), then by priority
    return filteredScenarios.sort((a, b) => {
      if (a.eligible && !b.eligible) return -1;
      if (!a.eligible && b.eligible) return 1;
      if (a.eligible && b.eligible) return a.priority - b.priority;
      return a.priority - b.priority;
    });
  };

  const filteredScenarios = getFilteredScenarios();
  const eligibleCount = scenarios.filter(s => s.eligible).length;

  const params2 = useLocalSearchParams();
  const [orgContact, setOrgContact] = useState<string>('your HR office');
  const [debugOrg, setDebugOrg] = useState<string>(''); // State for debugging

  React.useEffect(() => {
    let org = (params2.organization as string) || '';
    AsyncStorage.getItem('profileData').then(data => {
      if (data) {
        try {
          const parsed = JSON.parse(data);
          org = parsed.organization || org;
          setDebugOrg(org); // Set debug state

          // --- DEBUGGING LOGS ---
          console.log("Organization from storage:", `'${org}'`);
          console.log("Lookup result:", orgEmailMap[org]);
          // --- END DEBUGGING LOGS ---

          setOrgContact(orgEmailMap[org] || 'your HR office');
          // Set yearsOfService and currentAge from profile
          if (parsed.serviceLength) {
            // Parse full service length string like '10 years, 2 months, 5 days'
            const yearsMatch = parsed.serviceLength.match(/(\d+)\s*years?/);
            const monthsMatch = parsed.serviceLength.match(/(\d+)\s*months?/);
            const daysMatch = parsed.serviceLength.match(/(\d+)\s*days?/);

            const years = yearsMatch ? parseInt(yearsMatch[1]) : 0;
            const months = monthsMatch ? parseInt(monthsMatch[1]) : 0;
            const days = daysMatch ? parseInt(daysMatch[1]) : 0;

            // Convert to decimal years for slider
            const decimalYears = years + (months / 12) + (days / 365.25);
            setYearsOfService(decimalYears);
          }
          if (parsed.dateOfBirth) {
            // Calculate current age from DOB
            const dobParts = parsed.dateOfBirth.split('-');
            if (dobParts.length === 3) {
              const [day, month, year] = dobParts.map(Number);
              const today = new Date();
              let age = today.getFullYear() - year;
              if (
                today.getMonth() + 1 < month ||
                (today.getMonth() + 1 === month && today.getDate() < day)
              ) {
                age--;
              }
              setCurrentAge(age);
            }
          }
          if (parsed.dateOfEntry) {
            // Extract entry year
            const entryParts = parsed.dateOfEntry.split('-');
            const entryY = parseInt(entryParts[2] || '2010', 10);
            setEntryYear(entryY);
          }
          if (parsed.salary) {
            const salaryNum = parseFloat(parsed.salary);
            if (!isNaN(salaryNum) && salaryNum > 0) {
              setFar(salaryNum);
            }
          }
        } catch {
          setOrgContact('your HR office');
          setDebugOrg('Error parsing data');
        }
      } else {
        setOrgContact('your HR office');
        setDebugOrg('No profile data found');
      }
    });
  }, []);

  // Organization to email/contact mapping
  const orgEmailMap: { [key: string]: string } = {
    'United Nations Secretariat including Peacekeeping Missions': 'Contact Us',
    'Preparatory Commission for the Comprehensive Nuclear-Test-Ban Treaty Organization (CTBTO)': 'pension@ctbto.org',
    'European and Mediterranean Plant Protection Organization (EPPO)': 'hqpension@eppo.org',
    'Food and Agriculture Organization of the United Nations (FAO)': 'pension@fao.org',
    'International Atomic Energy Agency (IAEA)': 'MTPIB.Social-Security@iaea.org',
    'International Centre for Genetic Engineering and Biotechnology (ICGEB)': 'pension@icgeb.org',
    'International Centre for the Study of the Preservation and Restoration of Cultural Property (ICCROM)': 'pension@iccrom.org',
    'International Civil Aviation Organization (ICAO)': 'ae@icao.int',
    'International Criminal Court (ICC)': 'staff.pension.secretariat@icc-cpi.int',
    'International Fund for Agricultural Development (IFAD)': 'unjspf@ifad.org',
    'International Labour Organization (ILO)': 'pension@ilo.org',
    'International Maritime Organization (IMO)': 'SPC@imo.org',
    'International Organization for Migration (IOM)': 'socialbenefitsadmin@iom.int',
    'Inter-Parliamentary Union (IPU)': 'hr@ipu.org',
    'International Seabed Authority (ISA)': 'hr@isa.org.jm',
    'International Telecommunication Union (ITU)': 'pension@itu.int',
    'International Tribunal for the Law of the Sea (ITLOS)': 'pension@itlos.org',
    'Organisation for the Prohibition of Chemical Weapons (OPCW)': 'pension@opcw.org',
    'United Nations Educational, Scientific and Cultural Organization (UNESCO)': 'staffpension@unesco.org',
    'United Nations Industrial Development Organization (UNIDO)': 'pension@unido.org',
    'World Tourism Organization (UNWTO)': 'pension@unwto.org',
    'Wassenaar Arrangement': 'pension@wassenaar.org',
    'World Health Organization (WHO)': 'pension@who.int',
    'World Intellectual Property Organization (WIPO)': 'pension@wipo.int',
    'World Meteorological Organization (WMO)': 'pension@wmo.int',
  };

  // Helper to get difference as years, months, days between two DD-MM-YYYY dates
  function getDateParts(from: string, to: string) {
    if (!from || !to) return { years: 0, months: 0, days: 0 };
    const [fromDay, fromMonth, fromYear] = from.split('-').map(Number);
    const [toDay, toMonth, toYear] = to.split('-').map(Number);
    if ([fromDay, fromMonth, fromYear, toDay, toMonth, toYear].some(isNaN)) return { years: 0, months: 0, days: 0 };
    let years = toYear - fromYear;
    let months = toMonth - fromMonth;
    let days = toDay - fromDay;
    if (days < 0) {
      months--;
      days += new Date(toYear, toMonth - 1, 0).getDate();
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

  // Format years, months, days object
  function formatYearsMonthsDaysObj(parts: { years: number, months: number, days: number }) {
    return `${parts.years} years, ${parts.months} months, ${parts.days} days`;
  }

  // Convert decimal years to years, months, days format for real-time display
  function convertDecimalYearsToYMD(decimalYears: number): { years: number, months: number, days: number } {
    const years = Math.floor(decimalYears);
    const remainingDecimal = decimalYears - years;
    const totalDays = Math.round(remainingDecimal * 365.25);
    const months = Math.floor(totalDays / 30.44); // Average days per month
    const days = Math.round(totalDays - (months * 30.44));

    return { years, months, days };
  }

  const renderScenarioCard = (scenario: any, idx: number) => {
    const isEligible = scenario.eligible;
    const cardStyle = {
      backgroundColor: isEligible ?
        (scenario.key === 'normal' ? '#EFF6FF' : '#F0FDF4') :
        '#F9FAFB',
      borderColor: isEligible ?
        (scenario.key === 'normal' ? '#2563EB' : '#22C55E') :
        '#E5E7EB',
      borderWidth: 2,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: isEligible ?
        (scenario.key === 'normal' ? '#2563EB' : '#22C55E') :
        '#000',
      shadowOpacity: isEligible ? 0.08 : 0.03,
      shadowRadius: 6,
      elevation: isEligible ? 2 : 0,
      opacity: (!showEligibleOnly && !isEligible) ? 0.6 : 1.0,
    };

    const titleColor = isEligible ?
      (scenario.key === 'normal' ? '#1D4ED8' : '#15803D') :
      '#6B7280';

    return (
      <View key={scenario.key} style={cardStyle}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: titleColor }]}>
            {scenario.title}
          </Text>
          {isEligible && (
            <View style={[styles.eligibleBadge, {
              backgroundColor: scenario.key === 'normal' ? '#2563EB' : '#22C55E'
            }]}>
              <Text style={styles.eligibleBadgeText}>Eligible</Text>
            </View>
          )}
        </View>

        {scenario.description.map((desc: string, i: number) => (
          <Text key={i} style={[styles.cardDescription, {
            color: isEligible ? '#374151' : '#9CA3AF'
          }]}>
            {desc}
          </Text>
        ))}

        {/* Receive Section */}
        {scenario.availableOptions && isEligible && (
          <View style={styles.receiveContainer}>
            <Text style={styles.receiveTitle}>Receive:</Text>
            <View style={styles.receiveBox}>
              {scenario.availableOptions.map((option: string, i: number) => (
                <Text key={i} style={styles.receiveOptionText}>
                  {option}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Required Next Steps Section - Show for all eligible scenarios */}
        {isEligible && (
          <View style={styles.requiredStepsContainer}>
            <Text style={styles.requiredStepsTitle}>Required Next Steps:</Text>
            <Text style={styles.youMustTitle}>YOU MUST:</Text>
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>Register for The Fund's MSS Portal</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>Check your most recent Annual Pension Statement inside your MSS portal for exact amount</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  Check all your personal information (your name, date of birth, marital status, email, etc.) is correctly reported to the Fund by your employing organization. {"\n"}
                  For help, contact: {' '}
                  {orgContact === 'Contact Us' ? (
                    <Text
                      style={{ color: '#2563EB', textDecorationLine: 'underline' }}
                      onPress={() => Linking.openURL('https://www.unjspf.org/contact-us/')}
                    >
                      Contact Us
                    </Text>
                  ) : orgContact.includes('@') ? (
                    <Text
                      style={{ color: '#2563EB', textDecorationLine: 'underline' }}
                      onPress={() => Linking.openURL(`mailto:${orgContact}`)}
                    >
                      {orgContact}
                    </Text>
                  ) : (
                    <Text style={{ color: '#2563EB' }}>{orgContact}</Text>
                  )}
                </Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <Text style={styles.stepText}>Upload Payment Instructions on PENS.E/6 Form (find this under E-Forms section of your MSS)- page 2 for immediate disbursement or page 1 if you opt to defer for up to 36 months</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>5</Text>
                </View>
                <Text style={styles.stepText}>Upload copy of your recent bank document that shows your name and account number</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>6</Text>
                </View>
                <Text style={styles.stepText}>Upload copy of your valid passport or other government issued photo ID with your signature (UNLP is NOT accepted)</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>7</Text>
                </View>
                <Text style={styles.stepText}>Processing takes ~15 business days after complete documentation</Text>
              </View>
            </View>

            <Text style={styles.employingOrgTitle}>YOUR EMPLOYING ORGANIZATION MUST:</Text>
            <View style={styles.orgStepsList}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>Submit Separation notification (PF4/SEP)</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>Submit Separation Personnel Action Form (SEPPA)</Text>
              </View>
            </View>
          </View>
        )}

        {/* Show relevant estimates */}
        {/* {isEligible && (
          <View style={styles.estimateContainer}>
            {scenario.key === 'withdrawal' && (
              <Text style={styles.estimateText}>
                Withdrawal Amount: {withdrawalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
              </Text>
            )}
            {scenario.key === 'deferred' && (
              <Text style={styles.estimateText}>
                Deferred Monthly Pension: {deferredPension.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
              </Text>
            )}
            {scenario.key === 'early' && (
              <>
                <Text style={styles.estimateText}>
                  Early Retirement Monthly Pension: {earlyPension.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                </Text>
                <Text style={styles.reductionText}>
                  Early Retirement Reduction: {(earlyReduction * 100).toFixed(1)}%
                </Text>
              </>
            )}
            {scenario.key === 'normal' && (
              <Text style={styles.estimateText}>
                Normal Retirement Monthly Pension: {deferredPension.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
              </Text>
            )}
          </View>
        )} */}

        {!isEligible && (
          <View style={styles.notEligibleContainer}>
            <Text style={styles.notEligibleText}>
              Not currently eligible based on your service and age
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/(tabs)')}
          >
            <View style={{ transform: [{ scaleX: -1 }] }}>
              <LogOut size={24} color="#2563EB" strokeWidth={2} />
            </View></TouchableOpacity>
          <View style={styles.headerIconContainer}>
            <TrendingUp size={32} color="#2563EB" strokeWidth={2} />
          </View>
          <Text style={styles.title}>Pension Snapshot</Text>
          <Text style={styles.subtitle}>
            Your best available options and scenarios.
          </Text>
        </View>

        {/* --- TEMPORARY DEBUG VIEW --- */}
        {/* <View style={{ padding: 10, backgroundColor: '#ffc', margin: 10, borderColor: '#f00', borderWidth: 1 }}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>DEBUG INFO:</Text>
          <Text style={{ color: '#000' }}>Stored Org Name: '{debugOrg}'</Text>
          <Text style={{ color: '#000' }}>Resulting Contact: '{orgContact}'</Text>
        </View> */}
        {/* --- END TEMPORARY DEBUG VIEW --- */}

        {/* Input Mode Toggle */}
        <View style={styles.inputModeContainer}>
          <TouchableOpacity
            style={[styles.modeButton, inputMode === 'slider' && styles.activeModeButton]}
            onPress={() => setInputMode('slider')}
          >
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

        {/* Input Controls */}
        <View style={styles.inputContainer}>
          {inputMode === 'slider' ? (
            <>
              {/* Years of Service Slider */}
              <View style={styles.sliderContainer}>
                <CustomSlider
                  value={Math.min(yearsOfService, 38.75)}
                  onValueChange={val => {
                    const maxService = Math.max(0, currentAge - 18);
                    setYearsOfService(Math.min(val, 38.75, maxService));
                  }}
                  min={0}
                  max={38.75}
                  step={0.1}
                  color="#2563EB"
                  label="Length of Your Contributory Service"
                  unit=" years"
                // hideRange={true}
                // hideMax={true}
                // hideMin={true}
                />


                <View style={{ position: 'relative', height: 20, width: '100%', marginTop: -60 }}>
                  {[1, 5, 10, 15, 20, 25, 30, 38.75].map((mark) => (
                    <View
                      key={mark}
                      style={{
                        position: 'absolute',
                        left: `${((mark - 0) / (38.75 - 0)) * 100}%`,
                        transform: [{ translateX: -12 }],
                        alignItems: 'center',
                        width: 24,
                      }}
                    >
                      <View style={styles.tickLine} />
                      <Text style={styles.tickLabel}>{mark}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.sliderValue, { marginTop: 30, marginBottom: 10 }]}>
                  {formatYearsMonthsDaysObj(convertDecimalYearsToYMD(yearsOfService))}
                </Text>
                <Text style={styles.sliderNote}>Maximum accrual: 70% of FAR (after 38.75 years of service)</Text>
              </View>

              {/* Current Age Slider */}
              <View style={styles.sliderContainer}>
                <CustomSlider
                  value={currentAge}
                  onValueChange={val => {
                    setCurrentAge(val);
                    // Adjust service years if age decreases such that service > age - 18
                    if (yearsOfService > val - 18) {
                      setYearsOfService(Math.max(0, val - 18));
                    }
                  }}
                  min={18}
                  max={65}
                  step={1}
                  color="#059669"
                  label="Your Current Age"
                  unit=" years"
                // hideRange={true}
                // hideMax={true}
                // hideMin={true}
                />


                <View style={{ position: 'relative', height: 28, width: '100%', marginTop: -60 }}>
                  {[18, 25, 35, 45, 55, 60, 65].map((mark) => (
                    <View
                      key={mark}
                      style={{
                        position: 'absolute',
                        left: `${((mark - 18) / (65 - 18)) * 100}%`,
                        transform: [{ translateX: -12 }],
                        alignItems: 'center',
                        width: 24,
                      }}
                    >
                      <View style={styles.tickLine} />
                      <Text style={styles.tickLabel}>{mark}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.sliderValue, { marginTop: 30, marginBottom: 10 }]}>
                  {currentAge === ERA ? `${currentAge} years (ERA)` :
                    currentAge === NRA ? `${currentAge} years (NRA)` :
                      `${currentAge} years`}
                </Text>
                {/* ERA/NRA Info */}
                <View style={styles.eraNraInfo}>
                  <Text style={styles.eraNraInfoText}>
                    ERA: {ERA} years  • NRA: {NRA} years
                  </Text>
                </View>
              </View>

              {/* FAR Input - Sync from profile if available */}
              {/* <View style={styles.inputGroup}>
                <Text style={styles.label}>Final Average Remuneration (FAR)</Text>
                <Text style={styles.inputSubtitle}>Your average salary for pension calculation</Text>
                <TextInput
                  style={styles.input}
                  value={far.toString()}
                  onChangeText={text => {
                    const num = parseFloat(text);
                    if (!isNaN(num) && num >= 0) setFar(num);
                    else if (text === '' || text === '.') setFar(0);
                  }}
                  placeholder="Enter your FAR amount"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                />
              </View> */}
            </>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Length of Contributory Service</Text>
                <Text style={styles.inputSubtitle}>From Date of Entry to Date of Separation</Text>
                <TextInput
                  style={styles.input}
                  value={formatYearsMonthsDaysObj(convertDecimalYearsToYMD(yearsOfService))}
                  onChangeText={text => {
                    const num = parseFloat(text);
                    if (!isNaN(num) && num >= 0) setYearsOfService(num);
                    else if (text === '' || text === '.') setYearsOfService(0);
                  }}
                  placeholder=""
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                />
                {/* <Text style={[styles.sliderValue, { marginTop: 8, fontSize: 14, color: '#6B7280' }]}>
                  {formatYearsMonthsDaysObj(convertDecimalYearsToYMD(yearsOfService))}
                </Text> */}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Current Age</Text>
                <TextInput
                  style={styles.input}
                  value={currentAge.toString() + ' years'}
                  onChangeText={text => {
                    const num = parseFloat(text);
                    if (!isNaN(num) && num >= 0) setCurrentAge(num);
                    else if (text === '' || text === '.') setCurrentAge(0);
                  }}
                  placeholder="Enter your current age"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                />
              </View>
              {/* <View style={styles.inputGroup}>
                <Text style={styles.label}>Final Average Remuneration (FAR)</Text>
                <Text style={styles.inputSubtitle}>Your average salary for pension calculation</Text>
                <TextInput
                  style={styles.input}
                  value={far.toString()}
                  onChangeText={text => {
                    const num = parseFloat(text);
                    if (!isNaN(num) && num >= 0) setFar(num);
                    else if (text === '' || text === '.') setFar(0);
                  }}
                  placeholder="Enter your FAR amount"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                />
              </View> */}
            </>
          )}
        </View>

        {/* Filter Controls */}
        <View style={styles.filterContainer}>
          <View style={styles.eligibilityStatus}>
            <Text style={styles.eligibilityStatusText}>
              {eligibleCount} of {scenarios.length} benefits available
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.filterButton, showEligibleOnly && styles.activeFilterButton]}
            onPress={() => setShowEligibleOnly(!showEligibleOnly)}
          >
            <Text style={[styles.filterButtonText, showEligibleOnly && styles.activeFilterButtonText]}>
              {showEligibleOnly ? 'Show All' : 'Show Eligible Only'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scenario Cards */}
        <View style={styles.scenarioContainer}>
          {filteredScenarios.map((scenario, idx) => renderScenarioCard(scenario, idx))}
        </View>
        <View style={{ margin: 16 }}>
          <LinearGradient
            colors={['#fbbf24', '#f59e0b', '#d97706']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <TouchableOpacity
              style={styles.ctaButtonInner}
              onPress={() => router.push('/(tabs)/calculator')}
            >
              <Text style={styles.ctaButtonText}>Back to Calculator</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const { width } = Dimensions.get('window');
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
  backButton: {
    position: 'absolute',
    left: width < 300 ? 12 : width < 350 ? 16 : 24,
    top: width < 300 ? 20 : width < 350 ? 24 : 28,
    padding: 8,
    zIndex: 1,
  },
  headerIconContainer: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
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
  inputContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    margin: 16,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  inputSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 1,
  },
  eligibilityStatus: {
    flex: 1,
  },
  eligibilityStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  activeFilterButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  scenarioContainer: {
    marginHorizontal: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  eligibleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  eligibleBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 2,
  },
  estimateContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  estimateText: {
    color: '#0C4A6E',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  reductionText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 14,
  },
  notEligibleContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  notEligibleText: {
    color: '#6B7280',
    fontStyle: 'italic',
    fontSize: 14,
  },
  receiveContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  receiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  receiveBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 8,
    padding: 12,
  },
  receiveOptionText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
    lineHeight: 18,
  },
  requiredStepsContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  requiredStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  youMustTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 12,
  },
  stepsList: {
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  employingOrgTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 8,
  },
  orgStepsList: {
    marginBottom: 8,
  },
  sliderContainer: {
    // marginBottom: 24,
    paddingVertical: 6,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  sliderSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sliderWrapper: {
    position: 'relative',
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  sliderTrack: {
    position: 'absolute',
    top: 18,
    left: 8,
    right: 8,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  markerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  sliderNote: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tickMarksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  tickMark: {
    alignItems: 'center',
    flex: 1,
  },
  tickLine: {
    width: 2,
    height: 8,
    backgroundColor: '#D1D5DB',
    marginBottom: 1,
  },
  regularTick: {
    backgroundColor: '#D1D5DB',
  },
  tickLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  eraNraInfo: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  eraNraInfoText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaButton: {
    paddingHorizontal: 75,
    paddingVertical: 18,
    borderRadius: 22,
    alignSelf: 'center',
    minWidth: 220,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 14,
  },
  ctaButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});