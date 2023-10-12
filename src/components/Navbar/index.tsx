import Link from 'next/link'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { buttonVariants } from '../ui/button'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from '../UserAccountNav'
import MobileNav from '@/components/MobileNav'
import ClientWrapper from '@/components/Navbar/ClientWrapper'
import Image from 'next/image'
import Logo from '@/components/Logo'
const Navbar = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  

  return (
    <ClientWrapper>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between '>
          <Logo />

          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className="text-white">
                  Pricing
                </Link>
                <LoginLink
                  className="text-white">
                  Sign in
                </LoginLink>
                <RegisterLink
                className="text-white p-2 px-3 border border-white rounded-full"
               >
                  Get started
  
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard/billing'
                  className="text-white p-2 text-sm"
                 >
                  My Subscription
                </Link>

                <Link
                  href='/dashboard'
                  className="text-white p-2 border border-white rounded-full text-sm"
                 >
                  My Files
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
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

export default Navbar
