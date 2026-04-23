// ============================================================
// lib/api.ts  — Axios instance + Cookie-based auth helpers
// ============================================================
import axios from "axios";
import Cookies from "js-cookie";

// ── Constants ──────────────────────────────────────────────
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002/api";

const COOKIE_TOKEN = "auth_token";
const COOKIE_USER  = "auth_user";

// Cookie options: expires 1 day, SameSite Lax (works on localhost)
const COOKIE_OPTS: Cookies.CookieAttributes = {
  expires: 1,
  sameSite: "Lax",
  // secure: true,   // aktifkan di production (HTTPS)
};

// ── Auth cookie helpers ────────────────────────────────────
export interface AuthUser {
  IDUSER: number;
  USERNAME: string;
}

export const getToken = (): string | undefined =>
  Cookies.get(COOKIE_TOKEN);

export const getUser = (): AuthUser | null => {
  try {
    const raw = Cookies.get(COOKIE_USER);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

export const saveAuth = (token: string, user: AuthUser): void => {
  Cookies.set(COOKIE_TOKEN, token, COOKIE_OPTS);
  Cookies.set(COOKIE_USER, JSON.stringify(user), COOKIE_OPTS);
};

export const clearAuth = (): void => {
  Cookies.remove(COOKIE_TOKEN);
  Cookies.remove(COOKIE_USER);
};

export const isLoggedIn = (): boolean => !!getToken();

// ── Axios instance ─────────────────────────────────────────
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // cookie dikelola manual via js-cookie
});

// Request interceptor: sisipkan token dari cookie ke Authorization header
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: normalisasi error jadi satu format
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Terjadi kesalahan pada server";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;

// ── Auth API ───────────────────────────────────────────────
export const authAPI = {
  // ✅ Tambah EMAIL sebagai param ke-2
  register: (USERNAME: string, EMAIL: string, PASSWORD: string) =>
    apiClient.post<{ message: string }>("/auth/register", {
      USERNAME,
      EMAIL,
      PASSWORD,
    }),

  // ✅ Login pakai EMAIL bukan USERNAME
  login: (EMAIL: string, PASSWORD: string) =>
    apiClient.post<{
      message: string;
      token: string;
      user: AuthUser;
    }>("/auth/login", { EMAIL, PASSWORD }),
};

// ── Comment types & API ────────────────────────────────────
export interface Comment {
  IDCOMMENT: number;
  IDUSER: number;
  USERNAME: string;
  COMMENT: string;
  RATING: string; // "1" – "10" (string enum di DB)
  CREATED_AT: string;
  UPDATED_AT: string;
}

export const commentAPI = {
  getAll: () =>
    apiClient.get<{ data: Comment[] }>("/comments"),

  create: (COMMENT: string, RATING: number) =>
    apiClient.post("/comments", { COMMENT, RATING }),

  update: (id: number, COMMENT: string, RATING: number) =>
    apiClient.put(`/comments/${id}`, { COMMENT, RATING }),

  remove: (id: number) =>
    apiClient.delete(`/comments/${id}`),
};