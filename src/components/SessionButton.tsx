"use client"

import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { trpc } from '@/app/_trpc/client'
import { Plans } from '@/lib/types'

type SessionButtonProps = {
  isSubscribed: boolean
  planName: Plans
}
const SessionButton = ({ isSubscribed, planName }: SessionButtonProps) => {

  const {mutate: createStripeSession} = trpc.createStripeSession.useMutation({
    onSuccess: ({url}) => {
      window.location.href = url ?? "/dashboard/billing"
    }
  })
  
  const isExplorer = planName === "champion"

  return (
    <Button onClick={() => createStripeSession({isSubscribed, planName})} className={`${isExplorer ? `bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600 w-full`: `w-full` }`}>
      {isSubscribed ? 'Upgrade now' : 'Subscribe'}
       <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default SessionButton
