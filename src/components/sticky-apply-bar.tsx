"use client";

import { useEffect, useState } from "react";
import { ApplyButton } from "@/components/apply-button";

export function StickyApplyBar({
  jobId,
  applyUrl,
  label,
  loginLabel,
  salary,
}: {
  jobId: string;
  applyUrl: string | null;
  label: string;
  loginLabel: string;
  salary: string | null;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur-md px-4 py-3 md:hidden">
      <div className="flex items-center justify-between gap-3">
        {salary && <span className="text-sm font-bold text-green-700">{salary}</span>}
        <div className="flex-1 flex justify-end">
          <ApplyButton jobId={jobId} applyUrl={applyUrl} label={label} loginLabel={loginLabel} />
        </div>
      </div>
    </div>
  );
}
