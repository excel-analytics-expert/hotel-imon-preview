"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { Menu, Phone } from "lucide-react"

export default function RoomsPage() {
  const [activeTab, setActiveTab] = useState<"A" | "B" | "C">("A")
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <style jsx>{`
        * { box-sizing: border-box; }
        :root { 
          --color-black: #0a0a0a; 
          --color-wine: #5c0000; 
          --color-gold: #bda066; 
          --color-light: #f3f4f6; 
          --font-serif: 'Cormorant Garamond', serif; 
          --font-sans: 'Inter', 'Noto Sans JP', sans-serif; 
          --color-purple-light: #e9d5ff;
          --color-purple-dark: #7c3aed;
        }
        html { background: #1a1410; }
        body { 
          background: transparent; 
          color: var(--color-light); 
          font-family: var(--font-sans); 
          margin: 0;
          padding: 0;
        }
        .font-serif { font-family: var(--font-serif); }
        .section-title { 
          font-family: var(--font-serif); 
          font-size: clamp(1.75rem, 4vw, 3rem); 
          font-weight: 700; 
          letter-spacing: 0.05em; 
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
        
        .container { 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 1rem; 
        }
        .tab-button {
          padding: 1rem 2.5rem;
          background-color: rgba(26, 20, 16, 0.85);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(189, 160, 102, 0.3);
          color: rgba(229, 231, 235, 0.9);
          font-size: 1.125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0;
          position: relative;
          overflow: hidden;
        }
        .tab-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(189, 160, 102, 0.1), rgba(189, 160, 102, 0.05));
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .tab-button:first-child {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }
        .tab-button:last-child {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .tab-button:hover {
          background-color: rgba(26, 20, 16, 0.95);
          border-color: rgba(189, 160, 102, 0.6);
          color: rgba(189, 160, 102, 0.95);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(189, 160, 102, 0.25);
        }
        .tab-button:hover::before {
          opacity: 1;
        }
        .tab-button.active {
          background-color: rgba(189, 160, 102, 0.15);
          border-color: rgba(189, 160, 102, 0.8);
          border-width: 3px;
          color: rgba(189, 160, 102, 1);
          box-shadow: 0 0 20px rgba(189, 160, 102, 0.4), inset 0 0 20px rgba(189, 160, 102, 0.1);
          font-weight: 600;
        }
        .tab-button.active::before {
          opacity: 1;
          background: linear-gradient(135deg, rgba(189, 160, 102, 0.2), rgba(189, 160, 102, 0.1));
        }
        .room-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 3rem 0;
        }
        .room-photo {
          aspect-ratio: 4/3;
          background-color: #18181b;
          border: 1px solid #27272a;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .room-photo:hover {
          transform: translateY(-5px);
          border-color: var(--color-gold);
        }
        .room-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .price-table {
          background-color: #18181b;
          border: 1px solid #27272a;
          border-radius: 0.5rem;
          overflow: hidden;
          margin: 3rem 0;
        }
        .price-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 1px solid #27272a;
        }
        .price-row:last-child {
          border-bottom: none;
        }
        .price-cell {
          padding: 1rem 1.5rem;
          border-right: 1px solid #27272a;
        }
        .price-cell:last-child {
          border-right: none;
          text-align: right;
          font-weight: 500;
        }
        .price-header {
          background-color: #27272a;
          color: var(--color-gold);
          font-family: var(--font-serif);
          font-weight: 700;
        }
        
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
          .tab-button {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
          .room-gallery {
            grid-template-columns: repeat(1, 1fr);
            gap: 1rem;
          }
          .price-row {
            grid-template-columns: 1fr;
          }
          .price-cell {
            border-right: none;
            border-bottom: 1px solid #27272a;
            padding: 0.875rem 1rem;
          }
          .price-cell:last-child {
            border-bottom: none;
            text-align: left;
          }
        }
      `}</style>

      <style jsx global>{`
        #menu-btn {
          display: none;
          background: transparent;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 70;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 360px;
          height: 100vh;
          background: linear-gradient(rgba(26, 20, 16, 0.65), rgba(26, 20, 16, 0.65)),
              url('/dark-wood-texture.jpg') center/cover;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          z-index: 60;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          padding: 5rem 2rem 2rem;
          box-shadow: -4px 0 30px rgba(0, 0, 0, 0.6);
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
          background: rgba(0, 0, 0, 0.6);
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
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: rgba(26, 20, 16, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          z-index: 61;
        }
        .mobile-lang-btn {
          padding: 0.5rem 1rem;
          background-color: var(--color-purple-light);
          color: #1e1e1e;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .mobile-lang-btn:hover {
          background-color: var(--color-purple-dark);
          color: white;
        }
        .mobile-menu-close {
          background: transparent;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.3s ease;
        }
        .mobile-menu-close:hover {
          transform: rotate(90deg);
        }
        .mobile-nav-link {
          display: block;
          padding: 1.25rem 1rem;
          color: #d1d5db;
          text-decoration: none;
          border-bottom: 1px solid rgba(39, 39, 42, 0.3);
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
          background: rgba(212, 175, 55, 0.08);
          padding-left: 1.5rem;
        }
        .mobile-nav-link:hover::before {
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          #menu-btn {
            display: block;
          }
          .desktop-nav {
            display: none !important;
          }
          .tab-button {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
          .room-gallery {
            grid-template-columns: repeat(1, 1fr);
            gap: 1rem;
          }
          .price-row {
            grid-template-columns: 1fr;
          }
          .price-cell {
            border-right: none;
            border-bottom: 1px solid #27272a;
            padding: 0.875rem 1rem;
          }
          .price-cell:last-child {
            border-bottom: none;
            text-align: left;
          }
        }
      `}</style>

      <style jsx>{`
        body {
          background: linear-gradient(rgba(40, 30, 20, 0.7), rgba(40, 30, 20, 0.7)),
                      url('/dark-wood-texture-grain-pattern.jpg') center/cover fixed;
        }
        header.scrolled {
          background: linear-gradient(rgba(40, 30, 20, 0.95), rgba(40, 30, 20, 0.95)),
                      url('/dark-wood-texture.png') center/cover !important;
        }
        #main-header { 
          background: rgba(26, 20, 16, 0.65);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 1rem 0;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .nav-link { 
          position: relative; 
          padding: 0.75rem 1.25rem; 
          margin: 0 0.25rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: #d1d5db;
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.025em;
          border-radius: 6px;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
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
            <a href="tel:019-625-1513" className="btn-secondary">
              {t("phoneReservation")}
            </a>
          </nav>
          <button id="menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main style={{ paddingTop: "5rem" }}>
        {/* Hero Section */}
        <section style={{ padding: "4rem 0 2rem", backgroundColor: "transparent", textAlign: "center" }}>
          <div className="container">
            <h1 className="section-title">{t("roomsPageTitle")}</h1>
            <p style={{ color: "#a1a1aa", marginTop: "1rem", fontSize: "1.125rem" }}>{t("roomsPageSubtitle")}</p>
          </div>
        </section>

        {/* Tab Navigation */}
        <section style={{ padding: "2rem 0", backgroundColor: "transparent" }}>
          <div className="container" style={{ display: "flex", justifyContent: "center", gap: "0" }}>
            <button className={`tab-button ${activeTab === "A" ? "active" : ""}`} onClick={() => setActiveTab("A")}>
              {t("typeA")}
            </button>
            <button className={`tab-button ${activeTab === "B" ? "active" : ""}`} onClick={() => setActiveTab("B")}>
              {t("typeB")}
            </button>
            <button className={`tab-button ${activeTab === "C" ? "active" : ""}`} onClick={() => setActiveTab("C")}>
              {t("typeC")}
            </button>
          </div>
        </section>

        {/* Room Content */}
        <section style={{ padding: "3rem 0 6rem", backgroundColor: "transparent" }}>
          <div className="container">
            {/* Aタイプ */}
            {activeTab === "A" && (
              <div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "2rem", color: "white", marginBottom: "1rem", textAlign: "center" }}
                >
                  {t("typeAPremium")}
                </h2>
                <p style={{ color: "#a1a1aa", textAlign: "center", marginBottom: "2rem" }}>{t("typeAPremiumDesc")}</p>

                {/* 5部屋の写真ギャラリー */}
                <div className="room-gallery">
                  <div className="room-photo">
                    <img src="/a-type-room-010.png" alt="Aタイプ客室1" />
                  </div>
                  <div className="room-photo">
                    <img src="/a-type-room-011.png" alt="Aタイプ客室2" />
                  </div>
                  <div className="room-photo">
                    <img src="/a-type-room-012.png" alt="Aタイプ客室3" />
                  </div>
                  <div className="room-photo">
                    <img src="/a-type-room-013.png" alt="Aタイプ客室4" />
                  </div>
                  <div className="room-photo">
                    <img src="/a-type-room-014.png" alt="Aタイプ客室5" />
                  </div>
                </div>

                {/* 料金表 */}
                <div className="price-table">
                  <div className="price-row price-header">
                    <div className="price-cell">{t("plan")}</div>
                    <div className="price-cell">{t("targetDate")}</div>
                    <div className="price-cell">{t("price")}</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("rest90min")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">5,830円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("rest5hour")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">6,930円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("serviceTime")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">6,930円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("stayOvernight")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("sunToFri")}
                    </div>
                    <div className="price-cell">9,130円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("stayOvernight")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("satHoliday")}
                    </div>
                    <div className="price-cell">10,230円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("extension")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">1,100円</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bタイプ */}
            {activeTab === "B" && (
              <div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "2rem", color: "white", marginBottom: "1rem", textAlign: "center" }}
                >
                  {t("typeBStandard")}
                </h2>
                <p style={{ color: "#a1a1aa", textAlign: "center", marginBottom: "2rem" }}>{t("typeBStandardDesc")}</p>

                <div className="room-gallery">
                  <div className="room-photo">
                    <img src="/b-type-room-020.png" alt="Bタイプ客室1" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-021.png" alt="Bタイプ客室2" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-022.png" alt="Bタイプ客室3" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-023.png" alt="Bタイプ客室4" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-024.png" alt="Bタイプ客室5" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-025.png" alt="Bタイプ客室6" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-030.png" alt="Bタイプ客室7" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-031.png" alt="Bタイプ客室8" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-032.png" alt="Bタイプ客室9" />
                  </div>
                  <div className="room-photo">
                    <img src="/b-type-room-033.png" alt="Bタイプ客室10" />
                  </div>
                </div>

                {/* 料金表 */}
                <div className="price-table">
                  <div className="price-row price-header">
                    <div className="price-cell">{t("plan")}</div>
                    <div className="price-cell">{t("targetDate")}</div>
                    <div className="price-cell">{t("price")}</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("rest90min")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">4,730円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("rest5hour")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">5,830円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("serviceTime")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">5,830円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("stayOvernight")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("sunToFri")}
                    </div>
                    <div className="price-cell">8,030円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("stayOvernight")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("satHoliday")}
                    </div>
                    <div className="price-cell">9,130円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("extension")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">1,100円</div>
                  </div>
                </div>
              </div>
            )}

            {/* Cタイプ */}
            {activeTab === "C" && (
              <div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "2rem", color: "white", marginBottom: "1rem", textAlign: "center" }}
                >
                  {t("typeCCompact")}
                </h2>
                <p style={{ color: "#a1a1aa", textAlign: "center", marginBottom: "2rem" }}>{t("typeCCompactDesc")}</p>

                <div className="room-gallery" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))" }}>
                  <div className="room-photo">
                    <img src="/c-type-room-038.png" alt="Cタイプ客室" />
                  </div>
                </div>

                {/* 料金表 */}
                <div className="price-table">
                  <div className="price-row price-header">
                    <div className="price-cell">{t("plan")}</div>
                    <div className="price-cell">{t("targetDate")}</div>
                    <div className="price-cell">{t("price")}</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("rest90min")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">4,620円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("rest5hour")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">5,720円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("serviceTime")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">5,720円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("stayOvernight")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("sunToFri")}
                    </div>
                    <div className="price-cell">7,920円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("stayOvernight")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("satHoliday")}
                    </div>
                    <div className="price-cell">9,020円</div>
                  </div>
                  <div className="price-row">
                    <div className="price-cell">{t("extension")}</div>
                    <div className="price-cell" style={{ color: "#a1a1aa" }}>
                      {t("allDays")}
                    </div>
                    <div className="price-cell">1,100円</div>
                  </div>
                </div>
              </div>
            )}

            {/* ご予約案内 */}
            <div
              style={{
                marginTop: "4rem",
                padding: "2rem",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "0.5rem",
                textAlign: "center",
              }}
            >
              <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "white", marginBottom: "1rem" }}>
                {t("reservation")}
              </h3>
              <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>{t("reservationDesc")}</p>
              <a
                href="tel:019-625-1513"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.5rem",
                  color: "var(--color-gold)",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                019-625-1513
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
