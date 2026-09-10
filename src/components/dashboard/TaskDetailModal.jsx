import { Trash2 } from "lucide-react";
import { Modal } from "../ui/Modal";
import { StatusBadge, PriorityBadge } from "../ui/Badge";

export function TaskDetailModal({ task, onClose, onToggleComplete, onDelete }) {
  if (!task) return null;
  const { title, description, status, priority, due_date } = task;
  const isDone = status === "done";

  return (
    <Modal isOpen={!!task} onClose={onClose} title={title}>
      <p className="text-sm text-secondary mb-4">{description}</p>
      <div className="flex items-center gap-2 mb-4">
        <StatusBadge status={status} />
        <PriorityBadge priority={priority} />
      </div>
      {due_date && (
        <p className="text-xs font-mono text-secondary mb-4">
          Due {new Date(due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      )}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onToggleComplete(task)}
          className={`w-full rounded-lg py-2 text-sm font-medium transition-colors ${
            isDone ? "border border-border text-secondary hover:text-primary" : "bg-accent text-white hover:opacity-90"
          }`}
        >
          {isDone ? "Mark as Not Done" : "Mark as Complete"}
        </button>
        <button
          onClick={() => onDelete(task)}
          className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 rounded-lg py-2 text-sm font-medium hover:bg-red-500/5 transition-colors"
        >
          <Trash2 size={14} /> Delete Task
        </button>
      </div>
    </Modal>
  );
}