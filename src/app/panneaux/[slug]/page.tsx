import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SignGraphic } from "@/components/signs/SignGraphic";
import { roadSigns } from "@/data/roadSigns";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { SignDetailAudio } from "@/components/audio/SignDetailAudio";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const dynamic = "force-static";

export function generateStaticParams() {
  return roadSigns.map((sign) => ({
    slug: sign.id,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sign = roadSigns.find((s) => s.id === slug);
  if (!sign) return { title: "Panneau de signalisation" };

  return {
    title: `${sign.name} (${sign.code}) — Panneau de Signalisation Maroc`,
    description: sign.description,
  };
}

export default async function RoadSignDetailPage({ params }: Props) {
  const { slug } = await params;
  const sign = roadSigns.find((s) => s.id === slug);

  if (!sign) {
    notFound();
  }

  return (
    <LanguageProvider>
      <UserProvider>
        {/* MOBILE APP VIEW (< 768px) matching reference design Screen 6 */}
        <div className="block md:hidden">
          <MobileAppShell title="Détail du panneau" backHref="/panneaux">
            <div className="space-y-6 pt-1">
              {/* Large Road Sign Display */}
              <div className="w-full py-8 rounded-3xl bg-white border border-[#E5ECF5] shadow-sm flex items-center justify-center">
                <SignGraphic
                  id={sign.id}
                  name={sign.name}
                  category={sign.category}
                  size="xl"
                />
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-2xl font-black text-[#071A3D] tracking-tight">
                  {sign.code ? `${sign.code} • ` : ""}
                  {sign.name}
                </h1>
                <span className="text-sm font-bold text-[#C1272D] block mt-0.5">
                  {sign.category === "danger"
                    ? "Danger immédiat"
                    : sign.category === "interdiction"
                    ? "Interdiction stricte"
                    : sign.category === "priorite"
                    ? "Arrêt ou priorité"
                    : "Indication officielle"}
                </span>
                <p className="text-xs sm:text-sm text-[#5A6A82] mt-2.5 leading-relaxed font-normal">
                  {sign.description}
                </p>
                <SignDetailAudio sign={sign} />
              </div>

              {/* Exemple en situation */}
              <div className="rounded-3xl bg-white border border-[#E5ECF5] p-4 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-[#5A6A82] uppercase tracking-wider">
                  Exemple en situation
                </h3>
                <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-sky-100 via-amber-50 to-slate-200 border border-slate-200 overflow-hidden relative flex items-center justify-center p-3">
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#020617]/90 backdrop-blur-sm text-white text-[10px] font-bold">
                    Route nationale
                  </div>
                  <div className="flex items-center gap-4">
                    <SignGraphic
                      id={sign.id}
                      name={sign.name}
                      category={sign.category}
                      size="md"
                    />
                    <div className="text-xs text-[#071A3D] font-bold max-w-[180px] bg-white/90 p-2.5 rounded-xl shadow-sm">
                      🚗 {sign.advice || "Marquez l'arrêt et cédez le passage."}
                    </div>
                  </div>
                </div>

                {sign.fineMad !== undefined && sign.fineMad > 0 && (
                  <div className="p-3 rounded-2xl bg-red-50 text-red-700 text-xs font-semibold flex items-center justify-between">
                    <span>Amende en cas d&apos;infraction :</span>
                    <span className="font-bold">
                      {sign.fineMad} MAD ({sign.finePoints} pts)
                    </span>
                  </div>
                )}
              </div>

              {/* CTA: Tester mes connaissances */}
              <Link
                href="/examen-blanc"
                className="w-full py-4 px-5 rounded-2xl bg-[#E30D2B] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all"
              >
                <span>Tester mes connaissances</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </MobileAppShell>
        </div>

        {/* DESKTOP VIEW (>= 768px) */}
        <div className="hidden md:flex min-h-screen flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />
          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <Link
              href="/panneaux"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#5A6A82] hover:text-[#071A3D] mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à tous les panneaux</span>
            </Link>

            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 flex items-center justify-center shrink-0">
                <SignGraphic
                  id={sign.id}
                  name={sign.name}
                  category={sign.category}
                  size="xl"
                />
              </div>

              <div className="flex-1">
                <span className="text-xs font-bold text-[#C1272D] uppercase tracking-wider">
                  {sign.category}
                </span>
                <h1 className="text-3xl font-black text-[#071A3D] mt-1 mb-3">
                  {sign.code ? `${sign.code} • ` : ""}
                  {sign.name}
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {sign.description}
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold text-amber-700 block mb-1">
                    Conseil d&apos;examen :
                  </span>
                  {sign.advice}
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
