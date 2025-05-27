import React from "react";
import { useColorScheme } from "react-native";
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
  TimelineProps,
} from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";

const INITIAL_TIME = { hour: 9, minutes: 0 };

interface CalendarViewProps {
  eventsByDate: { [key: string]: any[] };
  currentDate: string;
  onDateChanged: (date: string) => void;
  onTimelineLongPress: TimelineProps["onBackgroundLongPressOut"];
  onEventPress: TimelineProps["onEventPress"];
}

const CalendarView = ({
  eventsByDate,
  currentDate,
  onDateChanged,
  onTimelineLongPress,
  onEventPress,
}: CalendarViewProps) => {
  const colorScheme = useColorScheme();

  const calendarTheme: Theme = {
    backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
    calendarBackground: colorScheme === "dark" ? "#121212" : "#fff",

    dayTextColor: colorScheme === "dark" ? "#ffffff" : "#1C1C1C",
    arrowColor: colorScheme === "dark" ? "#ffffff" : "#1C1C1C",

    selectedDayBackgroundColor: colorScheme === "dark" ? "#fff" : "#000",
    selectedDayTextColor: colorScheme === "dark" ? "#000" : "#fff",

    textSectionTitleColor: colorScheme === "dark" ? "#ffffff" : "#1C1C1C",
    textSectionTitleDisabledColor: colorScheme === "dark" ? "#777" : "#ccc",
    textDisabledColor: colorScheme === "dark" ? "#777" : "#ccc",
    textInactiveColor: colorScheme === "dark" ? "#777" : "#ccc",

    todayBackgroundColor: "#ff6347",
    todayTextColor: "#fff",
    todayButtonTextColor: "#000",
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: false,
    onBackgroundLongPress: () => {},
    onBackgroundLongPressOut: onTimelineLongPress,
    onEventPress: onEventPress,
    unavailableHours: [
      { start: 0, end: 7 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 36,
    theme: calendarTheme,
  };

  // Unique keys for each component to re-render correctly
  const calendarKey = `${colorScheme}-calendar`;
  const expandableCalendarKey = `${colorScheme}-expandable`;
  const timelineListKey = `${colorScheme}-timeline`;

  return (
    <CalendarProvider
      date={currentDate}
      showTodayButton
      disabledOpacity={0.6}
      onDateChanged={(date, _) => onDateChanged(date)}
      theme={calendarTheme}
      key={calendarKey}
    >
      <ExpandableCalendar
        firstDay={0}
        theme={calendarTheme}
        key={expandableCalendarKey}
      />
      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        scrollToFirst
        showNowIndicator
        scrollToNow
        initialTime={INITIAL_TIME}
        key={timelineListKey}
      />
    </CalendarProvider>
  );
};

export default CalendarView;
