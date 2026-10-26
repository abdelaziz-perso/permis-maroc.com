"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  Headphones,
  Lock,
  LogOut,
  Settings2,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { updatePassword, updateProfile } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { PasswordField } from "@/components/auth/PasswordField";
import { TextField } from "@/components/auth/TextField";
import { AuthSubmitButton } from "@/components/auth/AuthShell";

export function AuthProfileView() {
  const { user, logout, setUser, refreshUser } = useAuth();
  const router = useRouter();
  const [panel, setPanel] = useState<"menu" | "edit" | "password">("menu");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [language, setLanguage] = useState(user?.preferred_language || "fr");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setMessage(null);
    setLoading(true);
    try {
      const res = await updateProfile({
        name: name.trim(),
        email: email.trim() || null,
        phone: phone.trim() || null,
        preferred_language: language,
      });
      setUser(res.user);
      setMessage(res.message || "Profil mis à jour.");
      setPanel("menu");
    } catch (err) {
      if (err instanceof ApiError) setErrors(err.fieldErrors());
      else setMessage("Erreur.");
    } finally {
      setLoading(false);
    }
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setMessage(null);
    setLoading(true);
    try {
      const res = await updatePassword({
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage(res.message);
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
      setPanel("menu");
    } catch (err) {
      if (err instanceof ApiError) setErrors(err.fieldErrors());
      else setMessage("Erreur.");
    } finally {
      setLoading(false);
    }
  }

  async function onLogout() {
    await logout();
    router.push("/connexion");
  }

  if (panel === "edit") {
    return (
      <form onSubmit={saveProfile} className="space-y-4 p-4">
        <h2 className="text-xl font-extrabold text-[#071A3D]">Modifier mon profil</h2>
        <TextField id="name" label="Nom complet" value={name} onChange={setName} error={errors.name} />
        <TextField id="email" label="E-mail" type="email" value={email} onChange={setEmail} error={errors.email} />
        <TextField id="phone" label="Téléphone" type="tel" inputMode="tel" value={phone} onChange={setPhone} error={errors.phone} />
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Langue préférée</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#E2E8F0] px-3"
          >
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
            <option value="darija">Darija</option>
          </select>
        </div>
        <AuthSubmitButton loading={loading}>Enregistrer</AuthSubmitButton>
        <button type="button" onClick={() => setPanel("menu")} className="w-full text-sm font-semibold text-slate-500">
          Annuler
        </button>
      </form>
    );
  }

  if (panel === "password") {
    return (
      <form onSubmit={savePassword} className="space-y-4 p-4">
        <h2 className="text-xl font-extrabold text-[#071A3D]">Changer mon mot de passe</h2>
        <PasswordField
          id="current_password"
          label="Mot de passe actuel"
          value={currentPassword}
          onChange={setCurrentPassword}
          error={errors.current_password}
        />
        <PasswordField
          id="password"
          label="Nouveau mot de passe"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="new-password"
        />
        <PasswordField
          id="password_confirmation"
          label="Confirmer"
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          error={errors.password_confirmation}
          autoComplete="new-password"
        />
        <AuthSubmitButton loading={loading}>Mettre à jour</AuthSubmitButton>
        <button type="button" onClick={() => setPanel("menu")} className="w-full text-sm font-semibold text-slate-500">
          Annuler
        </button>
      </form>
    );
  }

  const rows = [
    {
      label: "Informations personnelles",
      icon: UserRound,
      onClick: () => setPanel("edit"),
    },
    {
      label: "Sécurité",
      icon: Lock,
      onClick: () => setPanel("password"),
    },
    {
      label: "Audio et accessibilité",
      icon: Headphones,
      href: "/profil#audio",
    },
    {
      label: "Préférences",
      icon: Settings2,
      onClick: () => setPanel("edit"),
    },
    {
      label: "Notifications",
      icon: Bell,
      onClick: () => setMessage("Les notifications arriveront bientôt."),
    },
  ];

  return (
    <div className="px-4 pb-8 space-y-5" dir="ltr" lang="fr">
      <div className="flex flex-col items-center text-center pt-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E30D2B] to-[#071A3D] text-white flex items-center justify-center text-2xl font-bold shadow-lg">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <h1 className="mt-3 text-xl font-extrabold text-[#071A3D]">{user.name}</h1>
        <p className="text-sm text-slate-500">{user.email || user.phone}</p>

        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {user.email ? (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                user.email_verified_at
                  ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                  : "border-amber-300 text-amber-700 bg-amber-50"
              }`}
            >
              <BadgeCheck className="w-3.5 h-3.5" />
              {user.email_verified_at ? "E-mail vérifié" : "E-mail non vérifié"}
            </span>
          ) : null}
          {user.phone ? (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                user.phone_verified_at
                  ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                  : "border-amber-300 text-amber-700 bg-amber-50"
              }`}
            >
              <BadgeCheck className="w-3.5 h-3.5" />
              {user.phone_verified_at ? "Téléphone vérifié" : "Téléphone non vérifié"}
            </span>
          ) : null}
        </div>

        {(!user.email_verified_at && user.email) || (!user.phone_verified_at && user.phone) ? (
          <Link
            href={`/verification?channel=${!user.phone_verified_at && user.phone ? "phone" : "email"}`}
            className="mt-3 text-sm font-bold text-[#E30D2B]"
            onClick={() => refreshUser()}
          >
            Vérifier mon compte
          </Link>
        ) : null}
      </div>

      {message ? <p className="text-center text-sm text-emerald-600 font-medium">{message}</p> : null}

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden divide-y divide-[#E2E8F0]">
        {rows.map((row) => {
          const Icon = row.icon;
          const content = (
            <>
              <span className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#E30D2B]">
                <Icon className="w-4.5 h-4.5" />
              </span>
              <span className="flex-1 text-sm font-semibold text-[#071A3D] text-left">
                {row.label}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </>
          );

          if (row.href) {
            return (
              <Link key={row.label} href={row.href} className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50">
                {content}
              </Link>
            );
          }

          return (
            <button
              key={row.label}
              type="button"
              onClick={row.onClick}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50"
            >
              {content}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-3 text-[#E30D2B] font-bold"
      >
        <LogOut className="w-4 h-4" />
        Se déconnecter
      </button>
    </div>
  );
}
