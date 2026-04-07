import "./Header.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header = ({ setCurrentPage }: HeaderProps) => {
  const { isLoggedIn, username } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Zoo Homepage</h1>
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="theme-switch-label">
            {theme === "dark" ? "Dark" : "Light"}
          </span>
        </label>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <button onClick={() => setCurrentPage("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("about")}>Über uns</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("animals")}>Tiere</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("events")}>Events</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("dining")}>
              Essen & Trinken
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("tickets")}>Tickets</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("reviews")}>
              Bewertungen
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("contact")}>Kontakt</button>
          </li>
          <li className="auth-section">
            {isLoggedIn ? (
              <>
                <span className="logged-in">Willkommen, {username}!</span>
                <button
                  onClick={() => setCurrentPage("settings")}
                  className="settings-btn"
                >
                  Einstellungen
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setCurrentPage("registration")}>
                  Registrieren
                </button>
                <button onClick={() => setCurrentPage("login")}>
                  Anmelden
                </button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
