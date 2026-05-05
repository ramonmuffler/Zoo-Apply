import { useState } from "react";
import { useAuth } from "../context/useAuth";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        login(formData.username);
        setFormData({ username: "", password: "" });
      }
    } catch {
      setMessage("Server nicht erreichbar!");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>Anmelden</h3>

        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Anmelden</button>
        {message && (
          <p
            className={`message ${message.includes("erfolgreich") ? "success" : ""}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
