import { TaskStatus, TaskType } from "@/enums/task.enum";
import { WeekDay } from "@/enums/weekDay.enum";
import { ICreatorBase } from "./creatorBase.interface";

export interface ITask {
  subTopicId: string;
  type: TaskType;
  status: TaskStatus;
  priority: number;
  duration: number;
  startTime: Date;
  endTime: Date;
  tags: string[];
}

export type IWeekTasks = Record<WeekDay, ITask[]>;

export interface IWeekPlan extends ICreatorBase {
  userId: string;
  tasks: IWeekTasks;
  weekStartDate: Date;
  weekEndDate: Date;
}
