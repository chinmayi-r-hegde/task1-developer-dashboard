import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { Dashboard } from "./pages/Dashboard";

function AppShell() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar searchValue={searchValue} onSearchChange={setSearchValue} />
        <main className="flex-1 overflow-y-auto">
          <Dashboard searchValue={searchValue} />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ThemeProvider>
  );
}