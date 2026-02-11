export type Sector = {
  id: string
  title: string
  icon: string // Changed to string identifier for serialization
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
  icon: string // Changed to string identifier for serialization
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
