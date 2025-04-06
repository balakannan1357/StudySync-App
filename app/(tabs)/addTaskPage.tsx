import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {LinearGradient} from 'expo-linear-gradient';
// Mock data structure
const mockData = {
  Chemistry: {
    Chapter1: ['Atomic Structure', 'Chemical Bonding'],
    Chapter2: ['Thermodynamics', 'Chemical Equilibrium'],
  },
  Physics: {
    Chapter1: ['Motion in a Straight Line', 'Newton\'s Laws of Motion'],
    Chapter2: ['Work, Energy, and Power', 'Gravitation'],
  },
};

const addTaskPage = () => {
  // State for dropdowns and inputs
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [newSubtopic, setNewSubtopic] = useState('');
  const [hours, setHours] = useState('');
  const [showNewSubtopicInput, setShowNewSubtopicInput] = useState(false); // Control visibility of new subtopic input

  // Get available subjects
  const subjects = Object.keys(mockData);

  // Get available chapters for the selected subject
  const chapters = subject ? Object.keys(mockData[subject]) : [];

  // Get available subtopics for the selected chapter
  const subtopics = subject && chapter ? mockData[subject][chapter] : [];

  // Handle form submission
  const handleSubmit = () => {
    // Validate all fields
    if (!subject) {
      Alert.alert('Error', 'Please select a subject');
      return;
    }
    if (!chapter) {
      Alert.alert('Error', 'Please select a chapter');
      return;
    }
    if (!subtopic && !newSubtopic) {
      Alert.alert('Error', 'Please select or add a subtopic');
      return;
    }
    if (!hours) {
      Alert.alert('Error', 'Please enter the number of hours');
      return;
    }

    const data = {
      subject,
      chapter,
      subtopic: subtopic || newSubtopic, // Use existing subtopic or new one
      hours: parseFloat(hours),
    };

    // For now, log the data to the console (replace with DB logic later)
    console.log('Submitted Data:', data);

    // Show success message
    Alert.alert('Success', 'Subtopic added successfully!');

    // Reset form after submission
    setSubject('');
    setChapter('');
    setSubtopic('');
    setNewSubtopic('');
    setHours('');
    setShowNewSubtopicInput(false);
  };

  return (
    <LinearGradient
                  colors={['#0077be', '#00a8e8']} // Sea blue gradient from darker to lighter
                  style={styles.gradientContainer}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                >
      <ScrollView style={styles.overlay}>
        <Text style={styles.heading}>Add Subtopic</Text>

        {/* Subject Dropdown */}
        <Text style={styles.label}>Subject</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={subject}
            onValueChange={(itemValue) => {
              setSubject(itemValue);
              setChapter(''); // Reset chapter when subject changes
              setSubtopic(''); // Reset subtopic when subject changes
              setShowNewSubtopicInput(false); // Hide new subtopic input
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Subject" value="" />
            {subjects.map((sub, index) => (
              <Picker.Item key={index} label={sub} value={sub} />
            ))}
          </Picker>
        </View>

        {/* Chapter Dropdown */}
        <Text style={styles.label}>Chapter</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={chapter}
            onValueChange={(itemValue) => {
              setChapter(itemValue);
              setSubtopic(''); // Reset subtopic when chapter changes
              setShowNewSubtopicInput(false); // Hide new subtopic input
            }}
            style={styles.picker}
            enabled={!!subject} // Enable only if a subject is selected
          >
            <Picker.Item label="Select Chapter" value="" />
            {chapters.map((chap, index) => (
              <Picker.Item key={index} label={chap} value={chap} />
            ))}
          </Picker>
        </View>

        {/* Subtopic Dropdown */}
        <Text style={styles.label}>Subtopic</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={subtopic}
            onValueChange={(itemValue) => {
              if (itemValue === 'add_new') {
                setShowNewSubtopicInput(true); // Show input for new subtopic
                setSubtopic(''); // Clear selected subtopic
              } else {
                setSubtopic(itemValue);
                setShowNewSubtopicInput(false); // Hide new subtopic input
              }
            }}
            style={styles.picker}
            enabled={!!chapter} // Enable only if a chapter is selected
          >
            <Picker.Item label="Select Subtopic" value="" />
            {subtopics.map((sub, index) => (
              <Picker.Item key={index} label={sub} value={sub} />
            ))}
            <Picker.Item label="+ Add New Subtopic" value="add_new" />
          </Picker>
        </View>

        {/* Add New Subtopic Input (shown only when "Add New Subtopic" is selected) */}
        {showNewSubtopicInput && (
          <>
            <Text style={styles.label}>New Subtopic</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new subtopic"
              value={newSubtopic}
              onChangeText={setNewSubtopic}
            />
          </>
        )}

        {/* Number of Hours Input */}
        <Text style={styles.label}>Number of Hours</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of hours"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({

  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 3,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
  },
  picker: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default addTaskPage;