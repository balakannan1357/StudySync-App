import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="tasks"
        options={{
          title: 'bals',
          tabBarIcon: ({ color }) => <FontAwesome name="tasks" size={24} color={color} />,
        }}
      /> */}
    </Tabs>
  );
}