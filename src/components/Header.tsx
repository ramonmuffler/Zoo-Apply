import { useRef } from "react";
import "./Header.css";
import { useAuth } from "../context/useAuth";

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header = ({ setCurrentPage }: HeaderProps) => {
  const { isLoggedIn, username } = useAuth();
  const moreMenuRef = useRef<HTMLDetailsElement>(null);

  const closeMoreMenu = () => {
    if (moreMenuRef.current) {
      moreMenuRef.current.open = false;
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Zoo Homepage</h1>
      </div>
      <nav className="nav" aria-label="Hauptnavigation">
        <ul className="nav-links">
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
            <button onClick={() => setCurrentPage("attractions")}>
              Attraktionen
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("map_to_zoo")}>
              Karte zum Zoo
            </button>
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
            <details ref={moreMenuRef} className="nav-dropdown">
              <summary className="nav-dropdown-summary">Mehr</summary>
              <div className="nav-dropdown-menu">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("contact");
                    closeMoreMenu();
                  }}
                >
                  Kontakt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("reviews");
                    closeMoreMenu();
                  }}
                >
                  Bewertungen
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("settings");
                    closeMoreMenu();
                  }}
                >
                  Einstellungen
                </button>
              </div>
            </details>
          </li>
        </ul>
      </nav>

      <div className="auth">
        {isLoggedIn ? (
          <span className="logged-in">Willkommen, {username}!</span>
        ) : (
          <>
            <button
              onClick={() => setCurrentPage("registration")}
              className="auth-btn"
            >
              Registrieren
            </button>
            <button onClick={() => setCurrentPage("login")} className="auth-btn">
              Anmelden
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
