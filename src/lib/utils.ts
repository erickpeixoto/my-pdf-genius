import { PLANS } from '@/config/stripe'
import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { Plans } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.APPLICATION_URL)
    return `${process.env.APPLICATION_URL}${path}`
  return `http://localhost:${
    process.env.PORT ?? 3000
  }${path}`
}

export function constructMetadata({
  title = "My PDF Genius - AI-Powered Interactions in Just Minutes",
  description = "My PDF Genius isn't just another file manager. It's your smart assistant, turning dense PDFs into interactive dialogues using advanced AI. Upload and start conversing with your files like never before.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@erickpeixoto"
    },
    icons,
    metadataBase: new URL(process.env.APPLICATION_URL as string),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}


export const getPagesPerPdfByPlanName = (planName: Plans): number | null => {
  const plan = PLANS.find(p => p.slug === planName);
  return plan ? plan.pagesPerPdf : null;
}

const getPlanDetails = (planName: string) => {
  return PLANS.find(p => p.name.toLowerCase() === planName.toLowerCase())?.slug
}

export const getNextPlan = (currentPlan: string) => {
  const planOrder = ['explorer', 'champion', 'elite'];
  const currentPlanIndex = planOrder.indexOf(currentPlan.toLowerCase());
  if (currentPlanIndex < 0 || currentPlanIndex === planOrder.length - 1) return null;
  return getPlanDetails(planOrder[currentPlanIndex + 1]);
}

export const pricingItems = [

  {
    plan: 'Explorer',
    tagline: '10 Days Free Trial, no credit card required',
    quota: PLANS.find((p) => p.slug === 'explorer')!.quota,
    slug:  PLANS.find((p) => p.slug === 'explorer')!.slug,
    features: [
      {
        text: `${PLANS.find((p) => p.slug === 'explorer')!.pagesPerPdf} pages per PDF`,
        footnote: 'The maximum amount of pages per PDF-file.',
      },
      {
        text: '4MB file size limit',
        footnote: 'The maximum file size of a single PDF file.',
      },
      {
        text: 'Mobile-friendly interface',
      },
      {
        text: 'Higher-quality responses',
        footnote: 'Better algorithmic responses for enhanced content quality',
        negative: true,
      },
     ],
  },
  {
    plan: 'Champion',
    tagline: 'Unleash the full power of our platform',
    quota: PLANS.find((p) => p.slug === 'champion')!.quota,
    slug:  PLANS.find((p) => p.slug === 'champion')!.slug,
    features: [
      {
        text: `${PLANS.find((p) => p.slug === 'champion')!.pagesPerPdf} pages per PDF`,
        footnote: 'The maximum amount of pages per PDF-file.',
      },
      {
        text: '16MB file size limit',
        footnote: 'The maximum file size of a single PDF file.',
      },
      {
        text: 'Mobile-friendly interface',
      },
      {
        text: 'Higher-quality responses',
        footnote: 'Better algorithmic responses for enhanced content quality',
      },
      {
        text: 'Priority support',
      },
    ],
  },
  {
    plan: 'Elite',
    tagline: 'For professionals seeking excellence',
    quota: PLANS.find((p) => p.slug === 'elite')!.quota,
    slug:  PLANS.find((p) => p.slug === 'elite')!.slug,
    features: [
      {
        text: `Unlimited pages per PDF`,
      },
      {
        text: 'File size limit: 32MB',
      },
      {
        text: 'Optimized interface for mobile devices',
      },
      {
        text: 'High-quality algorithmic responses',
      },
      {
        text: '24/7 priority support',
      },
      {
        text: 'Automatic backup and advanced security features',
      }
    ],
  },
]