import { ENDPOINTS } from "@/config";
import { ISubTopic } from "@/interfaces/subTopic.interface";
import axiosClient from "@/services/axiosClient.service";

const subTopicService = {
  getById: (id: string) =>
    axiosClient.get(ENDPOINTS.subTopic.getById(id)).then((res) => res.data),

  getAll: () =>
    axiosClient.get(ENDPOINTS.subTopic.getAll).then((res) => res.data),

  add: (data: ISubTopic) =>
    axiosClient.post(ENDPOINTS.subTopic.add, data).then((res) => res.data),

  update: (id: string, data: ISubTopic) =>
    axiosClient
      .put(ENDPOINTS.subTopic.update(id), data)
      .then((res) => res.data),

  delete: (id: string) =>
    axiosClient.delete(ENDPOINTS.subTopic.delete(id)).then((res) => res.data),
};

export default subTopicService;
