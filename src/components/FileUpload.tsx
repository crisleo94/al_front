import React, { useState } from 'react'

interface FileUploadProps {
  onFileUpload: (file: File) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isFileDialogOpen, setIsFileDialogOpen] = useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setIsFileDialogOpen(false)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('El archivo no puede ser mayor a 5MB')
        return
      }

      if (!['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'].includes(file.type)) {
        setErrorMessage('El archivo debe ser una imagen (jpg, png, gif) o un video (mp4, webm)')
        return
      }

      setErrorMessage(null)
      onFileUpload(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files?.[0]
    if (file) {
      handleFileChange({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const handleInputClick = () => {
    setIsFileDialogOpen(true)
  }

  return (
    <div
      className="border border-dashed border-gray-300 rounded-md p-4 text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleInputClick}
    >
      <input
        id="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/gif,video/mp4,video/webm"
        onChange={handleFileChange}
        className="hidden"
        onClick={(e) => {
          e.stopPropagation()
          if (!isFileDialogOpen) {
            const input = e.target as HTMLInputElement
            input.value = ''
          }
        }}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14 4a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 8a1 1 0 100 2h6a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-gray-600">Arrastre un archivo aquí o haga clic para seleccionar</p>
      </label>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  )
}

export default FileUpload
