// components/NotifyButton.tsx
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useEffect } from "react";
import { Button, Platform } from "react-native";

export default function NotifyButton() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }

  async function sendNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello 👋",
        body: "This is a local push notification!",
      },
      trigger: null, // Send immediately
    });
  }

  return <Button title="Send Notification" onPress={sendNotification} />;
}
