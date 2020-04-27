import mockAxios from 'axios'
import { getArticle } from './article'
import { uuid } from 'uuidv4'
import { baseURL } from '../config.json'

import { GET_ARTICLE, ADD_MSG, ADD_LOADING, REMOVE_LOADING } from './types'

jest.mock('uuidv4', () => ({
  uuid: jest.fn(),
}))

const addLoadingDispatch = {
  type: ADD_LOADING,
}

const removeLoadingDispatch = {
  type: REMOVE_LOADING,
}

const emptyArticleDispatch = {
  type: GET_ARTICLE,
  payload: {},
}

const addMsgDispatch = {
  type: ADD_MSG,
  payload: {
    type: 'error',
    name: 'problem while loading article.',
  },
}

const getArticleResponse = {
  elements: {
    author: { elementType: 'text', value: 'author' },
    body: {
      values: ['<p>paragraph 1</p>', '<p>paragraph 2</p>'],
      elementType: 'formattedtext',
    },
    date: { elementType: 'datetime', value: '2020-01-01T12:00:00Z' },
    heading: { elementType: 'text', value: 'heading' },
    mainImage: {
      value: {
        leadImage: {
          renditions: {
            lead: {
              source: '/image.jpg',
            },
          },
        },
      },
    },
  },
}

describe('article actions', () => {
  it('should GET_ARTICLE', async () => {
    let count = 0
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: getArticleResponse,
      })
    )
    uuid.mockImplementation(() => `uuid-${count++}`)

    await getArticle('articleID')(dispatch)

    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [emptyArticleDispatch],
      [
        {
          type: GET_ARTICLE,
          payload: {
            img: baseURL + '/image.jpg',
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
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should GET_ARTICLE and handle empty data object', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
      })
    )

    await getArticle('articleID')(dispatch)

    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [emptyArticleDispatch],
      [
        {
          type: GET_ARTICLE,
          payload: {
            img: '',
            author: '',
            heading: '',
            date: '',
            body: [],
          },
        },
      ],
      [removeLoadingDispatch],
    ])
  })

  it('should handle error on GET_ARTICLE', async () => {
    const dispatch = jest.fn()
    mockAxios.get.mockImplementationOnce(() => Promise.reject())

    await getArticle('articleID')(dispatch)

    expect(dispatch.mock.calls).toEqual([
      [addLoadingDispatch],
      [emptyArticleDispatch],
      [addMsgDispatch],
      [removeLoadingDispatch],
    ])
  })
})
