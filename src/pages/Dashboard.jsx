import { useState, useMemo } from "react";
import { Plus, LayoutGrid, Columns3 } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { updateTask, deleteTask as apiDeleteTask, createTask as apiCreateTask } from "../api/tasks";
import { deleteProject as apiDeleteProject, createProject as apiCreateProject } from "../api/projects";
import { StatsCards } from "../components/dashboard/StatsCards";
import { ProjectCard } from "../components/dashboard/ProjectCard";
import { TaskCard } from "../components/dashboard/TaskCard";
import { TaskFilters } from "../components/dashboard/TaskFilters";
import { KanbanBoard } from "../components/dashboard/KanbanBoard";
import { SkeletonGrid } from "../components/ui/Loader";
import { EmptyState } from "../components/ui/EmptyState";
import { ProjectDetailModal } from "../components/dashboard/ProjectDetailModal";
import { TaskDetailModal } from "../components/dashboard/TaskDetailModal";
import { NewProjectModal } from "../components/dashboard/NewProjectModal";
import { NewTaskModal } from "../components/dashboard/NewTaskModal";
import { StatusChart } from "../components/dashboard/StatusChart";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { useToast } from "../context/ToastContext";

export function Dashboard({ searchValue, activeView = "dashboard" }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [taskViewMode, setTaskViewMode] = useState("grid");
  const { projects: initialProjects, loading: projectsLoading } = useProjects();
  const { tasks: initialTasks, loading: tasksLoading } = useTasks();
  const { showToast } = useToast();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  useMemo(() => { if (initialProjects.length && !projects.length) setProjects(initialProjects); }, [initialProjects]);
  useMemo(() => { if (initialTasks.length && !tasks.length) setTasks(initialTasks); }, [initialTasks]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const visibleTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      const matchesSearch = t.title.toLowerCase().includes(searchValue.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tasks, statusFilter, searchValue]);

  const visibleProjects = useMemo(() => {
    return projects.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [projects, searchValue]);

  const addProject = async (p) => {
    try {
      const created = await apiCreateProject({ name: p.name, description: p.description, status: p.status });
      setProjects((prev) => [created, ...prev]);
      showToast(`Project "${created.name}" created`);
    } catch (err) {
      showToast(`Failed to create project: ${err.message}`);
    }
  };

  const addTask = async (t) => {
    try {
      const created = await apiCreateTask(t.project_id, {
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        due_date: t.due_date,
      });
      setTasks((prev) => [created, ...prev]);
      showToast(`Task "${created.title}" created`);
    } catch (err) {
      showToast(`Failed to create task: ${err.message}`);
    }
  };

  const toggleComplete = async (task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)));
    setSelectedTask((prev) => (prev && prev.id === task.id ? { ...prev, status: newStatus } : prev));
    showToast(newStatus === "done" ? `"${task.title}" marked complete` : `"${task.title}" marked as not done`);
    try {
      await updateTask(task.id, { status: newStatus });
    } catch {
      // ignore
    }
  };

  const handleDragStatusChange = async (taskId, newStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    try {
      await updateTask(taskId, { status: newStatus });
    } catch {
      // ignore
    }
  };

  const requestDeleteProject = (project) => setConfirmTarget({ type: "project", item: project });
  const requestDeleteTask = (task) => setConfirmTarget({ type: "task", item: task });

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    const { type, item } = confirmTarget;
    if (type === "project") {
      setProjects((prev) => prev.filter((p) => p.id !== item.id));
      setSelectedProject(null);
      showToast(`Project "${item.name}" deleted`);
      try { await apiDeleteProject(item.id); } catch { /* ignore */ }
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== item.id));
      setSelectedTask(null);
      showToast(`Task "${item.title}" deleted`);
      try { await apiDeleteTask(item.id); } catch { /* ignore */ }
    }
    setConfirmTarget(null);
  };

  const showProjects = activeView === "dashboard" || activeView === "projects";
  const showTasks = activeView === "dashboard" || activeView === "tasks";

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Welcome back</h1>
          <p className="text-sm text-secondary mt-1">Here's what's happening across your projects.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowNewProject(true)} className="flex items-center gap-1.5 bg-surface border border-border rounded-lg px-3 py-2 text-sm font-medium text-primary hover:border-accent/40 transition-colors">
            <Plus size={16} /> New Project
          </button>
          <button onClick={() => setShowNewTask(true)} className="flex items-center gap-1.5 bg-accent text-white rounded-lg px-3 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {activeView === "dashboard" && (
        projectsLoading || tasksLoading ? (
          <SkeletonGrid count={4} />
        ) : (
          <>
            <StatsCards projects={projects} tasks={tasks} />
            <StatusChart tasks={tasks} />
          </>
        )
      )}

      {showProjects && (
        <section>
          <h2 className="font-display font-semibold text-primary mb-3">Projects</h2>
          {projectsLoading ? (
            <SkeletonGrid count={3} />
          ) : visibleProjects.length === 0 ? (
            <EmptyState title="No projects found" subtitle="Try a different search, or create a new project to get started." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          )}
        </section>
      )}

      {showTasks && (
        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <h2 className="font-display font-semibold text-primary">Tasks</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <TaskFilters active={statusFilter} onChange={setStatusFilter} />
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button onClick={() => setTaskViewMode("grid")} className={`p-2 ${taskViewMode === "grid" ? "bg-accent text-white" : "text-secondary hover:text-primary"}`} title="Grid view">
                  <LayoutGrid size={14} />
                </button>
                <button onClick={() => setTaskViewMode("kanban")} className={`p-2 ${taskViewMode === "kanban" ? "bg-accent text-white" : "text-secondary hover:text-primary"}`} title="Board view">
                  <Columns3 size={14} />
                </button>
              </div>
            </div>
          </div>

          {tasksLoading ? (
            <SkeletonGrid count={3} />
          ) : visibleTasks.length === 0 ? (
            <EmptyState title="No tasks found" subtitle="Try a different filter or search term." />
          ) : taskViewMode === "kanban" ? (
            <KanbanBoard tasks={visibleTasks} onTaskClick={setSelectedTask} onToggleComplete={toggleComplete} onStatusChange={handleDragStatusChange} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleTasks.map((task) => (
                <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} onToggleComplete={toggleComplete} />
              ))}
            </div>
          )}
        </section>
      )}

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} onDelete={requestDeleteProject} />
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} onToggleComplete={toggleComplete} onDelete={requestDeleteTask} />
      <NewProjectModal isOpen={showNewProject} onClose={() => setShowNewProject(false)} onCreate={addProject} />
      <NewTaskModal isOpen={showNewTask} onClose={() => setShowNewTask(false)} onCreate={addTask} projects={projects} />

      <ConfirmDialog
        isOpen={!!confirmTarget}
        title={confirmTarget?.type === "project" ? "Delete Project?" : "Delete Task?"}
        message={
          confirmTarget?.type === "project"
            ? `This will permanently delete "${confirmTarget?.item?.name}" and all its tasks. This can't be undone.`
            : `This will permanently delete "${confirmTarget?.item?.title}". This can't be undone.`
        }
        onConfirm={confirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
