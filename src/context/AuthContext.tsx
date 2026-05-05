import { useState } from "react";
import { AuthContext } from "./auth-context";

const getInitialUsername = () => localStorage.getItem("username");

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(getInitialUsername);
  const isLoggedIn = username !== null;

  const login = (user: string) => {
    setUsername(user);
    localStorage.setItem("username", user);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
