import { REMOVE_LOADING, REMOVE_MSG } from './types'

export const removeLoading = () => async (dispatch) => {
  dispatch({
    type: REMOVE_LOADING,
  })
}

export const removeMsg = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_MSG,
    payload: id,
  })
}
