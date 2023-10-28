import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

import { Toaster } from "@/components/ui/toaster";
import PlausibleProvider from "next-plausible";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR, enUS } from "@clerk/localizations";
import { HighlightInit } from "@highlight-run/next/client";
import { getDictionary, getUserPreferredLanguage } from "@/lib/dictionary";

const inter = Inter({ subsets: ["latin"] });
let metadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = getUserPreferredLanguage();
  const { metadata: dic } = await getDictionary(lang);
  metadata = constructMetadata({
    title: dic.title,
    description: dic.description,
    image: dic.image,
  });

  return (
    <html className="light bg-[#000f12]" suppressHydrationWarning>
      <script
        defer
        data-domain="mypdfgenius.com"
        src="https://plausible.io/js/script.js"
      ></script>
      <HighlightInit
        projectId={"odzlr0le"}
        serviceName="my-pdf-genius"
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
      />

      <PlausibleProvider
        domain={"mypdfgenius.com"}
        trackLocalhost={true}
        enabled={true}
      >
        <Providers>
          <ClerkProvider localization={lang === "pt-br" ? ptBR : enUS}>
            <body
              className={cn(
                "min-h-screen font-sans antialiased",
                inter.className
              )}
            >
              <Toaster />
              <Navbar />
              {children}
            </body>
          </ClerkProvider>
        </Providers>
      </PlausibleProvider>
    </html>
  );
}

export { metadata };
