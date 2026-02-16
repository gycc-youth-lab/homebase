'use client'

interface AdminTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: { key: string; label: string }[]
}

export default function AdminTabs({ activeTab, onTabChange, tabs }: AdminTabsProps) {
  return (
    <div className="border-b border-[#EAECF0] mb-6">
      <nav className="flex gap-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? 'text-[#1DADDF]'
                : 'text-[#667085] hover:text-[#344054]'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1DADDF]" />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
