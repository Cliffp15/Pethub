import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;