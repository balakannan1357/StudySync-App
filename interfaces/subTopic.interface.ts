import { ICreatorBase } from "./creatorBase.interface";

export interface ISubTopic extends ICreatorBase {
  name: string;
  subject: string;
  noOfHours: number;
  noOfSessions: number;
}
