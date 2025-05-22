import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
  TimelineProps,
} from "react-native-calendars";

const INITIAL_TIME = { hour: 9, minutes: 0 };

interface CalendarViewProps {
  eventsByDate: { [key: string]: any[] };
  onCreateEvent: TimelineProps["onBackgroundLongPress"];
  onApproveEvent: TimelineProps["onBackgroundLongPressOut"];
  onEventPress: TimelineProps["onEventPress"];
  currentDate: string;
}

const CalendarView = ({
  eventsByDate,
  onCreateEvent,
  onApproveEvent,
  onEventPress,
  currentDate,
}: CalendarViewProps) => {
  const timelineProps: Partial<TimelineProps> = {
    format24h: false,
    onBackgroundLongPress: onCreateEvent,
    onBackgroundLongPressOut: onApproveEvent,
    onEventPress: onEventPress,
    unavailableHours: [
      { start: 0, end: 7 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 36,
  };

  return (
    <CalendarProvider date={currentDate} showTodayButton disabledOpacity={0.6}>
      <ExpandableCalendar firstDay={0} />
      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        scrollToFirst
        showNowIndicator
        scrollToNow
        initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
};

export default CalendarView;
