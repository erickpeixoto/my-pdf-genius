'use client'

import ChatInput from './ChatInput'
import Messages from './Messages'
import { ChevronLeft, Loader2, XCircle, Info } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ChatContextProvider } from './ChatContext'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import SessionButton from '@/components/SessionButton'
import { Plans } from '@/lib/types'
import { getNextPlan } from '@/lib/utils'
import { File } from '@prisma/client'
import { trpc } from '@/app/_trpc/client'

import { useUser } from "@clerk/nextjs";
interface ChatWrapperProps {
  file: File
  subscriptionPlan: Awaited<
  ReturnType<typeof getUserSubscriptionPlan>>
  dictionary: any
}


const ChatWrapper = ({
  file,
  subscriptionPlan,
  dictionary
}: ChatWrapperProps) => {
  
  const { user } = useUser();
 
const { slug, isSubscribed, isCanceled, pagesPerPdf } = subscriptionPlan
const nextPlan = getNextPlan(slug as string) as unknown as Plans


const { data } =
trpc.getFileUploadStatus.useQuery(
  {
    fileId: file.id,
  },
  {
    refetchInterval: (data) =>
      data?.status === "PROCESSING" ? 500
        : false,
  }
)





  if (!file)
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
            <h3 className='font-semibold text-xl'>
              {dictionary.loading}
            </h3>
            <p className='text-zinc-500 text-sm'>
              {dictionary.preparingPdf}
            </p>
          </div>
        </div>

        <ChatInput isDisabled dictionary={dictionary.inputMessage}  />
      </div>
    )

  if (data?.status === 'PROCESSING')
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 text-blue-500 animate-spin' />
            <h3 className='font-semibold text-xl'>
              {dictionary.processingPdf}
            </h3>
            <p className='text-zinc-500 text-sm'>
            {dictionary.wontTakeLong}
            </p>
          </div>
        </div>

        <ChatInput isDisabled dictionary={dictionary.inputMessage} />
      </div>
    )

  if (data?.status === 'FAILED')
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <XCircle className='h-8 w-8 text-red-500' />
            <h3 className='font-semibold text-xl'>
              {dictionary.tooManyPages}
            </h3>
            <p className='text-zinc-500 text-sm'>
              {dictionary.yourPlanSupports}{' '}
              <span className='font-medium'>
                {dictionary.plan}
              </span>{' '}
             {dictionary.supportsUpTo}{' '}
             {pagesPerPdf}{' '}
             {dictionary.pagesPerPdf}
              
            </p>
            <Link
              href='/dashboard'
              className={buttonVariants({
                variant: 'secondary',
                className: 'mt-4',
              })}>
              <ChevronLeft className='h-3 w-3 mr-1.5' />
              {dictionary.back}
            </Link>
          </div>
        </div>

        <ChatInput isDisabled dictionary={dictionary.inputMessage} />
      </div>
    )

    if (data?.status === "EXCEEDED_QUOTA")
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Info className='h-10 w-10 text-red-300 relative top-6' />
      
            <div className='flex items-center flex-col bg-red-100 p-9 rounded-xl gap-2'>
                <div className="text-xl font-bold font-white"> {dictionary.oopsTooManyPages}</div>
                <div className=""> {dictionary.youHavePages} {pagesPerPdf} {dictionary.pagesPerPdf} </div>
                <div> {dictionary.upgradePlan} <span className='capitalize font-bold'>{nextPlan} </span>  {dictionary.toGetMorePages}</div>
                <div className="mt-5">
                  <SessionButton  planName={nextPlan} isSubscribed={isSubscribed} title='Upgrade Plan' />
                </div>
           
            </div>
          </div>
        </div>

        <ChatInput isDisabled dictionary={dictionary.inputMessage}  />
      </div>
    )

    if (isCanceled)
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Info className='h-10 w-10 text-red-300 relative top-6' />
      
            <div className='flex items-center flex-col bg-red-100 p-9 rounded-xl gap-2'>
                <div className="text-xl font-bold font-white"> {dictionary.oopsSubscriptionExpired}</div>
            
                <div>{dictionary.selectPreferredPlan}</div>
                <div className="mt-5">
                  <Link href={'/pricing'}>
                    <Button>{dictionary.choosePlans}</Button>
                  </Link>
                </div>
           
            </div>
          </div>
        </div>

        <ChatInput isDisabled dictionary={dictionary.inputMessage}  />
      </div>
    )
  return (
    <ChatContextProvider fileId={file.id}>
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
        <div className='flex-1 justify-between flex flex-col mb-28'>
          <Messages fileId={file.id} picture={user?.imageUrl!} dictionary={dictionary.messages} />
        </div>

        <ChatInput fileId={file.id} dictionary={dictionary.inputMessage} />
      </div>
    </ChatContextProvider>
  )
}

export default ChatWrapper
