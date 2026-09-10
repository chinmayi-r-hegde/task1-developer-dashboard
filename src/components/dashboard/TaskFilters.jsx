const FILTERS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export function TaskFilters({ active, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono transition-colors border ${
            active === value ? "bg-accent text-white border-accent" : "border-border text-secondary hover:text-primary hover:border-accent/40"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}