import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {saveTimeSlots} from '@/utils/saveTimeSlots';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const userId = '683abbd4a31506aa8a6d4f94'; // Replace with actual user ID or context
export default function StudyPreferenceScreen() {
  const router = useRouter();
  const [timeSlots, setTimeSlots] = useState<Record<string, string[]>>({
    monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: []
  });
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isStartTime, setIsStartTime] = useState(true);
  const [currentSlot, setCurrentSlot] = useState<{start: Date | null, end: Date | null}>({ 
    start: null, 
    end: null 
  });
  const [showModal, setShowModal] = useState(false);

  const hasTimeSlots = Object.values(timeSlots).some(slots => slots.length > 0);

  const addTimeSlot = (day: string) => {
    if (!currentSlot.start || !currentSlot.end) return;
    
    const startTime = currentSlot.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = currentSlot.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newSlot = `${startTime} - ${endTime}`;
    
    setTimeSlots(prev => ({
      ...prev,
      [day]: [...prev[day], newSlot]
    }));
    resetTimeSelection();
  };

  const removeSlot = (day: string, index: number) => {
    setTimeSlots(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (selectedTime) {
      if (isStartTime) {
        setCurrentSlot(prev => ({ ...prev, start: selectedTime }));
        setIsStartTime(false);
        setShowTimePicker(true);
      } else {
        setCurrentSlot(prev => ({ ...prev, end: selectedTime }));
        setShowTimePicker(false);
        setShowModal(true); // Show confirmation modal only after both times are selected
      }
    } else {
      setShowTimePicker(false);
      if (!isStartTime) {
        setIsStartTime(true);
      }
    }
  };

  const resetTimeSelection = () => {
    setCurrentDay(null);
    setCurrentSlot({ start: null, end: null });
    setIsStartTime(true);
    setShowTimePicker(false);
    setShowModal(false);
  };

  const handleSave = () => {
    saveTimeSlots(timeSlots, userId);
    router.replace("/(tabs)");
  };

  const startTimeSelection = (day: string) => {
    setCurrentDay(day);
    setIsStartTime(true);
    setShowTimePicker(true);
  };

  return (
    <LinearGradient
      colors={["#68c7ff", "#4ab8f5", "#2da9e9"]}
      style={styles.gradientContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Study Time Preferences</Text>
        <Text style={styles.subtitle}>Select your available study times for each day</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {days.map(day => (
          <View key={day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
              <Text style={styles.slotCount}>{timeSlots[day].length} slots</Text>
            </View>
            
            {timeSlots[day].length > 0 ? (
              <View style={styles.slotsContainer}>
                {timeSlots[day].map((slot, index) => (
                  <View key={index} style={styles.slot}>
                    <Text style={styles.slotText}>{slot}</Text>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeSlot(day, index)}
                    >
                      <Text style={styles.removeText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noSlotsText}>No time slots added</Text>
            )}

            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => startTimeSelection(day)}
            >
              <Text style={styles.addButtonText}>+ Add Time Slot</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {hasTimeSlots && (
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      )}

      {/* Time Picker - Shows immediately when adding slot */}
      {showTimePicker && (
        <DateTimePicker
          value={isStartTime ? (currentSlot.start || new Date()) : (currentSlot.end || new Date())}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      {/* Confirmation Modal - Only shows after both times are selected */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={resetTimeSelection}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <Text style={styles.modalTitle}>Add this time slot to {currentDay}?</Text>
            
            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>
                {currentSlot.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {' '}
                {currentSlot.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={resetTimeSelection}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => {
                  addTimeSlot(currentDay!);
                  resetTimeSelection();
                }}
              >
                <Text style={styles.confirmButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // ... (keep previous styles)
  confirmationModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  timeDisplay: {
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2da9e9',
  },
  // ... (rest of the styles remain same)

  gradientContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  container: {
    padding: 15,
    paddingBottom: 80,
  },
  dayCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2da9e9',
  },
  slotCount: {
    fontSize: 14,
    color: '#666',
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f5fe',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  slotText: {
    color: '#2da9e9',
    fontSize: 14,
    marginRight: 8,
  },
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
  },
  noSlotsText: {
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#2da9e9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    margin: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  timeInputContainer: {
    marginBottom: 20,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  timeInputText: {
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#2da9e9',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});