import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-14 h-8 rounded-full border border-border bg-bg flex items-center px-1 transition-colors"
    >
      <span
        className={`absolute w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white transition-transform duration-200 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
}
