import { apiRequest, ensureCsrfCookie, resetCsrf } from "./client";

export type AuthUser = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  preferred_language: string;
  audio_mode: boolean;
  avatar: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type UserResponse = { user: AuthUser; message?: string };

export async function fetchCsrf(): Promise<void> {
  await ensureCsrfCookie();
}

export async function register(payload: {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  preferred_language?: string;
}): Promise<UserResponse> {
  return apiRequest<UserResponse>("/api/auth/register", {
    method: "POST",
    body: payload,
    csrf: true,
  });
}

export async function login(payload: {
  login: string;
  password: string;
  remember?: boolean;
}): Promise<UserResponse> {
  return apiRequest<UserResponse>("/api/auth/login", {
    method: "POST",
    body: payload,
    csrf: true,
  });
}

export async function logout(): Promise<void> {
  try {
    await apiRequest("/api/auth/logout", { method: "POST", csrf: true });
  } finally {
    resetCsrf();
  }
}

export async function fetchUser(): Promise<AuthUser | null> {
  try {
    const data = await apiRequest<UserResponse>("/api/auth/user");
    return data.user;
  } catch (err) {
    const status = (err as { status?: number })?.status;
    if (status === 401 || status === 419) return null;
    throw err;
  }
}

export async function forgotPassword(loginValue: string): Promise<{ message: string }> {
  return apiRequest("/api/auth/forgot-password", {
    method: "POST",
    body: { login: loginValue },
    csrf: true,
  });
}

export async function resetPassword(payload: {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<{ message: string }> {
  return apiRequest("/api/auth/reset-password", {
    method: "POST",
    body: payload,
    csrf: true,
  });
}

export async function resendEmailVerification(): Promise<{ message: string }> {
  return apiRequest("/api/auth/email/verification-notification", {
    method: "POST",
    csrf: true,
  });
}

export async function verifyEmailFromSignedUrl(signedUrl: string): Promise<UserResponse> {
  // signedUrl is absolute API URL from the email link
  const path = signedUrl.replace(/^https?:\/\/[^/]+/, "");
  return apiRequest<UserResponse>(path);
}

export async function sendPhoneCode(phone?: string): Promise<{ message: string }> {
  return apiRequest("/api/auth/phone/send-code", {
    method: "POST",
    body: phone ? { phone } : {},
    csrf: true,
  });
}

export async function verifyPhoneCode(code: string): Promise<UserResponse> {
  return apiRequest<UserResponse>("/api/auth/phone/verify", {
    method: "POST",
    body: { code },
    csrf: true,
  });
}

export async function updateProfile(payload: Partial<{
  name: string;
  email: string | null;
  phone: string | null;
  preferred_language: string;
  audio_mode: boolean;
  avatar: string | null;
}>): Promise<UserResponse> {
  return apiRequest<UserResponse>("/api/profile", {
    method: "PUT",
    body: payload,
    csrf: true,
  });
}

export async function updatePassword(payload: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<{ message: string }> {
  return apiRequest("/api/profile/password", {
    method: "PUT",
    body: payload,
    csrf: true,
  });
}
