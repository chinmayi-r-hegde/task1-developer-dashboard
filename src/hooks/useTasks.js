import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";
import { apiRequest } from "../api/client";

export function useTasks(projectId = null) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (projectId) {
          data = await getTasks(projectId);
        } else {
          const projects = await apiRequest("/projects");
          const allTasks = await Promise.all(
            projects.map((p) => getTasks(p.id).catch(() => []))
          );
          data = allTasks.flat();
        }
        if (!cancelled) setTasks(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { tasks, loading, error };
}
