"use client";

import { useState } from "react";

export function AudienceTabs({
  talentContent,
  employerContent,
}: {
  talentContent: React.ReactNode;
  employerContent: React.ReactNode;
}) {
  const [tab, setTab] = useState<"talent" | "employer">("talent");

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border-2 border-gt-black p-1">
          <button
            onClick={() => setTab("talent")}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
              tab === "talent"
                ? "bg-gt-black text-white"
                : "text-gt-black hover:bg-gray-50"
            }`}
          >
            I&apos;m a growth pro
          </button>
          <button
            onClick={() => setTab("employer")}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
              tab === "employer"
                ? "bg-gt-black text-white"
                : "text-gt-black hover:bg-gray-50"
            }`}
          >
            I&apos;m hiring
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-10">
        {tab === "talent" ? talentContent : employerContent}
      </div>
    </div>
  );
}
