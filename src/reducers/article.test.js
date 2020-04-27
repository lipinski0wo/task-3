import reducer from './article'
import { GET_ARTICLE } from '../actions/types'

const article = {
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
}

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle GET_ARTICLE', () => {
    expect(
      reducer(
        {},
        {
          type: GET_ARTICLE,
          payload: article,
        }
      )
    ).toEqual(article)
  })
})
