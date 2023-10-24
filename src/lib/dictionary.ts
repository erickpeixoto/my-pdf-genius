import 'server-only'
import { headers } from 'next/headers'
import type { Locale } from '../../i18n.config'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  'pt-br': () => import('@/dictionaries/pt-br.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const getUserPreferredLanguage = (): Locale => {
  const languageMapping: Record<string, Locale> = {
    en: 'en',
    'en-us': 'en',
    pt: 'pt-br',
    'pt-br': 'pt-br',
  };

  const acceptLanguage = headers().get('accept-language') || '';
  const primaryLang = acceptLanguage.split(',')[0].toLowerCase();

  return languageMapping[primaryLang] || 'en';
}
