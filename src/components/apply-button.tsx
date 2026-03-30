"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export function ApplyButton({
  jobId,
  applyUrl,
  label,
  loginLabel,
}: {
  jobId: string;
  applyUrl: string | null;
  label: string;
  loginLabel: string;
}) {
  const { data: session, status } = useSession();
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    if (status === "unauthenticated") {
      signIn("linkedin", { callbackUrl: window.location.href });
      return;
    }

    setLoading(true);

    // Track application
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });

    if (res.ok) {
      setApplied(true);
      // Redirect to ATS
      if (applyUrl) {
        window.open(applyUrl, "_blank", "noopener,noreferrer");
      }
    }

    setLoading(false);
  }

  if (applied) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-8 py-3 text-sm font-semibold text-green-800">
        &#10003; Application tracked
        {applyUrl && (
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Open application &rarr;
          </a>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="inline-flex rounded-full bg-gt-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gt-black/85 disabled:opacity-50"
    >
      {loading
        ? "..."
        : status === "unauthenticated"
          ? loginLabel
          : label}
      {status === "authenticated" && " \u2192"}
    </button>
  );
}
