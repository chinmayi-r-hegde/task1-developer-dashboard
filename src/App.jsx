import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";

function AppShell() {
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="text-sm text-secondary">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        activeView={activeView}
        onNavigate={setActiveView}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar searchValue={searchValue} onSearchChange={setSearchValue} onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Dashboard searchValue={searchValue} activeView={activeView} />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppShell />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
