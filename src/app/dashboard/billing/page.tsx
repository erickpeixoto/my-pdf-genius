import { getUserSubscriptionPlan } from "@/lib/stripe"
import { Heading } from '@/components/heading'
import { Settings } from 'lucide-react'
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { CurrentPlan } from "@/components/CurrentPlan"

const Page = async () => {
    const subscriptionPlan = await getUserSubscriptionPlan()

    return (
        <MaxWidthWrapper className='pt-5'>
            <Heading
                title="My Subscription"
                description="Manage account settings."
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <CurrentPlan subscriptionPlan={subscriptionPlan} />
        </MaxWidthWrapper>
   )
}

export default Page
