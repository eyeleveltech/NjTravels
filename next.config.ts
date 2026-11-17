import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes plain HTML/CSS/JS to `out/`,
  // which Apache serves directly (no Node server needed).
  output: "export",
  // Emit `/about/index.html` so Apache serves `/about/` without rewrite rules.
  trailingSlash: true,
  // The default image optimizer needs a server.
  images: { unoptimized: true },
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
