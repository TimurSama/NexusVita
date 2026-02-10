export type Sector = {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
  details: {
    features: string[]
    benefits: string[]
    examples: string[]
  }
}

export type Module = {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  features: string[]
  benefits: string[]
}

export type Question = {
  id: string
  text: string
  type: 'text' | 'number' | 'select' | 'multiselect'
  options?: string[]
  required: boolean
}

export type ChatMessage = {
  sender: 'user' | 'ai'
  text: string
  type?: string
  options?: string[]
}
