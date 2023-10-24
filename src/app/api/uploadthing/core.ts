import { db } from '@/db'
import {
  createUploadthing,
  type FileRouter,
} from 'uploadthing/next'

import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { getPineconeClient } from '@/lib/pinecone'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { PLANS } from '@/config/stripe'
import { getUser } from '@/lib/auth'

const f = createUploadthing()

const middleware = async () => {

  const user = await getUser()

  if (!user || !user.id) throw new Error('Unauthorized')

  const subscriptionPlan = await getUserSubscriptionPlan()

  return { subscriptionPlan, userId: user.id }
}


const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>
  file: {
    key: string
    name: string
    url: string
  }
}) => {

  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  })

  if (isFileExist) return
  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      uploadStatus: 'PROCESSING',
    },
  })

  try {
    const response = await fetch(
      `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
    )

    const blob = await response.blob()

    const loader = new PDFLoader(blob)

    const pageLevelDocs = await loader.load()
 
    const pagesAmt = pageLevelDocs.length

    const { subscriptionPlan } = metadata
    const { isSubscribed, slug } = subscriptionPlan
    const  currentPlan = PLANS.find((plan) => plan.slug === slug)!
    const quota = currentPlan.pagesPerPdf

    const isExceeded = pagesAmt > quota

    // Creating vector store
    const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.Index('genius')

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
        namespace: createdFile.id,
      }
    )
  
    // If user is subscribed and pages amt is exceeded
    const uploadStatus = (isSubscribed && isExceeded) ? 'EXCEEDED_QUOTA' : 'SUCCESS';

    await db.file.update({
        data: {
            uploadStatus: uploadStatus,
            pagesAmt: pagesAmt
        },
        where: {
            id: createdFile.id,
        },
    });
    

  } catch (err) {
    console.error("EROOR:", err)
    await db.file.update({
      data: {
        uploadStatus: 'FAILED',
      },
      where: {
        id: createdFile.id,
      },
    })
  }
}

export const ourFileRouter = {
  explorerUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  championUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  eliteUploader: f({ pdf: { maxFileSize: '32MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter
