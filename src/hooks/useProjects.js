import { useEffect, useState } from "react";
import { mockProjects, mockDelay } from "../data/mockData";
import { getProjects } from "../api/projects";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === "true";

// Components only ever call this hook — never mockData or api/projects.js
// directly. When the real backend is ready, flip VITE_USE_MOCK_DATA to
// "false" in .env and this hook starts hitting the real API. No component
// using useProjects() needs to change.
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = USE_MOCK
          ? await mockDelay().then(() => mockProjects)
          : await getProjects();
        if (!cancelled) setProjects(data);
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
  }, []);

  return { projects, loading, error };
}