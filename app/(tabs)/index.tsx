import CalendarView from "@/components/calendarView";
import TaskActionModal from "@/components/taskActionModal";
import TimerModal from "@/components/timerModal";
import { TaskStatus } from "@/enums/task.enum";
import { WeekDay } from "@/enums/weekDay.enum";
import { useTimer } from "@/hooks/useTimer";
import { ITask, IWeekPlan } from "@/interfaces/weekPlan.interface";
import weekPlanService from "@/services/weekPlan.service";
import { getWeekEndDate, getWeekStartDate } from "@/utils/dateTime.util";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

const dayIndexMap: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const IndexScreen = () => {
  const [userId, setUserId] = useState<string>("");
  const [weekPlan, setWeekPlan] = useState<IWeekPlan | null>(null);
  const [events, setEvents] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [weekStartDate, setWeekStartDate] = useState<Date>(getWeekStartDate());
  const [selectedTask, setSelectedTask] = useState<{
    weekDay: WeekDay;
    task: ITask;
  } | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [taskTimers, setTaskTimers] = useState<Record<string, number>>({});
  const [activeTimerStart, setActiveTimerStart] = useState<number | null>(null);

  const pendingConfirmation = useRef(false);
  const { seconds, start, stop, reset } = useTimer();
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: _,
    isError,
    error,
  } = useQuery<IWeekPlan>({
    queryKey: ["weekPlan", weekStartDate.toISOString()],
    queryFn: () => fetchWeekPlan(weekStartDate.toISOString()),
    enabled: !!userId,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = (await AsyncStorage.getItem("userId")) || "user-123";
      setUserId(userId);
    };

    fetchUserId();
  }, []);
  useEffect(() => {
    if (!weekPlan) return;

    const events: any = {};
    for (const [day, tasks] of Object.entries(weekPlan.tasks)) {
      const dayIndex = dayIndexMap[day.toLowerCase()];
      const date = new Date(weekPlan.weekStartDate);
      date.setUTCDate(date.getUTCDate() + dayIndex);
      const dateKey = date.toISOString().split("T")[0];

      events[dateKey] = tasks.map((task) => ({
        id: task.subTopicId,
        start: task.startTime,
        end: task.endTime,
        title: `Task: ${task.subTopicId}`,
        summary: `${task.type} - ${task.status} (${task.priority})`,
        color: task.status === TaskStatus.COMPLETED ? "green" : "blue",
      }));
    }

    setEvents(events);
  }, [weekPlan]);
  useEffect(() => {
    if (isError) {
      console.error("Error fetching week plan:", error);
    }
  }, [isError, error]);
  useEffect(() => {
    if (
      !showTimerModal &&
      activeTimerStart !== null &&
      selectedTask &&
      !pendingConfirmation.current
    ) {
      const duration = seconds;
      setTaskTimers((prev) => ({
        ...prev,
        [selectedTask.task.subTopicId]:
          (prev[selectedTask.task.subTopicId] || 0) + duration,
      }));
      reset();
      setActiveTimerStart(null);
    }
  }, [showTimerModal]);

  const fetchWeekPlan = async (selectedDate: string) => {
    if (!selectedDate) throw new Error("Selected Date is required");
    const data = await weekPlanService.getByWeekStartDate(selectedDate);
    setWeekPlan(data);
    return data;
  };
  const updateWeekPlan = (weekPlan: IWeekPlan) => {
    weekPlanService
      .update(weekPlan._id, weekPlan)
      .then((updatedData: IWeekPlan) => {
        queryClient.setQueryData(
          ["weekPlan", weekStartDate.toISOString()],
          updatedData
        );
        setWeekPlan(updatedData);
      })
      .catch((err: any) => {
        console.error("Failed to update task status:", err);
      });
  };

  const getCurrentTimer = () => {
    if (selectedTask) {
      return taskTimers[selectedTask.task.subTopicId] || 0;
    }
    return 0;
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const currentDateObj = new Date(date);
    const selectedDateObj = new Date(selectedDate);

    const weekStart = getWeekStartDate(currentDateObj);
    const weekEnd = getWeekEndDate(currentDateObj);

    if (selectedDateObj < weekStart || selectedDateObj > weekEnd) {
      setWeekStartDate(weekStart);
    }
  };
  const handleEventPress = (event: any) => {
    if (!weekPlan || !event) return;

    const dayIndex = new Date(event.start).getDay();
    const weekDay = Object.values(WeekDay)[dayIndex];
    const task = weekPlan.tasks[weekDay]?.find(
      (t: ITask) => t.subTopicId === event.id
    );

    if (task) {
      setSelectedTask({ weekDay, task });
      setShowActionModal(true);
    }
  };

  const onStart = () => {
    if (!selectedTask) return;

    setShowActionModal(false);
    reset();
    start();
    setActiveTimerStart(Date.now());
    setShowTimerModal(true);
  };
  const onPostpone = () => {
    setShowActionModal(false);

    if (!selectedTask || !weekPlan) return;

    const nextDayIndex =
      (Object.values(WeekDay).indexOf(selectedTask.weekDay) + 1) % 7;
    const nextDay = Object.values(WeekDay)[nextDayIndex];

    selectedTask.task.startTime = new Date(selectedTask.task.startTime);
    selectedTask.task.endTime = new Date(selectedTask.task.endTime);

    selectedTask.task.startTime.setDate(
      selectedTask.task.startTime.getDate() + 1
    );
    selectedTask.task.endTime.setDate(selectedTask.task.endTime.getDate() + 1);

    const updatedWeekPlan: IWeekPlan = {
      ...weekPlan,
      tasks: {
        ...weekPlan.tasks,
        [selectedTask.weekDay]: weekPlan.tasks[selectedTask.weekDay].filter(
          (task) => task.subTopicId !== selectedTask.task.subTopicId
        ),
      },
    };
    updatedWeekPlan.tasks[nextDay].push(selectedTask.task);

    updateWeekPlan(updatedWeekPlan);
    setSelectedTask(null);
  };

  const onComplete = () => {
    stop();
    pendingConfirmation.current = true;
    if (selectedTask) {
      Alert.alert("Confirmation", "Did you complete this task?", [
        {
          text: "No",
          onPress: handleTaskCompletionCancelled,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: handleTaskCompletionConfirmed,
        },
      ]);
    }
  };
  const handleTaskCompletionCancelled = () => {
    pendingConfirmation.current = false;
    setShowTimerModal(false);
    setSelectedTask(null);
  };
  const handleTaskCompletionConfirmed = () => {
    if (!weekPlan || !selectedTask) return;

    setTaskTimers((prev) => ({
      ...prev,
      [selectedTask.task.subTopicId]:
        (prev[selectedTask.task.subTopicId] || 0) + seconds,
    }));

    selectedTask.task.status = TaskStatus.COMPLETED;
    const updatedWeekPlan: IWeekPlan = {
      ...weekPlan,
      tasks: {
        ...weekPlan.tasks,
        [selectedTask.weekDay]: weekPlan.tasks[selectedTask.weekDay].map(
          (task) =>
            task.subTopicId === selectedTask.task.subTopicId
              ? selectedTask.task
              : task
        ),
      },
    };

    updateWeekPlan(updatedWeekPlan);
    pendingConfirmation.current = false;
    setShowTimerModal(false);
    setSelectedTask(null);
    reset();
  };

  return (
    <>
      <View style={[styles.calendarContainer, { flex: 1 }]}>
        <CalendarView
          eventsByDate={events}
          currentDate={selectedDate}
          onDateChanged={handleDateChange}
          onTimelineLongPress={() => {}}
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
        task={selectedTask?.task || null}
        onStart={onStart}
        onPostpone={onPostpone}
        onClose={() => setShowActionModal(false)}
      />

      <TimerModal
        visible={showTimerModal}
        task={selectedTask?.task || null}
        onClose={() => setShowTimerModal(false)}
        onComplete={onComplete}
        timerRunning={true}
        timeSpent={seconds + getCurrentTimer()}
      />
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
    backgroundColor: "#ff6347",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default IndexScreen;
