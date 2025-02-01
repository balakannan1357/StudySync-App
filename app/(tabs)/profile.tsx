import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Link } from 'expo-router';

export default function ProfilePage() {
  const user = {
    name: 'Sriram ',
    email: 'sri@sri.com',
    location: ' chennai |',
    
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}

      {/* User Information */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.bio}>{user.location}</Text>

      {/* Button to Navigate Back to Home */}
      <Link href="/" asChild>
        <Button title="Go Back to Home" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888',
  },
});