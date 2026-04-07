import { useAuth } from "../context/AuthContext";
import "./Settings.css";

const Settings = () => {
  const { username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="settings">
      <div className="settings-container">
        <h2>Einstellungen</h2>

        <div className="settings-section">
          <h3>Benutzerprofil</h3>
          <div className="profile-info">
            <p>
              <strong>Benutzername:</strong> {username}
            </p>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <h3>Konto</h3>
          <button onClick={handleLogout} className="logout-btn">
            Abmelden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
