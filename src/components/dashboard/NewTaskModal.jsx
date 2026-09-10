import { useState } from "react";
import { Modal } from "../ui/Modal";

export function NewTaskModal({ isOpen, onClose, onCreate, projects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;
    onCreate({ title, description, project_id: projectId, status: "todo", priority, due_date: dueDate || null });
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={2} className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40" />
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40">
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <div className="flex gap-3">
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="flex-1 border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="flex-1 border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40" />
        </div>
        <button type="submit" className="bg-accent text-white rounded-lg py-2 text-sm font-medium hover:opacity-90">Create Task</button>
      </form>
    </Modal>
  );
}