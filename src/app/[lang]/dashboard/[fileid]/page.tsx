import ChatWrapper from '@/components/chat/ChatWrapper'
import PdfRenderer from '@/components/PdfRenderer'
import { db } from '@/db'
import { getDictionary } from '@/lib/dictionary'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { Locale } from "../../../../../i18n.config";
interface PageProps {
  params: {
    fileid: string
    lang: Locale 
  },
  
}
const Page = async ({ params }: PageProps) => {
  const { fileid, lang } = params

  const { getUser } = getKindeServerSession()
  const { aiDoc } = await getDictionary(lang);
  const user = getUser()



  if (!user || !user.id)
    redirect(`/auth-callback?origin=dashboard/${fileid}`)

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  })
  if (!file) notFound()


  // Check quota and amt plan
  const plan = await getUserSubscriptionPlan();
  const { pagesAmt } = file;
  
  if (pagesAmt && plan.pagesPerPdf) {
    const uploadStatus =
      pagesAmt < plan.pagesPerPdf ? "SUCCESS" : "EXCEEDED_QUOTA";
  
    await db.file.update({
      data: {
        uploadStatus,
      },
      where: {
        id: file.id,
      },
    });
  }

  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
        {/* Left sidebar & main wrapper */}
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            {/* Main area */}
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
          <ChatWrapper subscriptionPlan={plan} file={file} user={user} dictionary={aiDoc} lang={lang}/>
        </div>
      </div>
    </div>
  )
}

export default Page
