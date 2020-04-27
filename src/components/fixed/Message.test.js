import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Message from './Message'
import { removeMsg } from '../../actions/general'

jest.mock('../../actions/general', () => {
  return {
    removeMsg: jest.fn(),
  }
})

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(() => () => {}),
  }
})

const msg = { type: 'error', name: 'information', id: 'test-id' }
const index = 5

test('Message component.', () => {
  const { container } = render(<Message msg={msg} index={index} />)
  fireEvent.click(container.querySelector('svg'))

  expect(screen.queryByText('error: information')).toBeInTheDocument()
  expect(
    window.getComputedStyle(container.querySelector('div[style]')).top
  ).toEqual('280px')
  expect(removeMsg).toHaveBeenCalledWith(msg.id)
})
