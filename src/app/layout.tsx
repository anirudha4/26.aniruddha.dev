import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { BorderSettingsProvider } from "@/contexts/border-settings-context";
import Menu from "@/components/product/menu/menu";
import PendoInitializer from "@/components/pendo-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aniruddha.dev"),
  title: "Anirudha Gandhare | Sr. Software Engineer at Pendo",
  description: 'Sr. Software Engineer at Pendo. Previously Founding Engineer at Chisellabs (acquired by Pendo). Building product analytics platforms, AI-powered product management tools, and innovative digital solutions since 2021.',
  icons: {
    icon: '/logo.svg'
  },
  keywords: ['Anirudha Gandhare', 'Software Engineer', 'Pendo', 'Chisellabs', 'Founding Engineer', 'Product Analytics', 'Full Stack Developer', 'Portfolio'],
  openGraph: {
    title: "Anirudha Gandhare | Sr. Software Engineer at Pendo",
    description: "Sr. Software Engineer at Pendo. Previously Founding Engineer at Chisellabs (acquired by Pendo). Building product analytics platforms and AI-powered product management tools since 2021.",
    url: "https://aniruddha.dev",
    siteName: "Anirudha Gandhare - Portfolio",
    images: [
      {
        type: 'image/jpeg',
        url: "https://aniruddha.dev/OG_2.jpg",
        width: 1200,
        height: 630,
      },
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudha Gandhare | Sr. Software Engineer at Pendo",
    description: "Sr. Software Engineer at Pendo. Previously Founding Engineer at Chisellabs (acquired by Pendo). Building product analytics platforms and AI-powered tools since 2021.",
    images: ["https://aniruddha.dev/OG_2.jpg"],
    site: "@anirudhag1999",
    creator: "@anirudhag1999",
  },
  alternates: {
    canonical: "https://aniruddha.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anirudha Gandhare",
  url: "https://aniruddha.dev",
  image: "https://aniruddha.dev/OG_2.jpg",
  jobTitle: "Sr. Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Pendo",
    url: "https://pendo.io",
  },
  sameAs: [
    "https://www.linkedin.com/in/anirudhagandhare/",
    "https://github.com/anirudha4",
    "https://x.com/anirudhag1999",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="uzyTa_pgDdFdx-i-J0cdK1HuluguNRjg30Rdyd7dg7Y" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track', 'trackAgent'];for(w=0,x=v.length;w<x;++w)(function(m){
    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
})('fec414ed-3409-4d40-b61c-820b6c0c5b37');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PendoInitializer />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BorderSettingsProvider>
            <Menu />
            {children}
          </BorderSettingsProvider>
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
