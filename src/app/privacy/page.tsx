import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Growth.Talent",
  description: "How Growth.Talent collects, uses, and protects your personal data. GDPR compliant.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: April 3, 2026</p>

      <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-gray-700">

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">1. Who We Are</h2>
          <p className="mt-3">
            Growth.Talent is operated by <strong>THE GOILLOT</strong>, a French company registered under SIREN 882 875 248.
            For any privacy-related inquiries, contact us at <a href="mailto:talent@growthtalent.org" className="text-gt-purple hover:underline">talent@growthtalent.org</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">2. Data We Collect</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Account data:</strong> When you sign in via LinkedIn OAuth, we receive your name, email address, profile photo, and LinkedIn profile URL.</li>
            <li><strong>Email subscriptions:</strong> When you subscribe to job alerts, we store your email address and category preferences.</li>
            <li><strong>Application tracking:</strong> When you apply to a job through Growth.Talent, we record the application event (job ID, timestamp).</li>
            <li><strong>Analytics:</strong> We use Plausible Analytics, which collects anonymized usage data (page views, referrer, country). Plausible does not use cookies and does not collect personal data.</li>
            <li><strong>Payment data:</strong> When you purchase a Boost for a job listing, payment is processed by Stripe. We do not store credit card numbers. Stripe handles all payment data under PCI DSS compliance.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">3. Why We Collect Your Data</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Job matching:</strong> To connect you with relevant growth marketing opportunities.</li>
            <li><strong>Email alerts:</strong> To send you weekly job digests based on your preferences.</li>
            <li><strong>Application tracking:</strong> To let you track your applications and help companies manage candidates.</li>
            <li><strong>Platform improvement:</strong> To understand how people use Growth.Talent and improve the experience.</li>
            <li><strong>Payment processing:</strong> To process Boost purchases for job listings.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">4. Legal Basis (GDPR)</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Consent</strong> (Art. 6(1)(a)): Email subscriptions and job alerts.</li>
            <li><strong>Contract performance</strong> (Art. 6(1)(b)): Account creation, job applications, Boost purchases.</li>
            <li><strong>Legitimate interest</strong> (Art. 6(1)(f)): Anonymized analytics to improve the platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">5. Who We Share Your Data With</h2>
          <p className="mt-3">We do not sell your personal data. We share data only with these service providers:</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>LinkedIn:</strong> OAuth authentication (we receive your profile data when you sign in).</li>
            <li><strong>Stripe:</strong> Payment processing for Boost purchases.</li>
            <li><strong>Resend:</strong> Transactional emails (welcome emails, job alerts).</li>
            <li><strong>Plausible Analytics:</strong> Anonymized, cookie-free analytics. EU-hosted. No personal data shared.</li>
            <li><strong>Supabase:</strong> Database hosting (AWS us-east-1).</li>
            <li><strong>Vercel:</strong> Website hosting and CDN.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">6. Data Retention</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Account data:</strong> Retained while your account is active. Deleted upon request.</li>
            <li><strong>Email subscriptions:</strong> Retained until you unsubscribe.</li>
            <li><strong>Application data:</strong> Retained for 24 months, then anonymized.</li>
            <li><strong>Analytics data:</strong> Anonymized at collection. No personal data retained.</li>
            <li><strong>Payment data:</strong> Stripe retains transaction records per their data retention policy. We retain Boost activation records for accounting purposes.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">7. Your Rights</h2>
          <p className="mt-3">Under GDPR (Articles 15-21), you have the right to:</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Access</strong> your personal data.</li>
            <li><strong>Rectify</strong> inaccurate or incomplete data.</li>
            <li><strong>Erase</strong> your data (&quot;right to be forgotten&quot;).</li>
            <li><strong>Port</strong> your data to another service.</li>
            <li><strong>Object</strong> to processing based on legitimate interest.</li>
            <li><strong>Restrict</strong> processing in certain circumstances.</li>
            <li><strong>Withdraw consent</strong> at any time (for email subscriptions).</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email <a href="mailto:talent@growthtalent.org" className="text-gt-purple hover:underline">talent@growthtalent.org</a>.
            We will respond within 30 days.
          </p>
          <p className="mt-2">
            You also have the right to lodge a complaint with the <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libert&eacute;s), the French data protection authority.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">8. Cookies</h2>
          <p className="mt-3">
            Growth.Talent uses <strong>minimal cookies</strong>:
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Session cookie:</strong> Required for LinkedIn OAuth authentication. Expires when you close your browser.</li>
            <li><strong>Admin cookie:</strong> Used for admin dashboard access only.</li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> use advertising cookies, tracking cookies, or third-party cookies.
            Plausible Analytics operates without cookies.
            No cookie consent banner is required.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">9. International Transfers</h2>
          <p className="mt-3">
            Your data is hosted on Supabase (AWS us-east-1, United States). For transfers of personal data from the EU/EEA to the United States,
            we rely on the EU-US Data Privacy Framework and Standard Contractual Clauses as appropriate.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">10. Payments & Stripe</h2>
          <p className="mt-3">
            The Boost feature is processed exclusively through <strong>Stripe</strong>. THE GOILLOT does not store, process,
            or have access to your credit card numbers. All payment data is handled by Stripe under PCI DSS Level 1 compliance.
            Invoices for Boost purchases are available upon request at <a href="mailto:talent@growthtalent.org" className="text-gt-purple hover:underline">talent@growthtalent.org</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">11. Changes to This Policy</h2>
          <p className="mt-3">
            We may update this privacy policy from time to time. Material changes will be notified via email to registered users.
            Continued use of Growth.Talent after changes constitutes acceptance of the updated policy.
          </p>
        </section>

      </div>
    </div>
  );
}
