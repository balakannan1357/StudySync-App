import { ITask } from "@/interfaces/weekPlan.interface";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  task: ITask | null;
  onStart: () => void;
  onPostpone: () => void;
  onClose: () => void;
}

const TaskActionModal = ({
  visible,
  task,
  onStart,
  onPostpone,
  onClose,
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
          <Text style={styles.text}>What would you like to do?</Text>

          <TouchableOpacity
            style={[styles.button, styles.start]}
            onPress={onStart}
          >
            <MaterialIcons name="play-arrow" size={24} color="#fff" />
            <Text style={styles.buttonText}>Start Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.postpone]}
            onPress={onPostpone}
          >
            <MaterialIcons name="schedule" size={24} color="#fff" />
            <Text style={styles.buttonText}>AD Hoc</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 5,
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
  text: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  start: {
    backgroundColor: "#4CAF50",
  },
  postpone: {
    backgroundColor: "#FF9800",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  close: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
});

export default TaskActionModal;
