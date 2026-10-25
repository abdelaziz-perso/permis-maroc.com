"use client";

import React from "react";
import { MobileTopBar } from "./MobileTopBar";
import { MobileBottomNav } from "./MobileBottomNav";
import { motion } from "framer-motion";

interface MobileAppShellProps {
  children: React.ReactNode;
  isHome?: boolean;
  title?: string;
  rightAction?: React.ReactNode;
  backHref?: string;
  hideBottomNav?: boolean;
  className?: string;
}

export function MobileAppShell({
  children,
  isHome = false,
  title,
  rightAction,
  backHref,
  hideBottomNav = false,
  className = "",
}: MobileAppShellProps) {
  return (
    <div className="md:hidden min-h-screen bg-[#F6F9FD] text-[#071A3D] flex flex-col selection:bg-[#E30D2B] selection:text-white font-sans antialiased">
      {/* 1. Mobile Top Bar */}
      <MobileTopBar
        isHome={isHome}
        title={title}
        rightAction={rightAction}
        backHref={backHref}
      />

      {/* 2. Scrollable Page Content with Mobile Transition */}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className={`flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-28 ${className}`}
      >
        {children}
      </motion.main>

      {/* 3. Persistent Fixed Bottom Navigation */}
      <MobileBottomNav hidden={hideBottomNav} />
    </div>
  );
}
