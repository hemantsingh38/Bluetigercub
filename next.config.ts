import type { NextConfig } from "next";

// GitHub Pages serves this repo at https://hemantsingh38.github.io/Bluetigercub/,
// not at a domain root, so the build needs a base path — but only for that
// static-export build. Local dev (`npm run dev`) and a future Vercel/custom-domain
// deploy should keep running at the root, so this only kicks in when the
// GitHub Actions Pages workflow sets GITHUB_PAGES=true.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "Bluetigercub";

const nextConfig: NextConfig = {
  /* config options here */
  ...(isGithubPages && {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
};

export default nextConfig;
