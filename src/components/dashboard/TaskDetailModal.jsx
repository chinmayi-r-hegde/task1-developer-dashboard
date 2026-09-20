import { useState } from "react";
import { Trash2, Sparkles } from "lucide-react";
import { Modal } from "../ui/Modal";
import { StatusBadge, PriorityBadge } from "../ui/Badge";
import { summarizeTask } from "../../api/ai";

export function TaskDetailModal({ task, onClose, onToggleComplete, onDelete }) {
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  if (!task) return null;
  const { title, description, status, priority, due_date } = task;
  const isDone = status === "done";

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      const result = await summarizeTask(description);
      setSummary(result.summary);
    } catch (err) {
      console.error("Summarize failed:", err.message);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <Modal isOpen={!!task} onClose={onClose} title={title}>
      <p className="text-sm text-secondary mb-2">{description}</p>

      {summary && (
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-2.5 mb-3">
          <p className="text-xs font-medium text-accent mb-1 flex items-center gap-1"><Sparkles size={11} /> AI Summary</p>
          <p className="text-xs text-primary">{summary}</p>
        </div>
      )}

      {!summary && description && (
        <button
          onClick={handleSummarize}
          disabled={summarizing}
          className="text-xs font-medium text-accent flex items-center gap-1 mb-4 hover:underline disabled:opacity-50"
        >
          <Sparkles size={12} /> {summarizing ? "Summarizing..." : "AI Summarize"}
        </button>
      )}

      <div className="flex items-center gap-2 mb-4 mt-2">
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