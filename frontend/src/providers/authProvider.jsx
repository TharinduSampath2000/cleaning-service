import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { checkAuth, loginUser, logoutUser, registerUser } from "../api/authApi";
import { AuthContext } from "../contexts/auth.context";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();

    if(user) {
      window.location.href = `/${user.role}/`;
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await checkAuth();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (userData) => {
    try {
      const response = await registerUser(userData);
      setUser(response);
    } catch (error) {
      toast.error(
        `Registration failed: ${
          error.response.data.message || "An unexpected error occurred"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      const response = await loginUser(userData);
      setUser(response);
      toast.success("Login successful");
    } catch (error) {
      toast.error(
        `Login failed: ${
          error.response.data.message || "An unexpected error occurred"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      toast.error(
        `Logout failed: ${
          error.response.data.message || "An unexpected error occurred"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, userRegister, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  userData: propTypes.object,
  children: propTypes.node,
};
