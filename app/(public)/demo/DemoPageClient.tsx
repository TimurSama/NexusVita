import dynamic from 'next/dynamic'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Dynamically import client component to prevent static generation
const DemoPresentationPage = dynamic(() => import('./DemoPageClient'), {
  ssr: false,
})

export default DemoPresentationPage
