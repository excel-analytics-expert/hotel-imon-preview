"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import { Coffee, UtensilsCrossed, ShoppingBag, Menu } from "lucide-react"

export default function MenuPage() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { 
          --color-black: #0a0a0a; 
          --color-wine: #5c0000; 
          --color-gold: #bda066; 
          --color-light: #f3f4f6; 
          --font-serif: 'Cormorant Garamond', serif; 
          --font-sans: 'Inter', 'Noto Sans JP', sans-serif; 
        }
        html { background: #1a1410; }
        body { 
          background: transparent;
          font-family: var(--font-sans);
          line-height: 1.6;
          color: var(--color-light);
        }
        header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(26, 20, 16, 0.75);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
        }
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .logo-link:hover {
          opacity: 0.8;
        }
        .logo {
          height: 50px;
          width: auto;
        }
        nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link { 
          position: relative;
          color: rgba(229, 231, 235, 0.9);
          text-decoration: none; 
          padding: 0.65rem 1rem;
          font-weight: 500; 
          font-size: 0.95rem; 
          letter-spacing: 0.025em;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 6px;
          white-space: nowrap;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(212, 175, 55, 0.08);
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .nav-link::after { 
          content: ''; 
          position: absolute; 
          bottom: 6px; 
          left: 50%; 
          transform: translateX(-50%); 
          width: 0; 
          height: 2px; 
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .nav-link:hover { 
          color: white;
          transform: translateY(-2px);
        }
        .nav-link:hover::before {
          opacity: 1;
        }
        .nav-link:hover::after { 
          width: 80%; 
        }
        .btn-secondary { 
          position: relative;
          border: 1.5px solid var(--color-gold); 
          color: var(--color-gold); 
          padding: 0.65rem 1.75rem; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.025em;
          overflow: hidden;
          background: transparent;
        }
        .btn-secondary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--color-gold), #c9a961);
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        .btn-secondary:hover {
          color: var(--color-black);
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
        }
        .btn-secondary:hover::before {
          transform: translateY(0);
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .menu-hero {
          padding: 8rem 0 4rem;
          background: linear-gradient(rgba(40, 30, 20, 0.9), rgba(40, 30, 20, 0.9)),
                      url('/light-wood-texture.jpg') center/cover fixed;
          text-align: center;
        }
        .menu-section {
          padding: 4rem 0;
          background: linear-gradient(rgba(50, 40, 30, 0.95), rgba(50, 40, 30, 0.95)),
                      url('/medium-wood-texture.jpg') center/cover;
        }
        .menu-card {
          background: linear-gradient(rgba(30, 25, 20, 0.95), rgba(30, 25, 20, 0.95));
          border: 1px solid #3f3f46;
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.3s ease;
        }
        .menu-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-gold);
          box-shadow: 0 8px 20px rgba(189, 160, 102, 0.3);
        }
        .menu-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }
        .price-tag {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: var(--color-gold);
          color: var(--color-black);
          border-radius: 20px;
          font-weight: 600;
          font-size: 1.25rem;
          margin-top: 1rem;
        }
        .grid { display: grid; gap: 2rem; }
        .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        #menu-btn {
          display: none;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--color-gold);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.65rem;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          transition: all 0.3s ease;
          z-index: 70;
        }
        #menu-btn:hover {
          background: var(--color-gold);
          color: var(--color-black);
          transform: scale(1.05);
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 380px;
          height: 100vh;
          background: rgba(26, 20, 16, 0.60);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border-left: 1px solid rgba(212, 175, 55, 0.2);
          z-index: 60;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          box-shadow: -10px 0 50px rgba(0, 0, 0, 0.5);
        }
        .mobile-menu.open {
          right: 0;
        }
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 55;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-overlay.open {
          opacity: 1;
          pointer-events: all;
        }
        .mobile-menu-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: rgba(26, 20, 16, 0.90);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          z-index: 61;
          gap: 1rem;
        }
        .mobile-lang-btn {
          padding: 0.5rem 1rem;
          background-color: rgba(189, 160, 102, 0.2);
          color: var(--color-gold);
          border: 1px solid var(--color-gold);
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .mobile-lang-btn:hover {
          background-color: var(--color-gold);
          color: var(--color-black);
        }
        .mobile-menu-close {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--color-gold);
          font-size: 1.25rem;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .mobile-menu-close:hover {
          background: var(--color-gold);
          color: var(--color-black);
          transform: rotate(90deg);
        }
        .mobile-menu-content {
          padding: 2rem 1.5rem;
        }
        .mobile-nav-link {
          display: block;
          padding: 1.25rem 1rem;
          color: #e5e7eb;
          text-decoration: none;
          border-bottom: 1px solid rgba(60, 60, 60, 0.4);
          transition: all 0.3s ease;
          font-weight: 500;
          letter-spacing: 0.025em;
          font-size: 1.05rem;
          position: relative;
          overflow: hidden;
        }
        .mobile-nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 100%;
          background: var(--color-gold);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .mobile-nav-link:hover {
          color: white;
          background: rgba(212, 175, 55, 0.1);
          padding-left: 1.5rem;
        }
        .mobile-nav-link:hover::before {
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          #menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .desktop-nav {
            display: none !important;
          }
          .grid-cols-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className={`mobile-overlay ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <button className="mobile-lang-btn" onClick={() => setLanguage(language === "ja" ? "en" : "ja")}>
            {language === "ja" ? "EN" : "JP"}
          </button>
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="メニューを閉じる">
            ✕
          </button>
        </div>
        <div className="mobile-menu-content">
          <Link href="/#concept" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t("concept")}
          </Link>
          <Link href="/#rooms" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t("rooms")}
          </Link>
          <Link href="/#pricing" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t("pricing")}
          </Link>
          <Link href="/menu" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t("menu")}
          </Link>
          <Link href="/#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t("services")}
          </Link>
          <Link href="/#access" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            {t("access")}
          </Link>
        </div>
      </div>

      <header>
        <div className="header-content">
          <Link href="/" className="logo-link">
            <img src="/hotel-----heart-land-club---.jpg" alt="IMON Logo" className="logo" />
          </Link>
          <nav className="desktop-nav">
            <button onClick={() => setLanguage(language === "ja" ? "en" : "ja")} className="btn-secondary">
              {language === "ja" ? "EN" : "日本語"}
            </button>
            <Link href="/#concept" className="nav-link">
              {t("concept")}
            </Link>
            <Link href="/#rooms" className="nav-link">
              {t("rooms")}
            </Link>
            <Link href="/#pricing" className="nav-link">
              {t("pricing")}
            </Link>
            <Link href="/menu" className="nav-link">
              {t("menu")}
            </Link>
            <Link href="/#services" className="nav-link">
              {t("services")}
            </Link>
            <Link href="/#access" className="nav-link">
              {t("access")}
            </Link>
            <Link href="tel:019-625-1513" className="btn-secondary">
              {t("phoneReservation")}
            </Link>
          </nav>
          <button id="menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main>
        <div className="menu-hero">
          <div className="container">
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                marginBottom: "1rem",
                fontWeight: "bold",
                fontFamily: "var(--font-serif)",
              }}
            >
              {t("menuTitle")}
            </h1>
            <p style={{ fontSize: "1.125rem", color: "#d1d5db" }}>{t("menuSubtitle")}</p>
          </div>
        </div>

        <div className="menu-section">
          <div className="container">
            <div className="grid grid-cols-3">
              {[
                {
                  name: "menu1Title",
                  desc: "menu1Desc",
                  price: "menu1Price",
                  icon: <UtensilsCrossed size={48} />,
                  image: "/premium-maezawa-wagyu-beef-steak-iwate.jpg",
                },
                {
                  name: "menu2Title",
                  desc: "menu2Desc",
                  price: "menu2Price",
                  icon: <Coffee size={48} />,
                  image: "/fresh-sanriku-seafood-bowl-iwate.jpg",
                },
                {
                  name: "menu3Title",
                  desc: "menu3Desc",
                  price: "menu3Price",
                  icon: <ShoppingBag size={48} />,
                  image: "/traditional-wanko-soba-iwate-cuisine.jpg",
                },
              ].map((item, index) => (
                <div key={index} className="menu-card">
                  <div style={{ color: "var(--color-gold)", marginBottom: "1rem", textAlign: "center" }}>
                    {item.icon}
                  </div>
                  <img src={item.image || "/placeholder.svg"} alt={t(item.name)} className="menu-image" />
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {t(item.name)}
                  </h3>
                  <p style={{ color: "#a0a0a0", marginBottom: "1rem", lineHeight: "1.6" }}>{t(item.desc)}</p>
                  <div className="price-tag">{t(item.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer
        style={{
          background:
            'linear-gradient(rgba(30, 22, 15, 0.9), rgba(30, 22, 15, 0.9)), url("/dark-wood-grain-texture.jpg") center/cover',
          padding: "3rem 0",
          borderTop: "1px solid rgba(189, 160, 102, 0.3)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <img
            src="/hotel-----heart-land-club---.jpg"
            alt="IMON Logo"
            style={{ height: "2.5rem", margin: "0 auto 1rem" }}
          />
          <p style={{ color: "#71717a", marginBottom: "1rem" }}>〒020-0812 岩手県盛岡市川目第6地割90-50</p>
          <p style={{ color: "#71717a", marginBottom: "2rem" }}>TEL: 019-625-1513</p>
          <p style={{ color: "#52525b", fontSize: "0.875rem" }}>
            © 2025 hotel イモン HEART LAND CLUB. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
