"use client";

import React from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  icon,
  prefix,
}: Props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#071A3D]">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon ? (
          <span className="absolute left-3.5 text-slate-400 pointer-events-none">
            {icon}
          </span>
        ) : null}
        {prefix ? (
          <span className="absolute left-3 flex items-center gap-1.5 text-sm font-semibold text-[#071A3D] pointer-events-none">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full h-12 rounded-xl border bg-white text-[#071A3D] placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-[#E30D2B]/40 ${
            prefix ? "pl-[4.75rem] pr-3.5" : icon ? "pl-10 pr-3.5" : "px-3.5"
          } ${error ? "border-red-400" : "border-[#E2E8F0]"}`}
        />
      </div>
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
