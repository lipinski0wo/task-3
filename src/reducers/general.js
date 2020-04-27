import { uuid } from 'uuidv4'
import {
  ADD_LOADING,
  REMOVE_LOADING,
  ADD_MSG,
  REMOVE_MSG,
} from '../actions/types'

export const initialState = {
  loading: 0,
  msg: [],
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_LOADING:
      return {
        ...state,
        loading: state.loading + 1,
      }
    case REMOVE_LOADING:
      return {
        ...state,
        loading: state.loading - 1,
      }
    case ADD_MSG:
      return {
        ...state,
        msg: [...state.msg, { ...payload, id: uuid() }],
      }
    case REMOVE_MSG:
      return {
        ...state,
        msg: state.msg.filter((msg) => msg.id !== payload),
      }
    default:
      return state
  }
}
