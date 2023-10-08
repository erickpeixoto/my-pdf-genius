import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UpgradeButton from '@/components/UpgradeButton'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  const pricingItems = [
    // Updated information based on new PLANS structure
    {
      plan: 'Explorer',
      tagline: '1 Month Free, no credit card required',
      quota: PLANS.find((p) => p.slug === 'explorer')!.quota,
      features: [
        {
          text: `${PLANS.find((p) => p.slug === 'explorer')!.pagesPerPdf} pages per PDF`,
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '4MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Champion',
      tagline: 'Unleash the full power of our platform.',
      quota: PLANS.find((p) => p.slug === 'champion')!.quota,
      features: [
        {
          text: `${PLANS.find((p) => p.slug === 'champion')!.pagesPerPdf} pages per PDF`,
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '16MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
    {
      plan: 'Elite',
      tagline: 'For professionals seeking excellence without boundaries.',
      quota: PLANS.find((p) => p.slug === 'elite')!.quota,
      features: [
        {
          text: `Up to ${PLANS.find((p) => p.slug === 'elite')!.pagesPerPdf} pages per PDF`,
        },
        {
          text: 'File size limit: 32MB',
        },
        {
          text: 'Optimized interface for mobile devices',
        },
        {
          text: 'High-quality algorithmic responses',
        },
        {
          text: '24/7 priority support',
        },
        {
          text: 'Automatic backup and advanced security features',
        }
      ],
    },
  ]
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
              ({ plan, tagline, quota, features }) => {
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
                        Upgrade now
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
                          {quota.toLocaleString()} PDFs/mo
                          included
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
                      {plan === 'Champion' ? (
                          <Link
                              href={user ? '/dashboard' : '/sign-in'}
                              className="w-full relative group overflow-hidden px-6 h-12 rounded flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600 justify-center text-white">
                              {user ? 'Upgrade now' : 'Sign up'}
                              <ArrowRight className='h-5 w-5 ml-1.5' />
                          </Link>
                      ) : user ? (
                          <UpgradeButton />
                      ) : (
                          <Link
                              href='/sign-in'
                              className={buttonVariants({
                                  className: 'w-full',
                              })}>
                              {user ? 'Upgrade now' : 'Sign up'}
                              <ArrowRight className='h-5 w-5 ml-1.5' />
                          </Link>
                      )}
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
