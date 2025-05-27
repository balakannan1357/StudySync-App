import api from "./axiosClient.service";

export const fetchProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};
