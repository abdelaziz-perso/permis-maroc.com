"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";

function NavInner({ compact = false }: { compact?: boolean }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (isLoading) {
    return <div className="w-24 h-9 rounded-xl bg-slate-100 animate-pulse" />;
  }

  if (!isAuthenticated || !user) {
    if (compact) {
      return (
        <div className="space-y-2">
          <Link
            href="/connexion"
            className="block px-4 py-3 min-h-11 rounded-xl text-sm font-bold text-[#334155] hover:bg-slate-50"
          >
            Connexion
          </Link>
          <Link
            href="/inscription"
            className="block w-full text-center py-3 rounded-xl bg-[#E30D2B] text-white font-bold text-sm shadow-lg shadow-red-500/20"
          >
            Commencer gratuitement
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Link
          href="/connexion"
          className="px-3 py-2 rounded-xl text-sm font-bold text-[#071A3D] hover:bg-slate-100"
        >
          Connexion
        </Link>
        <Link
          href="/inscription"
          className="px-3.5 py-2 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] text-white font-bold text-xs sm:text-sm min-h-9 shadow-md shadow-red-500/20"
        >
          Commencer gratuitement
        </Link>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];

  if (compact) {
    return (
      <div className="space-y-2">
        <Link
          href="/profil"
          className="block px-4 py-3 min-h-11 rounded-xl text-sm font-bold text-[#334155] hover:bg-slate-50"
        >
          {user.name}
        </Link>
        <button
          type="button"
          onClick={() => logout().then(() => router.push("/"))}
          className="w-full text-left px-4 py-3 min-h-11 rounded-xl text-sm font-bold text-[#E30D2B] hover:bg-red-50"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50"
      >
        <span className="w-8 h-8 rounded-full bg-[#071A3D] text-white text-xs font-bold flex items-center justify-center">
          {firstName.slice(0, 1).toUpperCase()}
        </span>
        <span className="text-sm font-bold text-[#071A3D] max-w-[7rem] truncate">
          {firstName}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#E2E8F0] bg-white shadow-lg py-1 z-50">
          <Link
            href="/profil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-[#071A3D] hover:bg-slate-50"
          >
            <UserIcon className="w-4 h-4" />
            Mon profil
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout().then(() => router.push("/"));
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-[#E30D2B] hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function AuthNavControls({ compact = false }: { compact?: boolean }) {
  return (
    <AuthProvider>
      <NavInner compact={compact} />
    </AuthProvider>
  );
}
