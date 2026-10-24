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
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Retour à tous les articles</span>
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span className="font-mono font-bold text-red-400 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/30">
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

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                {post.excerpt}
              </div>
            </div>

            <article className="p-6 sm:p-10 rounded-3xl bg-[#121824] border border-white/10 shadow-2xl mb-10 text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
              {post.content.split("\n\n").map((section, idx) => {
                const trimmed = section.trim();
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2
                      key={idx}
                      className="text-xl sm:text-2xl font-bold text-white pt-4 border-t border-white/5 first:pt-0 first:border-0"
                    >
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                } else if (trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n- ").map((item) => item.replace("- ", ""));
                  return (
                    <ul key={idx} className="space-y-2 list-disc list-inside text-slate-300">
                      {items.map((li, i) => (
                        <li key={i}>{li}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{trimmed}</p>;
              })}
            </article>

            <div className="p-6 rounded-2xl bg-[#C1272D]/10 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">Envie de vous tester ?</h4>
                <p className="text-xs text-slate-300">
                  Passez un examen blanc gratuit pour appliquer ces conseils dès maintenant.
                </p>
              </div>
              <Link
                href="/examen-blanc"
                className="px-5 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg"
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
