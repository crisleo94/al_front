import { MediaItem } from '../interfaces'
import FileDisplay from './FileDisplay'

interface MediaGalleryProps {
  mediaItems: MediaItem[]
  onSelect: (fileName: string) => void
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ mediaItems, onSelect }) => {
  const handleSelect = (fileName: string) => {
    onSelect(fileName)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {mediaItems.map(media => (
            <div key={media.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <FileDisplay fileData={media} />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200" onClick={() => handleSelect(media.fileName)}>Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MediaGallery
