import { useEffect, useState } from 'react'
import { MediaItem } from '../interfaces'
import FileUpload from './FileUpload'
import MediaGallery from './MediaGallery'
import TabNavigation from './TabNavigation'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectFile: (fileName: string) => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSelectFile }) => {
  const [currentTab, setCurrentTab] = useState('Media List')
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = (file: File) => {
    setSelectedFile(file)
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
  }

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await fetch('/data.json')
        if (!response.ok) {
          throw new Error('Failed to fetch media items')
        }
        const data = await response.json()
        setMediaItems(data)
      } catch (error) {
        console.log('Error fetching media items:', error)
      }
    }

    fetchMediaItems()
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* Modal panel */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl"> {/* Aquí cambiamos sm:max-w-lg a sm:max-w-3xl */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  {/* Modal content */}
                  <TabNavigation onTabChange={handleTabChange} />
                  {currentTab === 'Media List' ? (
                    <div>
                      <div>
                        <MediaGallery mediaItems={mediaItems} onSelect={(fileName) => {
                          onSelectFile(fileName)
                          onClose()
                        }} />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <FileUpload onFileUpload={handleFileUpload} />
                      {selectedFile && (
                        <div className="mt-4">
                          <p>Archivo seleccionado: {selectedFile.name}</p>
                          <p>Tamaño: {selectedFile.size} bytes</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
