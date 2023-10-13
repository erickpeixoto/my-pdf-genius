import { getUserSubscriptionPlan } from "@/lib/stripe";
import { pricingItems } from "@/lib/utils";
import SessionButton from "./SessionButton";
import { Plans } from "@/lib/types";
import { Button } from "./ui/button";
import { format } from "date-fns";
import Link from "next/link";
import RegisterButton from "./RegisterButton";

interface CurrentPlanProps {

    subscriptionPlan: Awaited<
    ReturnType<typeof getUserSubscriptionPlan>>
  }
  
export const CurrentPlan = ({ subscriptionPlan }: CurrentPlanProps) => {
    const explorerPlan = pricingItems.find(item => item.plan === subscriptionPlan.name);

    if (!explorerPlan) {
        return <div className="flex justify-center flex-col gap-2 w-1/2">
                    <h3>Uh-oh! Looks like you have not subscribed yet.</h3>
                    <Link href={'/pricing'}>
                        <Button>
                            Subscribe a plan
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
                    <p><strong>Quota:</strong> {explorerPlan.quota}</p>
                    <p><strong>Slug:</strong> {explorerPlan.slug}</p>
                    <p>
                        <span className="font-bold pr-1">Status:</span>
                        {subscriptionPlan.isSubscribed ? 'Active' : 'Inactive'}
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
            <div className="flex flex-col md:w-1/3 gap-3 md:mt-0 mt-9">
                    <div className="text-muted-foreground text-sm">
                            You are currently on a {subscriptionPlan.name} plan.
                            <div className='flex gap-2'>
                                {subscriptionPlan.isCanceled && 
                                <>
                                    <div className='text-red-500'> Plan Expired </div>
                                    <span>Upgrage usign the button below to keep your powers</span>
                                    </>
                                }
                            </div>
                    </div>
                    <SessionButton   
                        isSubscribed={subscriptionPlan.isSubscribed} 
                        planName={subscriptionPlan.slug as Plans} 
                        isManagedMode={true}
                        title="Manage Subscription"
                        />
                
                     {subscriptionPlan.isSubscribed ? (
                        <p className='rounded-full text-xs font-medium'>
                            {subscriptionPlan.isCanceled
                            ? 'Your plan will be canceled on '
                            : 'Your plan renews on '}
                            {format(
                            subscriptionPlan.stripeCurrentPeriodEnd!,
                            'dd.MM.yyyy'
                            )}
                            .
                        </p>
                        ) : null}
                
                        <Link href={'/pricing'}>
                            <Button variant="ghost" className='bg-slate-300 text-gray-500 w-full'>
                                Change plan
                            </Button>
                        </Link>
            </div>
      </div>
  );
}
