import type React from "react"
import type { Metadata } from "next"
import { Inter, Cormorant_Garamond, Rock_Salt } from "next/font/google"
import "./globals.css"
import SiteHeader from "@/components/SiteHeader"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600"],
  variable: "--font-cormorant" 
})
const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rock-salt"
})

export const metadata: Metadata = {
  title: "hotel イモン HEART LAND CLUB",
  description: "岩手県盛岡市のコテージ風プライベート空間",
  // 検索エンジンに登録させない設定（noindex）
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="scroll-smooth scroll-pt-28">
      <body className={`${inter.variable} ${cormorant.variable} ${rockSalt.variable} antialiased bg-[url('/medium-wood-texture.jpg')] bg-fixed bg-cover text-white/90`}>
        <div className="min-h-screen bg-black/50 relative">
          <LanguageProvider>
            <SiteHeader />
            <main className="relative z-10">
              {children}
            </main>
            <footer className="bg-black/95 py-24 border-t border-white/10 relative z-20 text-center">
              <div className="max-w-7xl mx-auto px-4">
                <div className="mb-12">
                  <span className="text-white/80 font-serif text-3xl tracking-[0.3em] font-light italic">hotel イモン</span>
                  <p className="text-amber-500/60 text-[10px] tracking-[0.5em] uppercase mt-4">Heart Land Club</p>
                </div>
                <p className="text-white/30 text-[12px] font-light tracking-[0.2em]">
                  &copy; 2026 hotel イモン HEART LAND CLUB. All rights reserved.
                </p>
              </div>
            </footer>
          </LanguageProvider>
        </div>
      </body>
    </html>
  )
}