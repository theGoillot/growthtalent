import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
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
        // Don't block sign-in if DB fails
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
