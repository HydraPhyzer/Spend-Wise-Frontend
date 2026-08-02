import Navbar from '@/Components/Home/Navbar'
import Hero from '@/Components/Home/Hero'
import Features from '@/Components/Home/Features'
import Faq from '@/Components/Home/Faq'
import Footer from '@/Components/Home/Footer'
import JsonLd from '@/Components/SEO/JsonLd'
import React from 'react'

const SITE = "https://spend-wise-client.vercel.app";

export const metadata = {
  title: "Spend-Wise — Free Expense Tracker & Personal Finance Dashboard",

  description:
    "Track income, expenses, transfers, and spending categories in one free personal finance dashboard. See monthly savings, category breakdowns, and yearly charts with Spend-Wise.",

  keywords: [
    "free expense tracker",
    "personal finance app",
    "expense tracker web app",
    "income and expense tracker",
    "budget planner online",
    "money management app",
    "spending tracker",
    "funds management software",
    "financial dashboard",
    "savings tracker",
  ],

  // The homepage is served at /home; point every signal at that one URL.
  alternates: {
    canonical: `${SITE}/home`,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE}/home`,
    siteName: "Spend-Wise",
    title: "Spend-Wise — Free Expense Tracker & Personal Finance Dashboard",
    description:
      "Track income, expenses, and spending categories in one clean dashboard. Monthly savings, category breakdowns, and yearly charts — free.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Spend-Wise — Free Expense Tracker & Personal Finance Dashboard",
    description:
      "Track income, expenses, and spending categories in one clean dashboard. Free, responsive, light and dark.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <JsonLd />
      <Navbar />
      <main className="flex flex-col gap-4 py-6 md:gap-5 md:py-10">
        <Hero />
        <Features />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

export default page
