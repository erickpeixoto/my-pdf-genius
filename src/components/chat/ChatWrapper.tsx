'use client'

import ChatInput from './ChatInput'
import Messages from './Messages'
import { ChevronLeft, Loader2, XCircle, Info } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ChatContextProvider } from './ChatContext'
import { PLANS } from '@/config/stripe'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import SessionButton from '@/components/SessionButton'
import { Plans } from '@/lib/types'
import { getNextPlan } from '@/lib/utils'
import { File, User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { trpc } from '@/app/_trpc/client'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server'
interface ChatWrapperProps {
  file: File
  subscriptionPlan: Awaited<
  ReturnType<typeof getUserSubscriptionPlan>>
  user: KindeUser
}


const ChatWrapper = ({
  file,
  subscriptionPlan,
  user,
}: ChatWrapperProps) => {

 
const { slug, isSubscribed, quota, isCanceled, pagesPerPdf } = subscriptionPlan
const nextPlan = getNextPlan(slug as string) as unknown as Plans
const [loaded, setLoaded] = useState(false)

const { data, isLoading } =
trpc.getFileUploadStatus.useQuery(
  {
    fileId: file.id,
  },
)

useEffect(() => {
    setLoaded(true)
}, [file.id, data?.status])

if(!loaded) return null

  if (!file)
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
            <h3 className='font-semibold text-xl'>
              Loading...
            </h3>
            <p className='text-zinc-500 text-sm'>
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisabled  />
      </div>
    )

  if (data?.status === 'PROCESSING')
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
            <h3 className='font-semibold text-xl'>
              Processing PDF...
            </h3>
            <p className='text-zinc-500 text-sm'>
              This won&apos;t take long.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )

  if (data?.status === 'FAILED')
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <XCircle className='h-8 w-8 text-red-500' />
            <h3 className='font-semibold text-xl'>
              Too many pages in PDF
            </h3>
            <p className='text-zinc-500 text-sm'>
              Your{' '}
              <span className='font-medium'>
                {isSubscribed ? 'Pro' : 'Free'}
              </span>{' '}
              plan supports up to{' '}
              {isSubscribed
                ? PLANS.find((p) => p.name === 'Pro')
                    ?.pagesPerPdf
                : PLANS.find((p) => p.name === 'Free')
                    ?.pagesPerPdf}{' '}
              pages per PDF.
            </p>
            <Link
              href='/dashboard'
              className={buttonVariants({
                variant: 'secondary',
                className: 'mt-4',
              })}>
              <ChevronLeft className='h-3 w-3 mr-1.5' />
              Back
            </Link>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )

    if (data?.status === "EXCEEDED_QUOTA")
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Info className='h-10 w-10 text-red-300 relative top-6' />
      
            <div className='flex items-center flex-col bg-red-100 p-9 rounded-xl gap-2'>
                <div className="text-xl font-bold font-white"> Oops! Too many pages</div>
                <div className=""> You have {pagesPerPdf} pages per file</div>
                <div> Upgrade to <span className='capitalize font-bold'>{nextPlan} </span>  to get more pages</div>
                <div className="mt-5">
                  <SessionButton  planName={nextPlan} isSubscribed={isSubscribed} title='Upgrade Plan'/>
                </div>
           
            </div>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )

    if (isCanceled)
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Info className='h-10 w-10 text-red-300 relative top-6' />
      
            <div className='flex items-center flex-col bg-red-100 p-9 rounded-xl gap-2'>
                <div className="text-xl font-bold font-white"> Oops! Subscription expired</div>
            
                <div>To select your preferred plan, simply click on the link provided below.</div>
                <div className="mt-5">
                  <Link href={'/pricing'}>
                    <Button>Choose Plans</Button>
                  </Link>
                </div>
           
            </div>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )
  return (
    <ChatContextProvider fileId={file.id}>
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 justify-between flex flex-col mb-28'>
          <Messages fileId={file.id} picture={user.picture!} />
        </div>

        <ChatInput fileId={file.id} />
      </div>
    </ChatContextProvider>
  )
}

export default ChatWrapper
