"use client"

import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { trpc } from '@/app/_trpc/client'
import { Plans } from '@/lib/types'
import { cn } from '@/lib/utils'

type SessionButtonProps = {
  isSubscribed: boolean
  isManagedMode?: boolean
  planName: Plans
  isLoading?: boolean
  className?: string
  title?: string
  isDisabled?: boolean
}
const SessionButton = ({ isDisabled, isSubscribed, planName, isManagedMode, isLoading, title, className = 'w-full'}: SessionButtonProps) => {

  const {mutate: createStripeSession} = trpc.createStripeSession.useMutation({
    onSuccess: ({url}) => {
      window.location.href = url ?? "/dashboard/billing"
    }
  })
  
  const isChampion = planName === "champion"

  return (
    <Button onClick={() => createStripeSession({isSubscribed, planName, isManagedMode})}
        disabled={isDisabled}  
        className={cn(isChampion && 'bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600 w-full', className)}
    >
      {isLoading &&  <Loader2 className='mr-4 h-4 w-4 animate-spin' />}
      {!isLoading && isSubscribed && title }
      {!isSubscribed && title}
       <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default SessionButton
