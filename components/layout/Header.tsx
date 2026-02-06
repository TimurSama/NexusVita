'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import Sidebar from './Sidebar'

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Burger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                NexusVita
              </span>
            </Link>

            {/* Right: Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    autoFocus
                    onBlur={() => {
                      if (!searchQuery) setIsSearchOpen(false)
                    }}
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setIsSearchOpen(false)
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Поиск"
                >
                  <Search className="w-6 h-6 text-gray-700" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}
