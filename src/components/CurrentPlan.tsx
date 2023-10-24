import { getUserSubscriptionPlan } from "@/lib/stripe";
import { pricingItems } from "@/lib/utils";
import SessionButton from "./SessionButton";
import { Plans } from "@/lib/types";
import { Button } from "./ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { getDictionary, getUserPreferredLanguage } from "@/lib/dictionary";

interface CurrentPlanProps {

    subscriptionPlan: Awaited<
    ReturnType<typeof getUserSubscriptionPlan>>
  }
  
export const CurrentPlan = async ({ subscriptionPlan }: CurrentPlanProps) => {
    const lang = getUserPreferredLanguage();
    const { billing } = await getDictionary(lang);

    const explorerPlan = Object.values(pricingItems(lang)).find(item => item.plan === subscriptionPlan.name);


    if (!explorerPlan) {
        return <div className="flex justify-center flex-col gap-2 w-1/2">
                    <h3>{billing.notSubscribedTitle}</h3>
                    <Link href={'/pricing'}>
                        <Button>
                            {billing.subscribeButton}
                        </Button>
                    </Link>

            </div>;
    }

    return (
      <div className="md:flex gap-3">
        
            {/* Subscription Description */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md md:w-2/3">
                <h2 className="text-2xl font-bold">{explorerPlan.plan}</h2>
                <p className="text-gray-600">{explorerPlan.tagline}</p>
                <div className="mt-4">
                        <p>
                        <span className="font-bold pr-1">{billing.statusLabel}</span>
                        {subscriptionPlan.isSubscribed ? billing.statusActive : billing.statusInactive}
                    </p>
                </div>
                <ul className="mt-4 list-disc list-inside">
                    {explorerPlan.features.map((feature, index) => (
                        <li key={index} className="text-base">
                            <strong>{feature.text}</strong>
                            {feature.footnote && <em className="text-gray-600 pl-2">{feature.footnote}</em>}
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col md:w-1/2 gap-3 md:mt-0 mt-9">
                    <div className="text-muted-foreground text-sm">
                            {billing.lang} {subscriptionPlan.name} {billing.planName}
                            <div className='flex gap-2'>
                                {subscriptionPlan.isCanceled && 
                                <>
                                    <div className='text-red-500'> {billing.planExpired} </div>
                                    <span>{billing.upgradeText}</span>
                                    </>
                                }
                            </div>
                    </div>
                    <SessionButton   
                        isSubscribed={subscriptionPlan.isSubscribed} 
                        planName={subscriptionPlan.slug as Plans} 
                        isManagedMode={true}
                        title={billing.manageSubscriptionButton}
                        />
                
                     {!subscriptionPlan.isCanceled && subscriptionPlan.isSubscribed ? (
                        <p className='rounded-full text-xs font-medium'>
                            {subscriptionPlan.isCanceled
                            ? billing.cancelOn
                            : billing.renewOn }
                            {format(
                            subscriptionPlan.stripeCurrentPeriodEnd!,
                            'dd.MM.yyyy'
                            )}
                            .
                        </p>
                        ) : null}
                
                        <Link href={'/pricing'}>
                            <Button variant="ghost" className='bg-slate-300 text-gray-500 w-full'>
                                {billing.changePlanButton}
                            </Button>
                        </Link>
            </div>
      </div>
  );
}
