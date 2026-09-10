import { Trash2 } from "lucide-react";
import { Modal } from "../ui/Modal";

export function ProjectDetailModal({ project, onClose, onDelete }) {
  if (!project) return null;
  const { name, description, status, task_count = 0, done_count = 0 } = project;
  const progress = task_count > 0 ? Math.round((done_count / task_count) * 100) : 0;

  return (
    <Modal isOpen={!!project} onClose={onClose} title={name}>
      <p className="text-sm text-secondary mb-4">{description}</p>
      <span className="inline-block text-xs font-mono capitalize px-2 py-0.5 rounded-full bg-accent/10 text-accent mb-4">{status}</span>
      <div className="mb-2 flex items-center justify-between text-xs font-mono text-secondary">
        <span>{done_count}/{task_count} tasks done</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 bg-bg rounded-full overflow-hidden mb-5">
        <div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <button
        onClick={() => onDelete(project)}
        className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 rounded-lg py-2 text-sm font-medium hover:bg-red-500/5 transition-colors"
      >
        <Trash2 size={14} /> Delete Project
      </button>
    </Modal>
  );
}