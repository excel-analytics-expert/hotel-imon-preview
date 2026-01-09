"use client"

import React, { useState, useEffect } from "react"
import { Lock } from "lucide-react"

// パスワードを文字列として確実に定義します
const ACCESS_PASSWORD = "imon-1105" 

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authStatus = localStorage.getItem("site-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // String()で括ることで、数値が設定されても確実に文字列として比較させます
    if (String(password) === String(ACCESS_PASSWORD)) {
      localStorage.setItem("site-auth", "true")
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPassword("")
    }
  }

  if (isLoading) return null

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[url('/medium-wood-texture.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full max-w-md px-10 py-20 bg-white/[0.02] border border-white/10 rounded-[4rem] backdrop-blur-3xl shadow-2xl text-center animate-in fade-in zoom-in duration-1000">
          <div className="mb-12 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-amber-500/20 flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <Lock className="w-7 h-7 text-amber-500/40" />
            </div>
            <h1 className="font-serif text-3xl text-white/90 tracking-[0.3em] font-light mb-4 italic">
              Preview Access
            </h1>
            <div className="w-12 h-px bg-amber-500/30 mb-4"></div>
            <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-light">
              Private Entry
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(false)
                }}
                placeholder="Enter Password"
                className={`w-full bg-black/40 border ${
                  error ? "border-red-500/40" : "border-white/10"
                } rounded-full px-8 py-5 text-center text-white placeholder:text-white/5 focus:outline-none focus:border-amber-500/40 transition-all duration-1000 tracking-[0.6em] text-lg font-light shadow-inner`}
              />
              {error && (
                <p className="absolute -bottom-8 left-0 right-0 text-[11px] text-red-400/80 tracking-[0.2em] font-light animate-in slide-in-from-top-2 duration-500">
                  認証に失敗しました。再度入力してください。
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group relative w-full py-5 rounded-full border border-amber-500/20 bg-white/[0.03] text-amber-500/80 text-[13px] tracking-[0.5em] font-medium hover:bg-white/10 hover:border-amber-500/50 transition-all duration-1000 uppercase overflow-hidden"
            >
              <span className="relative z-10">Enter Site</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms]"></div>
            </button>
          </form>

          <div className="mt-20">
            <p className="text-white/10 text-[9px] tracking-[0.3em] uppercase font-light italic">
              hotel イモン Heart Land Club
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}