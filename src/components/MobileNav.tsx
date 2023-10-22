'use client'
import { LogOut, Menu, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
const MobileNav = ({ isAuth, dictionary }: { isAuth: boolean, dictionary: any }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()


  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  return (
   
    <div className='sm:hidden'>
      <Menu
        onClick={toggleOpen}
        className='relative z-50 h-8 w-8 text-zinc-500 cursor-pointer'
      />

      {isOpen ? (
        <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
          <ul className='absolute bg-black border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8 '>
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/sign-up')
                    }
                    className='flex items-center w-full font-semibold text-green-600'
                    href='/sign-up'>
                    {dictionary.getStarted}
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/sign-in')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/sign-in'>
                    {dictionary.signIn}
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/pricing')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/pricing'>
                    {dictionary.pricing}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                    <Link
                      href='/dashboard/billing'
                      className="text-white p-2 text-sm"
                    >
                      {dictionary.mySubscription}
                    </Link>
                 </li>
                <li>
                    <Link
                      href='/dashboard'
                      className="text-white p-2 text-sm"
                      >
                      {dictionary.myFiles}
                    </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                <Link
                    onClick={() =>
                      closeOnCurrent('/sign-out')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/sign-out'>
                    {dictionary.signOut}
                    <LogOut className='ml-2 h-5 w-5' />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
