import { apiRequest, clearToken, saveToken, type AuthResponse } from "./api";

export async function login(email: string, password: string) {
  const response = await apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (response.accessToken) saveToken(response.accessToken);
  return response;
}

export async function register(name: string, email: string, password: string) {
  return apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function logout() {
  try {
    await apiRequest("/auth/logout", { method: "POST" });
  } finally {
    clearToken();
    window.location.href = "/login";
  }
}