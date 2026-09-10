const STATUS_STYLES = {
  todo: "bg-todo/15 text-todo",
  in_progress: "bg-progress/15 text-progress",
  done: "bg-done/15 text-done",
};

const STATUS_LABELS = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const PRIORITY_STYLES = {
  low: "bg-secondary/15 text-secondary",
  medium: "bg-progress/15 text-progress",
  high: "bg-red-500/15 text-red-500",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-mono ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-mono capitalize ${PRIORITY_STYLES[priority]}`}
    >
      {priority}
    </span>
  );
}
