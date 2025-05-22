import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SubTopic } from "@/models/subTopic";

interface Props {
  subtopic: SubTopic;
}

const SubTopicCard = ({ subtopic }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{subtopic.subtopic_name}</Text>
        {subtopic.completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>Done</Text>
          </View>
        )}
      </View>
      <Text style={styles.subject}>{subtopic.subject}</Text>
      <View style={styles.timeContainer}>
        <MaterialIcons name="schedule" size={16} color="#2da9e9" />
        <Text style={styles.time}>
          {subtopic.starttime} - {subtopic.endtime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  subject: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  time: {
    fontSize: 14,
    color: "#2da9e9",
    marginLeft: 5,
    fontWeight: "500",
  },
  completedBadge: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  completedText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SubTopicCard;
