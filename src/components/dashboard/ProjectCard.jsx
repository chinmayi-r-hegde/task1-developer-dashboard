const RAIL_COLOR = {
  active: "bg-progress",
  completed: "bg-done",
  archived: "bg-todo",
};

export function ProjectCard({ project, onClick }) {
  const { name, description, status, task_count = 0, done_count = 0 } = project;
  const progress = task_count > 0 ? Math.round((done_count / task_count) * 100) : 0;

  return (
    <button onClick={onClick} className="relative bg-surface border border-border rounded-xl overflow-hidden flex text-left hover:border-accent/40 hover:shadow-md transition-all cursor-pointer">
      <div className={`w-1 shrink-0 ${RAIL_COLOR[status] || "bg-todo"}`} />
      <div className="p-4 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-primary truncate">{name}</h3>
          <span className="text-xs font-mono text-secondary capitalize shrink-0">{status}</span>
        </div>
        <p className="text-sm text-secondary mt-1 line-clamp-2">{description}</p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-mono text-secondary mb-1">
            <span>{done_count}/{task_count} tasks</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-bg rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </button>
  );
}