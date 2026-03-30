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
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false;

      // Upsert candidate on login
      const linkedinSub = (profile as Record<string, unknown>)?.sub as string | undefined;

      await db.candidate.upsert({
        where: { email: user.email },
        update: {
          name: user.name ?? undefined,
          avatarUrl: user.image ?? undefined,
          ...(linkedinSub && { linkedinSub }),
        },
        create: {
          email: user.email,
          name: user.name,
          avatarUrl: user.image,
          linkedinSub: linkedinSub ?? undefined,
        },
      });

      return true;
    },
    async jwt({ token, user, profile }) {
      if (user?.email) {
        // First login — fetch candidateId
        const candidate = await db.candidate.findUnique({
          where: { email: user.email },
          select: { id: true, isProfileComplete: true },
        });
        if (candidate) {
          token.candidateId = candidate.id;
          token.isProfileComplete = candidate.isProfileComplete;
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
