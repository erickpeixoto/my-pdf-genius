import Link from 'next/link'
import MaxWidthWrapper from '../MaxWidthWrapper'
import MobileNav from '@/components/MobileNav'
import ClientWrapper from '@/components/Navbar/ClientWrapper'
import Logo from '@/components/Logo'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { getDictionary, getUserPreferredLanguage } from '@/lib/dictionary'
import { getUser } from '@/lib/auth'
import { UserButton } from '@clerk/nextjs'


export default async function Navbar() {

  const lang = getUserPreferredLanguage();
  const { navbar } = await getDictionary(lang);
  const user = await getUser()
  const subscriptionPlan = await getUserSubscriptionPlan()
  

  return (
    <ClientWrapper>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between text-zinc-500'>
          <Logo />

          <MobileNav isAuth={!!user} dictionary={navbar} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className="text-white">
                   {navbar.pricing}
                </Link>
                <Link href='/sign-in'>
                    {navbar.signIn}
                 </Link>
                <Link href='/sign-up'>
                    {navbar.getStarted}
                 </Link>
  
            
              </>
            ) : (
              <>
              {subscriptionPlan.isCanceled && (
                <span className='p-2 text-red-300 border border-red-500 rounded'>{navbar.planExpired}</span>
              )}
                <Link
                  href='/dashboard/billing'
                  className="text-white p-2 text-sm"
                 >
                  {navbar.mySubscription}
                </Link>

                <Link
                  href='/dashboard'
                  className="text-white p-2 text-sm"
                 >
                  {navbar.myFiles}
                </Link>

                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </ClientWrapper>
  )
}

