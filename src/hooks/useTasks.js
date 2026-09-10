import { useEffect, useState } from "react";
import { mockTasks, mockDelay } from "../data/mockData";
import { getTasks } from "../api/tasks";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Same seam pattern as useProjects: mock now, real API later, zero
// changes needed in any component that calls useTasks().
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
        if (USE_MOCK) {
          await mockDelay();
          data = projectId
            ? mockTasks.filter((t) => t.project_id === projectId)
            : mockTasks;
        } else {
          data = await getTasks(projectId);
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
