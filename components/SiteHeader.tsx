"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const navLinks = [
    { name: language === "ja" ? "コンセプト" : "Concept", href: "/#concept" },
    { name: language === "ja" ? "客室" : "Rooms", href: "/rooms" },
    { name: language === "ja" ? "料金" : "Pricing", href: "/#pricing" },
    { name: language === "ja" ? "お食事" : "Dining", href: "/menu" },
    { name: language === "ja" ? "施設案内" : "Services", href: "/#services" },
    { name: language === "ja" ? "アクセス" : "Access", href: "/#access" },
  ]

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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/60 hover:text-amber-500/70 text-[13px] font-medium transition-all duration-1000 tracking-[0.3em] uppercase"
              >
                {link.name}
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

      <div className={`xl:hidden fixed inset-0 bg-black/95 backdrop-blur-3xl z-[105] transition-all duration-[1000ms] ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-10 pb-20">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className={`text-white/60 text-2xl font-serif tracking-[0.4em] hover:text-amber-500 transition-all duration-700 uppercase transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}