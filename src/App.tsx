import { useState } from 'react'
import './App.css'
import Modal from './components/Modal'

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('')

  const handleButtonClick = () => {
    setModalOpen(true)
  }

  const handleFileSelect = (fileName: string) => {
    setSelectedFileName(fileName)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Haga clic para cargar"
        readOnly
        value={selectedFileName}
        onClick={handleButtonClick}
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleButtonClick} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Cargar
      </button>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelectFile={handleFileSelect}
        />
      )}
    </div>
  )
}

export default App
