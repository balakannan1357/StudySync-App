import { Picker } from "@react-native-picker/picker";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

// Mock data structure
const mockData = {
  Chemistry: {
    Chapter1: ["Atomic Structure", "Chemical Bonding"],
    Chapter2: ["Thermodynamics", "Chemical Equilibrium"],
  },
  Physics: {
    Chapter1: ["Motion in a Straight Line", "Newton's Laws of Motion"],
    Chapter2: ["Work, Energy, and Power", "Gravitation"],
  },
  Mathematics: {
    Chapter1: ["Algebra", "Trigonometry"],
    Chapter2: ["Calculus", "Probability"],
  },
};

const AddTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    subject: "",
    chapter: "",
    subtopic: "",
    newSubtopic: "",
    hours: "",
  });
  const [showNewSubtopicInput, setShowNewSubtopicInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const subjects = Object.keys(mockData);
  const chapters = currentTask.subject
    ? Object.keys(mockData[currentTask.subject])
    : [];
  const subtopics =
    currentTask.subject && currentTask.chapter
      ? mockData[currentTask.subject][currentTask.chapter]
      : [];

  const handleAddTask = () => {
    const { subject, chapter, subtopic, newSubtopic, hours } = currentTask;

    if (!subject) {
      Alert.alert("Error", "Please select a subject");
      return;
    }
    if (!chapter) {
      Alert.alert("Error", "Please select a chapter");
      return;
    }
    if (!subtopic && !newSubtopic) {
      Alert.alert("Error", "Please select or add a subtopic");
      return;
    }
    if (!hours) {
      Alert.alert("Error", "Please enter the number of hours");
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
      subject: "",
      chapter: "",
      subtopic: "",
      newSubtopic: "",
      hours: "",
    });
    setShowNewSubtopicInput(false);
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== taskId));
          },
          style: "destructive",
        },
      ]
    );
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSaveTasks = async () => {
    if (tasks.length === 0) {
      Alert.alert("No Tasks", "Please add at least one task to save");
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert("Success", "Your tasks have been saved successfully!");
      setTasks([]);
    } catch (error) {
      Alert.alert("Error", "Failed to save tasks. Please try again.");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LinearGradient
      colors={["#e6f7ff", "#b3e0ff", "#80c9ff"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Study Planner</Text>
          <Text style={styles.subHeaderText}>
            Organize your learning journey
          </Text>
        </View>

        {/* Add Task Card */}
        <BlurView intensity={90} tint="light" style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Icon name="add-task" size={24} color="#fff" />
            </View>
            <Text style={styles.sectionTitle}>Add New Task</Text>
          </View>

          {/* Subject Dropdown */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Icon name="menu-book" size={20} color="#2da9e9" />
              <Text style={styles.label}>Subject</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currentTask.subject}
                onValueChange={(itemValue) => {
                  setCurrentTask({
                    ...currentTask,
                    subject: itemValue,
                    chapter: "",
                    subtopic: "",
                  });
                  setShowNewSubtopicInput(false);
                }}
                style={styles.picker}
                dropdownIconColor="#2da9e9"
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
            <View style={styles.labelContainer}>
              <Icon name="library-books" size={20} color="#2da9e9" />
              <Text style={styles.label}>Chapter</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currentTask.chapter}
                onValueChange={(itemValue) => {
                  setCurrentTask({
                    ...currentTask,
                    chapter: itemValue,
                    subtopic: "",
                  });
                  setShowNewSubtopicInput(false);
                }}
                style={styles.picker}
                enabled={!!currentTask.subject}
                dropdownIconColor="#2da9e9"
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
            <View style={styles.labelContainer}>
              <Icon name="topic" size={20} color="#2da9e9" />
              <Text style={styles.label}>Subtopic</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currentTask.subtopic}
                onValueChange={(itemValue) => {
                  if (itemValue === "add_new") {
                    setShowNewSubtopicInput(true);
                    setCurrentTask({
                      ...currentTask,
                      subtopic: "",
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
                dropdownIconColor="#2da9e9"
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
              <View style={styles.labelContainer}>
                <Icon name="create" size={20} color="#2da9e9" />
                <Text style={styles.label}>New Subtopic</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter new subtopic"
                placeholderTextColor="#90caf9"
                value={currentTask.newSubtopic}
                onChangeText={(text) =>
                  setCurrentTask({ ...currentTask, newSubtopic: text })
                }
              />
            </View>
          )}

          {/* Hours Input */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Icon name="access-time" size={20} color="#2da9e9" />
              <Text style={styles.label}>Study Hours</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Estimated hours needed"
              placeholderTextColor="#90caf9"
              keyboardType="numeric"
              value={currentTask.hours}
              onChangeText={(text) =>
                setCurrentTask({ ...currentTask, hours: text })
              }
            />
          </View>

          {/* Add Task Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTask}
            activeOpacity={0.7}
          >
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Task List */}
        {tasks.length > 0 ? (
          <BlurView
            intensity={90}
            tint="light"
            style={styles.taskListContainer}
          >
            <View style={styles.taskListHeader}>
              <View style={styles.taskListTitle}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#4CAF50" }]}
                >
                  <Icon name="list-alt" size={20} color="#fff" />
                </View>
                <Text style={styles.sectionTitle}>
                  Your Tasks ({tasks.length})
                </Text>
              </View>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveTasks}
                disabled={isSaving}
                activeOpacity={0.7}
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
                <View
                  style={[
                    styles.taskItem,
                    item.completed && styles.completedTask,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleTaskCompletion(item.id)}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name={
                        item.completed
                          ? "check-circle"
                          : "radio-button-unchecked"
                      }
                      size={24}
                      color={item.completed ? "#4CAF50" : "#2da9e9"}
                    />
                  </TouchableOpacity>
                  <View style={styles.taskDetails}>
                    <View style={styles.taskSubjectRow}>
                      <Text style={styles.taskSubject}>{item.subject}</Text>
                      <View style={styles.timeBadge}>
                        <Icon name="access-time" size={14} color="#fff" />
                        <Text style={styles.taskHours}>{item.hours}h</Text>
                      </View>
                    </View>
                    <Text style={styles.taskChapter}>{item.chapter}</Text>
                    <Text style={styles.taskSubtopic}>{item.subtopic}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteTask(item.id)}
                    activeOpacity={0.7}
                  >
                    <Icon name="delete-outline" size={24} color="#f44336" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </BlurView>
        ) : (
          <BlurView intensity={90} tint="light" style={styles.emptyState}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: "rgba(45, 169, 233, 0.2)", borderWidth: 0 },
              ]}
            >
              <Icon name="assignment" size={40} color="#2da9e9" />
            </View>
            <Text style={styles.emptyStateText}>No tasks added yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first task above
            </Text>
          </BlurView>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

// ... (keep the same styles as before)

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#2da9e9",
    fontFamily: "sans-serif-medium",
    marginBottom: 8,
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },

  subHeaderText: {
    fontSize: 16,
    color: "#555",
    fontFamily: "sans-serif",
  },
  card: {
    borderRadius: 25,
    padding: 25,
    marginBottom: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2da9e9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2da9e9",
    fontFamily: "sans-serif-medium",
  },
  inputGroup: {
    marginBottom: 22,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginLeft: 10,
    fontFamily: "sans-serif-medium",
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: "#bbdefb",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#2da9e9",
    fontFamily: "sans-serif",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#bbdefb",
    borderRadius: 15,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#2da9e9",
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#2da9e9",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 8,
    shadowColor: "#2da9e9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
    fontFamily: "sans-serif-medium",
  },
  taskListContainer: {
    borderRadius: 25,
    padding: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  taskListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  taskListTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    boxShadow: "0px 4px 6px rgba(76, 175, 80, 0.3)",
    elevation: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    fontFamily: "sans-serif-medium",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  completedTask: {
    opacity: 0.7,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  checkbox: {
    marginRight: 16,
  },
  taskDetails: {
    flex: 1,
  },
  taskSubjectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  taskSubject: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2da9e9",
    fontFamily: "sans-serif-medium",
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2da9e9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  taskHours: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 5,
    fontFamily: "sans-serif-medium",
  },
  taskChapter: {
    fontSize: 15,
    color: "#555",
    marginBottom: 3,
    fontFamily: "sans-serif",
  },
  taskSubtopic: {
    fontSize: 14,
    color: "#777",
    fontFamily: "sans-serif",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  emptyStateText: {
    fontSize: 20,
    color: "#555",
    marginTop: 20,
    fontWeight: "500",
    fontFamily: "sans-serif-medium",
  },
  emptyStateSubtext: {
    fontSize: 15,
    color: "#777",
    marginTop: 8,
    fontFamily: "sans-serif",
  },
});

export default AddTaskPage;
