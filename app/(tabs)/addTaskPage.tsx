import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  Mathematics: {
    Chapter1: ['Algebra', 'Trigonometry'],
    Chapter2: ['Calculus', 'Probability'],
  },
};

const AddTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    subject: '',
    chapter: '',
    subtopic: '',
    newSubtopic: '',
    hours: '',
  });
  const [showNewSubtopicInput, setShowNewSubtopicInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const subjects = Object.keys(mockData);
  const chapters = currentTask.subject ? Object.keys(mockData[currentTask.subject]) : [];
  const subtopics = currentTask.subject && currentTask.chapter ? mockData[currentTask.subject][currentTask.chapter] : [];

  const handleAddTask = () => {
    const { subject, chapter, subtopic, newSubtopic, hours } = currentTask;

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

    const newTask = {
      id: Date.now().toString(),
      subject,
      chapter,
      subtopic: subtopic || newSubtopic,
      hours: parseFloat(hours),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setCurrentTask({
      subject: '',
      chapter: '',
      subtopic: '',
      newSubtopic: '',
      hours: '',
    });
    setShowNewSubtopicInput(false);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSaveTasks = async () => {
    if (tasks.length === 0) {
      Alert.alert('No Tasks', 'Please add at least one task to save');
      return;
    }

    setIsSaving(true);
    
    try {
      // This is where you'll connect to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace this with your actual API call:
      // const response = await axios.post('YOUR_BACKEND_ENDPOINT', { tasks });
      
      Alert.alert('Success', 'Your tasks have been saved successfully!');
      setTasks([]); // Clear tasks after successful save
    } catch (error) {
      Alert.alert('Error', 'Failed to save tasks. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LinearGradient
    colors={['#0077be', '#00a8e8']} 
      style={styles.gradientContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Study Planner</Text>
          <Text style={styles.subHeaderText}>Organize your learning journey</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Add New Study Task</Text>

          {/* Subject Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Subject</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currentTask.subject}
                onValueChange={(itemValue) => {
                  setCurrentTask({
                    ...currentTask,
                    subject: itemValue,
                    chapter: '',
                    subtopic: '',
                  });
                  setShowNewSubtopicInput(false);
                }}
                style={styles.picker}
                dropdownIconColor="#0077be"
              >
                <Picker.Item label="Select Subject" value="" />
                {subjects.map((sub, index) => (
                  <Picker.Item key={index} label={sub} value={sub} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Chapter Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chapter</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currentTask.chapter}
                onValueChange={(itemValue) => {
                  setCurrentTask({
                    ...currentTask,
                    chapter: itemValue,
                    subtopic: '',
                  });
                  setShowNewSubtopicInput(false);
                }}
                style={styles.picker}
                enabled={!!currentTask.subject}
                dropdownIconColor="#0077be"
              >
                <Picker.Item label="Select Chapter" value="" />
                {chapters.map((chap, index) => (
                  <Picker.Item key={index} label={chap} value={chap} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Subtopic Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Subtopic</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currentTask.subtopic}
                onValueChange={(itemValue) => {
                  if (itemValue === 'add_new') {
                    setShowNewSubtopicInput(true);
                    setCurrentTask({
                      ...currentTask,
                      subtopic: '',
                    });
                  } else {
                    setCurrentTask({
                      ...currentTask,
                      subtopic: itemValue,
                    });
                    setShowNewSubtopicInput(false);
                  }
                }}
                style={styles.picker}
                enabled={!!currentTask.chapter}
                dropdownIconColor="#0077be"
              >
                <Picker.Item label="Select Subtopic" value="" />
                {subtopics.map((sub, index) => (
                  <Picker.Item key={index} label={sub} value={sub} />
                ))}
                <Picker.Item label="+ Add New Subtopic" value="add_new" />
              </Picker>
            </View>
          </View>

          {/* Add New Subtopic Input */}
          {showNewSubtopicInput && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Subtopic</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new subtopic"
                placeholderTextColor="#90caf9"
                value={currentTask.newSubtopic}
                onChangeText={(text) => setCurrentTask({...currentTask, newSubtopic: text})}
              />
            </View>
          )}

          {/* Hours Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Study Hours</Text>
            <TextInput
              style={styles.input}
              placeholder="Estimated hours needed"
              placeholderTextColor="#90caf9"
              keyboardType="numeric"
              value={currentTask.hours}
              onChangeText={(text) => setCurrentTask({...currentTask, hours: text})}
            />
          </View>

          {/* Add Task Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        {tasks.length > 0 && (
          <View style={styles.taskListContainer}>
            <View style={styles.taskListHeader}>
              <Text style={styles.sectionTitle}>Your Study Tasks ({tasks.length})</Text>
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleSaveTasks}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Icon name="save" size={20} color="#fff" />
                    <Text style={styles.saveButtonText}>Save All</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={tasks}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.taskItem, item.completed && styles.completedTask]}>
                  <TouchableOpacity 
                    style={styles.checkbox} 
                    onPress={() => toggleTaskCompletion(item.id)}
                  >
                    <Icon 
                      name={item.completed ? "check-box" : "check-box-outline-blank"} 
                      size={24} 
                      color={item.completed ? "#4CAF50" : "#0077be"} 
                    />
                  </TouchableOpacity>
                  <View style={styles.taskDetails}>
                    <Text style={styles.taskSubject}>{item.subject}</Text>
                    <Text style={styles.taskChapter}>{item.chapter}</Text>
                    <Text style={styles.taskSubtopic}>{item.subtopic}</Text>
                    <Text style={styles.taskHours}>{item.hours} hours</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => removeTask(item.id)}
                  >
                    <Icon name="delete" size={24} color="#f44336" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
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
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'sans-serif-medium',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#e3f2fd',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0077be',
    fontFamily: 'sans-serif-medium',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0077be',
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bbdefb',
    borderRadius: 10,
    backgroundColor: '#e3f2fd',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#0077be',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbdefb',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#e3f2fd',
    color: '#0077be',
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#0077be',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#0077be',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  taskListContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#0077be',
  },
  completedTask: {
    opacity: 0.7,
    borderLeftColor: '#4CAF50',
  },
  checkbox: {
    marginRight: 15,
  },
  taskDetails: {
    flex: 1,
  },
  taskSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0077be',
    marginBottom: 3,
  },
  taskChapter: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 2,
  },
  taskSubtopic: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  taskHours: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0077be',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default AddTaskPage;