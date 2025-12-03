'use client'

import React, { createContext, useContext, useState } from 'react'

interface DemoContextType {
  isDemoMode: boolean
  currentDemoRole: string | null
  currentDemoFeature: string | null
  setDemoMode: (enabled: boolean) => void
  setDemoRole: (role: string | null) => void
  setDemoFeature: (feature: string | null) => void
  startDemo: (role: string, feature?: string) => void
  stopDemo: () => void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [currentDemoRole, setCurrentDemoRole] = useState<string | null>(null)
  const [currentDemoFeature, setCurrentDemoFeature] = useState<string | null>(null)

  const setDemoMode = (enabled: boolean) => {
    setIsDemoMode(enabled)
    if (!enabled) {
      setCurrentDemoRole(null)
      setCurrentDemoFeature(null)
    }
  }

  const setDemoRole = (role: string | null) => {
    setCurrentDemoRole(role)
  }

  const setDemoFeature = (feature: string | null) => {
    setCurrentDemoFeature(feature)
  }

  const startDemo = (role: string, feature?: string) => {
    setIsDemoMode(true)
    setCurrentDemoRole(role)
    setCurrentDemoFeature(feature || null)
  }

  const stopDemo = () => {
    setIsDemoMode(false)
    setCurrentDemoRole(null)
    setCurrentDemoFeature(null)
  }

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        currentDemoRole,
        currentDemoFeature,
        setDemoMode,
        setDemoRole,
        setDemoFeature,
        startDemo,
        stopDemo,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider')
  }
  return context
}

