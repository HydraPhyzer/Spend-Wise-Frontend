const SITE = "https://spend-wise-client.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private surfaces: no crawl budget spent, nothing thin indexed.
        disallow: ["/dashboard", "/authentication/", "/settings"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
