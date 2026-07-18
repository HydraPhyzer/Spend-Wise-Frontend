import LoginClient from "./LoginClient";

export const metadata = {
  title: "Login",
  description:
    "Securely log in to your Spend-Wise account to manage your income, expenses, transfers, budgets, and financial analytics in one place.",
  keywords: [
    "Spend-Wise Login",
    "Login",
    "Personal Finance",
    "Expense Tracker",
    "Money Management",
    "Budget Tracker",
    "Financial Dashboard",
  ],
  alternates: {
    canonical: "https://spend-wise-client.vercel.app/authentication/login",
  },
  openGraph: {
    title: "Login | Spend-Wise",
    description:
      "Access your Spend-Wise dashboard and continue tracking your finances.",
    url: "https://spend-wise-client.vercel.app/authentication/login",
    siteName: "Spend-Wise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spend-Wise Login",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Login | Spend-Wise",
    description:
      "Sign in to your Spend-Wise account and manage your finances securely.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginClient />;
}