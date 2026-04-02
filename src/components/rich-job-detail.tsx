import type { RichJob } from "@/lib/rich-job";
import type { Dictionary } from "@/dictionaries";

// ── Icons (inline SVGs for zero dependencies) ──────────────

function IconTarget() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
function IconRocket() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
}
function IconChart() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
}
function IconWrench() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
}
function IconUsers() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function IconDollar() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
}
function IconBuilding() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;
}
function IconCheck() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconX() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}
function IconSteps() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8"/><path d="m5 12 7-4 7 4"/><path d="m5 16 7-4 7 4"/><path d="m5 20 7-4 7 4"/></svg>;
}
function IconGift() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>;
}

// ── Section Header ─────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gt-purple/10 text-gt-black">
        {icon}
      </div>
      <h2 className="font-display text-xl font-bold">{title}</h2>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────

export function RichJobDetail({ data, dict }: { data: RichJob; dict: Dictionary }) {
  return (
    <div className="space-y-10">
      {/* Visual Tags */}
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border-2 border-gt-purple/20 bg-gt-purple/5 px-4 py-1.5 text-sm font-semibold text-gt-black"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* The Challenge */}
      <section>
        <SectionHeader icon={<IconTarget />} title="The Challenge" />
        <p className="text-gray-700 leading-relaxed text-[15px]">{data.challenge}</p>
      </section>

      {/* Objectives */}
      {(data.objectives3m.length > 0 || data.objectives6m.length > 0) && (
        <section>
          <SectionHeader icon={<IconRocket />} title="Your Mission" />
          <div className="grid gap-6 md:grid-cols-2">
            {data.objectives3m.length > 0 && (
              <div className="rounded-2xl border-2 border-black/10 p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gt-purple mb-3">First 3 Months</h3>
                <ul className="space-y-2">
                  {data.objectives3m.map((obj, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-gt-purple font-bold">{i + 1}.</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.objectives6m.length > 0 && (
              <div className="rounded-2xl border-2 border-black/10 p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gt-purple mb-3">By 6 Months</h3>
                <ul className="space-y-2">
                  {data.objectives6m.map((obj, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-gt-purple font-bold">{i + 1}.</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* KPIs */}
      {data.kpis.length > 0 && (
        <section>
          <SectionHeader icon={<IconChart />} title="KPIs You'll Own" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.kpis.map((kpi) => (
              <div key={kpi.metric} className="rounded-2xl border-2 border-black/10 p-4">
                <p className="text-sm font-bold text-gt-black">{kpi.metric}</p>
                <p className="mt-1 text-xs text-gray-500">{kpi.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools */}
      {data.tools.length > 0 && (
        <section>
          <SectionHeader icon={<IconWrench />} title="Tools & Stack" />
          <div className="flex flex-wrap gap-2">
            {data.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Your Team */}
      {data.team.manager && (
        <section>
          <SectionHeader icon={<IconUsers />} title="Your Team" />
          <div className="rounded-2xl border-2 border-black/10 p-5 space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Manager</p>
              <p className="mt-1 text-sm text-gray-700">{data.team.manager}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Current Team</p>
              <p className="mt-1 text-sm text-gray-700">{data.team.current}</p>
            </div>
            {data.team.hiring && (
              <div className="rounded-lg bg-gt-yellow/20 px-4 py-2">
                <p className="text-sm font-medium text-gt-black">{data.team.hiring}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* The Package */}
      <section>
        <SectionHeader icon={<IconDollar />} title="The Package" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border-2 border-green-200 bg-green-50/50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Salary</p>
            <p className="mt-1 text-lg font-bold text-green-700">{data.compensation.salary}</p>
          </div>
          {data.compensation.variable && (
            <div className="rounded-2xl border-2 border-black/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Variable</p>
              <p className="mt-1 text-sm font-semibold">{data.compensation.variable}</p>
            </div>
          )}
          {data.compensation.equity && (
            <div className="rounded-2xl border-2 border-black/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Equity</p>
              <p className="mt-1 text-sm font-semibold">{data.compensation.equity}</p>
            </div>
          )}
          <div className="rounded-2xl border-2 border-black/10 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Remote</p>
            <p className="mt-1 text-sm font-semibold">{data.compensation.remote}</p>
          </div>
        </div>

        {/* Benefits */}
        {data.benefits.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <IconGift />
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Benefits</h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {data.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 rounded-xl border px-4 py-2.5">
                  <IconCheck />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Company Intelligence */}
      {data.company.about && (
        <section>
          <SectionHeader icon={<IconBuilding />} title="Company Intelligence" />
          <div className="rounded-2xl border-2 border-black/10 p-5">
            <p className="text-sm text-gray-700 leading-relaxed">{data.company.about}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.company.founded && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Founded</p>
                  <p className="mt-0.5 text-sm font-semibold">{data.company.founded}</p>
                </div>
              )}
              {data.company.headcount && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Team Size</p>
                  <p className="mt-0.5 text-sm font-semibold">{data.company.headcount}</p>
                </div>
              )}
              {data.company.funding && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Funding</p>
                  <p className="mt-0.5 text-sm font-semibold">{data.company.funding}</p>
                </div>
              )}
              {data.company.customers && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Customers</p>
                  <p className="mt-0.5 text-sm font-semibold">{data.company.customers}</p>
                </div>
              )}
              {data.company.culture && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Culture</p>
                  <p className="mt-0.5 text-sm text-gray-700">{data.company.culture}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* For You If / Won't Work If */}
      {(data.forYouIf.length > 0 || data.wontWorkIf.length > 0) && (
        <section>
          <h2 className="font-display text-xl font-bold mb-5">Is This Role For You?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.forYouIf.length > 0 && (
              <div className="rounded-2xl border-2 border-green-200 bg-green-50/30 p-5">
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-widest mb-3">For You If</h3>
                <ul className="space-y-2">
                  {data.forYouIf.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 shrink-0"><IconCheck /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.wontWorkIf.length > 0 && (
              <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-5">
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-3">Won&apos;t Work If</h3>
                <ul className="space-y-2">
                  {data.wontWorkIf.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 shrink-0"><IconX /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Interview Process */}
      {data.interviewProcess.length > 0 && (
        <section>
          <SectionHeader icon={<IconSteps />} title="Interview Process" />
          <div className="space-y-3">
            {data.interviewProcess.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gt-purple/10 text-sm font-bold text-gt-purple">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-bold text-gt-black">{step.step}</p>
                  <p className="text-sm text-gray-500">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
