'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import Sidebar from './Sidebar'
import { cn } from '@/lib/utils/cn'

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 neumorphic-surface border-b border-warmGray-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Burger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={cn(
                'neumorphic-button p-2 rounded-neumorphic-sm',
                'text-warmGraphite-700 hover:text-warmBlue-600'
              )}
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-warmGraphite-800 tracking-tight">
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
                    className="neumorphic-input w-64 text-sm text-warmGraphite-800 placeholder-warmGray-500"
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
                    className="neumorphic-button p-2 rounded-neumorphic-sm text-warmGraphite-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={cn(
                    'neumorphic-button p-2 rounded-neumorphic-sm',
                    'text-warmGraphite-700 hover:text-warmBlue-600'
                  )}
                  aria-label="Поиск"
                >
                  <Search className="w-6 h-6" />
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
