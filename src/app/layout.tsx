import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://permis-maroc.com"),
  title: {
    default: "بيرمي المغرب | Permis Maroc – تعليم السياقة، قانون السير وامتحانات نـارسا 2026",
    template: "%s | بيرمي المغرب - Permis Maroc",
  },
  description:
    "المنصة المغربية الأولى للتحضير لامتحان رخصة السياقة (البيرمي): دروس قانون السير، اختبارات تفاعلية، امتحانات تجريبية مطابقة لنظام نارسا 2026 ومحاكاة ثلاثية الأبعاد.",
  keywords: [
    "بيرمي المغرب",
    "تعليم السياقة بالمغرب",
    "امتحان رخصة السياقة المغرب",
    "أسئلة البيرمي 2026 نارسا",
    "قانون السير المغرب",
    "علامات المرور بالمغرب",
    "permis maroc",
    "permis de conduire maroc",
    "code de la route maroc",
    "test permis maroc",
    "examen blanc maroc",
    "NARSA",
  ],
  authors: [
    { name: "Permis Maroc" },
    { name: "Darb Digital", url: "https://darbdigital.ma" },
  ],
  creator: "Darb Digital",
  publisher: "Permis Maroc",
  other: {
    "developer": "Darb Digital Solutions — https://darbdigital.ma",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "بيرمي المغرب | Permis Maroc – تعليم السياقة وامتحانات رخصة السياقة 2026",
    description:
      "تعلم قانون السير، تدرب على أسئلة نارسا 2026 واستعد لاجتياز امتحان رخصة السياقة في المغرب باللغة العربية، الدارجة والفرنسية.",
    url: "https://permis-maroc.com",
    siteName: "بيرمي المغرب | Permis Maroc",
    locale: "ar_MA",
    alternateLocale: ["fr_MA"],
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Permis Maroc",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "بيرمي المغرب – انجح في امتحان السياقة من المرة الأولى",
    description:
      "المنصة التفاعلية الحديثة لتعلم قانون السير واجتياز امتحان رخصة السياقة بالمغرب.",
    images: ["/logo.png"],
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
  alternates: {
    canonical: "https://permis-maroc.com",
    languages: {
      "ar-MA": "https://permis-maroc.com",
      "fr-MA": "https://permis-maroc.com",
      "x-default": "https://permis-maroc.com",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "بيرمي المغرب",
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
    <html lang="ar" dir="rtl" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#071A3D] antialiased selection:bg-[#E30D2B] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
