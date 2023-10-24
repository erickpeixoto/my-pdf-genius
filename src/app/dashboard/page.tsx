import Dashboard from "@/components/Dashboard";
import { Heading } from "@/components/heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UploadButton from "@/components/UploadButton";
import { getDictionary, getUserPreferredLanguage } from "@/lib/dictionary";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { Plans } from "@/lib/types";
import { Files } from "lucide-react";
import { Suspense } from "react";


export default async function DashboardPage() {

  const lang = getUserPreferredLanguage();
  const { dashboard } = await getDictionary(lang);
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
