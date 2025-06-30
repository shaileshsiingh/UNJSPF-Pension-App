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
  const [year, month, day] = dateString.split('-').map(Number);
  if ([year, month, day].some(isNaN)) return '';
  return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
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

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'organization', 'dateOfBirth', 'dateOfEntry'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Information',
        'Please fill in all required fields: ' + missingFields.join(', '),
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Profile Saved',
      'Your profile information has been saved successfully.',
      [{ text: 'OK' }]
    );
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
              <DatePicker
                value={formData.dateOfBirth}
                onDateChange={(value) => handleInputChange('dateOfBirth', value)}
                placeholder="DD-MM-YYYY"
                label="Date of Birth"
                minYear={1960}
                maxYear={2012}
              />
            </View>
            <Text style={styles.helpText}>Select your date of birth (output in DD-MM-YYYY format)</Text>
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
              <Text style={styles.helpText}>Select your Organization</Text>
            </View>

            {/* Date of Entry into Pension Fund Participation */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Entry into Pension Fund Participation</Text>
              <DatePicker
                value={formData.dateOfEntry}
                onDateChange={(value) => handleInputChange('dateOfEntry', value)}
                placeholder="DD-MM-YYYY"
                label="Date of Entry into Pension Fund Participation"
                minYear={1978}
                maxYear={2047}
              />
            </View>
            <Text style={styles.helpText}>(Usually the same date on which you joined the UN organization)</Text>

            {/* Date of Separation */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Separation</Text>
              <DatePicker
                value={formData.dateOfSeparation}
                onDateChange={(value) => handleInputChange('dateOfSeparation', value)}
                placeholder="DD-MM-YYYY"
                label="Date of Separation"
                minYear={2025}
                maxYear={2047}
              />
            </View>

            {/* Length of Contributory Service (auto-calc) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length of Contributory Service</Text>
              <TextInput
                style={[styles.input, { backgroundColor: '#F3F4F6' }]}
                value={calculateServiceLength(formattedEntry, formattedSeparation)}
                editable={false}
                placeholder="Years and months will be calculated automatically"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.helpText}>Calculated from Date of Entry and Date of Separation</Text>
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
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },
}); 