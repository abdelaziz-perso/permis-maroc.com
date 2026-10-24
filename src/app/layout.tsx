import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://permis-maroc.com"),
  title: {
    default: "Permis Maroc – Code de la Route, Tests & Examen Blanc",
    template: "%s | Permis Maroc",
  },
  description:
    "Préparez votre permis de conduire au Maroc avec des cours de Code de la Route, tests interactifs, examens blancs et fiches de signalisation.",
  keywords: [
    "permis maroc",
    "permis de conduire maroc",
    "code de la route maroc",
    "test permis maroc",
    "examen permis maroc",
    "examen blanc maroc",
    "panneaux de signalisation maroc",
    "permis B maroc",
    "questions permis maroc",
    "auto ecole maroc",
    "NARSA",
  ],
  authors: [{ name: "Permis Maroc Team" }],
  creator: "Permis Maroc",
  publisher: "Permis Maroc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Permis Maroc – Code de la Route, Tests & Examen Blanc",
    description:
      "Préparez votre permis de conduire au Maroc avec des cours de Code de la Route, tests interactifs, examens blancs et fiches de signalisation.",
    url: "https://permis-maroc.com",
    siteName: "Permis Maroc",
    locale: "fr_MA",
    alternateLocale: ["ar_MA"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Permis Maroc – Réussis ton permis du premier coup",
    description:
      "La plateforme moderne pour apprendre le Code de la Route et réussir son examen au Maroc.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google5cca444fee08cb36",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Permis Maroc",
  },
};

export const viewport: Viewport = {
  themeColor: "#F20D2F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#0B0F17] text-slate-100 antialiased selection:bg-[#C1272D] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
