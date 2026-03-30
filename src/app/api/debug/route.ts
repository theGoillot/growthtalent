import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    AUTH_LINKEDIN_ID: process.env.AUTH_LINKEDIN_ID ? `${process.env.AUTH_LINKEDIN_ID.length} chars, starts with "${process.env.AUTH_LINKEDIN_ID.slice(0,4)}", ends with "${process.env.AUTH_LINKEDIN_ID.slice(-4)}"` : "MISSING",
    AUTH_LINKEDIN_SECRET: process.env.AUTH_LINKEDIN_SECRET ? `${process.env.AUTH_LINKEDIN_SECRET.length} chars` : "MISSING",
    AUTH_SECRET: process.env.AUTH_SECRET ? `${process.env.AUTH_SECRET.length} chars` : "MISSING",
    AUTH_URL: process.env.AUTH_URL ?? "MISSING",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "MISSING",
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ?? "MISSING",
    NODE_ENV: process.env.NODE_ENV,
  });
}
