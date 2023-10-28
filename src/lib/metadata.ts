import { Metadata } from 'next'
import { getDictionary, getUserPreferredLanguage } from './dictionary'
import { Locale } from "../../i18n.config";

const getMetaDataDictionary = async (lang: Locale) => {
    const { metadata } = await getDictionary(lang);
    return metadata;
  } 

export async function constructMetadata({
    title,
    description,
    image,
    icons = "/favicon.ico",
    noIndex = false
  }: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
  } = {}): Promise<Metadata> {
    const lang = getUserPreferredLanguage();
    const metadata = await getMetaDataDictionary(lang);
  
  
    title = title || metadata.title || "My PDF Genius";
    description = description || metadata.description;
  
    if (!image) {
      image = lang === 'pt-br' ? "/thumbnailPt.png" : "/thumbnail.png";
    }
  
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
        creator: "@mypdfgenius"
      },
      icons,
      metadataBase: new URL("https://mypdfgenius.com"),
      themeColor: '#FFF',
      ...(noIndex && {
        robots: {
          index: false,
          follow: false
        }
      })
    }
  }
  
  