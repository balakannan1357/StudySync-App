import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <CalendarStrip
        style={styles.calendar}
        calendarColor={"#fff"}
        calendarHeaderStyle={{ color: "#333" }}
        dateNumberStyle={{ color: "#333" }}
        dateNameStyle={{ color: "#333" }}
        highlightDateNumberStyle={{ color: "#fff" }}
        highlightDateNameStyle={{ color: "#fff" }}
        disabledDateNameStyle={{ color: "#ccc" }}
        disabledDateNumberStyle={{ color: "#ccc" }}
        iconContainer={{ flex: 0.1 }}
      />
      <Text style={styles.text}>Select a date to view tasks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default CalendarScreen;
