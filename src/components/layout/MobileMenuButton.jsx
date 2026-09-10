import { Menu } from "lucide-react";

export function MobileMenuButton({ onClick }) {
  return (
    <button onClick={onClick} className="md:hidden p-2 -ml-2 text-secondary hover:text-primary transition-colors" aria-label="Open menu">
      <Menu size={20} />
    </button>
  );
}