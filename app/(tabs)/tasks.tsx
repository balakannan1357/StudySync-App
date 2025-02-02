import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TaskPage = () => {
  const [priority, setPriority] = useState<number | null>(null); // State for selected priority
  const [isFocus, setIsFocus] = useState(false); // State for dropdown focus

  const task = {
    taskName: 'Physics - Chapter 1',
    subTopic: 'Motion in a Straight Line',
    subject: 'Physics',
    description:
      'This chapter covers the basics of motion, including displacement, velocity, and acceleration. Focus on understanding the graphs and solving numerical problems.',
  };

  // Priority options for the dropdown
  const priorityOptions = [
    { label: 'Urgent (1)', value: 1 },
    { label: 'High (2)', value: 2 },
    { label: 'Medium (3)', value: 3 },
    { label: 'Low (4)', value: 4 },
    { label: 'Minimal (5)', value: 5 },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpg')} // ✅ Same Background Image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Task Name */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Task Name:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{task.taskName}</Text>
          </View>
        </View>

        {/* Sub Topic */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Sub Topic:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{task.subTopic}</Text>
          </View>
        </View>

        {/* Subject */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Subject:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{task.subject}</Text>
          </View>
        </View>

        {/* Priority Dropdown */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Priority:</Text>
          <View style={[styles.valueBox, { padding: 0 }]}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: '#007AFF' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={priorityOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select priority' : '...'}
              value={priority}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setPriority(item.value);
                setIsFocus(false);
              }}
              itemTextStyle={styles.itemTextStyle} // Custom text style for dropdown items
              itemContainerStyle={styles.itemContainerStyle} // Custom container style for dropdown items
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Description:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{task.description}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

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
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row', // Align label and value horizontally
    alignItems: 'center', // Center vertically
    marginTop: 15,
    width: '90%',
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginRight: 10, // Space between label and value box
  },
  valueBox: {
    backgroundColor: '#ccc', // Gray background for the value box
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take up remaining space
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40, // Height of the dropdown
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    fontSize: 14,
    color: '#333', // Text color for dropdown items
  },
  itemContainerStyle: {
    backgroundColor: '#ccc', // Gray background for dropdown items
    borderRadius: 5,
    marginVertical: 2, // Space between dropdown items
  },
});

export default TaskPage;