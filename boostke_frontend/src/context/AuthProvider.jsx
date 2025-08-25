import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

// Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (token && refreshToken && storedUser) {
      try {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        if (Date.now() >= exp * 1000) {
          // Token expired, refresh it
          const response = await axios.post("/user/refresh-token", {
            refreshToken, // Use refreshToken here
          });
          const newToken = response.data.accessToken;

          // Save the new token
          localStorage.setItem("userToken", newToken);
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
        } else {
          // Token is valid
          setIsAuthenticated(true);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        logout(); // Log out if validation fails
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const login = (userData) => {
    localStorage.setItem("userToken", userData.token);
    localStorage.setItem("refreshToken", userData.refreshToken); // ✅ REQUIRED
    localStorage.setItem("user", JSON.stringify(userData.user));
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken"); // Get refresh token from localStorage
      if (refreshToken) {
        await axios.post("/user/logout", { refreshToken });
      }
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
    } finally {
      // Remove tokens and user data from local storage and update state
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;

// Custom hook to use authentication state
export const useAuth = () => useContext(AuthContext);
