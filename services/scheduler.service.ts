export const scheduleTasks = (availability: any, tasks: any) => {
  const schedule: any = {};
  let taskIndex = 0;

  for (const day in availability) {
    schedule[day] = [];
    let slots = availability[day];

    for (const slot of slots) {
      let startTime = convertToMinutes(slot.startTime);
      let endTime = convertToMinutes(slot.endTime);

      while (startTime < endTime && taskIndex < tasks.length) {
        const task = tasks[taskIndex];
        const taskDuration = task.duration;

        if (startTime + taskDuration <= endTime) {
          schedule[day].push({
            taskId: task.taskId,
            startTime: convertToTime(startTime),
            endTime: convertToTime(startTime + taskDuration),
          });
          startTime += taskDuration;
          taskIndex++;
        } else {
          const partialDuration = endTime - startTime;
          schedule[day].push({
            taskId: task.taskId,
            startTime: convertToTime(startTime),
            endTime: convertToTime(endTime),
          });
          task.duration -= partialDuration;
          break;
        }
      }
    }
  }

  return schedule;
};

const convertToMinutes = (time: any) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const convertToTime = (minutes: any) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};
