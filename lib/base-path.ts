// next/image and a plain <img src="/foo.png"> do NOT automatically pick up
// next.config.ts's basePath the way next/link and Next's own internal
// chrome do — the raw src string is used as-is. Any place referencing a
// public/ asset by absolute path needs this prefix manually, kept in sync
// with the same GITHUB_PAGES flag next.config.ts checks.
export const basePath = process.env.GITHUB_PAGES === "true" ? "/Bluetigercub" : "";
