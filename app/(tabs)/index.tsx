import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Modal, TouchableOpacity } from 'react-native';

// Mock data (replace with actual API call)
const mockSubtopics = [
  {
    subtopic_id: '1',
    subtopic_name: 'Motion in a Straight Line',
    subject: 'Physics',
    starttime: '09:30', // Start time in HH:MM format
    endtime: '10:30', // End time in HH:MM format
  },
  {
    subtopic_id: '2',
    subtopic_name: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    starttime: '10:30',
    endtime: '11:00',
  },
  {
    subtopic_id: '3',
    subtopic_name: 'Work, Energy, and Power',
    subject: 'Physics',
    starttime: '16:30',
    endtime: '17:00',
  },
];

const MainPage = () => {
  const [subtopics, setSubtopics] = useState(mockSubtopics);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null); // Track selected subtopic
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

  // TODO: Implement API call for scheduling data
  useEffect(() => {
    // Future implementation:
    // fetchScheduleData().then(data => {
    //   setSubtopics(data);
    // });
  }, []);

  // Handle subtopic click
  const handleSubtopicClick = (subtopic) => {
    setSelectedSubtopic(subtopic); // Set the selected subtopic
    setModalVisible(true); // Show the modal
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedSubtopic(null);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView style={styles.overlay}>
        {subtopics.map((subtopic) => (
          <TouchableOpacity
            key={subtopic.subtopic_id}
            onPress={() => handleSubtopicClick(subtopic)}
          >
            <SubtopicCard subtopic={subtopic} />
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    </ImageBackground>
  );
};

const SubtopicCard = ({ subtopic }) => (
  <View style={styles.subtopicContainer}>
    <Text style={styles.subtopicName}>{subtopic.subtopic_name}</Text>
    <Text style={styles.subtopicSubject}>{subtopic.subject}</Text>
    <Text style={styles.subtopicTime}>
      Start Time: {subtopic.starttime} | End Time: {subtopic.endtime}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  // Background image style
  backgroundImage: {
    flex: 1, // Takes up the entire screen
    width: '100%', // Full width
    height: '100%', // Full height
  },

  // Overlay for the ScrollView to make content readable
  overlay: {
    flex: 1, // Takes up the entire screen
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white overlay
    padding: 20, // Padding around the content
  },

  // Container for each subtopic card
  subtopicContainer: {
    backgroundColor: '#fff', // White background for the card
    borderRadius: 10, // Rounded corners
    padding: 15, // Padding inside the card
    marginBottom: 15, // Space between cards
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
  },

  // Style for the subtopic name
  subtopicName: {
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
    color: '#333', // Dark gray color
  },

  // Style for the subtopic subject
  subtopicSubject: {
    fontSize: 14, // Font size
    color: '#555', // Medium gray color
    marginTop: 5, // Space above the text
  },

  // Style for the subtopic time
  subtopicTime: {
    fontSize: 14, // Font size
    color: '#777', // Light gray color
    marginTop: 5, // Space above the text
  },

  // Modal container (background)
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },

  // Modal content
  modalContent: {
    backgroundColor: '#fff', // White background
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the modal
    width: '80%', // Width of the modal
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  // Modal title
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  // Modal text
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },

  // Close button
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },

  // Close button text
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MainPage;