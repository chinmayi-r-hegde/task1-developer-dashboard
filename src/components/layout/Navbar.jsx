import { Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenuButton } from "./MobileMenuButton";
import { useAuth } from "../../context/AuthContext";

export function Navbar({ searchValue, onSearchChange, onMenuClick }) {
  const { user } = useAuth();

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6 py-4">
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <MobileMenuButton onClick={onMenuClick} />
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects & tasks..."
            className="w-full rounded-lg border border-border bg-bg pl-9 pr-3 py-2 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs font-semibold font-mono">{initials || "?"}</div>
          <span className="text-sm font-medium text-primary">{user?.name}</span>
        </div>
      </div>
    </header>
  );
}