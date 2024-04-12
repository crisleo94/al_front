function isImageFile(fileName: string): boolean {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif']
  return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext))
}

function getFileType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'gif':
      return 'image/gif'
    case 'mp4':
      return 'video/mp4'
    case 'webm':
      return 'video/webm'
    default:
      return ''
  }
}

export { getFileType, isImageFile }
