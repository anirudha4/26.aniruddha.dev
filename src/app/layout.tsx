import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { BorderSettingsProvider } from "@/contexts/border-settings-context";

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
  title: "Portfolio | Anirudha Gandhare",
  description: "Portfolio website of Anirudha Gandhare",
  icons: {
    icon: '/logo.svg'
  },
  openGraph: {
    title: "Portfolio | Anirudha Gandhare",
    description: "Portfolio website of Anirudha Gandhare",
    url: "https://aniruddha.dev/og.jpg",
    siteName: "Portfolio of Anirudha Gandhare",
    images: [
      {
        type: 'image/jpeg',
        url: "https://aniruddha.dev/og.jpg",
        width: 1200,
        height: 630,
      },
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Anirudha Gandhare",
    description: "Portfolio website of Anirudha Gandhare",
    images: ["https://aniruddha.dev/og.jpg"],
    site: "@anirudhag1999",
    creator: "@anirudhag1999",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BorderSettingsProvider>
            {children}
          </BorderSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
