import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { Calendar, User, Briefcase, Save, ChevronDown, Building } from 'lucide-react-native';

interface UserProfile {
  organization: string;
  dateOfBirth: string;
  entryOnDuty: string;
  expectedSeparation: string;
  currentAge: number;
  yearsOfService: number;
  monthsOfService: number;
}

// Sample organizations - you can modify this list based on your needs
const organizations = [
  'United Nations Joint Staff Pension Fund (UNJSPF)',
  'United Nations Secretariat',
  'United Nations Development Programme (UNDP)',
  'United Nations Children\'s Fund (UNICEF)',
  'World Health Organization (WHO)',
  'United Nations Educational, Scientific and Cultural Organization (UNESCO)',
  'International Labour Organization (ILO)',
  'Food and Agriculture Organization (FAO)',
  'World Bank Group',
  'International Monetary Fund (IMF)',
  'Government of India',
  'State Government - Maharashtra',
  'State Government - Karnataka',
  'State Government - Tamil Nadu',
  'State Government - Kerala',
  'State Government - Andhra Pradesh',
  'State Government - Telangana',
  'State Government - Gujarat',
  'State Government - Rajasthan',
  'State Government - Madhya Pradesh',
  'State Government - Uttar Pradesh',
  'State Government - West Bengal',
  'Public Sector Undertaking',
  'Autonomous Body',
  'Other Government Organization',
];

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    organization: '',
    dateOfBirth: '',
    entryOnDuty: '',
    expectedSeparation: '',
    currentAge: 0,
    yearsOfService: 0,
    monthsOfService: 0,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateService = (entryDate: string, separationDate: string) => {
    if (!entryDate || !separationDate) return { years: 0, months: 0 };
    
    const entry = new Date(entryDate);
    const separation = new Date(separationDate);
    
    const diffTime = separation.getTime() - entry.getTime();
    const totalMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44);
    
    const years = Math.floor(totalMonths / 12);
    const months = Math.floor(totalMonths % 12);
    
    return { years, months };
  };

  const validateDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  const handleDateChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleOrganizationSelect = (org: string) => {
    setProfile(prev => ({ ...prev, organization: org }));
    setShowOrganizationModal(false);
    if (errors.organization) {
      setErrors(prev => ({ ...prev, organization: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!profile.organization) {
      newErrors.organization = 'Organization selection is required';
    }

    if (!profile.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validateDate(profile.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please enter a valid date (YYYY-MM-DD)';
    }

    if (!profile.entryOnDuty) {
      newErrors.entryOnDuty = 'Entry on duty date is required';
    } else if (!validateDate(profile.entryOnDuty)) {
      newErrors.entryOnDuty = 'Please enter a valid date (YYYY-MM-DD)';
    }

    if (!profile.expectedSeparation) {
      newErrors.expectedSeparation = 'Expected separation date is required';
    } else if (!validateDate(profile.expectedSeparation)) {
      newErrors.expectedSeparation = 'Please enter a valid date (YYYY-MM-DD)';
    }

    // Validate date sequence
    if (profile.dateOfBirth && profile.entryOnDuty && validateDate(profile.dateOfBirth) && validateDate(profile.entryOnDuty)) {
      const birth = new Date(profile.dateOfBirth);
      const entry = new Date(profile.entryOnDuty);
      
      if (entry <= birth) {
        newErrors.entryOnDuty = 'Entry date must be after date of birth';
      }
    }

    if (profile.entryOnDuty && profile.expectedSeparation && validateDate(profile.entryOnDuty) && validateDate(profile.expectedSeparation)) {
      const entry = new Date(profile.entryOnDuty);
      const separation = new Date(profile.expectedSeparation);
      
      if (separation <= entry) {
        newErrors.expectedSeparation = 'Separation date must be after entry date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = () => {
    if (validateForm()) {
      const showAlert = (message: string) => {
        if (Platform.OS === 'web') {
          alert(message);
        } else {
          Alert.alert('Success', message);
        }
      };
      
      showAlert('Profile saved successfully!');
    }
  };

  useEffect(() => {
    if (profile.dateOfBirth && validateDate(profile.dateOfBirth)) {
      const age = calculateAge(profile.dateOfBirth);
      setProfile(prev => ({ ...prev, currentAge: age }));
    }
  }, [profile.dateOfBirth]);

  useEffect(() => {
    if (profile.entryOnDuty && profile.expectedSeparation && 
        validateDate(profile.entryOnDuty) && validateDate(profile.expectedSeparation)) {
      const { years, months } = calculateService(profile.entryOnDuty, profile.expectedSeparation);
      setProfile(prev => ({ 
        ...prev, 
        yearsOfService: years,
        monthsOfService: months 
      }));
    }
  }, [profile.entryOnDuty, profile.expectedSeparation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <User size={32} color="#2563EB" strokeWidth={2} />
        <Text style={styles.title}>Profile Setup</Text>
        <Text style={styles.subtitle}>Enter your employment details for pension calculations</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Building size={20} color="#374151" strokeWidth={2} />
            <Text style={styles.label}>Organization</Text>
          </View>
          <TouchableOpacity
            style={[styles.dropdownButton, errors.organization && styles.inputError]}
            onPress={() => setShowOrganizationModal(true)}
          >
            <Text style={[styles.dropdownText, !profile.organization && styles.placeholderText]}>
              {profile.organization || 'Select your organization'}
            </Text>
            <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
          {errors.organization && <Text style={styles.errorText}>{errors.organization}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Calendar size={20} color="#374151" strokeWidth={2} />
            <Text style={styles.label}>Date of Birth</Text>
          </View>
          <TextInput
            style={[styles.input, errors.dateOfBirth && styles.inputError]}
            value={profile.dateOfBirth}
            onChangeText={(value) => handleDateChange('dateOfBirth', value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
          />
          {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Briefcase size={20} color="#374151" strokeWidth={2} />
            <Text style={styles.label}>Entry on Duty</Text>
          </View>
          <TextInput
            style={[styles.input, errors.entryOnDuty && styles.inputError]}
            value={profile.entryOnDuty}
            onChangeText={(value) => handleDateChange('entryOnDuty', value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
          />
          {errors.entryOnDuty && <Text style={styles.errorText}>{errors.entryOnDuty}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Calendar size={20} color="#374151" strokeWidth={2} />
            <Text style={styles.label}>Expected Separation</Text>
          </View>
          <TextInput
            style={[styles.input, errors.expectedSeparation && styles.inputError]}
            value={profile.expectedSeparation}
            onChangeText={(value) => handleDateChange('expectedSeparation', value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
          />
          {errors.expectedSeparation && <Text style={styles.errorText}>{errors.expectedSeparation}</Text>}
        </View>

        <View style={styles.calculatedValues}>
          <Text style={styles.calculatedTitle}>Calculated Values</Text>
          
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Current Age:</Text>
            <Text style={styles.valueText}>{profile.currentAge} years</Text>
          </View>
          
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Years of Service:</Text>
            <Text style={styles.valueText}>
              {profile.yearsOfService} years, {profile.monthsOfService} months
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Save size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Organization Selection Modal */}
      <Modal
        visible={showOrganizationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOrganizationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Organization</Text>
              <TouchableOpacity
                onPress={() => setShowOrganizationModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {organizations.map((org, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.organizationItem}
                  onPress={() => handleOrganizationSelect(org)}
                >
                  <Text style={styles.organizationText}>{org}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  calculatedValues: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  calculatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  saveButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalScrollView: {
    maxHeight: '80%',
  },
  organizationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  organizationText: {
    fontSize: 16,
    color: '#111827',
  },
});