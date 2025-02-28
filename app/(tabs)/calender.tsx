import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useNavigation } from '@react-navigation/native';

const CalendarPage = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handle date selection
  const handleDateSelected = (date) => {
    setSelectedDate(date);
    // Navigate to the task page with the selected date
    navigation.navigate('TaskPage', { selectedDate: date.toISOString().split('T')[0] });
  };

  return (
    <View style={styles.container}>
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
        style={styles.calendar}
        calendarColor={'#fff'}
        calendarHeaderStyle={{ color: '#333' }}
        dateNumberStyle={{ color: '#333' }}
        dateNameStyle={{ color: '#333' }}
        highlightDateNumberStyle={{ color: '#fff' }}
        highlightDateNameStyle={{ color: '#fff' }}
        disabledDateNameStyle={{ color: '#ccc' }}
        disabledDateNumberStyle={{ color: '#ccc' }}
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default CalendarPage;