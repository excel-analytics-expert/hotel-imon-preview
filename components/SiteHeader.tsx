"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Menu, X, Phone, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navLinks = useMemo(() => [
    { nameKey: "concept" as const, href: "/#concept" },
    { nameKey: "rooms" as const, href: "/rooms" },
    { nameKey: "pricing" as const, href: "/#pricing" },
    { nameKey: "menu" as const, href: "/menu" },
    { nameKey: "services" as const, href: "/#services" },
    { nameKey: "access" as const, href: "/#access" },
    { nameKey: "phoneReservation" as const, href: "tel:019-625-1513", isPhone: true },
  ], [])

  const toggleLanguage = () => setLanguage(language === "ja" ? "en" : "ja")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black/40 backdrop-blur-xl border-b border-white/5 transition-all duration-[1500ms]">
      <div className="max-w-[1440px] mx-auto px-10 lg:px-20">
        <div className="flex justify-between items-center h-28">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <img
                src="/hotel-----heart-land-club---.jpg"
                alt="IMON Logo"
                className="h-11 w-auto mr-8 opacity-70 group-hover:opacity-100 transition-all duration-1000"
              />
              <div className="flex flex-col border-l border-white/20 pl-8 text-left">
                <span className="text-white/90 font-serif text-xl tracking-[0.25em] font-light uppercase leading-none italic">hotel イモン</span>
                <span className="text-amber-500/50 text-[9px] tracking-[0.4em] uppercase mt-2">Heart Land Club</span>
              </div>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center space-x-14">
            {navLinks.filter(link => !link.isPhone).map((link) => (
              <Link
                key={link.nameKey}
                href={link.href}
                className="text-white/60 hover:text-amber-500/70 text-[13px] font-medium transition-all duration-1000 tracking-[0.3em] uppercase"
              >
                {t(link.nameKey as any)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-12">
            <button 
              onClick={toggleLanguage}
              className="text-white/30 hover:text-white/60 text-[10px] tracking-[0.4em] transition-all duration-1000 font-medium uppercase"
            >
              <Globe className="w-3.5 h-3.5 mr-2 opacity-50" />
              {language === "ja" ? "EN" : "JA"}
            </button>
            <a
              href="tel:019-625-1513"
              className="flex items-center border border-amber-500/20 text-amber-500/60 px-9 py-3 rounded-full text-[11px] tracking-[0.3em] font-medium hover:bg-white/5 transition-all duration-1000"
            >
              <Phone className="w-3.5 h-3.5 mr-3 opacity-50" />
              {language === "ja" ? "CONTACT" : "RESERVATION"}
            </a>
          </div>

          <div className="xl:hidden z-[110]">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white/50 p-2 focus:outline-none">
              {isOpen ? <X className="h-10 w-10 text-amber-500/60" /> : <Menu className="h-10 w-10" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`xl:hidden fixed inset-0 z-[105] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806]/99 via-[#1a1410]/98 to-[#0a0806]/99 backdrop-blur-[25px]"></div>
        <div className="absolute inset-0 bg-[url('/medium-wood-texture.jpg')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-500/90 hover:text-amber-500 hover:bg-black/80 hover:border-amber-500/50 transition-all duration-500 focus:outline-none"
          aria-label={language === "ja" ? "メニューを閉じる" : "Close menu"}
        >
          <X className="w-7 h-7" />
        </button>

        <div className="relative z-10 h-full flex flex-col px-6 pt-24 pb-8 overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <nav className="space-y-3 mb-12">
              {navLinks.filter(link => !link.isPhone).map((link, i) => (
                <Link
                  key={link.nameKey}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full py-5 px-6 text-left text-white/95 text-xl font-serif tracking-[0.3em] hover:text-amber-500/90 hover:bg-white/5 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] uppercase rounded-lg border border-transparent hover:border-amber-500/20 relative group transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                  style={{ 
                    transitionDelay: `${isOpen ? i * 100 + 300 : 0}ms`,
                    textShadow: '0 2px 25px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.6)',
                    minHeight: '56px'
                  }}
                >
                  <span className="relative z-10">{t(link.nameKey as any)}</span>
                  <span className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-r from-amber-500/20 to-transparent transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full rounded-lg"></span>
                </Link>
              ))}
            </nav>

            <div className="pt-8 border-t border-amber-500/20">
              <a
                href="tel:019-625-1513"
                onClick={() => setIsOpen(false)}
                className={`block w-full py-5 px-6 text-center text-amber-500/95 text-lg font-serif tracking-[0.4em] bg-amber-500/10 border-2 border-amber-500/40 hover:bg-amber-500/20 hover:border-amber-500/60 transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] uppercase rounded-lg relative group transform ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"}`}
                style={{ 
                  transitionDelay: `${isOpen ? navLinks.filter(link => !link.isPhone).length * 100 + 500 : 0}ms`,
                  textShadow: '0 2px 20px rgba(189,160,102,0.5), 0 0 30px rgba(189,160,102,0.3)',
                  minHeight: '56px'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  {t("phoneReservation" as any)}
                </span>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-amber-500/10">
              <button
                onClick={toggleLanguage}
                className={`block w-full py-4 px-6 text-center text-white/70 text-sm font-serif tracking-[0.3em] hover:text-amber-500/80 transition-all duration-500 uppercase rounded-lg border border-white/10 hover:border-amber-500/30 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ 
                  transitionDelay: `${isOpen ? navLinks.filter(link => !link.isPhone).length * 100 + 700 : 0}ms`
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  {language === "ja" ? "ENGLISH" : "日本語"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}