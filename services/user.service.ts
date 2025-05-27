import { ENDPOINTS } from "@/config";
import { IUser } from "@/interfaces/user.interface";
import axiosClient from "@/services/axiosClient.service";

const userService = {
  getById: (id: string) =>
    axiosClient.get(ENDPOINTS.user.getById(id)).then((res) => res.data),

  getAll: () => axiosClient.get(ENDPOINTS.user.getAll).then((res) => res.data),

  add: (data: IUser) =>
    axiosClient.post(ENDPOINTS.user.add, data).then((res) => res.data),

  update: (id: string, data: IUser) =>
    axiosClient.put(ENDPOINTS.user.update(id), data).then((res) => res.data),

  delete: (id: string) =>
    axiosClient.delete(ENDPOINTS.user.delete(id)).then((res) => res.data),
};

export default userService;
