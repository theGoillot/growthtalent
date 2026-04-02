import type { RichJob } from "@/lib/rich-job";
import type { Dictionary } from "@/dictionaries";

// ── Icons — slightly larger, bolder strokes for editorial feel ──

function IconTarget() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
function IconRocket() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
}
function IconChart() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
}
function IconWrench() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
}
function IconUsers() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function IconDollar() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
}
function IconBuilding() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>;
}
function IconCheck() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconCross() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}

// ── Section Heading — editorial style with left accent ──────

function SectionHeading({ icon, title, accent = "purple" }: { icon: React.ReactNode; title: string; accent?: "purple" | "yellow" | "pink" | "green" }) {
  const accentColors = {
    purple: "bg-gt-purple",
    yellow: "bg-gt-yellow",
    pink: "bg-gt-pink",
    green: "bg-emerald-400",
  };
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentColors[accent]}/20 text-gt-black`}>
        {icon}
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      </div>
    </div>
  );
}

// ── Numbered Item — for objectives lists ────────────────────

function NumberedItem({ num, children, color = "gt-purple" }: { num: number; children: React.ReactNode; color?: string }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-${color}/10 text-xs font-bold text-${color} mt-0.5 transition-colors group-hover:bg-${color}/20`}>
        {num}
      </div>
      <p className="text-[15px] leading-relaxed text-gray-700">{children}</p>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────

export function RichJobDetail({ data }: { data: RichJob; dict: Dictionary }) {
  return (
    <div className="space-y-16">

      {/* ── Visual Tags ── */}
      <div className="flex flex-wrap gap-2.5">
        {data.tags.map((tag, i) => {
          // Alternate between brand colors for visual variety
          const colors = [
            "border-gt-purple/30 bg-gt-purple/8 text-gt-black",
            "border-gt-yellow/40 bg-gt-yellow/15 text-gt-black",
            "border-gt-pink/30 bg-gt-pink/12 text-gt-black",
            "border-gt-cream bg-gt-cream/60 text-gt-black",
          ];
          return (
            <span
              key={tag}
              className={`rounded-full border-2 px-4 py-1.5 text-[13px] font-bold tracking-wide ${colors[i % colors.length]}`}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* ── The Challenge ── */}
      <section>
        <SectionHeading icon={<IconTarget />} title="The Challenge" accent="purple" />
        <div className="relative pl-6 border-l-[3px] border-gt-purple/25">
          <p className="text-[16px] leading-[1.75] text-gray-700">{data.challenge}</p>
        </div>
      </section>

      {/* ── Your Mission (Objectives) ── */}
      {(data.objectives3m.length > 0 || data.objectives6m.length > 0) && (
        <section>
          <SectionHeading icon={<IconRocket />} title="Your Mission" accent="yellow" />
          <div className="grid gap-6 md:grid-cols-2">
            {data.objectives3m.length > 0 && (
              <div className="rounded-3xl border-2 border-black/[0.06] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="inline-flex items-center gap-2 rounded-full bg-gt-yellow/30 px-3.5 py-1 mb-5">
                  <div className="h-1.5 w-1.5 rounded-full bg-gt-black" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gt-black">First 3 Months</span>
                </div>
                <div className="space-y-4">
                  {data.objectives3m.map((obj, i) => (
                    <NumberedItem key={i} num={i + 1}>{obj}</NumberedItem>
                  ))}
                </div>
              </div>
            )}
            {data.objectives6m.length > 0 && (
              <div className="rounded-3xl border-2 border-black/[0.06] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="inline-flex items-center gap-2 rounded-full bg-gt-purple/15 px-3.5 py-1 mb-5">
                  <div className="h-1.5 w-1.5 rounded-full bg-gt-purple" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gt-black">By 6 Months</span>
                </div>
                <div className="space-y-4">
                  {data.objectives6m.map((obj, i) => (
                    <NumberedItem key={i} num={i + 1} color="gt-purple">{obj}</NumberedItem>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── KPIs ── */}
      {data.kpis.length > 0 && (
        <section>
          <SectionHeading icon={<IconChart />} title="KPIs You'll Own" accent="pink" />
          <div className="grid gap-4 sm:grid-cols-2">
            {data.kpis.map((kpi) => (
              <div
                key={kpi.metric}
                className="group rounded-2xl border-2 border-black/[0.06] bg-white p-5 transition-all hover:border-gt-pink/40 hover:shadow-[0_4px_12px_rgba(254,185,206,0.15)]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gt-pink/60 transition-colors group-hover:bg-gt-pink" />
                  <div>
                    <p className="font-display text-[15px] font-bold text-gt-black">{kpi.metric}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{kpi.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Tools & Stack ── */}
      {data.tools.length > 0 && (
        <section>
          <SectionHeading icon={<IconWrench />} title="Tools & Stack" accent="purple" />
          <div className="flex flex-wrap gap-3">
            {data.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border-2 border-black/[0.06] bg-white px-5 py-2.5 text-[14px] font-semibold text-gt-dark shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-px hover:shadow-[0_3px_8px_rgba(0,0,0,0.06)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── Your Team ── */}
      {data.team.manager && (
        <section>
          <SectionHeading icon={<IconUsers />} title="Your Team" accent="yellow" />
          <div className="rounded-3xl border-2 border-black/[0.06] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">Your Manager</p>
                <p className="text-[15px] leading-relaxed text-gray-700">{data.team.manager}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">Current Team</p>
                <p className="text-[15px] leading-relaxed text-gray-700">{data.team.current}</p>
              </div>
            </div>
            {data.team.hiring && (
              <div className="mt-6 rounded-2xl bg-gt-yellow/20 border border-gt-yellow/40 px-5 py-4">
                <p className="text-[14px] font-semibold text-gt-black">{data.team.hiring}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── The Package ── */}
      <section className="rounded-[28px] bg-gt-dark p-8 md:p-10 text-white">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <IconDollar />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">The Package</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-emerald-500/15 border border-emerald-400/20 p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-300/70">Salary</p>
            <p className="mt-2 text-xl font-bold text-emerald-300">{data.compensation.salary}</p>
          </div>
          {data.compensation.variable && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">Variable</p>
              <p className="mt-2 text-[15px] font-semibold text-white/90">{data.compensation.variable}</p>
            </div>
          )}
          {data.compensation.equity && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">Equity</p>
              <p className="mt-2 text-[15px] font-semibold text-white/90">{data.compensation.equity}</p>
            </div>
          )}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">Remote</p>
            <p className="mt-2 text-[15px] font-semibold text-white/90">{data.compensation.remote}</p>
          </div>
        </div>

        {/* Benefits */}
        {data.benefits.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-4">Benefits & Perks</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-[13px] text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Company Intelligence ── */}
      {data.company.about && (
        <section>
          <SectionHeading icon={<IconBuilding />} title="Company Intelligence" accent="purple" />
          <div className="rounded-3xl border-2 border-black/[0.06] bg-gt-cream/20 p-7 md:p-8">
            <p className="text-[15px] leading-[1.75] text-gray-700">{data.company.about}</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  data.company.founded ? { label: "Founded", value: data.company.founded } : null,
                  data.company.headcount ? { label: "Team Size", value: data.company.headcount } : null,
                  data.company.funding ? { label: "Funding", value: data.company.funding } : null,
                  data.company.customers ? { label: "Customers", value: data.company.customers } : null,
                ] as ({ label: string; value: string } | null)[]
              )
                .filter((item): item is { label: string; value: string } => item !== null)
                .map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/70 border border-black/[0.04] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">{item.label}</p>
                    <p className="mt-1.5 text-[14px] font-semibold text-gt-black">{item.value}</p>
                  </div>
                ))}
            </div>

            {data.company.culture && (
              <div className="mt-6 rounded-xl bg-white/70 border border-black/[0.04] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">Culture</p>
                <p className="text-[14px] leading-relaxed text-gray-600">{data.company.culture}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Is This Role For You? ── */}
      {(data.forYouIf.length > 0 || data.wontWorkIf.length > 0) && (
        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight mb-8">Is This Role For You?</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {data.forYouIf.length > 0 && (
              <div className="rounded-3xl border-2 border-emerald-200/60 bg-emerald-50/30 p-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 mb-6">
                  <IconCheck />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700">For You If</span>
                </div>
                <ul className="space-y-4">
                  {data.forYouIf.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-gray-700">
                      <span className="mt-1 shrink-0"><IconCheck /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.wontWorkIf.length > 0 && (
              <div className="rounded-3xl border-2 border-red-200/50 bg-red-50/25 p-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3.5 py-1 mb-6">
                  <IconCross />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-700">Won&apos;t Work If</span>
                </div>
                <ul className="space-y-4">
                  {data.wontWorkIf.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-gray-700">
                      <span className="mt-1 shrink-0"><IconCross /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Interview Process ── */}
      {data.interviewProcess.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight mb-8">Interview Process</h2>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-gt-purple/30 via-gt-yellow/30 to-gt-pink/30" />

            <div className="space-y-6">
              {data.interviewProcess.map((step, i) => (
                <div key={i} className="flex gap-5 items-start relative">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-gt-purple/20 text-sm font-bold text-gt-black shadow-[0_2px_4px_rgba(0,0,0,0.04)] z-10">
                    {i + 1}
                  </div>
                  <div className="rounded-2xl border-2 border-black/[0.06] bg-white p-5 flex-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                    <p className="font-display text-[15px] font-bold text-gt-black">{step.step}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
