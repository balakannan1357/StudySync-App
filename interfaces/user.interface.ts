import { TimePreference } from "@/enums/timePreference.enum";
import { WeekDay } from "@/enums/weekDay.enum";
import { ICreatorBase } from "./creatorBase.interface";

export interface ITimeSlot {
  start: string;
  end: string;
}

export type IStudyTime = Record<WeekDay, ITimeSlot[]>;

export interface IUser extends ICreatorBase {
  name: string;
  email: string;
  phoneNumber: string;
  age: number;
  school: string;
  area: string;
  timePreference: TimePreference;
  studyTime: IStudyTime;
  password: string;
}
