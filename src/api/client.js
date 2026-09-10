// Central fetch wrapper. Every real API call (Task 2/3/4) goes through here.
// Handles: base URL, JSON headers, JWT auth header, and error normalization.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function getToken() {
  return localStorage.getItem("access_token");
}

export async function apiRequest(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const errBody = await res.json();
      detail = errBody.detail || detail;
    } catch {
      // response had no JSON body — fall back to statusText
    }
    throw new Error(`API error ${res.status}: ${detail}`);
  }

  if (res.status === 204) return null; // no content (e.g. DELETE)
  return res.json();
}
