import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
      // Force authorization params — fixes PKCE/state issues
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  debug: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        await db.candidate.upsert({
          where: { email: user.email },
          update: {
            name: user.name ?? undefined,
            avatarUrl: user.image ?? undefined,
          },
          create: {
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          },
        });
      } catch (error) {
        console.error("Failed to upsert candidate:", error);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        try {
          const candidate = await db.candidate.findUnique({
            where: { email: user.email },
            select: { id: true, isProfileComplete: true },
          });
          if (candidate) {
            token.candidateId = candidate.id;
            token.isProfileComplete = candidate.isProfileComplete;
          }
        } catch (error) {
          console.error("Failed to fetch candidate for JWT:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.candidateId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session as any).candidateId = token.candidateId;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session as any).isProfileComplete = token.isProfileComplete;
      }
      return session;
    },
  },
});
