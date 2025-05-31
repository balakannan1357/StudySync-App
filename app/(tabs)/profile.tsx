import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

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
      colors={["#0077be", "#00a8e8"]}
      style={styles.gradientContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Profile Picture with Inner Border */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image
                source={require("../../assets/images/sriramPhoto.png")}
                style={styles.avatar}
              />
            </View>
          </View>

          {/* User Info */}
          <View style={styles.infoSection}>
            {Object.entries(user).map(([key, value]) => (
              <View style={styles.infoContainer} key={key}>
                <Text style={styles.infoLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Text>
                <View style={styles.valueBox}>
                  <Text style={styles.infoValue}>{value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarBorder: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 8,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#fff",
  },
  infoSection: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20, // Added some bottom margin
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  infoLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#0077be",
    width: 90,
  },
  valueBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(0, 119, 190, 0.1)",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileScreen;