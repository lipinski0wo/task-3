import reducer from './general'

import {
  ADD_LOADING,
  REMOVE_LOADING,
  ADD_MSG,
  REMOVE_MSG,
} from '../actions/types'

jest.mock('uuidv4', () => {
  return {
    uuid: jest.fn(() => 'uuid-id'),
  }
})

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: 0,
      msg: [],
    })
  })

  it('should handle ADD_LOADING', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [],
        },
        {
          type: ADD_LOADING,
          payload: null,
        }
      )
    ).toEqual({
      loading: 1,
      msg: [],
    })
  })

  it('should handle REMOVE_LOADING', () => {
    expect(
      reducer(
        {
          loading: 1,
          msg: [],
        },
        {
          type: REMOVE_LOADING,
          payload: null,
        }
      )
    ).toEqual({
      loading: 0,
      msg: [],
    })
  })

  it('should handle ADD_MSG', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [],
        },
        {
          type: ADD_MSG,
          payload: { type: 'error', name: 'msg' },
        }
      )
    ).toEqual({
      loading: 0,
      msg: [{ type: 'error', name: 'msg', id: 'uuid-id' }],
    })
  })
  it('should handle REMOVE_MSG', () => {
    expect(
      reducer(
        {
          loading: 0,
          msg: [{ type: 'error', name: 'msg', id: 'uuid-id' }],
        },
        {
          type: REMOVE_MSG,
          payload: 'uuid-id',
        }
      )
    ).toEqual({
      loading: 0,
      msg: [],
    })
  })
})
