import { signIn } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage(props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gt-cream/30">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <Image src="/Logo_GT.svg" alt="Growth.Talent" width={36} height={36} />
          <span className="font-display text-xl font-bold">Growth.Talent</span>
        </div>

        <h1 className="mt-6 text-center font-display text-2xl font-bold">
          Sign in to apply
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Connect with LinkedIn to apply to jobs and track your applications.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("linkedin", { redirectTo: "/" });
          }}
          className="mt-6"
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0A66C2] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004182]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Sign in with LinkedIn
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to our terms of service. We only access your
          name, email, and profile photo.
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gt-purple hover:underline">
            &larr; Back to jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
