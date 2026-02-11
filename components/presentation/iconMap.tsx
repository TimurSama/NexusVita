'use client'

import {
  Stethoscope,
  Dumbbell,
  Brain,
  Apple,
  Users,
  Clock,
  Shield,
  BookOpen,
  Sparkles,
  ShoppingBag,
  Building2,
  Coins,
  Calendar,
  MessageSquare,
  Settings,
  LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  dumbbell: Dumbbell,
  brain: Brain,
  apple: Apple,
  users: Users,
  clock: Clock,
  shield: Shield,
  bookopen: BookOpen,
  sparkles: Sparkles,
  shoppingbag: ShoppingBag,
  building2: Building2,
  coins: Coins,
  calendar: Calendar,
  messagesquare: MessageSquare,
  settings: Settings,
}

export const getIcon = (iconName: string): LucideIcon | null => {
  if (!iconName || typeof iconName !== 'string') return null
  const icon = iconMap[iconName.toLowerCase()]
  // Ensure we return a valid component function, not an object
  if (typeof icon === 'function') {
    return icon
  }
  return null
}
