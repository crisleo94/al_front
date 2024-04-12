import { useState } from 'react'

interface TabNavigationProps {
  onTabChange: (tab: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Media List')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <div className="flex">
      <button
        className={`px-4 py-2 ${
          activeTab === 'Media List' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => handleTabClick('Media List')}
      >
        Media List
      </button>

      <button
        className={`px-4 py-2 ${
          activeTab === 'Upload' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        } ml-2`}
        onClick={() => handleTabClick('Upload')}
      >
        Upload
      </button>
    </div>
  )
}

export default TabNavigation
