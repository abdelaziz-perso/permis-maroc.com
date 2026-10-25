"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { BlogPost } from "@/types/models";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

export function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />

          <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-[#5A6A82] hover:text-[#071A3D] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Retour à tous les articles</span>
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 text-xs text-[#5A6A82] mb-3">
                <span className="font-mono font-bold text-[#C1272D] px-2.5 py-0.5 rounded-full bg-red-50 border border-red-100">
                  {post.category}
                </span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishDate}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#071A3D] tracking-tight mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                {post.excerpt}
              </div>
            </div>

            <article className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs mb-10 text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
              {post.content.split("\n\n").map((section, idx) => {
                const trimmed = section.trim();
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2
                      key={idx}
                      className="text-xl sm:text-2xl font-bold text-[#071A3D] pt-4 border-t border-[#E2E8F0] first:pt-0 first:border-0"
                    >
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                } else if (trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n- ").map((item) => item.replace("- ", ""));
                  return (
                    <ul key={idx} className="space-y-2 list-disc list-inside text-slate-700">
                      {items.map((li, i) => (
                        <li key={i}>{li}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{trimmed}</p>;
              })}
            </article>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-[#071A3D] text-base">Envie de vous tester ?</h4>
                <p className="text-xs text-slate-500">
                  Passez un examen blanc gratuit pour appliquer ces conseils dès maintenant.
                </p>
              </div>
              <Link
                href="/examen-blanc"
                className="px-5 py-2.5 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md shadow-red-500/20"
              >
                Faire un test
              </Link>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
