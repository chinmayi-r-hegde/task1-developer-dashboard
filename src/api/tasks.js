import { apiRequest } from "./client";

export const getTasks = (projectId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/projects/${projectId}/tasks${query ? `?${query}` : ""}`);
};

export const createTask = (projectId, data) =>
  apiRequest(`/projects/${projectId}/tasks`, { method: "POST", body: data });

export const updateTask = (taskId, data) =>
  apiRequest(`/tasks/${taskId}`, { method: "PUT", body: data });

export const deleteTask = (taskId) =>
  apiRequest(`/tasks/${taskId}`, { method: "DELETE" });
