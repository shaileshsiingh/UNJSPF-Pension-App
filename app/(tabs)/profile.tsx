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
} from 'react-native';
import { 
  User, 
  Building, 
  Calendar,
  ChevronDown,
  X,
  Save,
  Check,
  Info,
  Calculator,
  DollarSign,
  ArrowRight
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig';

const { width } = Dimensions.get('window');

const organizations = [
  'United Nations Secretariat including Peacekeeping Missions',
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

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'organization',
      'dateOfBirth',
      'dateOfEntry',
      'dateOfSeparation',
    ];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
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
      pathname: '/(tabs)/eligibility',
      params: {
        firstName: formData.firstName,
        lastName: formData.lastName,
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <User size={32} color="#2563EB" strokeWidth={2} />
          </View>
          <Text style={styles.headerTitle}>Your Retirement Age Calculator</Text>
          <Text style={styles.headerSubtitle}>
            Enter your employment history for accurate benefit calculations
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Personal Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <User size={20} color="#2563EB" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Your Information</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>  
              <TextInput
                style={styles.input}
                value={formData.firstName||auth.currentUser?.displayName?.split(' ')[0]}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName||auth.currentUser?.displayName?.split(' ')[1]}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Date of Birth</Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={styles.input}
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
              {/* <Text style={styles.helpText}>Enter your date of birth in DD-MM-YYYY format</Text> */}
            </View>
          </View>

          {/* Employment Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Building size={20} color="#2563EB" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Your Employment History</Text>
            </View>
            
            {/* Participating Organization Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Employing Organization(Participating in Pension Fund)</Text>
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
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Date of Entry into Fund</Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={styles.input}
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
              {/* <Text style={styles.helpText}>Enter your date of entry in DD-MM-YYYY format</Text> */}
            </View>

            {/* Date of Separation */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Preferred Date of Separation</Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={styles.input}
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
              <Text style={styles.helpText}>Enter your preferred date of separation, if other than early, normal, or mandatory age of separation</Text>
            </View>

            {/* Length of Contributory Service (auto-calc) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length of Your Contributory Service(Calculated)</Text>
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

          {/* Retirement Information */}
          <View style={styles.retirementSection}>
            <View style={styles.retirementHeader}>
              <View style={styles.sectionHeader}>
                <Calendar size={20} color="#1E40AF" strokeWidth={2} />
                <Text style={styles.retirementSectionTitle}>Retirement Information (Calculated)</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowRetirementInfo(!showRetirementInfo)}
                style={styles.infoButton}
              >
                <Info size={16} color="#1E40AF" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {showRetirementInfo && (
              <View style={styles.retirementInfoCard}>
                <Text style={styles.retirementInfoTitle}>Retirement Categories (Based on Entry Date):</Text>
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
                Tip: Your retirement eligibility (Normal, Early, or Deferred) depends on your entry date into the UN Pension Fund. If unsure, refer to your official pension statement or contact UNJSPF.
                </Text>
              </View>
            )}

            {/* MAS */}
            <View style={styles.inputGroup}>
              <Text style={styles.retirementLabel}>Your Date of Mandatory Age of Separation</Text>
              <TextInput
                style={[styles.input, styles.retirementInput]}
                value={calculateMAS(formData.dateOfBirth)}
                editable={false}
                placeholder="Will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.retirementHelpText}>
                In most Member Organisations, MAS is 65 years. If different, contact your UNJSPF for advice.
              </Text>
            </View>

            {/* NRA */}
            <View style={styles.inputGroup}>
              <Text style={styles.retirementLabel}>Your Date of Normal Retirement Age</Text>
              <TextInput
                style={[styles.input, styles.retirementInput]}
                value={calculateNRA(formData.dateOfBirth, formData.dateOfEntry)}
                editable={false}
                placeholder="Will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.retirementHelpText}>
                {/* Based on your Date of Birth and Entry into Pension Fund. */}
              </Text>
            </View>

            {/* ERA */}
            <View style={styles.inputGroup}>
              <Text style={styles.retirementLabel}>Your Date of Early Retirement Age</Text>
              <TextInput
                style={[styles.input, styles.retirementInput]}
                value={calculateERA(formData.dateOfBirth, formData.dateOfEntry)}
                editable={false}
                placeholder="Will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.retirementHelpText}>
                {/* Based on your Date of Birth and Entry into Pension Fund. */}
              </Text>
            </View>
          </View>

          {/* Advanced Calculator Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Calculator size={20} color="#2563EB" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Advanced Pension Calculator</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.calculatorButton}
              onPress={() => router.push('/(tabs)/calculator')}
            >
              <View style={styles.calculatorButtonContent}>
                {/* <DollarSign size={24} color="#FFFFFF" strokeWidth={2} /> */}
                <View style={styles.calculatorButtonTextContainer}>
                  <Text style={styles.calculatorButtonText}>Calculate Pension Benefits</Text>
                  <Text style={styles.calculatorButtonSubtext}>
                    Get detailed pension calculations.
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <View style={styles.saveSection}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.saveButtonText}>Save Profile</Text>
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
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  headerIconContainer: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  retirementSection: {
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  retirementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  retirementSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
    marginLeft: 2,
  },
  infoButton: {
    padding: 8,
    backgroundColor: '#DBEAFE',
    borderRadius: 20,
  },
  retirementInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  retirementInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  retirementInfoItem: {
    marginBottom: 8,
  },
  retirementInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  retirementInfoValue: {
    fontSize: 14,
    color: '#374151',
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  retirementLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
  },
  readOnlyInput: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  retirementInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#BFDBFE',
    color: '#374151',
  },
  dropdownInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  helpText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    marginLeft: 4,
  },
  retirementHelpText: {
    fontSize: 13,
    color: '#1E40AF',
    marginTop: 4,
    marginLeft: 4,
  },
  saveSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 18,
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
    fontSize: 18,
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
    fontSize: 20,
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
    fontSize: 15,
    color: '#111827',
    flex: 1,
    paddingRight: 12,
  },
  calculatorButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  calculatorButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calculatorButtonTextContainer: {
    marginLeft: 12,
  },
  calculatorButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  calculatorButtonSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});