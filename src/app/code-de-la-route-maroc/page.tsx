import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { courseCategories } from "@/data/courses";
import { BookOpen, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Code de la Route Maroc 2026 : Cours, Règles & Lois Officielles (Loi 52-05)",
  description:
    "Révisez le Code de la Route au Maroc gratuitement : les 12 thématiques officielles, la loi 52-05, le permis à points, les priorités et les limitations de vitesse.",
  alternates: {
    canonical: "https://permis-maroc.com/code-de-la-route-maroc",
  },
};

export default function CodeDeLaRouteMarocPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-2">
                Réglementation Officielle
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Le Code de la Route au Maroc en 2026
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Tout comprendre sur la législation routière marocaine : la Loi 52-05, le barème des retraits de points, les infractions de 1ère, 2ème et 3ème classe, et les 12 modules d&apos;apprentissage indispensables.
              </p>
            </div>

            {/* Quick summary of Highway Code categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {courseCategories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/code-de-la-route/${cat.slug}`}
                  className="p-5 rounded-2xl bg-[#121824] border border-white/10 hover:border-red-500/40 transition-all flex items-center justify-between group shadow-lg"
                >
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.lessonsCount} leçons • {cat.estimatedHours}h</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0" />
                </Link>
              ))}
            </div>

            {/* In-depth content */}
            <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
              <section className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Les 3 classes d&apos;infractions routières au Maroc
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                    <span className="font-bold text-red-400 block mb-1">
                      Infractions de 1ère classe (Amende de 700 MAD)
                    </span>
                    <p className="text-xs text-slate-400">
                      Non-respect du STOP ou du feu rouge (retrait de 4 points), franchissement d&apos;une ligne continue (4 points), circulation en sens interdit (4 points), dépassement de vitesse de plus de 30 km/h (4 à 6 points).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                    <span className="font-bold text-amber-400 block mb-1">
                      Infractions de 2ème classe (Amende de 500 MAD)
                    </span>
                    <p className="text-xs text-slate-400">
                      Téléphone portable tenu en main au volant (retrait de 1 point), défaut de port de la ceinture de sécurité (1 point), dépassement de vitesse compris entre 20 et 30 km/h.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                    <span className="font-bold text-blue-400 block mb-1">
                      Infractions de 3ème classe (Amende de 300 MAD)
                    </span>
                    <p className="text-xs text-slate-400">
                      Dépassement de vitesse de moins de 20 km/h, défaut d&apos;éclairage de plaque minéralogique, non-respect des règles de stationnement simple.
                    </p>
                  </div>
                </div>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  La règle fondamentale de priorité au Maroc
                </h2>
                <p className="mb-4">
                  L&apos;article 28 de la Loi 52-05 consacre la priorité à droite comme règle universelle en l&apos;absence de signalisation spécifique. Toutefois, la majorité des carrefours modernes et giratoires au Maroc comportent un panneau « Cédez le passage », attribuant la priorité aux usagers engagés sur l&apos;anneau (venant de gauche).
                </p>
                <Link
                  href="/panneaux"
                  className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold text-xs"
                >
                  <span>Consulter tous les panneaux de priorité</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </section>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
