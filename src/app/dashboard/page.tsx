import Dashboard from '@/components/Dashboard'
import { Heading } from '@/components/heading'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UploadButton from '@/components/UploadButton'
import { db } from '@/db'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { Plans } from '@/lib/types'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Files } from 'lucide-react'
import { redirect } from 'next/navigation'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id
    }
  })

  if(!dbUser) redirect('/auth-callback?origin=dashboard')

  const subscriptionPlan = await getUserSubscriptionPlan()

  return (
    <MaxWidthWrapper className='pt-5 flex flex-col'>
    <Heading
        title="My Files"
        description="Manage all your files here."
        icon={Files}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
    />
     <UploadButton planName={subscriptionPlan.slug as Plans} isCanceled={subscriptionPlan.isCanceled}/>

    <Dashboard subscriptionPlan={subscriptionPlan} />
</MaxWidthWrapper>
  )
  

}

export default Page
