
export const supportContact = {
  label: "Customer Support",
  email: "chinmayirhegade@gmail.com",
};

export const mockUser = {
  id: "u1",
  name: "Chinmayi",
  email: "aditi@example.com",
  role: "member",
};

export const mockProjects = [
  {
    id: "p1",
    owner_id: "u1",
    name: "Portfolio Website",
    description: "Personal portfolio built with React and Tailwind.",
    status: "active",
    created_at: "2026-08-01T10:00:00Z",
    task_count: 5,
    done_count: 2,
  },
  {
    id: "p2",
    owner_id: "u1",
    name: "Internship API",
    description: "FastAPI backend for the Innovation Hacks internship.",
    status: "active",
    created_at: "2026-08-05T09:30:00Z",
    task_count: 4,
    done_count: 1,
  },
  {
    id: "p3",
    owner_id: "u1",
    name: "Chrome Extension",
    description: "Small productivity extension, side project.",
    status: "archived",
    created_at: "2026-07-20T14:00:00Z",
    task_count: 3,
    done_count: 3,
  },
];

export const mockTasks = [
  {
    id: "t1",
    project_id: "p1",
    assigned_to: "u1",
    title: "Design landing page hero section",
    description: "Draft layout and pick imagery for the hero.",
    status: "done",
    priority: "medium",
    due_date: "2026-08-10",
  },
  {
    id: "t2",
    project_id: "p1",
    assigned_to: "u1",
    title: "Build responsive navbar",
    description: "Nav should collapse into a hamburger menu on mobile.",
    status: "in_progress",
    priority: "high",
    due_date: "2026-08-27",
  },
  {
    id: "t3",
    project_id: "p1",
    assigned_to: "u1",
    title: "Add contact form",
    description: "Simple form with name, email, and message fields.",
    status: "todo",
    priority: "low",
    due_date: "2026-09-02",
  },
  {
    id: "t4",
    project_id: "p2",
    assigned_to: "u1",
    title: "Set up FastAPI project structure",
    description: "Routers, models, schemas folders.",
    status: "done",
    priority: "high",
    due_date: "2026-08-08",
  },
  {
    id: "t5",
    project_id: "p2",
    assigned_to: "u1",
    title: "Implement JWT authentication",
    description: "Access + refresh token flow with bcrypt password hashing.",
    status: "in_progress",
    priority: "high",
    due_date: "2026-08-29",
  },
  {
    id: "t6",
    project_id: "p2",
    assigned_to: "u1",
    title: "Write Postman collection",
    description: "Document all endpoints for API docs deliverable.",
    status: "todo",
    priority: "medium",
    due_date: "2026-09-01",
  },
];

// Simulated network delay so loading states are visible even with mock data
export const mockDelay = (ms = 400) => new Promise((res) => setTimeout(res, ms));