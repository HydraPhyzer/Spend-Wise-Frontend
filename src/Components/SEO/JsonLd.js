import React from "react";

export const SITE_URL = "https://spend-wise-client.vercel.app";

/**
 * Questions worth answering on the page itself — the FAQ block below and the
 * FAQPage schema are generated from the same source so they can never drift.
 * Google penalises structured data that isn't visible on the page.
 */
export const FAQS = [
  {
    question: "Is Spend-Wise free to use?",
    answer:
      "Yes. Creating a Spend-Wise account and tracking your income, expenses, and categories is free. No card is required to sign up.",
  },
  {
    question: "What can I track with Spend-Wise?",
    answer:
      "You can record income and expenses with a name, description, amount, date, money flow direction, and category, then review them as a searchable ledger and as yearly charts.",
  },
  {
    question: "Can I see where my money goes each month?",
    answer:
      "Yes. The dashboard shows monthly incomings, outgoings, net savings, and your savings rate, and the report summary breaks spending down by category across the year.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Every request to your data is authenticated with a bearer token tied to your account, and sessions are validated continuously while you use the app.",
  },
  {
    question: "Does Spend-Wise work on mobile?",
    answer:
      "Yes. Spend-Wise is fully responsive and works on phones, tablets, and desktops, with a light and a dark theme.",
  },
];

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Spend-Wise",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/Logo/spend-wise-logo.png`,
  },
  founder: {
    "@type": "Person",
    name: "Muhammad Zubair",
  },
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Spend-Wise",
  description:
    "Personal finance and funds management app for tracking income, expenses, transfers, and spending categories.",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const application = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#app`,
  name: "Spend-Wise",
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "Expense Tracker",
  operatingSystem: "Web browser",
  url: `${SITE_URL}/home`,
  description:
    "Spend-Wise is a personal funds management web app that tracks income, expenses, transfers, and spending habits with clean dashboards and analytics.",
  featureList: [
    "Track income and expenses",
    "Custom spending categories",
    "Searchable transaction ledger",
    "Weekly, monthly and yearly reports",
    "Income vs expense and category charts",
    "Light and dark themes",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/home#faq`,
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const webPage = {
  "@type": "WebPage",
  "@id": `${SITE_URL}/home#webpage`,
  url: `${SITE_URL}/home`,
  name: "Spend-Wise — Smart Personal Funds Management",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#app` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/home`,
      },
    ],
  },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, website, application, webPage, faqPage],
};

/** Single JSON-LD graph for the marketing home page. */
const JsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
  />
);

export default JsonLd;
