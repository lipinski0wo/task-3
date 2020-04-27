import '@testing-library/jest-dom'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Article from './Article'
import { getArticle as getArticleMock } from '../../actions/article'
import { useSelector as useSelectorMock } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn({ article: {} })),
  useDispatch: () => jest.fn(),
}))

jest.mock('../../actions/article', () => ({
  getArticle: jest.fn(),
}))

describe('Article component', () => {
  it('should make one api call on initial render', async () => {
    const getArticleMockFn = jest.fn()
    getArticleMock.mockImplementationOnce(getArticleMockFn)

    const { rerender } = render(<Article />)
    rerender(<Article />)
    expect(getArticleMockFn).toHaveBeenCalledTimes(1)
  })

  it('should show `Nothing to display`', async () => {
    useSelectorMock.mockImplementationOnce((fn) => fn({ article: {} }))
    const { container } = render(<Article />)

    expect(screen.queryByText('Nothing to display')).toBeInTheDocument()
    expect(container.querySelector('h1')).toBeNull()
  })

  it('should show article', async () => {
    useSelectorMock.mockImplementationOnce((fn) =>
      fn({
        article: {
          img: 'url/image.jpg',
          author: 'author',
          heading: 'heading',
          date: '2020-01-01T12:00:00Z',
          body: [
            {
              value: '<p>paragraph 1</p>',
              id: 'uuid-0',
            },
            {
              value: '<p>paragraph 2</p>',
              id: 'uuid-1',
            },
          ],
        },
      })
    )
    const { container } = render(<Article />)

    expect(container.querySelector('img[src="url/image.jpg"]')).not.toBeNull()
    expect(screen.queryByText('Nothing to display')).not.toBeInTheDocument()
    expect(screen.queryByText('paragraph 1')).toBeInTheDocument()
    expect(screen.queryByText('paragraph 2')).toBeInTheDocument()
    expect(screen.queryByText('2020-01-01T12:00:00Z')).toBeInTheDocument()
    expect(screen.queryByText('heading')).toBeInTheDocument()
    expect(screen.queryByText('author')).toBeInTheDocument()
  })
})
