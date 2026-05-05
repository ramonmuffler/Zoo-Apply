import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const getInitialUsername = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("username");
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(() =>
    getInitialUsername(),
  );

  const isLoggedIn = Boolean(username);

  const login = (user: string) => {
    setUsername(user);
    localStorage.setItem("username", user);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  const value = useMemo(
    () => ({ isLoggedIn, username, login, logout }),
    [isLoggedIn, username],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
