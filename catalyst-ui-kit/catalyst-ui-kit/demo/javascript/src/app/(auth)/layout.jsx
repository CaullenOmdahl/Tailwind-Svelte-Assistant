import { AuthLayout } from '@/components/auth-layout'

export default async function RootLayout({ children }) {
  return <AuthLayout>{children}</AuthLayout>
}
