import { ReactNode } from 'react'

// Force dynamic rendering for all pages in this group
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
