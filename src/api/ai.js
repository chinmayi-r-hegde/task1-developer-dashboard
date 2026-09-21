import { apiRequest } from "./client";

export const generateTasks = (goal) =>
  apiRequest("/ai/generate-tasks", { method: "POST", body: { goal } });

export const summarizeTask = (text) =>
  apiRequest("/ai/summarize-task", { method: "POST", body: { text } });

export const generateDescription = (projectName) =>
  apiRequest("/ai/generate-description", { method: "POST", body: { project_name: projectName } });
