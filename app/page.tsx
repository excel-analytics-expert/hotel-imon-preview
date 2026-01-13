"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { ArrowRight, Shield, Wifi, Car, Mic, MapPin, Phone, Clock } from "lucide-react"

export default function HotelPage() {
  const { language, t } = useLanguage()
  const [showWinter, setShowWinter] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setShowWinter((prev) => !prev)
    }, 12000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      {/* ヒーローセクション */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <img 
            src="/snowy-landscape-cottage.jpg" 
            alt="Winter"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[7000ms] ${showWinter ? "opacity-100" : "opacity-0"}`}
          />
          <img 
            src="/-------------20--------------------------.jpg" 
            alt="Summer"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[7000ms] ${showWinter ? "opacity-0" : "opacity-100"}`}
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="relative z-10 mt-10 space-y-12 animate-in fade-in duration-[5000ms] ease-out">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-[6rem] font-medium tracking-[0.35em] text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] leading-tight italic">
            {language === "ja" ? "hotel イモン" : "Hotel Imon"}
          </h1>
          <p className="font-serif text-lg md:text-2xl text-amber-500/80 tracking-[0.7em] uppercase font-light italic drop-shadow-sm">
            Heart Land Club
          </p>
          <div className="max-w-4xl mx-auto pt-6 text-center text-white/90 font-light leading-[2.6] tracking-[0.15em] drop-shadow-md text-lg md:text-2xl">
            {language === "ja" ? "岩手県盛岡市の森に佇む、" : "Tucked away in the forests of Morioka,"}<br />
            {language === "ja" ? "20棟のコテージ風プライベート空間。" : "20 private cottage-style retreats."}
          </div>
          
          <div className="pt-24">
            <Link
              href="/rooms"
              className="group relative inline-block px-16 py-7 bg-[url('/medium-wood-texture.jpg')] bg-cover bg-center rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] hover:-translate-y-1 transition-all duration-500 brightness-[0.6] contrast-[1.3] sepia-[0.4] border-2 border-[#2a1b12]"
            >
              <div className="absolute inset-0 rounded-sm border-[4px] border-[#3d2b1f]/60 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] mix-blend-overlay"></div>
              <span className="relative z-10 font-[family-name:var(--font-rock-salt)] text-2xl md:text-4xl text-[#e8d5b7] drop-shadow-[0_4px_6px_rgba(0,0,0,1)] tracking-wider inline-block opacity-90 group-hover:opacity-100">
                {language === "ja" ? "客室の詳細を見る" : "Discover Rooms"}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* コンセプト */}
      <section id="concept" className="py-60 px-8 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[600px] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl group">
            <img src="/----------------------.jpg" alt="Concept" className="w-full h-full object-cover grayscale-[20%] opacity-90 group-hover:grayscale-0 transition-all duration-[2000ms]" />
          </div>
          <div className="bg-white/[0.01] backdrop-blur-sm p-16 md:p-24 rounded-[4rem] border border-white/5 relative text-left shadow-2xl h-full flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-5xl mb-12 text-white/80 tracking-[0.3em] font-light italic leading-tight">{t("conceptTitle")}</h2>
            <div className="w-20 h-px bg-amber-500/20 mb-16"></div>
            <p className="text-white/60 text-base md:text-lg font-light leading-[2.8] tracking-[0.15em]">
              {t("conceptText1")} {t("conceptText2")}
            </p>
          </div>
        </div>
      </section>

      {/* 施設案内 */}
      <section id="services" className="py-32 w-full bg-black/20 backdrop-blur-sm border-y border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-16">
          {[
            { icon: Shield, labelKey: "fullyPrivate" },
            { icon: Car, labelKey: "privateParking" },
            { icon: Wifi, labelKey: "wifi" },
            { icon: Mic, labelKey: "karaoke" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-28 h-28 rounded-full border border-white/5 flex items-center justify-center mb-10 group-hover:border-amber-500/20 transition-all duration-1500 shadow-sm bg-white/[0.02]">
                <item.icon className="w-10 h-10 text-amber-500/40 group-hover:text-amber-500/80 transition-all duration-1000" />
              </div>
              <h3 className="text-lg md:text-xl font-light tracking-[0.4em] text-white/40 group-hover:text-white/80 transition-all duration-1000 uppercase">{t(item.labelKey as any)}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 料金案内 */}
      <section id="pricing" className="py-52 w-full max-w-7xl px-10 text-center">
        <div className="mb-32">
          <h2 className="text-amber-500/40 text-[12px] tracking-[0.8em] uppercase mb-8 italic">{language === "ja" ? "料金プラン" : "Pricing Plans"}</h2>
          <p className="text-4xl md:text-7xl font-serif tracking-[0.3em] text-white/80 font-light">{t("pricingTitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {(language === "ja" ? [
            { eng: "Short Stay", jp: "休憩", price: "¥4,500〜", detail: "3時間ご利用 / 平日・休日一律" },
            { eng: "Service Time", jp: "サービスタイム", price: "¥5,500〜", detail: "最大12時間 / 朝から夕方まで" },
            { eng: "Overnight", jp: "宿泊", price: "¥8,500〜", detail: "18:00〜翌11:00 / 静寂の一夜" }
          ] : [
            { eng: "Short Stay", jp: "Rest", price: "¥4,500〜", detail: "3 hours / All days" },
            { eng: "Service Time", jp: "Service Time", price: "¥5,500〜", detail: "Up to 12 hours / Morning to evening" },
            { eng: "Overnight", jp: "Overnight", price: "¥8,500〜", detail: "18:00〜Next day 11:00 / Quiet night" }
          ]).map((item, i) => (
            <div key={i} className="bg-white/[0.02] backdrop-blur-md p-12 md:p-16 rounded-[4rem] border border-white/5 group hover:border-amber-500/30 transition-all duration-[2000ms] shadow-2xl flex flex-col items-center justify-between min-h-[500px]">
              <div className="space-y-4 text-center">
                <h3 className="text-sm md:text-base font-light tracking-[0.5em] text-white/20 uppercase italic">{item.eng}</h3>
                <p className="text-3xl md:text-4xl text-white/80 tracking-[0.2em] font-medium">{item.jp}</p>
              </div>
              <div className="text-6xl md:text-7xl font-serif text-amber-500/70 font-light tracking-[0.05em]">{item.price}</div>
              <div className="space-y-4 border-t border-white/5 pt-8 w-full text-center">
                <div className="flex items-center justify-center text-base md:text-lg text-white/40 tracking-[0.1em] font-light">
                  <Clock className="w-4 h-4 mr-3 opacity-40 text-amber-500/60" /> {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* アクセス */}
      <section id="access" className="py-52 w-full max-w-7xl px-10 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center text-left">
          <div className="space-y-24">
            <div>
              <h2 className="text-amber-500/40 text-[10px] tracking-[0.7em] uppercase mb-8 italic">{language === "ja" ? "所在地" : "Location"}</h2>
              <p className="text-3xl md:text-5xl font-serif tracking-[0.3em] text-white/80 font-light italic">{t("accessTitle")}</p>
            </div>
            <div className="space-y-20">
              <div className="group border-l border-white/5 pl-12">
                <p className="text-[11px] text-amber-500/50 tracking-[0.4em] uppercase mb-6 font-light italic">{language === "ja" ? "住所" : "Address"}</p>
                <p className="text-xl text-white/70 font-light tracking-[0.1em] leading-relaxed">
                  {t("address")}
                </p>
              </div>
              <div className="group border-l border-white/5 pl-12 text-left">
                <p className="text-[11px] text-amber-500/50 tracking-[0.4em] uppercase mb-6 font-light italic">{language === "ja" ? "お問い合わせ" : "Contact"}</p>
                <p className="text-2xl text-white/70 font-light tracking-[0.2em]">019-625-1513</p>
              </div>
            </div>
          </div>
          <div className="h-[650px] w-full bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden grayscale opacity-40 hover:opacity-80 transition-all duration-[3000ms] flex items-center justify-center shadow-2xl">
             <span className="text-white/10 font-serif tracking-[0.8em] text-[11px] uppercase italic text-center">Interactive Map Area</span>
          </div>
        </div>
      </section>
    </div>
  )
}