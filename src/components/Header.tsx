import { useState, useRef, useEffect } from "react";
import "./Header.css";
import { useAuth } from "../context/useAuth";

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header = ({ setCurrentPage }: HeaderProps) => {
  const { isLoggedIn, username } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  // Menü schliessen bei Klick ausserhalb
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <h1>Zoo Homepage</h1>
      </div>

      <nav className="nav" aria-label="Hauptnavigation">
        {/* Hauptnavigation */}
        <ul className="nav-main">
          <li>
            <button onClick={() => navigate("home")}>Home</button>
          </li>

          <li>
            <button onClick={() => navigate("animals")}>Tiere</button>
          </li>

          <li>
            <button onClick={() => navigate("events")}>Events</button>
          </li>

          <li>
            <button onClick={() => navigate("tickets")}>Tickets</button>
          </li>
        </ul>

        {/* Auth-Bereich aus zweiter Version behalten */}
        <div className="auth">
          {isLoggedIn ? (
            <span className="logged-in">Willkommen, {username}!</span>
          ) : (
            <>
              <button
                onClick={() => navigate("registration")}
                className="auth-btn"
              >
                Registrieren
              </button>

              <button onClick={() => navigate("login")} className="auth-btn">
                Anmelden
              </button>
            </>
          )}
        </div>

        {/* Burger-Menü */}
        <div className="burger-wrapper" ref={menuRef}>
          <button
            className={`burger-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menü öffnen"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("about")}>Über uns</button>

              <button onClick={() => navigate("attractions")}>
                Attraktionen
              </button>

              <button onClick={() => navigate("map_to_zoo")}>
                Karte zum Zoo
              </button>

              <button onClick={() => navigate("dining")}>
                Essen &amp; Trinken
              </button>

              <button onClick={() => navigate("reviews")}>Bewertungen</button>

              <button onClick={() => navigate("contact")}>Kontakt</button>

              <button
                onClick={() => navigate("settings")}
                className="settings-btn"
              >
                Einstellungen
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
