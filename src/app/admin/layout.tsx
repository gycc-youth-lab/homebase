import { DisplayMD } from '@/components/Typography'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisplayMD weight="semibold" className="text-[#101828] mb-8">
          Admin Dashboard
        </DisplayMD>
        {children}
      </div>
    </div>
  )
}
