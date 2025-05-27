import { ITask } from "@/interfaces/weekPlan.interface";
import { formatTime } from "@/utils/dateTime.util";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  task: ITask | null;
  onClose: () => void;
  onComplete: () => void;
  timerRunning: boolean;
  timeSpent: number;
}

const TimerModal = ({
  visible,
  task,
  onClose,
  onComplete,
  timerRunning,
  timeSpent,
}: Props) => {
  if (!task) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{task.subTopicId}</Text>
          <Text style={styles.subtitle}>
            {task.type} - {task.tags}
          </Text>
          <View style={styles.divider} />

          <View style={styles.timeInfoContainer}>
            <View style={styles.timeInfo}>
              <MaterialIcons name="access-time" size={20} color="#555" />
              <Text style={styles.timeText}>
                Planned: {task.duration} hours
              </Text>
            </View>
          </View>

          {timerRunning && (
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>Time Spent:</Text>
              <Text style={styles.timerText}>{formatTime(timeSpent)}</Text>
            </View>
          )}

          {timerRunning && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={onComplete}
            >
              <MaterialIcons name="check-circle" size={24} color="#fff" />
              <Text style={styles.completeText}>Mark as Completed</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "85%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2da9e9",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  timeInfoContainer: {
    marginBottom: 20,
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 8,
  },
  timerContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  timerLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  timerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2da9e9",
  },
  completeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2da9e9",
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },
  completeText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  close: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
});

export default TimerModal;
