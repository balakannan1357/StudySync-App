import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import {LinearGradient} from 'expo-linear-gradient';
const ProfileCreationScreen = ({ navigation }) => {
  // State to store user input
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState(''); // State for password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [profilePic, setProfilePic] = useState(null); // State for profile picture

  // Function to handle profile picture upload
  const handleUploadProfilePic = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to upload a profile picture.');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1, // Highest quality
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri); // Set the selected image URI
    }
  };

  // Function to handle profile creation
  const handleCreateProfile = () => {
    console.log('chummaaa'); // Debugging
    Alert.alert('Success', 'Profile created successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Profile') },
    ]); // Debugging
    console.log('Password:', password, password.length); // Debugging
    console.log('Confirm Password:', confirmPassword); // Debugging
  
    // Validate mandatory fields
    if (!phone || !email || !password || !confirmPassword) {
      console.log('Missing required fields!'); // Debugging
      Alert.alert('Error', 'Phone, Email, and Password are mandatory fields.');
      return;
    }
  
    // Basic validation for email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('Invalid email address!'); // Debugging
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
  
    // Basic validation for phone number
    if (!/^\d{10}$/.test(phone)) {
      console.log('Invalid phone number!'); // Debugging
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
  
    // Password validation
    if (password.length < 8) {
      console.log('Password too short!'); // Debugging
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }
  
    if (password !== confirmPassword) {
      console.log('Passwords do not match!'); // Debugging
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    console.log('Form is valid, proceeding to profile creation...');
    
    // Save profile data (you can replace this with your actual save logic)
    const userProfile = {
      name,
      dob,
      phone,
      email,
      location,
      school,
      password, // Include the password
      profilePic, // Include the profile picture URI
    };
  
    // Navigate to the ProfileScreen or save data to storage
    Alert.alert('Success', 'Profile created successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Profile') },
    ]);
  };
  

  return (
    <LinearGradient
    colors={['#0077be', '#00a8e8']}  // Sea blue gradient from darker to lighter
              style={styles.gradientContainer}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
      <View style={styles.overlay}>
        {/* Profile Picture Placeholder */}
        <TouchableOpacity onPress={handleUploadProfilePic}>
          <View style={styles.avatarBorder}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.avatar} />
            ) : (
              <Image
                source={require('../../assets/images/sriramPhoto.png')} // Default placeholder image
                style={styles.avatar}
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>DOB:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={dob}
            onChangeText={setDob}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Location:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>School:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your school"
            value={school}
            onChangeText={setSchool}
          />
        </View>

        {/* Password Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry // Hide password text
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry // Hide password text
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleCreateProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    alignItems: 'center',
  },
  avatarBorder: {
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 85,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    width: '90%',
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginRight: 10,
    width: 120, // Increased width for longer labels
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileCreationScreen;