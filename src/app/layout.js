import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./ReduxProvider";
import { Analytics } from "@vercel/analytics/next"

// Editorial serif for headings, Plex Sans for body, Plex Mono for figures.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Applies the saved theme before first paint so there is no light/dark flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem("spendwise-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export const metadata = {
  metadataBase: new URL("https://spend-wise-client.vercel.app/"),

  title: {
    default: "Spend-Wise - Personal Finance & Expense Tracker",
    template: "%s | Spend-Wise",
  },

  description:
    "Spend-Wise is a modern personal finance and funds management application that helps you track income, expenses, transfers, spending categories, and financial insights with powerful analytics.",

  keywords: [
    "Spend-Wise",
    "Spend-Wise",
    "Expense Tracker",
    "Personal Finance",
    "Money Management",
    "Budget Planner",
    "Income Tracker",
    "Expense Management",
    "Financial Dashboard",
    "Finance App",
    "Expense Analytics",
    "Cash Flow Tracker",
    "Budget Management",
    "Spending Tracker",
    "Financial Reports",
    "Personal Budget",
    "Savings Tracker",
    "Next.js Finance App",
    "Funds Management",
    "Money Tracker",
    "Finance Dashboard"
  ],

  authors: [
    {
      name: "Muhammad Zubair",
    },
  ],

  creator: "Muhammad Zubair",
  publisher: "Spend-Wise",
  applicationName: "Spend-Wise",
  category: "Finance",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // No site-wide canonical: each route declares its own, so nothing
  // inherits a URL that only 308-redirects elsewhere.
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [
      { url: "/Favicons/spend-wise-logo-favicon.ico" },
      {
        url: "/Favicons/spend-wise-logo-favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/Favicons/spend-wise-logo-favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/Favicons/spend-wise-logo-apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spend-wise-client.vercel.app/",
    siteName: "Spend-Wise",
    title: "Spend-Wise - Personal Finance & Expense Tracker",
    description:
      "Track your income, expenses, transfers, spending habits, and financial goals with beautiful dashboards and powerful analytics.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Spend-Wise - Personal Finance & Expense Tracker",
    description:
      "Track your finances with powerful analytics, beautiful dashboards, and complete spending insights.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e11" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
         <Provider>
          {children}
          <Analytics />
        </Provider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--raise)",
              color: "var(--text)",
              border: "1px solid var(--line)",
              borderRadius: "6px",
              boxShadow: "var(--shadow)",
              fontSize: "13px",
            },
          }}
          containerStyle={{ fontSize: "small" }}
        />
      </body>
    </html>
  );
}
