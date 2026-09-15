"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Bare /kotg/project has nothing of its own to show — always land on step 1.
// A client-side redirect (rather than next/navigation's redirect()) keeps
// this working identically under the static export build used for
// GitHub Pages, which has no server to issue a real HTTP redirect.
export default function ProjectIndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/kotg/project/scope-definition");
  }, [router]);
  return null;
}
