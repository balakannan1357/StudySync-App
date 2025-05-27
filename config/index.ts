export const API_BASE_URL = "https://studysync-api.onrender.com";

export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
  },
  user: {
    add: "/users",
    getAll: "/users/getAll",
    getById: (id: string) => `/users/getById/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  subTopic: {
    add: "/subTopic",
    getAll: "/subTopic/getAll",
    getById: (id: string) => `/subTopic/getById/${id}`,
    update: (id: string) => `/subTopic/${id}`,
    delete: (id: string) => `/subTopic/${id}`,
  },
  weekPlan: {
    add: "/weekPlan",
    getAll: "/weekPlan/getAll",
    getById: (id: string) => `/weekPlan/getById/${id}`,
    getByWeekStartDate: (date: string) =>
      `/weekPlan/getByWeekStartDate/${date}`,
    update: (id: string) => `/weekPlan/${id}`,
    delete: (id: string) => `/weekPlan/${id}`,
  },
};
