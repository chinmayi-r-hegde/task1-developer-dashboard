import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { todo: "#8B93A1", in_progress: "#F5A524", done: "#2BB673" };
const LABELS = { todo: "To Do", in_progress: "In Progress", done: "Done" };

export function StatusChart({ tasks }) {
  const counts = { todo: 0, in_progress: 0, done: 0 };
  tasks.forEach((t) => { counts[t.status] = (counts[t.status] || 0) + 1; });

  const data = Object.entries(counts).filter(([, value]) => value > 0).map(([key, value]) => ({ name: LABELS[key], value, key }));

  if (tasks.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-center h-64">
        <p className="text-sm text-secondary">No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h3 className="font-display font-semibold text-primary mb-2 text-sm">Task Status</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
            {data.map((entry) => <Cell key={entry.key} fill={COLORS[entry.key]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-2">
        {data.map((d) => (
          <div key={d.key} className="flex items-center gap-1.5 text-xs text-secondary font-mono">
            <span className="w-2 h-2 rounded-full" style={{ background: COLORS[d.key] }} />
            {d.name} ({d.value})
          </div>
        ))}
      </div>
    </div>
  );
}