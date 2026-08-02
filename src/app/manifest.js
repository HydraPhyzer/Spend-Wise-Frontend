export default function manifest() {
  return {
    name: "Spend-Wise — Personal Finance & Expense Tracker",
    short_name: "Spend-Wise",
    description:
      "Track income, expenses, transfers, and spending categories with clean dashboards and analytics.",
    start_url: "/home",
    display: "standalone",
    background_color: "#f6f6f4",
    theme_color: "#3b5bdb",
    categories: ["finance", "productivity", "business"],
    icons: [
      {
        src: "/Favicons/spend-wise-logo-android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Favicons/spend-wise-logo-android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
