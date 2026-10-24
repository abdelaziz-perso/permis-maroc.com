"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { blogPosts } from "@/data/blogPosts";
import { BlogPost } from "@/types/models";
import { Clock, Calendar, ArrowRight, Sparkles, BookOpen, Search } from "lucide-react";

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const [search, setSearch] = useState("");

  const categories = [
    "Tous",
    "Permis",
    "Code de la Route",
    "Conseils",
    "Examen",
    "Sécurité routière",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = activeCategory === "Tous" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-slate-300 font-semibold mb-3">
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                <span>Guides, Conseils & Actualités</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Le Blog Permis Maroc
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Les meilleurs conseils rédigés par des moniteurs et experts de la sécurité routière pour réussir son permis du premier coup.
              </p>
            </div>

            {/* Filter Pills & Search */}
            <div className="max-w-4xl mx-auto mb-10 space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un article ou un conseil..."
                  className="w-full pl-12 pr-4 py-3.5 rtl:pr-12 rtl:pl-4 rounded-2xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 text-sm shadow-xl"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#C1272D] text-white shadow-lg shadow-red-950/40"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-6 rounded-2xl bg-[#121824] border border-white/10 hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="font-mono font-bold text-red-400 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/30">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span>{post.publishDate}</span>
                    <span className="font-semibold text-slate-300 group-hover:text-white flex items-center gap-1">
                      Lire l&apos;article
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
