import { apiRequest } from "./client";

export const getProjects = () => apiRequest("/projects");

export const getProject = (id) => apiRequest(`/projects/${id}`);

export const createProject = (data) =>
  apiRequest("/projects", { method: "POST", body: data });

export const updateProject = (id, data) =>
  apiRequest(`/projects/${id}`, { method: "PUT", body: data });

export const deleteProject = (id) =>
  apiRequest(`/projects/${id}`, { method: "DELETE" });