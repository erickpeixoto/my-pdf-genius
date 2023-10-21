import Dashboard from "@/components/Dashboard";
import { Heading } from "@/components/heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UploadButton, { DictionaryProps } from "@/components/UploadButton";
import { db } from "@/db";
import { getDictionary } from "@/lib/dictionary";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { Plans } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Files } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Locale } from "../../../../i18n.config";

export default async function DashboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { dashboard } = await getDictionary(lang);
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <MaxWidthWrapper className="pt-5 flex flex-col">
      <Heading
        title={dashboard.title}
        description={dashboard.description}
        icon={Files}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <UploadButton
        planName={subscriptionPlan.slug as Plans}
        isCanceled={subscriptionPlan.isCanceled}
        dictionary={dashboard as any}
      />
      <Suspense
        fallback={<div className="pt-5 flex flex-col">{dashboard.loading}</div>}
      >
        <Dashboard />
      </Suspense>
    </MaxWidthWrapper>
  );
}
