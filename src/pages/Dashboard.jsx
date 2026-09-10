import { useState, useMemo } from "react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { StatsCards } from "../components/dashboard/StatsCards";
import { ProjectCard } from "../components/dashboard/ProjectCard";
import { TaskCard } from "../components/dashboard/TaskCard";
import { TaskFilters } from "../components/dashboard/TaskFilters";
import { SkeletonGrid } from "../components/ui/Loader";
import { EmptyState } from "../components/ui/EmptyState";

export function Dashboard({ searchValue }) {
  const [statusFilter, setStatusFilter] = useState("all");

  const { projects, loading: projectsLoading } = useProjects();
  const { tasks, loading: tasksLoading } = useTasks();

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

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Welcome back 👋</h1>
        <p className="text-sm text-secondary mt-1">Here's what's happening across your projects.</p>
      </div>

      {projectsLoading || tasksLoading ? (
        <SkeletonGrid count={4} />
      ) : (
        <StatsCards projects={projects} tasks={tasks} />
      )}

      <section>
        <h2 className="font-display font-semibold text-primary mb-3">Projects</h2>
        {projectsLoading ? (
          <SkeletonGrid count={3} />
        ) : visibleProjects.length === 0 ? (
          <EmptyState title="No projects found" subtitle="Try a different search, or create a new project to get started." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <h2 className="font-display font-semibold text-primary">Tasks</h2>
          <TaskFilters active={statusFilter} onChange={setStatusFilter} />
        </div>
        {tasksLoading ? (
          <SkeletonGrid count={3} />
        ) : visibleTasks.length === 0 ? (
          <EmptyState title="No tasks found" subtitle="Try a different filter or search term." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}