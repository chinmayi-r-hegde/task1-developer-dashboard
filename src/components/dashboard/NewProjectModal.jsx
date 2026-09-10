import { useState } from "react";
import { Modal } from "../ui/Modal";

export function NewProjectModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name, description, status: "active", task_count: 0, done_count: 0 });
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Project">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="border border-border bg-bg rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40" />
        <button type="submit" className="bg-accent text-white rounded-lg py-2 text-sm font-medium hover:opacity-90">Create Project</button>
      </form>
    </Modal>
  );
}