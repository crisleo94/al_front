/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Modal from '../components/Modal'

describe('Modal Component', () => {
  test('The Modal component should render correctly when `isOpen` prop is true', () => {
    render(<Modal isOpen={true} onClose={() => {}} onSelectFile={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('The Modal component should not render when `isOpen` prop is false', () => {
    const { queryByRole } = render(<Modal isOpen={false} onClose={() => {}} onSelectFile={() => {}} />)
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('The `onClose` prop function should be called when the Close button is clicked', () => {
    const onCloseMock = jest.fn()
    render(<Modal isOpen={true} onClose={onCloseMock} onSelectFile={() => {}} />)
    fireEvent.click(screen.getByText('Close'))
    expect(onCloseMock).toHaveBeenCalled()
  })
})