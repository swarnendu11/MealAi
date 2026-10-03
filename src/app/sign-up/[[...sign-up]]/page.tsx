import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FAF7F2]">
      <div className="w-full max-w-md mb-3 flex items-center justify-between">
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

      {/* Guidance Alert for India Phone / Missing Fields Screen */}
      <div className="w-full max-w-md mb-4 p-3.5 bg-amber-50/90 border border-amber-200/80 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-bold text-amber-900">
            Encountering &quot;Phone numbers from this country (India) are currently not supported&quot;?
          </p>
          <p className="mt-1 text-amber-800 text-[11px]">
            In your <strong>Clerk Dashboard</strong> &rarr; <strong>User &amp; Authentication</strong> &rarr; <strong>Email, Phone, Username</strong>: change <strong>Phone number</strong> from <strong>Required</strong> to <strong>Optional</strong>. This removes the mandatory phone requirement so anyone can register with Email or Google!
          </p>
        </div>
      </div>

      <SignUp routing="path" path="/sign-up" />

      <p className="mt-4 text-center text-xs text-[#78716C] max-w-sm leading-relaxed">
        Recommended: Sign up with <strong>Email & Password</strong> or <strong>Google</strong> for instant access. Phone authentication requires your country to be enabled in Clerk&apos;s SMS allowlist.
      </p>
    </div>
  );
}
