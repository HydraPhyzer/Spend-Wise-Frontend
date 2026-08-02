const SITE = "https://spend-wise-client.vercel.app";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: `${SITE}/home`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
