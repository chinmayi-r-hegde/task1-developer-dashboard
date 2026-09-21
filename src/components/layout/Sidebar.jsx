import { useState } from "react";
import { LayoutDashboard, FolderKanban, CheckSquare, LifeBuoy, ChevronDown, LogOut, X } from "lucide-react";
import { supportContact } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "tasks", label: "Tasks", icon: CheckSquare },
];

export function Sidebar({ mobileOpen, onMobileClose, activeView, onNavigate }) {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const content = (
    <>
      <div>
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold">P</div>
            <span className="font-display font-semibold text-lg text-primary">Pulse</span>
          </div>
          <button onClick={onMobileClose} className="md:hidden text-secondary hover:text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="relative mb-6">
          <button onClick={() => setProfileOpen((v) => !v)} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-bg transition-colors">
            <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs font-semibold font-mono shrink-0">{initials || "?"}</div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-primary truncate">{user?.name}</p>
              <p className="text-xs text-secondary truncate">{user?.email}</p>
            </div>
            <ChevronDown size={14} className={`text-secondary shrink-0 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-10">
              <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-bg hover:text-primary transition-colors">
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { onNavigate(key); onMobileClose(); }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                activeView === key ? "bg-accent/10 text-accent" : "text-secondary hover:bg-bg hover:text-primary"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <a href={`mailto:${supportContact.email}`} className="flex flex-col gap-0.5 px-3 py-2 rounded-lg text-secondary hover:bg-bg hover:text-primary transition-colors">
        <span className="flex items-center gap-2 text-sm">
          <LifeBuoy size={16} />
          {supportContact.label}
        </span>
        <span className="text-xs font-mono pl-6 truncate">{supportContact.email}</span>
      </a>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-56 shrink-0 flex-col justify-between border-r border-border bg-surface px-4 py-6">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-surface border-r border-border px-4 py-6 flex flex-col justify-between animate-[fadeIn_0.2s_ease]">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
