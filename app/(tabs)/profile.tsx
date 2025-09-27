import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  Alert,
  Platform,
  ToastAndroid,
  Dimensions,
  Animated,
} from 'react-native';
import { 
  Shield, 
  Building, 
  Calendar,
  ChevronDown,
  X,
  Save,
  Check,
  Info,
  Calculator,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  LogOut
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig';

const { width } = Dimensions.get('window');

const organizations = [
  'United Nations Secretariat including Peacekeeping Missions (UNS)',
  'Preparatory Commission for the Comprehensive Nuclear-Test-Ban Treaty Organization (CTBTO)',
  'European and Mediterranean Plant Protection Organization (EPPO)',
  'Food and Agriculture Organization of the United Nations (FAO)',
  'International Atomic Energy Agency (IAEA)',
  'International Centre for Genetic Engineering and Biotechnology (ICGEB)',
  'International Centre for the Study of the Preservation and Restoration of Cultural Property (ICCROM)',
  'International Civil Aviation Organization (ICAO)',
  'International Criminal Court (ICC)',
  'International Fund for Agricultural Development (IFAD)',
  'International Labour Organization (ILO)',
  'International Maritime Organization (IMO)',
  'International Organization for Migration (IOM)',
  'Inter-Parliamentary Union (IPU)',
  'International Seabed Authority (ISA)',
  'International Telecommunication Union (ITU)',
  'International Tribunal for the Law of the Sea (ITLOS)',
  'Organisation for the Prohibition of Chemical Weapons (OPCW)',
  'United Nations Educational, Scientific and Cultural Organization (UNESCO)',
  'United Nations Industrial Development Organization (UNIDO)',
  'World Tourism Organization (UNWTO)',
  'Wassenaar Arrangement',
  'World Health Organization (WHO)',
  'World Intellectual Property Organization (WIPO)',
  'World Meteorological Organization (WMO)'
];

// Helper for DD-MM-YYYY formatting
function formatDateDMY(dateString: string): string {
  if (!dateString) return '';
  let parts = dateString.split('-');
  if (parts.length !== 3) return '';
  if (parts[0].length === 4) {
    // YYYY-MM-DD
    const [year, month, day] = parts.map(Number);
    if ([year, month, day].some(isNaN)) return '';
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  } else {
    // DD-MM-YYYY
    const [day, month, year] = parts.map(Number);
    if ([day, month, year].some(isNaN)) return '';
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
  }
}

// Helper to parse DD-MM-YYYY to Date
function parseDMY(dateString: string): Date | null {
  if (!dateString) return null;
  let parts = dateString.split('-');
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

// Helper to get last day of month
function getLastDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

// Calculate MAS
function calculateMAS(dob: string): string {
  const dobDate = parseDMY(dob);
  if (!dobDate) return '';
  // Special case: DOB before 1 Jan 1958
  const cutoff = new Date(1958, 0, 1);
  if (dobDate < cutoff) return '31-12-2023';
  // If birthday is 1st of any month, MAS is last day of previous month
  if (dobDate.getDate() === 1) {
    let masYear = dobDate.getFullYear() + 65;
    let masMonth = dobDate.getMonth(); // previous month (0-based)
    if (masMonth === 0) {
      masYear -= 1;
      masMonth = 12;
    }
    // masMonth is now 1-based
    const lastDay = getLastDayOfMonth(masYear, masMonth);
    return formatDateDMY(`${masYear}-${String(masMonth).padStart(2, '0')}-${lastDay}`);
  }
  // Otherwise, MAS is last day of month when user turns 65
  const masYear = dobDate.getFullYear() + 65;
  const masMonth = dobDate.getMonth() + 1;
  const lastDay = getLastDayOfMonth(masYear, masMonth);
  return formatDateDMY(`${masYear}-${String(masMonth).padStart(2, '0')}-${lastDay}`);
}

// Calculate NRA
function calculateNRA(dob: string, entry: string): string {
  const dobDate = parseDMY(dob);
  const entryDate = parseDMY(entry);
  if (!dobDate || !entryDate) return '';
  let nraAge = 65;
  const entry1990 = new Date(1990, 0, 1);
  const entry2014 = new Date(2014, 0, 1);
  if (entryDate < entry1990) nraAge = 60;
  else if (entryDate < entry2014) nraAge = 62;
  // If birthday is 1st of any month, NRA is last day of previous month
  if (dobDate.getDate() === 1) {
    let nraYear = dobDate.getFullYear() + nraAge;
    let nraMonth = dobDate.getMonth(); // previous month (0-based)
    if (nraMonth === 0) {
      nraYear -= 1;
      nraMonth = 12;
    }
    // nraMonth is now 1-based
    const lastDay = getLastDayOfMonth(nraYear, nraMonth);
    return formatDateDMY(`${nraYear}-${String(nraMonth).padStart(2, '0')}-${lastDay}`);
  }
  // Otherwise, NRA is last day of month when user turns NRA age
  let nraYear = dobDate.getFullYear() + nraAge;
  let nraMonth = dobDate.getMonth() + 1;
  const lastDay = getLastDayOfMonth(nraYear, nraMonth);
  return formatDateDMY(`${nraYear}-${String(nraMonth).padStart(2, '0')}-${lastDay}`);
}

// Calculate ERA
function calculateERA(dob: string, entry: string): string {
  const dobDate = parseDMY(dob);
  const entryDate = parseDMY(entry);
  if (!dobDate || !entryDate) return '';
  let eraAge = 58;
  const entry2014 = new Date(2014, 0, 1);
  if (entryDate < entry2014) eraAge = 55;
  // If birthday is 1st of any month, ERA is last day of previous month
  if (dobDate.getDate() === 1) {
    let eraYear = dobDate.getFullYear() + eraAge;
    let eraMonth = dobDate.getMonth(); // previous month (0-based)
    if (eraMonth === 0) {
      eraYear -= 1;
      eraMonth = 12;
    }
    // eraMonth is now 1-based
    const lastDay = getLastDayOfMonth(eraYear, eraMonth);
    return formatDateDMY(`${eraYear}-${String(eraMonth).padStart(2, '0')}-${lastDay}`);
  }
  // Otherwise, ERA is last day of month when user turns ERA age
  let eraYear = dobDate.getFullYear() + eraAge;
  let eraMonth = dobDate.getMonth() + 1;
  const lastDay = getLastDayOfMonth(eraYear, eraMonth);
  return formatDateDMY(`${eraYear}-${String(eraMonth).padStart(2, '0')}-${lastDay}`);
}

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

// Helper to calculate years of service as float
function getYearsOfServiceFloat(entry: string, separation: string): number {
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
  return +(years + months / 12 + days / 365.25).toFixed(6);
}

// Helper to format years as years, months, days
function formatYearsMonthsDays(yearsFloat: number): string {
  const years = Math.floor(yearsFloat);
  const monthsFloat = (yearsFloat - years) * 12;
  const months = Math.floor(monthsFloat);
  const days = Math.round((monthsFloat - months) * 30); // average days in a month
  return `${years} years, ${months} months, ${days} days`;
}

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    dateOfBirth: '',
    dateOfEntry: '',
    dateOfSeparation: '',
    salary: '',
    yearsOfService: '',
  });

  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showRetirementInfo, setShowRetirementInfo] = useState(false);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    // Create pulsating animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulseAnimation.start();
    
    return () => pulseAnimation.stop();
  }, []);
  // When dateOfBirth changes, always set dateOfSeparation to MAS
  useEffect(() => {
    if (formData.dateOfBirth) {
      setFormData(prev => ({
        ...prev,
        dateOfSeparation: calculateMAS(formData.dateOfBirth)
      }));
    }
  }, [formData.dateOfBirth]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    // Calculate length of contributory service
    const serviceLength = formatYearsMonthsDays(getYearsOfServiceFloat(formattedEntry, formattedSeparation));

    // Get effective values (including fallbacks from auth)
    const effectiveFirstName = formData.firstName || auth.currentUser?.displayName?.split(' ')[0] || '';
    const effectiveLastName = formData.lastName || auth.currentUser?.displayName?.split(' ')[1] || '';

    // Validate required fields with effective values
    const missingFields = [];
    if (!effectiveFirstName) missingFields.push('First Name');
    if (!effectiveLastName) missingFields.push('Last Name');
    if (!formData.organization) missingFields.push('Organization');
    if (!formData.dateOfBirth) missingFields.push('Date of Birth');
    if (!formData.dateOfEntry) missingFields.push('Date of Entry');
    if (!formData.dateOfSeparation) missingFields.push('Date of Separation');
    if (!serviceLength) missingFields.push('Length of Contributory Service');

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Information',
        'Please fill in all required fields: ' + missingFields.join(', '),
        [{ text: 'OK' }]
      );
      return;
    }

    // Save profile data to AsyncStorage (all dates in DD-MM-YYYY)
    const profileToSave = {
      ...formData,
      firstName: effectiveFirstName,
      lastName: effectiveLastName,
      dateOfBirth: formatDateDMY(formData.dateOfBirth),
      dateOfEntry: formatDateDMY(formData.dateOfEntry),
      dateOfSeparation: formatDateDMY(formData.dateOfSeparation),
      serviceLength,
    };
    
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(profileToSave));
    } catch (e) {
      // Optionally show an error toast or alert
    }

    // Show toast message
    if (Platform.OS === 'android') {
      ToastAndroid.show('Profile saved successfully!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', 'Profile saved successfully!');
    }

    // Navigate to eligibility tab and pass profile data as params (all dates in DD-MM-YYYY)
    router.push({
      pathname: '/(tabs)/calculator',
      params: {
        firstName: effectiveFirstName,
        lastName: effectiveLastName,
        organization: formData.organization,
        dateOfBirth: formatDateDMY(formData.dateOfBirth),
        dateOfEntry: formatDateDMY(formData.dateOfEntry),
        dateOfSeparation: formatDateDMY(formData.dateOfSeparation),
        serviceLength,
      }
    });
  };

  // Use formattedEntry and formattedSeparation for calculation
  const formattedEntry = formatDateDMY(formData.dateOfEntry);
  const formattedSeparation = formatDateDMY(formData.dateOfSeparation);

  const isFormValid = 
    (formData.firstName || auth.currentUser?.displayName) &&
    (formData.lastName || auth.currentUser?.displayName) &&
    formData.organization &&
    formData.dateOfBirth &&
    formData.dateOfEntry &&
    formData.dateOfSeparation;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
              <View style={{ padding: 16, gap: 16 }}>
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/(tabs)')}
          >
 <View style={{ transform: [{ scaleX: -1 }] }}>
          <LogOut size={24} color="#2563EB" strokeWidth={2} />
        </View>          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.headerIconContainer}>
              <Shield size={32} color="#2563EB" strokeWidth={2} />
            </View>
            <Text style={styles.headerTitle}>Pension Calculator</Text>
            <Text style={styles.headerSubtitle}>
            Retirement eligibility dates      </Text>
          </View>
        </View>
</View>
        {/* Form */}
        <View style={styles.form}>
          {/* Personal Information */}
          <View style={styles.section}>
            {/* <View style={styles.sectionHeader}>
              <User size={20} color="#2563EB" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Your Information</Text>
            </View> */}
            
            <View style={styles.inlineInputGroup}>
              <Text style={[styles.inlineLabel, styles.shortLabel]}>First Name:</Text>  
              <TextInput
                style={[styles.inlineInput, styles.shortLabelInput]}
                value={formData.firstName||auth.currentUser?.displayName?.split(' ')[0]}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inlineInputGroup}>
              <Text style={[styles.inlineLabel, styles.shortLabel]}>Last Name:</Text>
              <TextInput
                style={[styles.inlineInput, styles.shortLabelInput]}
                value={formData.lastName||auth.currentUser?.displayName?.split(' ')[1]}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inlineInputGroup}>
              <Text style={[styles.inlineLabel, styles.mediumLabel]}>Date of Birth:</Text>
              <View style={{ position: 'relative', flex: 1 }}>
                <TextInput
                  style={[styles.inlineInput, styles.mediumLabelInput]}
                  value={formData.dateOfBirth}
                  onChangeText={(value) => handleInputChange('dateOfBirth', formatDateInput(value))}
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numbers-and-punctuation"
                  maxLength={10}
                />
                {formData.dateOfBirth ? (
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 12, top: 16, zIndex: 2 }}
                    onPress={() => handleInputChange('dateOfBirth', '')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={{ fontSize: 18, color: '#9CA3AF' }}>×</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          

          {/* Employment Information */}
          <View >
            {/* <View style={styles.sectionHeader}>
              <Building size={20} color="#2563EB" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Your Employment History</Text>
            </View> */}
            
            {/* Participating Organization Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label1}>Employing Organization (select from the list of 25)</Text>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowOrgModal(true)}
              >
                <Text style={[styles.dropdownText, !formData.organization && styles.placeholderText]}>
                  {formData.organization || 'Select your Organization'}
                </Text>
                <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {/* Date of Entry into Pension Fund Participation */}
            <View style={styles.inlineInputGroup}>
              <Text style={[styles.inlineLabel, styles.longLabel]}>Date of Entry into Fund:</Text>
              <View style={{ position: 'relative', flex: 1 }}>
                <TextInput
                  style={[styles.inlineInput, styles.longLabelInput]}
                  value={formData.dateOfEntry}
                  onChangeText={(value) => handleInputChange('dateOfEntry', formatDateInput(value))}
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numbers-and-punctuation"
                  maxLength={10}
                />
                {formData.dateOfEntry ? (
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 12, top: 16, zIndex: 2 }}
                    onPress={() => handleInputChange('dateOfEntry', '')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={{ fontSize: 18, color: '#9CA3AF' }}>×</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={styles.helpTextContainer}>
              <Text style={styles.helpText}>This is the date you began your UN service</Text>
            </View>

            {/* Date of Separation */}
            <View style={styles.inlineInputGroup}>
              <Text style={[styles.inlineLabel, styles.veryLongLabel]}>Preferred Separation date:</Text>
              <View style={{ position: 'relative', flex: 1 }}>
                <TextInput
                  style={[styles.inlineInput, styles.veryLongLabelInput]}
                  value={formData.dateOfSeparation}
                  onChangeText={(value) => handleInputChange('dateOfSeparation', formatDateInput(value))}
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numbers-and-punctuation"
                  maxLength={10}
                />
                {formData.dateOfSeparation ? (
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 12, top: 16, zIndex: 2 }}
                    onPress={() => handleInputChange('dateOfSeparation', '')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={{ fontSize: 18, color: '#9CA3AF' }}>×</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={styles.helpTextContainer}>
              <Text style={styles.helpText}>This is your mandatory separation date. You may still choose when to separate—enter your preferred date if different.</Text>
            </View>

            {/* Length of Contributory Service (auto-calc) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length of Your Contributory Service (Calculated)</Text>
              <TextInput
                style={[styles.input, styles.readOnlyInput]}
                value={formatYearsMonthsDays(getYearsOfServiceFloat(formattedEntry, formattedSeparation))}
                editable={false}
                placeholder="Years, months, days will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.helpText}>From Date of Entry to Date of Separation</Text>
            </View>
          </View>
          </View>
          {/* Retirement Information */}
          <View style={styles.retirementSection}>
                         <View style={styles.retirementHeader}>
               <Text style={styles.retirementSectionTitle}>Retirement eligibility dates summary {'\n'} (Calculated)</Text>
             </View>

            
              <View style={styles.retirementInfoCard}>
                <View style={styles.retirementInfoItem}>
                  <Text style={styles.retirementInfoLabel}>Mandatory Age of Separation (MAS): </Text>
                  <Text style={styles.retirementInfoValue}>
                    {(() => {
                      const dob = formData.dateOfBirth;
                      const entry = formData.dateOfEntry;
                      const masDate = calculateMAS(dob);
                      let masAge = 65;
                      const entryDate = parseDMY(entry);
                      if (entryDate) {
                        const entry1990 = new Date(1990, 0, 1);
                        const entry2014 = new Date(2014, 0, 1);
                        if (entryDate < entry1990) masAge = 60;
                        else if (entryDate < entry2014) masAge = 65;
                      }
                      return masDate ? `${masAge} years on ${masDate}` : '—';
                    })()}
                  </Text>
                </View>
                <View style={styles.retirementInfoItem}>
                  <Text style={styles.retirementInfoLabel}>Normal Retirement Age (NRA): </Text>
                  <Text style={styles.retirementInfoValue}>
                    {(() => {
                      const dob = formData.dateOfBirth;
                      const entry = formData.dateOfEntry;
                      const nraDate = calculateNRA(dob, entry);
                      let nraAge = 65;
                      const entryDate = parseDMY(entry);
                      if (entryDate) {
                        const entry1990 = new Date(1990, 0, 1);
                        const entry2014 = new Date(2014, 0, 1);
                        if (entryDate < entry1990) nraAge = 60;
                        else if (entryDate < entry2014) nraAge = 62;
                      }
                      return nraDate ? `${nraAge} years on ${nraDate}` : '—';
                    })()}
                  </Text>
                </View>
                <View style={styles.retirementInfoItem}>
                  <Text style={styles.retirementInfoLabel}>Early Retirement Age (ERA): </Text>
                  <Text style={styles.retirementInfoValue}>
                    {(() => {
                      const dob = formData.dateOfBirth;
                      const entry = formData.dateOfEntry;
                      const eraDate = calculateERA(dob, entry);
                      let eraAge = 58;
                      const entryDate = parseDMY(entry);
                      if (entryDate) {
                        const entry2014 = new Date(2014, 0, 1);
                        if (entryDate < entry2014) eraAge = 55;
                      }
                      return eraDate ? `${eraAge} years on ${eraDate}` : '—';
                    })()}
                  </Text>
                </View>
                <View style={styles.retirementInfoItem}>
                  <Text style={styles.retirementInfoLabel}>Deferred Retirement Age (DRA): </Text>
                  <Text style={styles.retirementInfoValue}>
                    {(() => {
                      const dob = formData.dateOfBirth;
                      const entry = formData.dateOfEntry;
                      const entryDate = parseDMY(entry);
                      if (!dob || !entryDate) return '—';
                      let eraAge = 58;
                      const entry2014 = new Date(2014, 0, 1);
                      if (entryDate < entry2014) eraAge = 55;
                      const eraDate = calculateERA(dob, entry);
                      return eraDate ? `Any age younger than ${eraAge}. Before ${eraDate}` : '—';
                    })()}
                  </Text>
                </View>
                <Text style={styles.retirementHelpText}>
                Tip: Your retirement eligibility (Normal, Early, or Deferred) depends on when you joined the UNJSPF; Unless stated otherwise, your retirement date is your last contract day or the last day of your birth month (the day before if born on the 1st). If unsure, check your pension statement or contact UNJSPF.
                </Text>
              </View>
            
          </View>

          {/* Save Button */}
          {/* <View style={styles.saveSection}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.saveButtonText}>Save and move to benefits calculator</Text>
            </TouchableOpacity>
          </View> */}

          {/* Advanced Calculator Section */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={[styles.calculatorButton, !isFormValid && styles.disabledButton]}
              onPress={handleSave}
              disabled={!isFormValid}
            >
              <View style={styles.calculatorButtonContent}>
                <View style={styles.calculatorButtonTextContainer}>
                  <Text style={styles.calculatorButtonText}>Save and move to Pension Calculator</Text>
                  <Text style={styles.calculatorButtonSubtext}>
                    Get detailed pension calculations.
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Organization Selection Modal */}
      <Modal
        visible={showOrgModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOrgModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Organization</Text>
              <TouchableOpacity
                onPress={() => setShowOrgModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              {organizations.map((org, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.orgOption}
                  onPress={() => {
                    handleInputChange('organization', org);
                    setShowOrgModal(false);
                  }}
                >
                  <Text style={styles.orgOptionText}>{org}</Text>
                  {formData.organization === org && (
                    <Check size={20} color="#2563EB" strokeWidth={2} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
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
  headerTitle: {
    fontSize: width < 300 ? 14 : width < 350 ? 16 : 18,
    fontWeight: '800',
    color: 'rgb(70 106 209)',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: width < 300 ? 11 : width < 350 ? 12 : 13,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: 17
  },
  form: {
    padding: width < 300 ? 12 : width < 350 ? 16 : 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: width < 300 ? 12 : width < 350 ? 16 : 20,
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: width < 300 ? 14 : width < 350 ? 16 : 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  retirementSection: {
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    padding: width < 300 ? 12 : width < 350 ? 16 : 20,
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
 
  retirementHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  retirementSectionTitle: {
    fontSize: width < 300 ? 12 : 14,
    fontWeight: '700',
    color: '#1E40AF',
    // marginBottom: 2,
    textAlign: 'center',
    lineHeight: 22,
  },
  retirementInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    // marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  retirementInfoItem: {
    marginBottom: 8,
  },
  retirementInfoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  retirementInfoValue: {
    fontSize: 12,
    color: '#374151',
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 6,
  },
  label1: {
    marginTop: 12,
    fontSize: width < 300 ? 12 : 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inlineInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: width < 300 ? 6 : width < 350 ? 8 : 12,
    flexWrap: 'nowrap',
  },
  label: {
    fontSize: width < 300 ? 14 : 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inlineLabel: {
    fontSize: width < 300 ? 12 : width < 350 ? 14 : 14,
    fontWeight: '600',
    color: '#374151',
    flexShrink: 0,
    textAlign: 'left',
  },
  // Label width classes for different label lengths
  shortLabel: {
    width: width < 300 ? 60 : 105, // First Name, Last Name
  },
  mediumLabel: {
    width: width < 300 ? 56 : 105, // Date of Birth
  },
  longLabel: {
    width: width < 300 ? 90 : 180, // Date of Entry into Fund
  },
  veryLongLabel: {
    width: width < 300 ? 100 : 190, // Preferred Separation date
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: width < 300 ? 12 : 12,
    fontSize: width < 300 ? 12 : 12,
    color: '#111827',
  },
  inlineInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: width < 300 ? 10 : width < 350 ? 12 : 16,
    fontSize: width < 300 ? 12 : width < 350 ? 12 : 11,
    color: '#111827',
    flex: 1,
    minWidth: 0,
  },
  readOnlyInput: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
    minWidth: 240,
    width: 240,
  },
  // Input flex values to match label sizes
  shortLabelInput: {
    flex: 1,
  },
  mediumLabelInput: {
    flex: 1,
  },
  longLabelInput: {
    flex: 1,
  },
  veryLongLabelInput: {
    flex: 1,
  },
  dropdownInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: width < 300 ? 12 : 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: width < 300 ? 12 : 12,
    color: '#111827',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  helpText: {
    fontSize: width < 300 ? 10 : width < 350 ? 11 : 11,
    color: '#6B7280',
    marginTop: 2,
    // marginLeft: 4,
    marginBottom: 12,
    fontStyle:'italic'
  },
  helpTextContainer: {
    marginBottom: 16,
    marginLeft: 4,
  },
  retirementHelpText: {
    fontSize: width < 300 ? 11 : 11,
    color: '#1E40AF',
    marginTop: 4,
    marginLeft: 4,
    fontStyle: 'italic',
    textAlign:'justify'
  },
  saveSection: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2563EB',
    width: '50%',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  orgOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  orgOptionText: {
    fontSize: 12,
    color: '#111827',
    flex: 1,
    paddingRight: 12,
  },
  calculatorButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
    elevation: 0,
    shadowOpacity: 0,
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
});