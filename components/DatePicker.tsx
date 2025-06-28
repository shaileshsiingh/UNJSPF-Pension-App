import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import { Calendar, X } from 'lucide-react-native';

interface DatePickerProps {
  value: string;
  onDateChange: (date: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export default function DatePicker({
  value,
  onDateChange,
  placeholder = 'Select Date',
  label,
  error
}: DatePickerProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    onDateChange(formatDate(selectedDate));
    setShowModal(false);
  };

  const handleCancel = () => {
    setSelectedDate(parseDate(value));
    setShowModal(false);
  };

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - 25 + i);
    
    return (
      <View style={styles.pickerSection}>
        <Text style={styles.pickerSectionTitle}>Year</Text>
        <View style={styles.pickerOptions}>
          {years.map(year => (
            <TouchableOpacity
              key={year}
              style={[
                styles.pickerOption,
                selectedDate.getFullYear() === year && styles.pickerOptionSelected
              ]}
              onPress={() => handleDateSelect(new Date(year, selectedDate.getMonth(), selectedDate.getDate()))}
            >
              <Text style={[
                styles.pickerOptionText,
                selectedDate.getFullYear() === year && styles.pickerOptionTextSelected
              ]}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderMonthPicker = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return (
      <View style={styles.pickerSection}>
        <Text style={styles.pickerSectionTitle}>Month</Text>
        <View style={styles.pickerOptions}>
          {months.map((month, index) => (
            <TouchableOpacity
              key={month}
              style={[
                styles.pickerOption,
                selectedDate.getMonth() === index && styles.pickerOptionSelected
              ]}
              onPress={() => handleDateSelect(new Date(selectedDate.getFullYear(), index, selectedDate.getDate()))}
            >
              <Text style={[
                styles.pickerOptionText,
                selectedDate.getMonth() === index && styles.pickerOptionTextSelected
              ]}>
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderDayPicker = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return (
      <View style={styles.pickerSection}>
        <Text style={styles.pickerSectionTitle}>Day</Text>
        <View style={styles.pickerOptions}>
          {days.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.pickerOption,
                selectedDate.getDate() === day && styles.pickerOptionSelected
              ]}
              onPress={() => handleDateSelect(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
            >
              <Text style={[
                styles.pickerOptionText,
                selectedDate.getDate() === day && styles.pickerOptionTextSelected
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Calendar size={20} color="#374151" strokeWidth={2} />
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      
      <TouchableOpacity
        style={[styles.input, error && styles.inputError]}
        onPress={() => setShowModal(true)}
      >
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Calendar size={20} color="#6B7280" strokeWidth={2} />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <X size={24} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {renderYearPicker()}
              {renderMonthPicker()}
              {renderDayPicker()}
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={handleConfirm}>
                <Text style={[styles.modalButtonText, styles.modalButtonConfirmText]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  modalButtonConfirm: {
    backgroundColor: '#2563EB',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalButtonConfirmText: {
    color: '#FFFFFF',
  },
  pickerSection: {
    marginBottom: 24,
  },
  pickerSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  pickerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  pickerOptionSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  pickerOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 