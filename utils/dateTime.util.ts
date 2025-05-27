export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const getWeekStartDate = (date = new Date()): Date => {
  const day = date.getDay();
  const diff = -day;
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() + diff);
  weekStart.setHours(5, 30, 0, 0);
  return weekStart;
};
export const getWeekEndDate = (date = new Date()): Date => {
  const weekStart = getWeekStartDate(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(18, 29, 59, 999);
  return weekEnd;
};
