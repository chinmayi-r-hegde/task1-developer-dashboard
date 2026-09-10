import { Calendar } from "lucide-react";
import { StatusBadge, PriorityBadge } from "../ui/Badge";

const RAIL_COLOR = {
  todo: "bg-todo",
  in_progress: "bg-progress",
  done: "bg-done",
};

export function TaskCard({ task, onClick }) {
  const { title, description, status, priority, due_date } = task;

  return (
    <button onClick={onClick} className="relative bg-surface border border-border rounded-xl overflow-hidden flex text-left hover:border-accent/40 hover:shadow-md transition-all cursor-pointer">
      <div className={`w-1 shrink-0 ${RAIL_COLOR[status]}`} />
      <div className="p-4 flex-1 min-w-0">
        <h4 className="font-medium text-sm text-primary truncate mb-2">{title}</h4>
        <p className="text-xs text-secondary line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center flex-wrap gap-2">
          <StatusBadge status={status} />
          <PriorityBadge priority={priority} />
          {due_date && (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-secondary ml-auto">
              <Calendar size={12} />
              {new Date(due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}