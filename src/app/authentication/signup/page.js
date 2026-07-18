import SignupClient from "./SignupClient";

export const metadata = {
  title: "Create Account",

  description:
    "Create your Spend-Wise account and start tracking your income, expenses, transfers, budgets, and financial goals with a secure personal finance dashboard.",
  keywords: [
    "Spend-Wise",
    "Spend-Wise Signup",
    "Create Account",
    "Register",
    "Expense Tracker",
    "Personal Finance",
    "Budget Tracker",
    "Money Management",
    "Finance Dashboard",
  ],
  alternates: {
    canonical: "https://spend-wise-client.vercel.app/authentication/signup",
  },
  openGraph: {
    title: "Create Your Spend-Wise Account",
    description:
      "Join Spend-Wise today and take complete control of your finances with smart budgeting and analytics.",

    url: "https://spend-wise-client.vercel.app/authentication/signup",
    siteName: "Spend-Wise",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Account | Spend-Wise",
    description:
      "Sign up for Spend-Wise and start managing your finances with confidence.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return <SignupClient />;
}