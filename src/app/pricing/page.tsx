import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RegisterButton from '@/components/RegisterButton'
import SessionButton from '@/components/SessionButton'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PLANS } from '@/config/stripe'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { Plans } from '@/lib/types'
import { cn, pricingItems } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'

const Page = async () => {
  
  const subscriptionPlan = await getUserSubscriptionPlan()
  const { isSubscribed } = subscriptionPlan

console.log({ subscriptionPlan })
  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center'>
        <div className='mx-auto mb-10'>
         <h1 className='text-6xl font-bold sm:text-7xl'>
              Choose Your Path
          </h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
              Dive into our tailored plans designed to suit every kind of PDF enthusiast, from hobbyists to professionals.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-3'>
          <TooltipProvider>
            {pricingItems.map(
              ({ plan, tagline, quota, features, slug }) => {
                const price =
                  PLANS.find(
                    (p) => p.slug === plan.toLowerCase()
                  )?.price.amount || 0

                return (
                  <div
                    key={plan}
                    className={cn(
                      'relative rounded-2xl bg-white shadow-lg flex flex-col justify-between',
                      {
                        'border-2 border-blue-600 shadow-blue-200':
                          plan === 'Champion',
                        'border border-gray-200':
                          plan !== 'Champion',
                      }
                    )}>
            
                      {plan === 'Champion' && (
                      <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                        {isSubscribed ? (
                          plan === subscriptionPlan.name ? "My Plan" : "Upgrade now"
                        ) : "Most Popular" } 
                        
                      </div>
                    )}

                    <div className='p-5'>
                      <h3 className='my-3 text-center font-display text-3xl font-bold'>
                        {plan}
                      </h3>
                    
                      <p className='text-gray-500'>
                        {tagline}
                      </p>
                     
                      <p className='my-5 font-display text-6xl font-semibold'>
                        ${price}
                      </p>
                      <p className='text-gray-500'>
                        per month
                      </p>
                    </div>

                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                      <div className='flex items-center space-x-1'>
                        <p>
                          {plan === 'Elite' ? 'Unlimited PDFs' :  `${quota.toLocaleString()} PDFs/mo included`}
                          
                        </p>

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className='cursor-default ml-1.5'>
                            <HelpCircle className='h-4 w-4 text-zinc-500' />
                          </TooltipTrigger>
                          <TooltipContent className='w-80 p-2'>
                            How many PDFs you can upload per
                            month.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <ul className='my-10 space-y-5 px-8'>
                      {features.map(
                        ({ text, footnote, negative }) => (
                          <li
                            key={text}
                            className='flex space-x-5'>
                            <div className='flex-shrink-0'>
                              {negative ? (
                                <Minus className='h-6 w-6 text-gray-300' />
                              ) : (
                                <Check className='h-6 w-6 text-blue-500' />
                              )}
                            </div>
                            {footnote ? (
                              <div className='flex items-center space-x-1'>
                                <p
                                  className={cn(
                                    'text-gray-600',
                                    {
                                      'text-gray-400':
                                        negative,
                                    }
                                  )}>
                                  {text}
                                </p>
                                <Tooltip
                                  delayDuration={300}>
                                  <TooltipTrigger className='cursor-default ml-1.5'>
                                    <HelpCircle className='h-4 w-4 text-zinc-500' />
                                  </TooltipTrigger>
                                  <TooltipContent className='w-80 p-2'>
                                    {footnote}
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            ) : (
                              <p
                                className={cn(
                                  'text-gray-600',
                                  {
                                    'text-gray-400':
                                      negative,
                                  }
                                )}>
                                {text}
                              </p>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                    <div className='border-t border-gray-200' />
                    <div className='p-5'>
                      {!isSubscribed && <SessionButton 
                                              isSubscribed={false} 
                                              planName={slug as Plans} 
                                              title='Choose Plan'
                                              />}
                      {isSubscribed &&  <SessionButton 
                                              isSubscribed={isSubscribed} 
                                              planName={slug as Plans} 
                                              title='Upgrade Plan'
                                              isDisabled={slug === subscriptionPlan.slug}
                                              /> }
                  </div>

                  </div>
                )
              }
            )}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  )
}




export default Page
