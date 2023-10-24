import { getUserSubscriptionPlan } from "@/lib/stripe"
import { Heading } from '@/components/heading'
import { Settings } from 'lucide-react'
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { CurrentPlan } from "@/components/CurrentPlan"
import { getDictionary, getUserPreferredLanguage } from "@/lib/dictionary"

export default async function Billing() {

    const subscriptionPlan = await getUserSubscriptionPlan()
    const lang = getUserPreferredLanguage();
    const { billing } = await getDictionary(lang);

    return (
        <MaxWidthWrapper className='pt-5'>
            <Heading
               title={billing.title}
                description={billing.description}
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <CurrentPlan subscriptionPlan={subscriptionPlan} />
        </MaxWidthWrapper>
   )
}

