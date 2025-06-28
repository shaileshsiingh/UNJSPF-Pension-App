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
  'United Nations Secretariat',
  'UNICEF',
  'UNDP',
  'UNHCR',
  'WFP',
  'WHO',
  'UNESCO',
  'FAO',
  'ILO',
  'UNIDO',
  'IAEA',
  'UNFPA',
  'UNODC',
  'UNEP',
  'UN-Habitat',
  'UN Women',
  'UNRWA',
  'Other'
];

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
              Enter your employment details for accurate pension calculations
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <DatePicker
                value={formData.dateOfBirth}
                onDateChange={(value) => handleInputChange('dateOfBirth', value)}
                placeholder="Select date of birth"
                label="Date of Birth *"
              />
            </View>
          </View>

          {/* Employment Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employment Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>UN Organization *</Text>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowOrgModal(true)}
              >
                <Text style={[styles.dropdownText, !formData.organization && styles.placeholderText]}>
                  {formData.organization || 'Select your organization'}
                </Text>
                <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <DatePicker
                value={formData.dateOfEntry}
                onDateChange={(value) => handleInputChange('dateOfEntry', value)}
                placeholder="Select entry date"
                label="Date of Entry into Service *"
              />
            </View>

            <View style={styles.inputGroup}>
              <DatePicker
                value={formData.dateOfSeparation}
                onDateChange={(value) => handleInputChange('dateOfSeparation', value)}
                placeholder="Select separation date"
                label="Date of Separation (if applicable)"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Annual Salary (USD)</Text>
              <TextInput
                style={styles.input}
                value={formData.salary}
                onChangeText={(value) => handleInputChange('salary', value)}
                placeholder="Enter your annual salary"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Years of Service</Text>
              <TextInput
                style={styles.input}
                value={formData.yearsOfService}
                onChangeText={(value) => handleInputChange('yearsOfService', value)}
                placeholder="Enter years of service"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
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
}); 