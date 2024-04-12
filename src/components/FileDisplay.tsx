import React from 'react'
import { MediaItem } from '../interfaces'
import { getFileType, isImageFile } from '../utils'

const FileDisplay: React.FC<{ fileData: MediaItem }> = ({ fileData }) => {
  const { fileUrl, fileName } = fileData

  const decodedFile = atob(fileUrl.split(',')[1])

  const blob = new Blob([decodedFile], { type: getFileType(fileName) })

  const fileUrlObject = URL.createObjectURL(blob)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-lg font-semibold mb-2">File: {fileName}</h2>
      <div className="aspect-w-16 aspect-h-9">
        {isImageFile(fileName) ? (
          <img src={fileUrlObject} alt={fileName} className="object-cover rounded-lg" data-testid='image' />
        ) : (
          <video controls className="object-cover rounded-lg" data-testid='video'>
            <source src={fileUrlObject} type={getFileType(fileName)} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  )
}

export default FileDisplay
