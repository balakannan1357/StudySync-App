import { WeekDay } from "@/enums/weekDay.enum";
import userService from "@/services/user.service";
import { IUser, ITimeSlot } from "@/interfaces/user.interface";

export async function saveTimeSlots(
  timeSlots: Record<string, string[]>,
  userId: string
): Promise<void> {
  try {
    console.log("UserId:", userId);
    console.log("Original TimeSlots:", timeSlots);

    const parsedStudyTime: Record<WeekDay, ITimeSlot[]> = {} as any;

    Object.entries(timeSlots).forEach(([day, slots]) => {
      parsedStudyTime[day as WeekDay] = slots.map((slot) => {
        const [start, end] = slot.split(" - ");
        return { start, end };
      });
    });

    console.log("Parsed StudyTime:", parsedStudyTime);

    const user: IUser = await userService.getById(userId);
    console.log("Fetched user from DB:", user);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser: IUser = {
      ...user,
      studyTime: parsedStudyTime,
    };

    console.log("User object to update:", updatedUser);

    const result = await userService.update(userId, updatedUser);
    console.log("Update result:", result);

  } catch (error) {
    console.error("Failed to save time slots:", error);
    throw error;
  }
}
