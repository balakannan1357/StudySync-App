import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../context/AuthContext";

type TabBarIconProps = {
  readonly color: string;
};

const renderHomeTabBarIcon = ({ color }: TabBarIconProps) => (
  <FontAwesome name="home" size={24} color={color} />
);
const renderProfileTabBarIcon = ({ color }: TabBarIconProps) => (
  <FontAwesome name="user" size={24} color={color} />
);

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "TaskApp",
          tabBarIcon: renderHomeTabBarIcon,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: renderProfileTabBarIcon,
        }}
      />
      <Tabs.Screen
        name="addTaskPage"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
