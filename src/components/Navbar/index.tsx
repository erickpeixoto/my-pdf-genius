import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import MobileNav from "@/components/MobileNav";
import ClientWrapper from "@/components/Navbar/ClientWrapper";
import Logo from "@/components/Logo";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getDictionary, getUserPreferredLanguage } from "@/lib/dictionary";
import { getUser } from "@/lib/auth";
import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const lang = getUserPreferredLanguage();
  const { navbar } = await getDictionary(lang);
  const user = await getUser();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <ClientWrapper>
      <MaxWidthWrapper>
        <div className="flex items-center justify-between text-zinc-500">
          <Logo />

          <MobileNav isAuth={!!user} dictionary={navbar} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link href="/pricing" className="text-white">
                  {navbar.pricing}
                </Link>
                <Link href="/sign-in" className="text-white">
                  {navbar.signIn}
                </Link>
                <Link
                  href="/sign-up"
                  className="text-white p-3 border border-white-500 rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                >
                  {navbar.getStarted}
                </Link>
              </>
            ) : (
              <>
                {subscriptionPlan.isCanceled && (
                  <Link href="/pricing">
                    <span className="p-2 text-red-300 border border-red-500 rounded">
                      {navbar.planExpired}
                    </span>
                  </Link>
                )}
                {subscriptionPlan.isTrial && Number(subscriptionPlan.trialPeriodDays) > 0 && (
                  <Link href="/pricing">
                    <span className="p-2 text-violet-300 border border-violet-500 rounded">
                      {subscriptionPlan.trialPeriodDays} {navbar.trialDaysLeft}
                    </span>
                  </Link>
                )}
                {!subscriptionPlan.isCanceled && (
                  <Link
                    href="/dashboard/billing"
                    className="text-white p-2 text-sm"
                  >
                    {navbar.mySubscription}
                  </Link>
                )}

                <Link href="/dashboard" className="text-white p-2 text-sm">
                  {navbar.myFiles}
                </Link>

                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </ClientWrapper>
  );
}
