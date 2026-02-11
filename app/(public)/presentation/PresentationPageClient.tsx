import dynamic from 'next/dynamic'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Dynamically import client component to prevent static generation
const PresentationPage = dynamic(() => import('./PresentationPageClient'), {
  ssr: false,
})

export default PresentationPage
