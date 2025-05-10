import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Redirect } from 'expo-router';
export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index" // This corresponds to the file `index.tsx` in the `tabs/` folder
        options={{
          title: 'TaskApp', // This is the custom title displayed in the tab
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile" // This corresponds to the file `profile.tsx` in the `tabs/` folder
        options={{
          title: 'Profile', // This is the custom title displayed in the tab
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />

    </Tabs>
  );
}
