import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Provider from "./ReduxProvider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
  alternates: {
    canonical: "https://spend-wise-client.vercel.app/",
  },
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
         <Provider>
          {children}
          <Analytics />
        </Provider>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} containerStyle={{fontSize:"small"}} />
        <link rel="icon" href="/Favicons/spend-wise-logo-favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/Favicons/spend-wise-logo-apple-touch-icon.png"
        />
      </body>
    </html>
  );
}
