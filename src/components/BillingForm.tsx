
import { getUserSubscriptionPlan as SubscriptionType } from '@/lib/stripe'
import { Button } from './ui/button'
import { format } from 'date-fns'
import { Plans } from '@/lib/types'
import SessionButton from './SessionButton'
import Link from 'next/link'
interface BillingFormProps {
  subscriptionPlan: Awaited<
    ReturnType<typeof SubscriptionType>
  >
}

const BillingForm = ({
  subscriptionPlan,
}: BillingFormProps) => {


  return (
      <div className="px-4 lg:px-8 space-y-4 flex flex-col gap-2 ">
          <div className="text-muted-foreground text-sm">
            You are currently on a {subscriptionPlan.name} plan.
          </div>
          <div className='md:w-1/2 w-full' >
                <SessionButton   
                    isSubscribed={subscriptionPlan.isSubscribed} 
                    planName={subscriptionPlan.slug as Plans} 
                    isManagedMode={true} />
            </div>
          <div className="md:w-1/2 w-full flex flex-row justify-between items-center">
            <Link href={'/pricing'}>
              <Button variant="ghost" className='bg-slate-300 text-gray-500 w-[250px] '>
                  Change plan
              </Button>
            </Link>
            {subscriptionPlan.isSubscribed ? (
              <p className='rounded-full text-xs font-medium'>
                {subscriptionPlan.isCanceled
                  ? 'Your plan will be canceled on '
                  : 'Your plan renews on'}
                {format(
                  subscriptionPlan.stripeCurrentPeriodEnd!,
                  'dd.MM.yyyy'
                )}
                .
              </p>
            ) : null}
         </div>
      </div>
  )
}

export default BillingForm
