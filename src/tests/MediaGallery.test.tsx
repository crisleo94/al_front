/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react'
import MediaGallery from '../components/MediaGallery'
import { MediaItem } from '../interfaces'

describe('MediaGallery', () => {
  globalThis.URL.createObjectURL = jest.fn()
  const mockOnSelect = jest.fn()
  const mediaItems: MediaItem[] = [{
    "id": 1,
    "fileUrl": "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==",
    "fileName": "image3.gif"
  }, {
    "id": 2,
    "fileUrl": "data:video/mp4;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAImSURBVDjLnZNNiI1hFMd/73vvzSXjKwzmRopJyFcaYmczPko+8pE0SpYsrLAglnbKAvlYSNkYjYhmSrIRRRQbKblc07Cii3Hf82Xx3jsxG/Kvp9NTz/mdc/6nJ4kI/kfdl9ftENUL6b887rm9s7K7d+va35I3i+r1jvaZk5O/ddBze+e8LJNFWZbdzES7RaQsqn0zpk0vVGu1+l87yDKZnGVZb2VaRyoiA6J6a05HpVCt1erAiuTOwOYA8AjcHHPHzVA3LFNMhHea8rI8hYltbXz78YOhwY+s1++0qVPc9PU9zN/zZ1n3P485j7584mT1FQUPrs3tolIswcPrFEeS6oPgTpiBGagSpiBKqLBKlUvjJoAa7UOvYfoCGI4WICACVh4jKbURL84TZqRLD4AOY/cOk244w+xSGX1wmvjwHESaAFVQg3AoTSAenyJZfYLEGvjTc2BO2nUQ5Dty6xCFJbvR6rMRQIpIDvCAtAjj54Ar8bVGuuYo6fL9+Jt+kqmdFLdfxN8/Ac9HpBGkDP/M53UHIFm8j3jbD1kd691DEKQLtyFXNuKv+ih2n8qNVWsCGprT3MEFf3aWpHMLfPtMYdtVkvIk7OUNSj19FJbtQu8ebwIUBJI4PStYtpfgS+66KiEKKoRIftdWVDAjzBgztgJ99ykyHCBCYmWS1grNwByiaW7qUDBIAoqeb6ypJI7MCCQgC2gAFpCNigoYudGjlPzvd27pFy1NYQEtEp0PAAAAAElFTkSuQmCC",
    "fileName": "video1.mp4"
  }]

  it('should render all media items', () => {
    const { getByText } = render(<MediaGallery mediaItems={mediaItems} onSelect={mockOnSelect} />)
    mediaItems.forEach((item) => {
      expect(getByText(`File: ${item.fileName}`)).toBeInTheDocument()
    })
  })

  it('should call onSelect with the selected media item', () => {
    const { getAllByText } = render(<MediaGallery mediaItems={mediaItems} onSelect={mockOnSelect} />)
    const selectButton = getAllByText('Select')
    fireEvent.click(selectButton[0])
    expect(mockOnSelect).toHaveBeenCalledWith(mediaItems[0].fileName)
  })
})