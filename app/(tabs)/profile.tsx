import React, { useState } from 'react';
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
} from 'react-native';
import { 
  User, 
  Building, 
  Calendar,
  ChevronDown,
  X,
  Save,
  Check
} from 'lucide-react-native';
import DatePicker from '../../components/DatePicker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
function formatDateDMY(dateString: string) {
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
function parseDMY(dateString: string) {
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
function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

// Calculate MAS
function calculateMAS(dob: string) {
  const dobDate = parseDMY(dob);
  if (!dobDate) return '';
  // Special case: DOB before 1 Jan 1958
  const cutoff = new Date(1958, 0, 1);
  if (dobDate < cutoff) return '31-12-2023';
  // Otherwise, MAS is last day of month when user turns 65
  const masYear = dobDate.getFullYear() + 65;
  const masMonth = dobDate.getMonth() + 1;
  const lastDay = getLastDayOfMonth(masYear, masMonth);
  return formatDateDMY(`${masYear}-${String(masMonth).padStart(2, '0')}-${lastDay}`);
}

// Calculate NRA
function calculateNRA(dob: string, entry: string) {
  const dobDate = parseDMY(dob);
  const entryDate = parseDMY(entry);
  if (!dobDate || !entryDate) return '';
  let nraAge = 65;
  const entry1990 = new Date(1990, 0, 1);
  const entry2014 = new Date(2014, 0, 1);
  if (entryDate < entry1990) nraAge = 60;
  else if (entryDate < entry2014) nraAge = 62;
  // Calculate NRA date
  let nraYear = dobDate.getFullYear() + nraAge;
  let nraMonth = dobDate.getMonth() + 1;
  let nraDay = dobDate.getDate();
  // If birthday is last day of month, NRA is last day of month
  const dobLastDay = getLastDayOfMonth(dobDate.getFullYear(), dobDate.getMonth() + 1);
  if (nraDay === dobLastDay) {
    nraDay = getLastDayOfMonth(nraYear, nraMonth);
  } else if (nraDay === 1) {
    // If birthday is 1st, NRA is day before
    if (nraMonth === 1) {
      nraYear -= 1;
      nraMonth = 12;
    } else {
      nraMonth -= 1;
    }
    nraDay = getLastDayOfMonth(nraYear, nraMonth);
  }
  return formatDateDMY(`${nraYear}-${String(nraMonth).padStart(2, '0')}-${nraDay}`);
}

// Calculate ERA
function calculateERA(dob: string, entry: string) {
  const dobDate = parseDMY(dob);
  const entryDate = parseDMY(entry);
  if (!dobDate || !entryDate) return '';
  let eraAge = 58;
  const entry2014 = new Date(2014, 0, 1);
  if (entryDate < entry2014) eraAge = 55;
  // Calculate ERA date
  let eraYear = dobDate.getFullYear() + eraAge;
  let eraMonth = dobDate.getMonth() + 1;
  let eraDay = dobDate.getDate();
  // If birthday is last day of month, ERA is last day of month
  const dobLastDay = getLastDayOfMonth(dobDate.getFullYear(), dobDate.getMonth() + 1);
  if (eraDay === dobLastDay) {
    eraDay = getLastDayOfMonth(eraYear, eraMonth);
  } else if (eraDay === 1) {
    // If birthday is 1st, ERA is day before
    if (eraMonth === 1) {
      eraYear -= 1;
      eraMonth = 12;
    } else {
      eraMonth -= 1;
    }
    eraDay = getLastDayOfMonth(eraYear, eraMonth);
  }
  return formatDateDMY(`${eraYear}-${String(eraMonth).padStart(2, '0')}-${eraDay}`);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    // Calculate length of contributory service
    const serviceLength = calculateServiceLength(formattedEntry, formattedSeparation);

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
      Alert.alert('Profile saved successfully!');
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

  function calculateServiceLength(entry: string, separation: string) {
    if (!entry || !separation) return '';
    const [entryDay, entryMonth, entryYear] = entry.split('-').map(Number);
    const [sepDay, sepMonth, sepYear] = separation.split('-').map(Number);
    if ([entryDay, entryMonth, entryYear, sepDay, sepMonth, sepYear].some(isNaN)) return '';
    let years = sepYear - entryYear;
    let months = sepMonth - entryMonth;
    if (months < 0) {
      years--;
      months += 12;
    }
    return `${years} years, ${months} months`;
  }

  // Use formattedEntry and formattedSeparation for calculation
  const formattedEntry = formatDateDMY(formData.dateOfEntry);
  const formattedSeparation = formatDateDMY(formData.dateOfSeparation);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <User size={48} color="#2563EB" strokeWidth={2} />
            <Text style={styles.headerTitle}>Profile Setup</Text>
            <Text style={styles.headerSubtitle}>
              Enter your employment history for accurate benefit calculations
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={formData.dateOfBirth}
                onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#9CA3AF"
                keyboardType="numbers-and-punctuation"
                maxLength={10}
              />
              <Text style={styles.helpText}>Enter your date of birth in DD-MM-YYYY format.</Text>
            </View>
            {/* <Text style={styles.helpText}>Output will be in DD-MM-YYYY format</Text> */}
          </View>

          {/* Employment Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employment History</Text>
            
            {/* Participating Organization Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Participating Organization</Text>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowOrgModal(true)}
              >
                <Text style={[styles.dropdownText, !formData.organization && styles.placeholderText]}>
                  {formData.organization || 'Select your Organization'}
                </Text>
                <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              {/* <Text style={styles.helpText}>Select your Organization</Text> */}
            </View>

            {/* Date of Entry into Pension Fund Participation */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Entry into Pension Fund Participation</Text>
              <TextInput
                style={styles.input}
                value={formData.dateOfEntry}
                onChangeText={(value) => handleInputChange('dateOfEntry', value)}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#9CA3AF"
                keyboardType="numbers-and-punctuation"
                maxLength={10}
              />
              <Text style={styles.helpText}>Enter your date of entry in DD-MM-YYYY format.</Text>
            </View>
            {/* <Text style={styles.helpText}>Calculated from Date of Entry to Date of Separation</Text> */}

            {/* Date of Separation */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Separation</Text>
              <TextInput
                style={styles.input}
                value={formData.dateOfSeparation}
                onChangeText={(value) => handleInputChange('dateOfSeparation', value)}
                placeholder="DD-MM-YYYY"
                placeholderTextColor="#9CA3AF"
                keyboardType="numbers-and-punctuation"
                maxLength={10}
              />
              <Text style={styles.helpText}>Enter your date of separation in DD-MM-YYYY format.</Text>
            </View>

            {/* Length of Contributory Service (auto-calc) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length of Contributory Service</Text>
              {/* <Text style={styles.helpText}>Calculated from Date of Entry to Date of Separation</Text> */}

              <TextInput
                style={[styles.input, { backgroundColor: '#F3F4F6' }]}
                value={calculateServiceLength(formattedEntry, formattedSeparation)}
                editable={false}
                placeholder="Years and months will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.helpText}>Calculated from Date of Entry & Date of Separation</Text>
            </View>

            {/* Mandatory Age of Separation (MAS) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date on which you will reach MAS (Mandatory Age of Separation)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: '#F3F4F6' }]}
                value={calculateMAS(formData.dateOfBirth)}
                editable={false}
                placeholder="Will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.helpText}>In most Member Organisations, MAS is 65 years. If different, contact your UNJSPF for advice.</Text>
            </View>

            {/* Normal Retirement Age (NRA) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date on which you will reach NRA (Normal Retirement Age)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: '#F3F4F6' }]}
                value={calculateNRA(formData.dateOfBirth, formData.dateOfEntry)}
                editable={false}
                placeholder="Will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.helpText}>Based on your Date of Birth and Entry into Pension Fund.</Text>
            </View>

            {/* Early Retirement Age (ERA) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date on which you will reach ERA (Early Retirement Age)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: '#F3F4F6' }]}
                value={calculateERA(formData.dateOfBirth, formData.dateOfEntry)}
                editable={false}
                placeholder="Will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.helpText}>Based on your Date of Birth and Entry into Pension Fund.</Text>
            </View>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
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
  saveSection: {
    marginTop: 32,
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
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  helpText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginLeft: 8,
  },
}); 