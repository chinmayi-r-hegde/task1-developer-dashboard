import { FolderKanban, ListTodo, Clock, CheckCircle2 } from "lucide-react";

export function StatsCards({ projects, tasks }) {
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  const stats = [
    { label: "Active Projects", value: activeProjects, icon: FolderKanban, color: "text-accent" },
    { label: "To Do", value: todoCount, icon: ListTodo, color: "text-todo" },
    { label: "In Progress", value: inProgressCount, icon: Clock, color: "text-progress" },
    { label: "Done", value: doneCount, icon: CheckCircle2, color: "text-done" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-surface border border-border rounded-xl p-4 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-bg flex items-center justify-center ${color}`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="text-2xl font-display font-semibold text-primary font-mono">{value}</p>
            <p className="text-xs text-secondary">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}