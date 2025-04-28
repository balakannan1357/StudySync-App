import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Subtopic {
  subtopic_id: string;
  subtopic_name: string;
  subject: string;
  starttime: string;
  endtime: string;
  date: string;
  completed: boolean;
}

const mockSubtopics: Subtopic[] = [
  {
    subtopic_id: '1',
    subtopic_name: 'Motion in a Straight Line',
    subject: 'Physics',
    starttime: '09:30',
    endtime: '10:30',
    date: '2025-04-28',
    completed: false,
  },
  {
    subtopic_id: '2',
    subtopic_name: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    starttime: '10:30',
    endtime: '11:00',
    date: '2025-04-28',
    completed: false,
  },
  {
    subtopic_id: '3',
    subtopic_name: 'Work, Energy, and Power',
    subject: 'Physics',
    starttime: '16:30',
    endtime: '17:00',
    date: '2025-04-29',
    completed: false,
  },
];

const MainPage: React.FC = () => {
  const [subtopics, setSubtopics] = useState<Subtopic[]>(mockSubtopics);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const filteredSubtopics = subtopics.filter(
    (subtopic) => subtopic.date === selectedDate && !subtopic.completed
  );

  const handleSubtopicClick = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    setShowActionModal(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowActionModal(false);
    setSelectedSubtopic(null);
    stopTimer();
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const startTimer = () => {
    setTimerRunning(true);
    setTimeSpent(0);
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
    setShowActionModal(false);
    setModalVisible(true);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimerRunning(false);
  };

  const completeTask = () => {
    stopTimer();
    if (selectedSubtopic) {
      const updatedSubtopics = subtopics.map(subtopic => {
        if (subtopic.subtopic_id === selectedSubtopic.subtopic_id) {
          return { ...subtopic, completed: true };
        }
        return subtopic;
      });
      setSubtopics(updatedSubtopics);
    }
    closeModal();
  };

  const postponeTask = () => {
    if (selectedSubtopic) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toISOString().split('T')[0];
      
      const updatedSubtopics = subtopics.map(subtopic => {
        if (subtopic.subtopic_id === selectedSubtopic.subtopic_id) {
          return { ...subtopic, date: tomorrowDate };
        }
        return subtopic;
      });
      
      setSubtopics(updatedSubtopics);
    }
    closeModal();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return (
    <LinearGradient
      colors={['#0077be', '#00a8e8']}
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
          highlightDateNumberStyle={{ color: '#02B5EB' }}
          highlightDateNameStyle={{ color: '#02B5EB' }}
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

      {/* Action Modal (Start Now or Postpone) */}
      <Modal
        visible={showActionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedSubtopic?.subtopic_name}</Text>
            <Text style={styles.modalText}>What would you like to do?</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={startTimer}>
              <Text style={styles.actionButtonText}>Start Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={postponeTask}>
              <Text style={styles.actionButtonText}>AD Hoc</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Timer Modal */}
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
                <Text style={styles.modalText}>Planned Time: {selectedSubtopic.starttime} - {selectedSubtopic.endtime}</Text>
                
                {timerRunning && (
                  <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>Time Spent: {formatTime(timeSpent)}</Text>
                  </View>
                )}
              </>
            )}
            
            {timerRunning ? (
              <TouchableOpacity style={styles.completeButton} onPress={completeTask}>
                <Text style={styles.completeButtonText}>Mark as Completed</Text>
              </TouchableOpacity>
            ) : null}
            
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

interface SubtopicCardProps {
  subtopic: Subtopic;
}

const SubtopicCard: React.FC<SubtopicCardProps> = ({ subtopic }) => (
  <View style={styles.subtopicContainer}>
    <Text style={styles.subtopicName}>{subtopic.subtopic_name}</Text>
    <Text style={styles.subtopicSubject}>{subtopic.subject}</Text>
    <Text style={styles.subtopicTime}>
      {subtopic.starttime} - {subtopic.endtime}
    </Text>
    {subtopic.completed && (
      <Text style={styles.completedText}>Completed</Text>
    )}
  </View>
);

// Styles remain the same as in the previous example
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
  subtopicContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
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
  completedText: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
    fontWeight: 'bold',
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
  timerContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    marginTop: 15,
    backgroundColor: '#0077be',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  completeButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#f44336',
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
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    fontSize: 20,
    color: '#0077be',
    fontWeight: 'bold',
  },
});

export default MainPage;