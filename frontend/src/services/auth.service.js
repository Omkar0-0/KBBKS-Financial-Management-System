import http from "./http";

export const loginUser = async (email, password) => {
  const response = await http.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;
  const response = await http.post("/auth/register", { name, email, password, role });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await http.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (email, token, newPassword) => {
  const response = await http.post("/auth/reset-password", {
    email,
    token,
    new_password: newPassword,
  });
  return response.data;
};
