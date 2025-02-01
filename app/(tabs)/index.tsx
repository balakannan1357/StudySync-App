import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page!</Text>
      <View style={styles.buttonContainer}>
        <Link href="/profile" asChild>
          <Button title="Go to Profile" />
        </Link>
        <Link href="/tasks" asChild>
          <Button title="Go to Tasks" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
});