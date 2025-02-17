// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, Image, ActivityIndicator } from 'react-native';
// import { Link } from 'expo-router';
// import { fetchProfile } from '../../services/profileService';

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadProfileData = async () => {
//       try {
//         const profileData = await fetchProfile();
//         setUser(profileData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfileData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Error: {error}</Text>
//         <Link href="/" asChild>
//           <Button title="Go Back to Home" />
//         </Link>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
//       <Text style={styles.name}>{user?.name}</Text>
//       <Text style={styles.email}>{user?.email}</Text>
//       <Text style={styles.location}>{user?.location}</Text>
//       <Link href="/" asChild>
//         <Button title="Go Back to Home" />
//       </Link>
//     </View>
//   );
// }

// // Keep the same styles as before
// const styles = StyleSheet.create({ ... });