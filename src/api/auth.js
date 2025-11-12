import client from "./client"; // Axios instance, we’ll create next

export const login = (data) => client.post("/auth/login", data);
export const register = (data) => client.post("/auth/register", data);
export const verifyEmail = (token) => client.get(`/auth/verify/${token}`);
