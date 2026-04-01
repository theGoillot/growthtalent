import { ImageResponse } from "next/og";
import { getCategoriesWithCount } from "@/lib/queries";
import { en } from "@/dictionaries/en";

export const alt = "Job category on Growth.Talent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const categories = await getCategoriesWithCount("en");
  const count = categories.find((c) => c.category === category)?.count ?? 0;
  const label = en.categories[category as keyof typeof en.categories] ?? category;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #A8AAD8 0%, #fff 40%, #FFE495 100%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#000",
            lineHeight: 1.1,
          }}
        >
          {label} Jobs
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#374151",
            marginTop: "20px",
          }}
        >
          {count} open positions with real salaries
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#000",
            }}
          >
            Growth.Talent
          </div>
          <div style={{ fontSize: "24px", color: "#9ca3af" }}>
            \u2014 The #1 growth marketing job board
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
