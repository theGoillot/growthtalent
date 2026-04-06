"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SENIORITY_OPTIONS = [
  { value: "INTERN", label: "Intern / Stage" },
  { value: "JUNIOR", label: "Junior (0-2 years)" },
  { value: "MID", label: "Mid-level (2-5 years)" },
  { value: "SENIOR", label: "Senior (5-8 years)" },
  { value: "LEAD", label: "Lead" },
  { value: "MANAGER", label: "Manager" },
  { value: "DIRECTOR", label: "Director" },
  { value: "VP", label: "VP / Head of" },
  { value: "C_LEVEL", label: "C-Level (CMO, CGO)" },
];

const REPORTS_TO_OPTIONS = [
  "CEO", "CTO", "CMO", "VP Marketing", "VP Growth",
  "Head of Growth", "Head of Marketing", "Director of Marketing",
  "Marketing Manager", "Other",
];

const TOOL_OPTIONS = [
  "Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads",
  "HubSpot", "Salesforce", "Marketo", "Brevo",
  "Mixpanel", "Amplitude", "Google Analytics", "Segment",
  "Ahrefs", "SEMrush", "Moz",
  "Braze", "Iterable", "Customer.io", "Klaviyo",
  "Webflow", "WordPress", "Notion",
  "Figma", "Canva",
  "Zapier", "Make", "n8n",
  "Looker", "Tableau", "Metabase",
  "Intercom", "Drift", "Crisp",
];

const SCOPE_OPTIONS = [
  { value: "solo", label: "Solo / IC" },
  { value: "1-5", label: "1-5 people" },
  { value: "5-15", label: "5-15 people" },
  { value: "15-50", label: "15-50 people" },
  { value: "50+", label: "50+ people" },
];

const VISIBILITY_OPTIONS = [
  { value: "PUBLIC", label: "Public — visible to everyone" },
  { value: "EMPLOYERS_ONLY", label: "Employers only — visible to companies with Boost" },
  { value: "PRIVATE", label: "Private — only you can see it" },
];

interface ProfileForm {
  headline: string;
  bio: string;
  linkedinUrl: string;
  currentTitle: string;
  seniority: string;
  city: string;
  country: string;
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  tools: string[];
  teamScope: string;
  reportsTo: string;
  isInGrowthTeam: boolean;
  profileVisibility: string;
  photoUrl: string;
  companyId: string;
}

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileForm>({
    headline: "",
    bio: "",
    linkedinUrl: "",
    currentTitle: "",
    seniority: "",
    city: "",
    country: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    tools: [],
    teamScope: "",
    reportsTo: "",
    isInGrowthTeam: false,
    profileVisibility: "PUBLIC",
    photoUrl: "",
    companyId: "",
  });

  // Load existing profile
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    if (status !== "authenticated") return;

    setLoading(true);
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return;
        setForm({
          headline: data.headline ?? "",
          bio: data.bio ?? "",
          linkedinUrl: data.linkedinUrl ?? "",
          currentTitle: data.currentTitle ?? "",
          seniority: data.seniority ?? "",
          city: data.city ?? "",
          country: data.country ?? "",
          salaryMin: data.salaryMin?.toString() ?? "",
          salaryMax: data.salaryMax?.toString() ?? "",
          salaryCurrency: data.salaryCurrency ?? "USD",
          tools: data.tools ?? [],
          teamScope: data.teamScope ?? "",
          reportsTo: data.reportsTo ?? "",
          isInGrowthTeam: data.isInGrowthTeam ?? false,
          profileVisibility: data.profileVisibility ?? "PUBLIC",
          photoUrl: data.photoUrl ?? "",
          companyId: data.companyId ?? "",
        });
        setSlug(data.slug);
        if (data.photoUrl) setPhotoPreview(data.photoUrl);
        else if (data.avatarUrl) setPhotoPreview(data.avatarUrl);
      })
      .finally(() => setLoading(false));
  }, [status, router]);

  function toggleTool(tool: string) {
    setForm((f) => ({
      ...f,
      tools: f.tools.includes(tool) ? f.tools.filter((t) => t !== tool) : [...f.tools, tool],
    }));
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Photo must be under 2MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to Supabase Storage via API
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/profile/photo", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, photoUrl: url }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        salaryMin: form.salaryMin ? parseInt(form.salaryMin) : null,
        salaryMax: form.salaryMax ? parseInt(form.salaryMax) : null,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.slug) setSlug(data.slug);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Edit Profile</h1>
            <p className="mt-1 text-sm text-gray-500">Your public Growth.Talent profile</p>
          </div>
          {slug && (
            <a
              href={`/talent/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-gt-black px-4 py-2 text-xs font-bold transition-all hover:bg-gt-black hover:text-white"
            >
              View Public Profile &rarr;
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Photo */}
          <div className="rounded-2xl border bg-white p-6">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Photo</label>
            <div className="mt-3 flex items-center gap-5">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="Profile" className="h-20 w-20 rounded-2xl object-cover border" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gt-purple/10 text-2xl font-bold text-gt-purple">
                  {session?.user?.name?.charAt(0) ?? "?"}
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
                >
                  Upload Photo
                </button>
                <p className="mt-1 text-[11px] text-gray-400">Max 2MB. JPG, PNG, WebP.</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Identity */}
          <div className="rounded-2xl border bg-white p-6 space-y-4">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Identity</label>

            {/* Email — read-only, from LinkedIn */}
            {session?.user?.email && (
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={session.user.email}
                  disabled
                  className="mt-1 w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                />
                <p className="mt-1 text-[11px] text-gray-400">From your LinkedIn account. Cannot be changed.</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Headline</label>
              <input
                type="text"
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                placeholder="VP Growth @ Spendesk → CEO @ MFC"
                maxLength={120}
                className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
              <p className="mt-1 text-[11px] text-gray-400">{form.headline.length}/120</p>
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="2-3 sentences about your growth journey..."
                maxLength={500}
                rows={3}
                className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
              <p className="mt-1 text-[11px] text-gray-400">{form.bio.length}/500</p>
            </div>

            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/your-name"
                className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
            </div>
          </div>

          {/* Role */}
          <div className="rounded-2xl border bg-white p-6 space-y-4">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Role</label>

            <div>
              <label className="text-sm font-medium">Current job title</label>
              <input
                type="text"
                value={form.currentTitle}
                onChange={(e) => setForm({ ...form, currentTitle: e.target.value })}
                placeholder="e.g. Growth Manager, Head of Marketing"
                className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Seniority</label>
                <select
                  value={form.seniority}
                  onChange={(e) => setForm({ ...form, seniority: e.target.value })}
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
                >
                  <option value="">Select</option>
                  {SENIORITY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Reports to</label>
                <select
                  value={form.reportsTo}
                  onChange={(e) => setForm({ ...form, reportsTo: e.target.value })}
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple"
                >
                  <option value="">Select</option>
                  {REPORTS_TO_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, isInGrowthTeam: !form.isInGrowthTeam })}
                className={`relative h-6 w-11 rounded-full transition-colors ${form.isInGrowthTeam ? "bg-gt-purple" : "bg-gray-200"}`}
              >
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.isInGrowthTeam ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
              <label className="text-sm font-medium">I work in a growth team</label>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-2xl border bg-white p-6 space-y-4">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Location</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">City</label>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Paris, NYC..." className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="US, FR..." className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="rounded-2xl border bg-white p-6 space-y-4">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Target Salary (private)</label>
            <p className="text-[11px] text-gray-400 -mt-2">Only you can see this. We use it to match you with relevant roles.</p>
            <div className="flex items-center gap-2">
              <select value={form.salaryCurrency} onChange={(e) => setForm({ ...form, salaryCurrency: e.target.value })} className="rounded-lg border px-3 py-2.5 text-sm">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BRL">BRL</option>
              </select>
              <input type="number" value={form.salaryMin} onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} placeholder="Min" className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
              <span className="text-gray-300">&ndash;</span>
              <input type="number" value={form.salaryMax} onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} placeholder="Max" className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple" />
            </div>
          </div>

          {/* Team Scope */}
          <div className="rounded-2xl border bg-white p-6">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Team Scope</label>
            <select value={form.teamScope} onChange={(e) => setForm({ ...form, teamScope: e.target.value })} className="mt-3 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gt-purple">
              <option value="">Select scope</option>
              {SCOPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Tools */}
          <div className="rounded-2xl border bg-white p-6">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Tools you use</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOOL_OPTIONS.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    form.tools.includes(tool)
                      ? "bg-gt-purple text-white shadow-sm"
                      : "border bg-white text-gray-500 hover:border-gt-purple hover:text-gt-black"
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="rounded-2xl border bg-white p-6">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Profile Visibility</label>
            <div className="mt-3 space-y-2">
              {VISIBILITY_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value={opt.value}
                    checked={form.profileVisibility === opt.value}
                    onChange={() => setForm({ ...form, profileVisibility: opt.value })}
                    className="h-4 w-4 accent-gt-purple"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-gt-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-gt-black/85 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
            {saved && (
              <span className="text-sm font-medium text-emerald-600">Profile saved!</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
