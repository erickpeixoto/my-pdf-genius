import { getUserSubscriptionPlan } from "@/lib/stripe"
import { Heading } from '@/components/heading'
import { Settings } from 'lucide-react'
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { CurrentPlan } from "@/components/CurrentPlan"
import { getDictionary } from "@/lib/dictionary"
import { Locale } from '../../../../../i18n.config'
export default async function Billing({ params: { lang } }: { params: { lang: Locale }}) {

    const subscriptionPlan = await getUserSubscriptionPlan()
    const { billing } = await getDictionary(lang)

    return (
        <MaxWidthWrapper className='pt-5'>
            <Heading
               title={billing.title}
                description={billing.description}
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <CurrentPlan subscriptionPlan={subscriptionPlan} lang={lang} />
        </MaxWidthWrapper>
   )
}

