import { PLANS } from '@/config/stripe'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Plans } from '@/lib/types'
import { Locale } from "../../i18n.config";

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


export const getPagesPerPdfByPlanName = (planName: Plans): number | null => {
  const plan = PLANS.find(p => p.slug === planName);
  return plan ? plan.quota : null;
}

export const getSizePlanByName = (planName: Plans): number | null => {
  const plan = PLANS.find(p => p.slug === planName);
  return plan ? plan.size : null;
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

export const pricingItems = ( lang : Locale ) => {
  // Define language-specific content here
  const content = {
    en: {
      explorer: {
        plan: 'Explorer',
        tagline: '10 Days Free Trial, no credit card required',
        quota: PLANS.find((p) => p.slug === 'explorer')!.quota,
        slug: PLANS.find((p) => p.slug === 'explorer')!.slug,
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
            text: 'Unlimited Conversations',
            footnote: 'Talk to your files as much as you want',
          },
          {
            text: 'Saved Conversations',
            footnote: 'Access your conversations anytime',
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
      champion: {
        plan: 'Champion',
        tagline: 'Unleash the full power of our platform',
        quota: PLANS.find((p) => p.slug === 'champion')!.quota,
        slug: PLANS.find((p) => p.slug === 'champion')!.slug,
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
            text: 'AI Question Generator',
            footnote: 'Generate questions for your PDFs using AI',
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
      elite: {
        plan: 'Elite',
        tagline: 'For professionals seeking excellence',
        quota: PLANS.find((p) => p.slug === 'elite')!.quota,
        slug: PLANS.find((p) => p.slug === 'elite')!.slug,
        features: [
          {
            text: 'Unlimited pages per PDF',
          },
          {
            text: 'File size limit: 32MB',
          },
          {
            text: 'AI Question Generator',
            footnote: 'Generate questions for your PDFs using AI',
          },
          {
            text: 'Optimized interface for mobile',
          },
          {
            text: 'High-quality algorithmic',
            footnote: 'Better algorithmic responses for enhanced content quality',
          },
          {
            text: '24/7 priority support',
          },
          {
            text: 'First access to new features',
          },
        ],
      },
    },
    'pt-br': {
      explorer: {
        plan: 'Explorer',
        tagline: '10 Dias de Teste Gratuito, sem necessidade de cartão de crédito',
        quota: PLANS.find((p) => p.slug === 'explorer')!.quota,
        slug: PLANS.find((p) => p.slug === 'explorer')!.slug,
        features: [
          {
            text: `${PLANS.find((p) => p.slug === 'explorer')!.pagesPerPdf} páginas por PDF`,
            footnote: 'A quantidade máxima de páginas por arquivo PDF.',
          },
          {
            text: 'Limite de arquivo de 4MB',
            footnote: 'O tamanho máximo de um único arquivo PDF.',
          },
          {
            text: 'Conversas ilimitadas',
            footnote: 'Converse com seus arquivos o quanto quiser',
          },
          {
            text: 'Conversas salvas',
            footnote: 'Acesse suas conversas a qualquer momento',
          },
          {
            text: 'Interface amigável para mobile',
          },
          {
            text: 'Respostas de alta qualidade',
            footnote: 'Respostas algorítmicas melhores para qualidade de conteúdo aprimorada',
            negative: true,
          },
        ],
      },
      champion: {
        plan: 'Champion',
        tagline: 'Liberte todo o poder de nossa plataforma',
        quota: PLANS.find((p) => p.slug === 'champion')!.quota,
        slug: PLANS.find((p) => p.slug === 'champion')!.slug,
        features: [
          {
            text: `${PLANS.find((p) => p.slug === 'champion')!.pagesPerPdf} páginas por PDF`,
            footnote: 'A quantidade máxima de páginas por arquivo PDF.',
          },
          {
            text: 'Limite de arquivo de 16MB',
            footnote: 'O tamanho máximo de um único arquivo PDF.',
          },
          {
            text: 'Gerador de perguntas de IA',
            footnote: 'Gere perguntas para seus PDFs usando IA',
          },
          {
            text: 'Respostas de alta qualidade',
            footnote: 'Respostas algorítmicas Otimizadas',
          },
          {
            text: 'Suporte prioritário',
          },
        ],
      },
      elite: {
        plan: 'Elite',
        tagline: 'Para profissionais em busca de excelência',
        quota: PLANS.find((p) => p.slug === 'elite')!.quota,
        slug: PLANS.find((p) => p.slug === 'elite')!.slug,
        features: [
          {
            text: 'Páginas ilimitadas por PDF',
          },
          {
            text: 'Limite de arquivo: 32MB',
          },
          {
            text: 'Gerador de perguntas de IA',
            footnote: 'Gere perguntas para seus PDFs usando IA',
          },
          {
            text: 'Interface otimizada para mobile',
          },
          {
            text: 'Algoritmo de alta qualidade',
            footnote: 'AI aprimorada',
          },
          {
            text: 'Suporte prioritário 24/7',
          },
          {
            text: 'Primeiro acesso a novos recursos',
          },
        ],
      },
    },
  };
  return content[lang];
};
