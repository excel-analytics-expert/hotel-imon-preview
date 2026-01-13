"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Menu, X, Phone, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
  ], [])

  const toggleLanguage = () => setLanguage(language === "ja" ? "en" : "ja")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  }

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
            {navLinks.map((link) => (
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="xl:hidden fixed inset-0 w-full h-screen z-[200] bg-black overflow-y-auto"
          >
            <div className="absolute inset-0 bg-[url('/medium-wood-texture.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 bg-black/90 pointer-events-none"></div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 z-30 w-14 h-14 flex items-center justify-center rounded-full bg-black/95 backdrop-blur-xl border-2 border-amber-500/50 text-amber-500/95 hover:text-amber-500 hover:bg-black hover:border-amber-500/70 transition-all duration-500 focus:outline-none shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
              aria-label={language === "ja" ? "メニューを閉じる" : "Close menu"}
            >
              <X className="w-7 h-7" strokeWidth={2.5} />
            </button>

            <div className="relative z-10 h-full flex flex-col justify-start">
              <div className="flex flex-col justify-start gap-6 px-8 pt-40 pb-12 max-w-lg w-full">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.nameKey}
                      variants={itemVariants}
                      custom={i}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block w-full py-5 px-6 text-left text-white text-xl font-serif tracking-[0.3em] hover:text-amber-500/95 transition-all duration-300 uppercase rounded-lg relative group"
                        style={{
                          WebkitTapHighlightColor: 'transparent',
                          minHeight: '56px',
                        }}
                      >
                        <span className="relative z-10 block bg-black px-4 py-3 rounded-lg border-2 border-white/40 shadow-[0_4px_20px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.05)] text-white font-semibold">
                          {t(link.nameKey as any)}
                        </span>
                        <span className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-r from-amber-500/30 to-transparent transition-all duration-300 ease-in-out group-hover:w-full rounded-lg"></span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  variants={itemVariants}
                  className="pt-8 border-t-2 border-amber-500/30"
                >
                  <a
                    href="tel:019-625-1513"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-5 px-6 text-center text-amber-500/98 text-lg font-serif tracking-[0.4em] bg-amber-500/20 border-2 border-amber-500/60 hover:bg-amber-500/30 hover:border-amber-500/80 transition-all duration-300 uppercase rounded-lg backdrop-blur-md shadow-[0_4px_20px_rgba(189,160,102,0.3)]"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      minHeight: '56px',
                    }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" />
                      {t("phoneReservation" as any)}
                    </span>
                  </a>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="pt-6 border-t border-amber-500/20"
                >
                  <button
                    onClick={toggleLanguage}
                    className="block w-full py-4 px-6 text-center text-white text-sm font-serif tracking-[0.3em] hover:text-amber-500/95 hover:bg-white/10 transition-all duration-300 uppercase rounded-lg border-2 border-white/40 hover:border-amber-500/50 bg-black backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.2)] font-semibold"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      minHeight: '48px',
                    }}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Globe className="w-4 h-4" />
                      {language === "ja" ? "ENGLISH" : "日本語"}
                    </span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
