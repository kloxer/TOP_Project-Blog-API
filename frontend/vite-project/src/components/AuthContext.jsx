import  { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // On app load, check localStorage for the JWT token
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);  // Set token from localStorage if present
    }
    setLoading(false);
  }, []);

  // Login function: Set the JWT token and store it in localStorage
  const login = (token) => {
    localStorage.setItem("jwtToken", token);  // Store token in localStorage
    setToken(token);  // Set token in state
  };

  // Logout function: Remove the JWT token from localStorage and state
  const logout = () => {
    localStorage.removeItem("jwtToken");  // Remove token from localStorage
    setToken(null);  // Clear token from state
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
