"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authApi from "@/lib/api/auth";
import type { AuthUser } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: {
    login: string;
    password: string;
    remember?: boolean;
  }) => Promise<AuthUser>;
  register: (payload: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    password_confirmation: string;
    preferred_language?: string;
  }) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
  setUser: (user: AuthUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const REDIRECT_KEY = "pm_auth_redirect";

export function getAuthRedirect(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(REDIRECT_KEY);
}

export function setAuthRedirect(path: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(REDIRECT_KEY, path);
}

export function clearAuthRedirect(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(REDIRECT_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const next = await authApi.fetchUser();
      setUser(next);
      return next;
    } catch (err) {
      if (err instanceof ApiError && (err.status === 0 || err.status >= 500)) {
        // keep previous user on network blips
        throw err;
      }
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const next = await authApi.fetchUser();
        if (!cancelled) setUser(next);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (payload: { login: string; password: string; remember?: boolean }) => {
      const res = await authApi.login(payload);
      setUser(res.user);
      return res.user;
    },
    []
  );

  const register = useCallback(
    async (payload: {
      name: string;
      email?: string;
      phone?: string;
      password: string;
      password_confirmation: string;
      preferred_language?: string;
    }) => {
      const res = await authApi.register(payload);
      setUser(res.user);
      return res.user;
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
      setUser,
    }),
    [user, isLoading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
