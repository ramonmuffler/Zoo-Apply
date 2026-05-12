import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/useTheme";
import "./Settings.css";

const Settings = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="settings">
      <div className="settings-container">
        <h2>Einstellungen</h2>

        <div className="settings-section">
          <h3>Darstellung</h3>
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="theme-switch-label">Darkmode</span>
          </label>
        </div>

        <div className="settings-section">
          <h3>Benutzerprofil</h3>
          {isLoggedIn ? (
            <div className="profile-info">
              <p>
                <strong>Benutzername:</strong> {username}
              </p>
            </div>
          ) : (
            <p className="settings-muted">Du bist aktuell nicht eingeloggt.</p>
          )}
        </div>

        {isLoggedIn && (
          <div className="settings-section danger-zone">
            <h3>Konto</h3>
            <button onClick={handleLogout} className="logout-btn">
              Abmelden
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
