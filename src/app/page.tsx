/* eslint-disable react/no-unescaped-entities */
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { User, Upload, Keyboard } from 'lucide-react'
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
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
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
            <p className='mt-4 text-lg text-gray-600'>
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
                choose our
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
                  pro plan
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

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
