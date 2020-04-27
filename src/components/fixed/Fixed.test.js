import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Fixed from './Fixed'

import { useSelector as useSelectorMock } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

test('Fixed - empty general props will render empty element', () => {
  useSelectorMock.mockImplementation((fn) =>
    fn({ general: { loading: 0, msg: [] } })
  )
  const { container } = render(<Fixed />)

  expect(screen.queryByText('Please wait, loading...')).not.toBeInTheDocument()
  expect(container.querySelector('svg')).toBeNull()
})

test('Fixed - not empty general props will render elements', () => {
  useSelectorMock.mockImplementation((fn) =>
    fn({
      general: {
        loading: 1,
        msg: [{ id: 1, type: 'error', name: 'msg name' }],
      },
    })
  )
  const { container } = render(<Fixed />)

  expect(screen.queryByText('Please wait, loading...')).toBeInTheDocument()
  expect(container.querySelector('svg')).not.toBeNull()
})
