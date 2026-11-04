const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export type Todo = {
  _id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
  createdAt?: string;
};

export type TodoInput = {
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  dueDate: string;
};

export type User = { _id: string; name: string; email: string };

export type AuthResponse = {
  success: boolean;
  message: string;
  user: User;
  accessToken?: string;
};

const getToken = () =>
  typeof window === "undefined" ? null : window.localStorage.getItem("taskflow_access_token");

const AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh"];

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {})
  : Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => path.startsWith(endpoint));

  if (response.status === 401 && !isAuthEndpoint) {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Session expired. Please log in again.");
  }

  const data = (await response.json().catch(() => ({}))) as T & { message?: string };
  if (!response.ok) throw new Error(data.message ?? "Something went wrong. Please try again.");
  return data;
}

export async function tryRefreshToken(): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { accessToken?: string };
    if (data.accessToken) {
      saveToken(data.accessToken);
      return data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveToken(token: string) {
  window.localStorage.setItem("taskflow_access_token", token);
}

export function clearToken() {
  window.localStorage.removeItem("taskflow_access_token");
}