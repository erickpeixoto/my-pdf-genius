/* eslint-disable react/no-unescaped-entities */
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { User, Upload, Keyboard, Heart, HelpCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import CustomButton from '@/components/CustomButton'

export default function Home() {
  return (
    <div className='bg-[#000f12] pt-12'>
     <MaxWidthWrapper className='mb-12 flex flex-col items-center justify-center text-center text-white'>
     <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
            Elevate your
            <span className='bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] rounded-lg px-3 ml-3'>PDFs</span>{' '}
            with Intelligent Conversations
        </h1>
        <p className='mt-5 max-w-prose text-gray-400 sm:text-lg'>
            My PDF Genius isn't just another file manager. It's your smart assistant, turning dense PDFs into interactive dialogues using advanced AI. Upload and start conversing with your files like never before.
        </p>


          <Link
            href='/pricing'
            className='mt-12'
            >
                 <CustomButton />
          </Link>


      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='flex flex-col items-center w-full'>
              <div className='flow-root sm:mt-24'>
                <div className=' rounded-xl lg:-m-[120px] lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.png'
                    alt='product preview'
                    width={1600}
                    height={900}
                    quality={100}
                    className='rounded-md  p-2 sm:p-8 md:p-20 '
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto relative sm:-top-[200px]  max-w-5xl sm:mt-5'>
           <div
            aria-hidden='true'
            className='pointer-events-none -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 -top-14'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem] sm:-right-[700px] '
            />
          </div>
          <div className='px-6 lg:px-8 relative -top-40'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              
            <h2 className='mt-2 font-bold text-4xl text-white sm:text-5xl'>
                AI-Powered Interactions in Just Minutes
            </h2>
            <p className='mt-4 text-lg text-gray-400'>
                Delve deep into academic papers, legal documents, or professional reports seamlessly. My PDF Genius' advanced AI understands, interprets, and converses, making information absorption effortless.
            </p>
            </div>
        </div>

        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1 bg-[#1e202e] rounded flex flex-col items-center gap-3 p-4
           hover:bg-[#2a2c3e] transition-colors duration-300 ease-in-out'>  
            
          <span><User className='w-12 h-12 text-[#404356] ' /></span>
            <div className='flex flex-col space-y-2 border-l-4py-2 md:pb-0 md:pl-0 md:pt-4 items-center'>
              <span className='text-xl font-semibold text-white'>
                Sign up for an account
              </span>
              <span className='mt-2 text-zinc-500'>
                Either starting out with a free plan or
                choose the better 
                <Link
                  href='/pricing'
                  className='
                  text-zinc-200
                  hover:text-zinc-600
                  transition-colors
                  duration-300
                  ease-in-out
                  border-b-2
                  border-zinc-500
                  ml-1
                  '>
                   plan for you
                </Link>
                .
              </span>
            </div>
          </li>
    
          <li className='md:flex-1 bg-[#1e202e] rounded flex flex-col items-center gap-3 p-4
           hover:bg-[#2a2c3e] transition-colors duration-300 ease-in-out'>  
            
          <span><Upload className='w-12 h-12 text-[#404356] ' /></span>
            <div className='flex flex-col space-y-2 border-l-4py-2 md:pb-0 md:pl-0 md:pt-4 items-center'>
              <span className='text-xl font-semibold text-white'>
              Upload your PDF file
              </span>
              <span className='mt-2 text-zinc-500'>
              We&apos;ll process your file and make it
                ready for you to chat with.
              </span>
            </div>
          </li>
          
          <li className='md:flex-1 bg-[#1e202e] rounded flex flex-col items-center gap-3 p-4
           hover:bg-[#2a2c3e] transition-colors duration-300 ease-in-out'>  
            
          <span><Keyboard className='w-12 h-12 text-[#404356] ' /></span>
            <div className='flex flex-col space-y-2 border-l-4py-2 md:pb-0 md:pl-0 md:pt-4 items-center'>
            <span className='text-xl font-semibold text-white'>
                Engage with AI-led conversations
            </span>
            <span className='mt-2 text-zinc-500'>
                No more manual searches. Ask questions and get instant answers from your PDFs. Experience the power of AI-driven interactions.
            </span>
            </div>
          </li>
       </ol>

       <footer className=" bg-[#000f12] py-12 text-white flex flex-col items-center text-center">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold mb-4">Ready to elevate your PDFs?</h3>
            <p className="text-gray-400 sm:text-lg mb-6">
              Get started today and unlock the power of intelligent conversations with your documents.
            </p>
            <Link
            href='/pricing'
            className='mt-12'
            >
                 <CustomButton />
          </Link>
          </div>
        </footer>



      </div>
      <div className="w-full bg-[#000f12] py-2 text-white text-center p-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <HelpCircleIcon className='w-5 pr-2 text-gray-400' />
              <p className="text-gray-400">Support</p>
            </div>
            <div className='flex gap-2 items-center text-gray-400'>
              <span>
                  Made with  
              </span>
                  <Heart className='text-primary w-5' /> 
              <span>
                  by Systemroot
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 9H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-4m-2-2v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2"
                />
              </svg>
              <a
                href="mailto:contact@mypdfgenius.com"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out"
              >
                Send us an email
              </a>
            </div>
          </div>
</div>

    </div>
  )
}
