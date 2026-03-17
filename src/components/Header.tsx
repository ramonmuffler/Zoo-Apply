import { Link } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header = ({ setCurrentPage }: HeaderProps) => {
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
            <button onClick={() => setCurrentPage("tickets")}>Tickets</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("contact")}>Kontakt</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage("registration")}>
              Registrieren
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
