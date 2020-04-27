import { GET_ARTICLE } from '../actions/types'

const initialState = {}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ARTICLE:
      return payload
    default:
      return state
  }
}
