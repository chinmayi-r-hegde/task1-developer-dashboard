import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "../ui/Modal";
import { generateTasks } from "../../api/ai";

export function NewTaskModal({ isOpen, onClose, onCreate, projects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const [aiGoal, setAiGoal] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!aiGoal.trim()) return;
    setGenerating(true);
    try {
      const result = await generateTasks(aiGoal);
      setAiSuggestions(result.tasks);
    } catch (err) {
      console.error("AI generation failed:", err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;
    onCreate({ title, description, project_id: projectId, status: "todo", priority, due_date: dueDate || null });
    setTitle("");
    setDescription("");
    setDueDate("");
    setAiSuggestions([]);
    setAiGoal("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Task">
      <div className="mb-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
        <p className="text-xs font-medium text-accent mb-2 flex items-center gap-1"><Sparkles size={12} /> AI Task Suggestions</p>
        <div className="flex gap-2">
          <input
            value={aiGoal}
            onChange={(e) => setAiGoal(e.target.value)}
            placeholder="Describe a goal, e.g. 'Launch marketing campaign'"
            className="flex-1 border border-border bg-bg rounded-lg px-2 py-1.5 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!aiGoal.trim() || generating}
            className="text-xs font-medium bg-accent text-white rounded-lg px-3 py-1.5 disabled:opacity-40"
          >
            {generating ? "..." : "Generate"}
          </button>
        </div>
        {aiSuggestions.length > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            {aiSuggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setTitle(s); setAiSuggestions([]); }}
                className="text-left text-xs px-2 py-1.5 rounded-md bg-surface border border-border hover:border-accent/40 text-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

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