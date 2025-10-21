import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [justLoggedOut, setJustLoggedOut] = useState(false);

  const login = ({ username, email }) => {
    setUser({ username, email });
    setJustLoggedOut(false);
  };

  const logout = () => {
    setUser(null);
    setJustLoggedOut(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, justLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
