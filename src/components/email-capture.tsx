"use client";

import { useState } from "react";

export function EmailCapture({ placeholder, buttonText }: { placeholder: string; buttonText: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="mt-3 text-sm text-green-400">You&apos;re in! We&apos;ll keep you posted.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gt-purple"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-gt-purple px-4 py-2 text-sm font-medium text-gt-black transition-colors hover:bg-gt-purple/80 disabled:opacity-50"
      >
        {status === "loading" ? "..." : buttonText}
      </button>
    </form>
  );
}
