'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AdminTabs from '@/components/admin/AdminTabs'
import SubscribersTable from '@/components/admin/SubscribersTable'
import OurVoiceTable from '@/components/admin/OurVoiceTable'

const tabs = [
  { key: 'subscribers', label: 'Subscribers' },
  { key: 'ourvoice', label: 'Our Voice' },
]

function AdminDashboard() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'subscribers')

  return (
    <div>
      <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
      {activeTab === 'subscribers' && <SubscribersTable />}
      {activeTab === 'ourvoice' && <OurVoiceTable />}
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminDashboard />
    </Suspense>
  )
}
