import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

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
      colors={['#68c7ff', '#4ab8f5', '#2da9e9']} // Sea blue gradient
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
          calendarColor={'rgba(255, 255, 255, 0.8)'}
          calendarHeaderStyle={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}
          dateNumberStyle={{ color: '#333' }}
          dateNameStyle={{ color: '#333' }}
          highlightDateNumberStyle={{ color: '#2da9e9', fontWeight: 'bold' }}
          highlightDateNameStyle={{ color: '#2da9e9', fontWeight: 'bold' }}
          disabledDateNameStyle={{ color: '#aaa' }}
          disabledDateNumberStyle={{ color: '#aaa' }}
          iconContainer={{ flex: 0.1 }}
          iconStyle={{ tintColor: '#2da9e9' }}
          daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 2, borderHighlightColor: '#2da9e9' }}
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Tasks</Text>
        <Text style={styles.headerDate}>
          {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
      </View>

      {/* Subtopic List */}
      <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollContent}>
        {filteredSubtopics.length > 0 ? (
          filteredSubtopics.map((subtopic) => (
            <TouchableOpacity
              key={subtopic.subtopic_id}
              onPress={() => handleSubtopicClick(subtopic)}
              activeOpacity={0.8}
            >
              <SubtopicCard subtopic={subtopic} />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="beach-access" size={60} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.emptyStateText}>No tasks for today!</Text>
            <Text style={styles.emptyStateSubtext}>Enjoy your free time</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Button to Add Subtopic */}
      <Link href="/addTaskPage" asChild>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Link>

      {/* Action Modal (Start Now or Postpone) */}
      <Modal
        visible={showActionModal}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedSubtopic?.subtopic_name}</Text>
            <Text style={styles.modalSubtitle}>{selectedSubtopic?.subject}</Text>
            <View style={styles.modalDivider} />
            <Text style={styles.modalText}>What would you like to do?</Text>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.startNowButton]} 
              onPress={startTimer}
              activeOpacity={0.7}
            >
              <MaterialIcons name="play-arrow" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Start Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.postponeButton]} 
              onPress={postponeTask}
              activeOpacity={0.7}
            >
              <MaterialIcons name="schedule" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>AD Hoc</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={closeModal}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Timer Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {selectedSubtopic && (
              <>
                <Text style={styles.modalTitle}>{selectedSubtopic.subtopic_name}</Text>
                <Text style={styles.modalSubtitle}>{selectedSubtopic.subject}</Text>
                <View style={styles.modalDivider} />
                
                <View style={styles.timeInfoContainer}>
                  <View style={styles.timeInfo}>
                    <MaterialIcons name="access-time" size={20} color="#555" />
                    <Text style={styles.modalText}>
                      Planned: {selectedSubtopic.starttime} - {selectedSubtopic.endtime}
                    </Text>
                  </View>
                </View>

                {timerRunning && (
                  <View style={styles.timerContainer}>
                    <Text style={styles.timerLabel}>Time Spent:</Text>
                    <Text style={styles.timerText}>{formatTime(timeSpent)}</Text>
                  </View>
                )}
              </>
            )}
            
            {timerRunning ? (
              <TouchableOpacity 
                style={styles.completeButton} 
                onPress={completeTask}
                activeOpacity={0.7}
              >
                <MaterialIcons name="check-circle" size={24} color="#fff" />
                <Text style={styles.completeButtonText}>Mark as Completed</Text>
              </TouchableOpacity>
            ) : null}
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={closeModal}
              activeOpacity={0.7}
            >
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
    <View style={styles.subtopicHeader}>
      <Text style={styles.subtopicName}>{subtopic.subtopic_name}</Text>
      {subtopic.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>Done</Text>
        </View>
      )}
    </View>
    <Text style={styles.subtopicSubject}>{subtopic.subject}</Text>
    <View style={styles.timeContainer}>
      <MaterialIcons name="schedule" size={16} color="#2da9e9" />
      <Text style={styles.subtopicTime}>
        {subtopic.starttime} - {subtopic.endtime}
      </Text>
    </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  calendar: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerDate: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  subtopicContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtopicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  subtopicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  subtopicSubject: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  subtopicTime: {
    fontSize: 14,
    color: '#2da9e9',
    marginLeft: 5,
    fontWeight: '500',
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  completedText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 15,
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2da9e9',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  modalText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  timeInfoContainer: {
    marginBottom: 20,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2da9e9',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  startNowButton: {
    backgroundColor: '#4CAF50',
  },
  postponeButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  completeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2da9e9',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    elevation: 2,
  },
  completeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2da9e9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default MainPage;