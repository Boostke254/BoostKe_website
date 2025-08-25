import { useLocation, Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function RequireAuth() {
  const location = useLocation();
  const accessToken = localStorage.getItem("userToken");

  // Helper function to validate the token
  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Get current time in seconds
      return decodedToken.exp > currentTime; // Check if the token is still valid
    } catch (error) {
      console.error("Error decoding token:", error);
      return false; // Invalid token
    }
  };

  // Check if the token exists and is valid
  if (accessToken && isTokenValid(accessToken)) {
    return <Outlet />;
  }

  // If no valid token, redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
