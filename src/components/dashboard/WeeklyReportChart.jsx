import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dateKey: d.toISOString().slice(0, 10),
    });
  }
  return days;
}

export function WeeklyReportChart({ tasks }) {
  const days = getLast7Days();

  // Using due_date as a stand-in for completion date since mock data
  // has no updated_at timestamp. Task 3/4 with a real DB can swap this
  // to count by actual completion date.
  const data = days.map(({ label, dateKey }) => ({
    day: label,
    completed: tasks.filter((t) => t.status === "done" && t.due_date === dateKey).length,
  }));

  const hasData = data.some((d) => d.completed > 0);

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <h3 className="font-display font-semibold text-primary mb-2 text-sm">Weekly Activity</h3>
      {!hasData ? (
        <div className="flex items-center justify-center h-[180px]">
          <p className="text-sm text-secondary">No completions this week yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: "var(--text-secondary)", fontSize: 11 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip
              contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              cursor={{ fill: "var(--accent)", opacity: 0.08 }}
            />
            <Bar dataKey="completed" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}