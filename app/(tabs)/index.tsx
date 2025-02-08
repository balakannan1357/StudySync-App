import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView } from 'react-native';

// Mock data (replace with actual API call)
const mockSubtopics = [
  {
    subtopic_id: '1',
    subtopic_name: 'Motion in a Straight Line',
    subject: 'Physics',
    no_of_hours: 2,
    no_of_sessions: 1,
  },
  {
    subtopic_id: '2',
    subtopic_name: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    no_of_hours: 3,
    no_of_sessions: 2,
  },
  {
    subtopic_id: '3',
    subtopic_name: 'Work, Energy, and Power',
    subject: 'Physics',
    no_of_hours: 4,
    no_of_sessions: 2,
  },
];

const MainPage = () => {
  const [subtopics, setSubtopics] = useState(mockSubtopics);
  const [startTimes, setStartTimes] = useState<{ [key: string]: string }>({});
  const [endTimes, setEndTimes] = useState<{ [key: string]: string }>({});

  // TODO: Implement API call for scheduling data
  useEffect(() => {
    // Future implementation:
    // fetchScheduleData().then(data => {
    //   setStartTimes(data.startTimes);
    //   setEndTimes(data.endTimes);
    // });
  }, []);

  const handleTimeChange = (subtopicId: string, type: 'start' | 'end', time: string) => {
    // TODO: Add API call to update schedule
    if (type === 'start') {
      setStartTimes(prev => ({ ...prev, [subtopicId]: time }));
    } else {
      setEndTimes(prev => ({ ...prev, [subtopicId]: time }));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView style={styles.overlay}>
        {subtopics.map((subtopic) => (
          <SubtopicCard
            key={subtopic.subtopic_id}
            subtopic={subtopic}
            startTime={startTimes[subtopic.subtopic_id] || ''}
            endTime={endTimes[subtopic.subtopic_id] || ''}
            onTimeChange={handleTimeChange}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const SubtopicCard = ({ subtopic, startTime, endTime, onTimeChange }) => (
  <View style={styles.subtopicContainer}>
    <Text style={styles.subtopicName}>{subtopic.subtopic_name}</Text>
    <Text style={styles.subtopicSubject}>{subtopic.subject}</Text>
    <Text style={styles.subtopicHours}>
      {subtopic.no_of_hours} hours | {subtopic.no_of_sessions} sessions
    </Text>

    <View style={styles.timeInputContainer}>
      <TextInput
        style={styles.timeInput}
        placeholder="Start Time"
        value={startTime}
        onChangeText={(text) => onTimeChange(subtopic.subtopic_id, 'start', text)}
      />
      <TextInput
        style={styles.timeInput}
        placeholder="End Time"
        value={endTime}
        onChangeText={(text) => onTimeChange(subtopic.subtopic_id, 'end', text)}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white overlay
    padding: 20,
  },
  subtopicContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  subtopicHours: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeInput: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
});

export default MainPage;