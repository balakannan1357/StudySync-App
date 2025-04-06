import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Link } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient';

// Mock data
const mockSubtopics = [
  {
    subtopic_id: '1',
    subtopic_name: 'Motion in a Straight Line',
    subject: 'Physics',
    starttime: '09:30',
    endtime: '10:30',
    date: '2025-02-28',
  },
  {
    subtopic_id: '2',
    subtopic_name: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    starttime: '10:30',
    endtime: '11:00',
    date: '2025-02-28',
  },
  {
    subtopic_id: '3',
    subtopic_name: 'Work, Energy, and Power',
    subject: 'Physics',
    starttime: '16:30',
    endtime: '17:00',
    date: '2025-03-01',
  },
];


const MainPage = () => {
  const [subtopics] = useState(mockSubtopics);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredSubtopics = subtopics.filter(
    (subtopic) => subtopic.date === selectedDate
  );

  const handleSubtopicClick = (subtopic) => {
    setSelectedSubtopic(subtopic);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSubtopic(null);
  };

  const handleDateSelected = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  return (
    <LinearGradient
      colors={['#0077be', '#00a8e8']} // Sea blue gradient from darker to lighter
      style={styles.gradientContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* Calendar Strip */}
      <View style={styles.calendarContainer}>
        <CalendarStrip
          selectedDate={new Date(selectedDate)}
          onDateSelected={handleDateSelected}
          style={styles.calendar}
          calendarColor={'rgba(255, 255, 255, 0.9)'}
          calendarHeaderStyle={{ color: '#333' }}
          dateNumberStyle={{ color: '#333' }}
          dateNameStyle={{ color: '#333' }}
          highlightDateNumberStyle={{ color: '#4444EC' }} //color highlight for selected date and day's name
          highlightDateNameStyle={{ color: '#4444EC' }}
          disabledDateNameStyle={{ color: '#ccc' }}
          disabledDateNumberStyle={{ color: '#ccc' }}
          iconContainer={{ flex: 0.1 }}
        />
      </View>

      {/* Subtopic List */}
      <ScrollView style={styles.contentContainer}>
        {filteredSubtopics.length > 0 ? (
          filteredSubtopics.map((subtopic) => (
            <TouchableOpacity
              key={subtopic.subtopic_id}
              onPress={() => handleSubtopicClick(subtopic)}
            >
              <SubtopicCard subtopic={subtopic} />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks for this day</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Button to Add Subtopic */}
      <Link href="/addTaskPage" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </Link>

      {/* Modal for displaying subtopic details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedSubtopic && (
              <>
                <Text style={styles.modalTitle}>{selectedSubtopic.subtopic_name}</Text>
                <Text style={styles.modalText}>Subject: {selectedSubtopic.subject}</Text>
                <Text style={styles.modalText}>Start Time: {selectedSubtopic.starttime}</Text>
                <Text style={styles.modalText}>End Time: {selectedSubtopic.endtime}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const SubtopicCard = ({ subtopic }) => (
  <View style={styles.subtopicContainer}>
    <Text style={styles.subtopicName}>{subtopic.subtopic_name}</Text>
    <Text style={styles.subtopicSubject}>{subtopic.subject}</Text>
    <Text style={styles.subtopicTime}>
      {subtopic.starttime} - {subtopic.endtime}
    </Text>
  </View>
);
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  calendarContainer: {
    paddingTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  calendar: {
    height: 100,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  // In your styles
subtopicContainer: {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 12,
  padding: 16,
  marginBottom: 15,
  boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
  // For Android
  elevation: 3,
  // Remove boxShadow - it's not supported in React Native
},
  subtopicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtopicSubject: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  subtopicTime: {
    fontSize: 14,
    color: '#0077be',
    marginTop: 5,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    elevation: 5,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077be',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#0077be',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
  },
  addButtonText: {
    fontSize: 28,
    color: '#0077be',
    fontWeight: 'bold',
  },
});

export default MainPage;