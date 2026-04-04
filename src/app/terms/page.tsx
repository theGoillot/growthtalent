import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Growth.Talent",
  description: "Terms and conditions for using Growth.Talent, the growth marketing job board.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold">Terms of Use</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: April 3, 2026</p>

      <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-gray-700">

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">1. About Growth.Talent</h2>
          <p className="mt-3">
            Growth.Talent is a job board specializing in growth marketing roles, operated by <strong>THE GOILLOT</strong>,
            a French company registered under SIREN 882 875 248. By using Growth.Talent, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">2. The Service</h2>
          <p className="mt-3">
            Growth.Talent connects growth marketing professionals with companies hiring for growth roles.
            We provide:
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>A curated job board across the USA, France, and Latin America.</li>
            <li>Free job browsing for candidates.</li>
            <li>Free job posting for companies.</li>
            <li>A paid Boost feature for enhanced visibility.</li>
            <li>Company page claiming for employer branding.</li>
            <li>Email job alerts by category.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">3. Accounts</h2>
          <p className="mt-3">
            Candidate accounts are created via LinkedIn OAuth. By signing in, you authorize us to access your
            LinkedIn profile information (name, email, photo, profile URL). You must provide accurate information
            and are responsible for all activity under your account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">4. Job Posting</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Free posting:</strong> Any company can post a growth marketing job for free.</li>
            <li><strong>Moderation:</strong> All job postings are subject to AI and manual review. We reserve the right to reject or remove any posting that does not meet our quality standards or is not a genuine growth/marketing role.</li>
            <li><strong>Company claims:</strong> Companies can claim their page by verifying domain ownership via email.</li>
            <li><strong>Scraped listings:</strong> Some job listings are aggregated from public sources (LinkedIn, company career pages). Companies can claim and edit these listings.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">5. Boost (Paid Feature)</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><strong>Pricing:</strong> Boost is available at $299 (USA), &euro;299 (France), or $399 (LatAm) per listing for 30 days.</li>
            <li><strong>What Boost includes:</strong> Featured placement at the top of listings, a &quot;Featured&quot; badge, and access to candidate profiles who applied.</li>
            <li><strong>Payment:</strong> All payments are processed by Stripe. THE GOILLOT does not store credit card information.</li>
            <li><strong>Refunds:</strong> Boost purchases are non-refundable once the featured period has begun. Per French consumer law (Code de la consommation, Art. L221-18), a 14-day cooling-off period applies from the date of purchase, provided the Boost has not yet been activated.</li>
            <li><strong>Invoices:</strong> Available upon request at <a href="mailto:talent@growthtalent.org" className="text-gt-purple hover:underline">talent@growthtalent.org</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">6. Prohibited Use</h2>
          <p className="mt-3">You agree not to:</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>Post spam, fraudulent, or misleading job listings.</li>
            <li>Scrape or automatically extract data from Growth.Talent without prior written consent.</li>
            <li>Impersonate another company or individual.</li>
            <li>Use the platform for harassment, discrimination, or any illegal activity.</li>
            <li>Post jobs that are not genuine growth/marketing roles.</li>
            <li>Attempt to circumvent the Boost payment system.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">7. Intellectual Property</h2>
          <p className="mt-3">
            Job listing content belongs to the respective companies that posted them. The Growth.Talent platform,
            design, branding, and editorial content (including AI-enriched descriptions) are the property of THE GOILLOT.
            Unauthorized reproduction is prohibited.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">8. Limitation of Liability</h2>
          <p className="mt-3">
            Growth.Talent is a job board, not a recruitment agency. We do not guarantee employment outcomes.
            THE GOILLOT is not responsible for:
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>The accuracy of information provided by companies in job listings.</li>
            <li>Hiring decisions made by companies.</li>
            <li>The outcome of any job application.</li>
            <li>Temporary unavailability of the platform.</li>
          </ul>
          <p className="mt-3">
            To the maximum extent permitted by French law, THE GOILLOT&apos;s total liability is limited to the amount
            paid by you to Growth.Talent in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">9. Governing Law</h2>
          <p className="mt-3">
            These terms are governed by <strong>French law</strong>. Any disputes arising from the use of Growth.Talent
            shall be submitted to the exclusive jurisdiction of the courts of <strong>Paris, France</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">10. Changes to These Terms</h2>
          <p className="mt-3">
            We may update these terms from time to time. Material changes will be notified via email to registered users.
            Continued use of Growth.Talent after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-gt-black">11. Contact</h2>
          <p className="mt-3">
            For any questions about these terms, contact us at <a href="mailto:talent@growthtalent.org" className="text-gt-purple hover:underline">talent@growthtalent.org</a>.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            THE GOILLOT &mdash; SIREN 882 875 248<br />
            talent@growthtalent.org
          </p>
        </section>

      </div>
    </div>
  );
}
