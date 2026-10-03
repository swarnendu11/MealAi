import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FAF7F2]">
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to MealAI</span>
        </Link>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#78716C]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#224827]" />
          Secured by Clerk
        </span>
      </div>

      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}
