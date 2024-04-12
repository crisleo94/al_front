/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react'
import TabNavigation from '../components/TabNavigation'

describe('TabNavigation', () => {
  it('should render the component with default active tab as "Media List"', () => {
    const { getByText } = render(<TabNavigation onTabChange={() => {}} />)
    const mediaListTab = getByText('Media List')
    const uploadTab = getByText('Upload')

    expect(mediaListTab).toHaveClass('bg-blue-500 text-white')
    expect(uploadTab).toHaveClass('bg-gray-200 text-gray-800')
  })

  it('should switch active tab when clicking on "Upload" tab', () => {
    const handleTabChange = jest.fn()
    const { getByText } = render(<TabNavigation onTabChange={handleTabChange} />)
    const uploadTab = getByText('Upload')

    fireEvent.click(uploadTab)

    expect(handleTabChange).toHaveBeenCalledWith('Upload')
  })
})
