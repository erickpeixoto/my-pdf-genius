import Link from 'next/link'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { buttonVariants } from '../ui/button'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import UserAccountNav from '../UserAccountNav'
import MobileNav from '@/components/MobileNav'
import ClientWrapper from '@/components/Navbar/ClientWrapper'
import Logo from '@/components/Logo'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { getDictionary } from '@/lib/dictionary'


export default async function Navbar({ lang }: { lang: "en" | "pt-br" }) {

  const { navbar } = await getDictionary(lang);

  const { getUser } = getKindeServerSession()
  const user = getUser()
  const subscriptionPlan = await getUserSubscriptionPlan()
  


  return (
    <ClientWrapper>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between text-zinc-500'>
          <Logo />

          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className="text-white">
                   {navbar.pricing}
                </Link>
                <LoginLink
                  className="text-white">
                  {navbar.signIn}
                </LoginLink>
                <RegisterLink
                className="text-white p-2 px-3 border border-white rounded-full"
               >
                  {navbar.getStarted}
  
                </RegisterLink>
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

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? navbar.yourAccount
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </ClientWrapper>
  )
}

