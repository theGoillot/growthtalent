import { ImageResponse } from "next/og";
import { getJobBySlug } from "@/lib/queries";

export const alt = "Job listing on Growth.Talent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage(props: {
  params: Promise<{ category: string; company: string; slug: string }>;
}) {
  const { company, slug } = await props.params;
  const job = await getJobBySlug(slug, company);

  const title = job?.title ?? "Job Not Found";
  const companyName = job?.company?.name ?? "";
  const location = job?.location ?? "";
  const salary =
    job?.salaryMin && job?.salaryMax && job?.salaryCurrency
      ? `${job.salaryCurrency === "EUR" ? "\u20ac" : job.salaryCurrency === "BRL" ? "R$" : "$"}${(job.salaryMin / 1000).toFixed(0)}K\u2013${job.salaryCurrency === "EUR" ? "\u20ac" : job.salaryCurrency === "BRL" ? "R$" : "$"}${(job.salaryMax / 1000).toFixed(0)}K`
      : null;
  const category = job?.category?.replace(/-/g, " ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #F8EADD 0%, #fff 50%, #A8AAD8 100%)",
        }}
      >
        {/* Top: category pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "rgba(168,170,216,0.25)",
              borderRadius: "20px",
              padding: "6px 18px",
              fontSize: "22px",
              fontWeight: 600,
              textTransform: "capitalize",
              color: "#000",
            }}
          >
            {category}
          </div>
          {salary && (
            <div
              style={{
                background: "rgba(34,197,94,0.15)",
                borderRadius: "20px",
                padding: "6px 18px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#15803d",
              }}
            >
              {salary}
            </div>
          )}
        </div>

        {/* Middle: title + company */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#000",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 700,
                color: "#9ca3af",
              }}
            >
              {companyName.charAt(0)}
            </div>
            <div style={{ fontSize: "28px", color: "#374151" }}>
              {companyName}
              {location ? ` \u00b7 ${location}` : ""}
            </div>
          </div>
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#000",
              }}
            >
              Growth.Talent
            </div>
          </div>
          <div style={{ fontSize: "20px", color: "#9ca3af" }}>
            growthtalent.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
