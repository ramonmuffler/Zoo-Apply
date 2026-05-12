import "./Header.css";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "Über uns" },
  { to: "/animals", label: "Tiere" },
  { to: "/events", label: "Events" },
  { to: "/attractions", label: "Attraktionen" },
  { to: "/map", label: "Zoo-Karte" },
  { to: "/dining", label: "Essen & Trinken" },
  { to: "/tickets", label: "Tickets" },
  { to: "/reviews", label: "Bewertungen" },
  { to: "/contact", label: "Kontakt" },
  { to: "/settings", label: "Einstellungen" },
];

const Header = () => {
  const { isLoggedIn, username } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>Zoo Homepage</h1>
        </Link>
      </div>
      <nav className="nav">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link${isActive ? " nav-link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="auth-section">
            {isLoggedIn ? (
              <>
                <span className="logged-in">Willkommen, {username}!</span>
              </>
            ) : (
              <>
                <NavLink
                  to="/registration"
                  className={({ isActive }) =>
                    `nav-link${isActive ? " nav-link--active" : ""}`
                  }
                >
                  Registrieren
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link${isActive ? " nav-link--active" : ""}`
                  }
                >
                  Anmelden
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
