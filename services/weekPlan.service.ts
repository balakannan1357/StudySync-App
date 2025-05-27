import { ENDPOINTS } from "@/config";
import { IWeekPlan } from "@/interfaces/weekPlan.interface";
import axiosClient from "@/services/axiosClient.service";

const weekPlanService = {
  getById: (id: string) =>
    axiosClient.get(ENDPOINTS.weekPlan.getById(id)).then((res) => res.data),

  getByWeekStartDate: (date: string) =>
    axiosClient
      .get(ENDPOINTS.weekPlan.getByWeekStartDate(date))
      .then((res) => res.data),

  getAll: () =>
    axiosClient.get(ENDPOINTS.weekPlan.getAll).then((res) => res.data),

  add: (data: IWeekPlan) =>
    axiosClient.post(ENDPOINTS.weekPlan.add, data).then((res) => res.data),

  update: (id: string, data: IWeekPlan) =>
    axiosClient
      .put(ENDPOINTS.weekPlan.update(id), data)
      .then((res) => res.data),

  delete: (weekPlanId: string) =>
    axiosClient
      .delete(ENDPOINTS.weekPlan.delete(weekPlanId))
      .then((res) => res.data),
};

export default weekPlanService;
