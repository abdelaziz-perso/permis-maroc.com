import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { FileText, CheckCircle2, AlertCircle, ArrowRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Documents pour le Permis au Maroc 2026 : Liste & Dossier d'Inscription",
  description:
    "Checklist complète des pièces à fournir pour l'inscription au permis de conduire au Maroc : CIN, certificat médical agréé, photos d'identité et timbres fiscaux.",
  alternates: {
    canonical: "https://permis-maroc.com/documents-permis-maroc",
  },
};

export default function DocumentsPermisMarocPage() {
  const documents = [
    {
      title: "Carte d'Identité Nationale (CIN) ou Carte de Séjour",
      description: "2 copies certifiées conformes de la CIN en cours de validité (ou titre de séjour pour les résidents étrangers).",
      required: true,
    },
    {
      title: "Certificat Médical d'Aptitude Physique et Visuelle",
      description: "Délivré par un médecin généraliste agréé par la NARSA et le Ministère de la Santé, datant de moins de 3 mois.",
      required: true,
    },
    {
      title: "Photographies d'identité récentes (6 photos)",
      description: "Format officiel d'identité marocain (35mm x 45mm), de face, fond neutre sans lunettes sombres ni reflets.",
      required: true,
    },
    {
      title: "Bordereau de droits de timbre fiscal et d'inscription",
      description: "Quittance de paiement des frais d'enregistrement fiscal (environ 650 à 700 MAD auprès de la DGI ou Trésorerie).",
      required: true,
    },
    {
      title: "Formulaire officiel de demande de permis (Fiche rose)",
      description: "Délivré et complété par votre auto-école agréée comportant le cachet du directeur pédagogique.",
      required: true,
    },
    {
      title: "Autorisation parentale légalisée (si moins de 18 ans au dépôt)",
      description: "Uniquement pour les candidats préparant l'inscription anticipée (épreuve passée à 18 ans révolus).",
      required: false,
    },
  ];

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                Démarches Administratives
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Documents à fournir pour le permis au Maroc
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                La liste exacte des pièces administratives exigées par la NARSA pour constituer votre dossier d&apos;inscription officiel en auto-école.
              </p>
            </div>

            {/* Checklist */}
            <div className="bg-[#121824] rounded-2xl border border-white/10 overflow-hidden shadow-xl mb-10">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-400" />
                  <span>Checklist des pièces justificatives</span>
                </h2>
                <span className="text-xs text-slate-400 font-mono">Dossier NARSA 2026</span>
              </div>

              <div className="divide-y divide-white/5">
                {documents.map((doc, idx) => (
                  <div key={idx} className="p-5 flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm text-white">{doc.title}</h3>
                        {doc.required ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/30">
                            Obligatoire
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            Cas particulier
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical visit information */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 mb-8 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Zoom sur la visite médicale obligatoire</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                La visite médicale coûte exactement 150 MAD (tarif légal fixé par arrêté ministériel). Elle comprend un examen d&apos;acuité visuelle (minimum 8/10ème pour les deux yeux réunis, avec verres correcteurs si nécessaire), un contrôle auditif et un test réflexe.
              </p>
            </div>

            {/* Bottom link */}
            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">Vos documents sont prêts ?</h4>
                <p className="text-xs text-slate-400">
                  Commencez dès aujourd&apos;hui vos révisions du code en ligne gratuitement.
                </p>
              </div>
              <Link
                href="/examen-blanc"
                className="px-5 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg"
              >
                Faire un test blanc
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
