import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
  const user = {
    name: "Sriram",
    dob: "25/11/2001",
    phone: "+91 9876543210",
    email: "sri@sri.com",
    location: "Chennai, India",
    school: "ABC School of Excellence",
  };

  return (
    <LinearGradient
      colors={["#0077be", "#00a8e8"]} // Sea blue gradient from darker to lighter
      style={styles.gradientContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.overlay}>
        {/* Profile Picture with Inner Border */}
        <View style={styles.avatarBorder}>
          <Image
            source={require("../../assets/images/sriramPhoto.png")} // ✅ Local Image
            style={styles.avatar}
          />
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Name:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>DOB:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{user.dob}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{user.phone}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Location:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{user.location}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>School:</Text>
          <View style={styles.valueBox}>
            <Text style={styles.infoValue}>{user.school}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white overlay
    padding: 20,
    alignItems: "center",
  },
  avatarBorder: {
    backgroundColor: "#ccc", // Gray background for the inner border
    padding: 5, // Inner border thickness
    borderRadius: 85, // Half of width/height to make it circular
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  infoContainer: {
    flexDirection: "row", // Align label and value horizontally
    alignItems: "center", // Center vertically
    marginTop: 15,
    width: "90%",
  },
  infoLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
    marginRight: 10, // Space between label and value box
  },
  valueBox: {
    backgroundColor: "#ccc", // Gray background for the value box
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take up remaining space
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
  },
});

export default ProfileScreen;
