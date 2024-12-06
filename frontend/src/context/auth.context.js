import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";
import { checkAuth, loginUser, logoutUser, registerUser } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await checkAuth();
      setUser(response);
    } catch (error) {
      console.error("Auth status check failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      setUser(response);
      return true;
    } catch (error) {
      console.error("Registration failed: ", error);
      return false;
    }
  };

  const login = async (userData) => {
    try {
      const response = await loginUser(userData);
      setUser(response);
      return true;
    } catch (error) {
      console.error("Login failed: ", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  userData: propTypes.object,
  children: propTypes.node,
}