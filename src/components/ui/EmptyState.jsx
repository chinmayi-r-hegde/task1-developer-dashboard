import { Inbox } from "lucide-react";

export function EmptyState({ title = "Nothing here yet", subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-border rounded-xl">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
        <Inbox size={22} className="text-accent" />
      </div>
      <h3 className="font-display font-semibold text-primary">{title}</h3>
      {subtitle && (
        <p className="text-sm text-secondary mt-1 max-w-xs">{subtitle}</p>
      )}
    </div>
  );
}
