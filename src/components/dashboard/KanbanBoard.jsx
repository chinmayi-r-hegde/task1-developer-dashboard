import { useState } from "react";
import { TaskCard } from "./TaskCard";

const COLUMNS = [
  { status: "todo", label: "To Do", rail: "bg-todo" },
  { status: "in_progress", label: "In Progress", rail: "bg-progress" },
  { status: "done", label: "Done", rail: "bg-done" },
];

export function KanbanBoard({ tasks, onTaskClick, onToggleComplete, onStatusChange }) {
  const [dragOverCol, setDragOverCol] = useState(null);

  const handleDrop = (status) => {
    const taskId = window.__draggedTaskId;
    if (taskId) onStatusChange(taskId, status);
    setDragOverCol(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.status);
        return (
          <div
            key={col.status}
            onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.status); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => handleDrop(col.status)}
            className={`rounded-xl border-2 border-dashed p-3 min-h-[200px] transition-colors ${
              dragOverCol === col.status ? "border-accent bg-accent/5" : "border-border"
            }`}
          >
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className={`w-2 h-2 rounded-full ${col.rail}`} />
              <h3 className="text-sm font-semibold text-primary font-mono">{col.label}</h3>
              <span className="text-xs text-secondary font-mono">({colTasks.length})</span>
            </div>
            <div className="flex flex-col gap-2">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => { window.__draggedTaskId = task.id; }}
                >
                  <TaskCard task={task} onClick={() => onTaskClick(task)} onToggleComplete={onToggleComplete} />
                </div>
              ))}
              {colTasks.length === 0 && (
                <p className="text-xs text-secondary text-center py-6">Drop tasks here</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}