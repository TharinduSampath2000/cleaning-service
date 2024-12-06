import api from ".";

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
}

export const logoutUser = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
}

export const checkAuth = async () => {
  const response = await api.get("/auth/status");
  return response.data;
}