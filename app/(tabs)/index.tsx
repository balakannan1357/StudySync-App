import CalendarView from "@/components/calendarView";
import TaskActionModal from "@/components/taskActionModal";
import TimerModal from "@/components/timerModal";
import { useTimer } from "@/hooks/useTimer";
import { SubTopic } from "@/models/subTopic";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import NotifyButton from "@/components/notifyButton";
const mockSubtopics: SubTopic[] = [
  {
    subtopic_id: "1",
    subtopic_name: "Motion in a Straight Line",
    subject: "Physics",
    starttime: "09:30",
    endtime: "10:30",
    date: "2025-05-22",
    completed: false,
  },
];

const IndexScreen = () => {
  const [subtopics, setSubtopics] = useState<SubTopic[]>(mockSubtopics);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubTopic | null>(
    null
  );
  const [showActionModal, setShowActionModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [taskTimers, setTaskTimers] = useState<Record<string, number>>({});
  const [activeTimerStart, setActiveTimerStart] = useState<number | null>(null);
  const pendingConfirmation = useRef(false);
  const router = useRouter();

  const { seconds, start, stop, reset } = useTimer();

  useEffect(() => {
    if (
      !showTimerModal &&
      activeTimerStart !== null &&
      selectedSubtopic &&
      !pendingConfirmation.current
    ) {
      const duration = seconds;
      setTaskTimers((prev) => ({
        ...prev,
        [selectedSubtopic.subtopic_id]:
          (prev[selectedSubtopic.subtopic_id] || 0) + duration,
      }));
      reset();
      setActiveTimerStart(null);
    }
  }, [showTimerModal]);

  const handleSubtopicClick = (subtopic: SubTopic) => {
    setSelectedSubtopic(subtopic);
    setShowActionModal(true);
  };

  const startTimer = () => {
    if (selectedSubtopic) {
      reset();
      start();
      setActiveTimerStart(Date.now());
      setShowActionModal(false);
      setShowTimerModal(true);
    }
  };

  const completeTask = () => {
    stop();
    pendingConfirmation.current = true;
    if (selectedSubtopic) {
      Alert.alert("Confirmation", "Did you complete this task?", [
        {
          text: "No",
          onPress: () => {
            pendingConfirmation.current = false;
            setShowTimerModal(false);
            setSelectedSubtopic(null);
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setTaskTimers((prev) => ({
              ...prev,
              [selectedSubtopic.subtopic_id]:
                (prev[selectedSubtopic.subtopic_id] || 0) + seconds,
            }));
            const updated = subtopics.map((s) =>
              s.subtopic_id === selectedSubtopic.subtopic_id
                ? { ...s, completed: true }
                : s
            );
            setSubtopics(updated);
            pendingConfirmation.current = false;
            setShowTimerModal(false);
            setSelectedSubtopic(null);
            reset();
          },
        },
      ]);
    }
  };

  const postponeTask = () => {
    if (selectedSubtopic) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];
      const updated = subtopics.map((s) =>
        s.subtopic_id === selectedSubtopic.subtopic_id
          ? { ...s, date: tomorrowStr }
          : s
      );
      setSubtopics(updated);
    }
    setShowActionModal(false);
    setSelectedSubtopic(null);
  };

  const handleCreateEvent = (timeString: string, timeObject: any) => {
    // const hourString = `${(timeObject.hour + 1).toString().padStart(2, "0")}`;
    // const minutesString = `${timeObject.minutes.toString().padStart(2, "0")}`;

    // const newTask: SubTopic = {
    //   subtopic_id: Date.now().toString(),
    //   subtopic_name: "New Event",
    //   subject: "General",
    //   starttime: timeObject.hour + ":" + timeObject.minutes,
    //   endtime: hourString + ":" + minutesString,
    //   date: timeObject.date,
    //   completed: false,
    // };
    // setSubtopics((prev) => [...prev, newTask]);

    const hour = timeObject.hour;
    const minutes = timeObject.minutes;
    const date = timeObject.date;

    router.push({
      pathname: "/addTaskPage",
      params: {
        date,
        hour,
        minutes,
        from: "index", // optional flag
      },
    });
  };

  const handleEventPress = (event: any) => {
    const task = subtopics[event.index];
    if (task) {
      setSelectedSubtopic(task);
      reset();
      start();
      setActiveTimerStart(Date.now());
      setShowTimerModal(true);
    }
  };

  const getCurrentTimer = () => {
    if (selectedSubtopic) {
      return taskTimers[selectedSubtopic.subtopic_id] || 0;
    }
    return 0;
  };

  return (
    <>
      <View style={[styles.calendarContainer, { flex: 1 }]}>
        <CalendarView
          eventsByDate={subtopics.reduce((acc, s) => {
            if (!acc[s.date]) acc[s.date] = [];
            acc[s.date].push({
              start: `${s.date} ${s.starttime}:00`,
              end: `${s.date} ${s.endtime}:00`,
              title: s.subtopic_name,
              summary: s.subject,
              color: s.completed ? "#4CAF50" : undefined,
            });
            return acc;
          }, {} as Record<string, any[]>)}
          currentDate={selectedDate}
          onCreateEvent={handleCreateEvent}
          onApproveEvent={() => {}}
          onEventPress={handleEventPress}
        />
      </View>

      <Link href="/addTaskPage" asChild>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Link>

      <TaskActionModal
        visible={showActionModal}
        subtopic={selectedSubtopic}
        onStart={startTimer}
        onPostpone={postponeTask}
        onClose={() => setShowActionModal(false)}
      />

      <TimerModal
        visible={showTimerModal}
        subtopic={selectedSubtopic}
        onClose={() => setShowTimerModal(false)}
        onComplete={completeTask}
        timerRunning={true}
        timeSpent={seconds + getCurrentTimer()}
      />
      <NotifyButton/>
    </>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  calendarContainer: {
    height: 82,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2da9e9",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default IndexScreen;
