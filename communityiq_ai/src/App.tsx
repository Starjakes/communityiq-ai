import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { House, Heart, GraduationCap, Users, Sun, Moon } from "lucide-react";
import LandingPage from "./components/LandingPage";
import HealthAssistant from "./components/HealthAssistant";
import LearningAssistant from "./components/LearningAssistant";
import CommunityResources from "./components/CommunityResources";

type View = "home" | "health" | "learning" | "resources";

const navItems = [
  { id: "home" as View, label: "Home", icon: <House className="w-5 h-5" /> },
  { id: "health" as View, label: "Health", icon: <Heart className="w-5 h-5" /> },
  { id: "learning" as View, label: "Learning", icon: <GraduationCap className="w-5 h-5" /> },
  { id: "resources" as View, label: "Resources", icon: <Users className="w-5 h-5" /> },
];

function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <LandingPage onNavigate={setCurrentView} />;
      case "health":
        return <HealthAssistant onNavigate={setCurrentView} />;
      case "learning":
        return <LearningAssistant onNavigate={setCurrentView} />;
      case "resources":
        return <CommunityResources onNavigate={setCurrentView} />;
    }
  };

  const isHome = currentView === "home";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar with dark mode toggle */}
      {isHome && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all active:scale-90"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      )}

      {/* Main content */}
      <main className="pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 safe-area-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all active:scale-90 ${
                  isActive
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <div
                  className={`transition-all ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-px w-8 h-0.5 bg-green-600 dark:bg-green-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;