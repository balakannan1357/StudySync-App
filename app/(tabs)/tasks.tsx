import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Text style={styles.text}>Name: John Doe</Text>
      <Text style={styles.text}>Email: john.doe@example.com</Text>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});