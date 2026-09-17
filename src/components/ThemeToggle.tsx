import { Moon, Sun } from "lucide-react";
import { useState } from "react";

import "./ThemeToggle.css";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    setDark((current) => {
      const newTheme = !current;

      document.documentElement.classList.toggle("dark", newTheme);

      return newTheme;
    });
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default ThemeToggle;