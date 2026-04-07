import "./Header.css";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header = ({ setCurrentPage }: HeaderProps) => {
  const { isLoggedIn, username } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <h1>Zoo Homepage</h1>
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
          <li>
            <button
              onClick={() => setCurrentPage("settings")}
              className="settings-btn"
            >
              Einstellungen
            </button>
          </li>
          <li className="auth-section">
            {isLoggedIn ? (
              <>
                <span className="logged-in">Willkommen, {username}!</span>
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
