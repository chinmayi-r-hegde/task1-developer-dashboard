import { LayoutDashboard, FolderKanban, CheckSquare, LifeBuoy } from "lucide-react";
import { supportContact } from "../../data/mockData";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderKanban, active: false },
  { label: "Tasks", icon: CheckSquare, active: false },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-56 shrink-0 flex-col justify-between border-r border-border bg-surface px-4 py-6">
      <div>
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold">
            P
          </div>
          <span className="font-display font-semibold text-lg text-primary">Pulse</span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <a key={label} href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-accent/10 text-accent" : "text-secondary hover:bg-bg hover:text-primary"}`}>
              <Icon size={18} />
              {label}
            </a>
          ))}
        </nav>
      </div>

      <a href={`mailto:${supportContact.email}`} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-secondary hover:bg-bg hover:text-primary transition-colors">
        <LifeBuoy size={18} />
        {supportContact.label}
      </a>
    </aside>
  );
}