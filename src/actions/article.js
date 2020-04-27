import customAxios from './customAxios'
import { uuid } from 'uuidv4'
import { baseURL } from '../config.json'

import { GET_ARTICLE, ADD_MSG, ADD_LOADING, REMOVE_LOADING } from './types'

export const getArticle = (articleId) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING,
    })
    dispatch({
      type: GET_ARTICLE,
      payload: {},
    })
    const {
      data: { elements },
    } = await customAxios.get(`/delivery/v1/content/${articleId}`)

    const payload = {
      img:
        elements?.mainImage?.value?.leadImage?.renditions?.lead?.source ?? '',
      author: elements?.author?.value ?? '',
      heading: elements?.heading?.value ?? '',
      date: elements?.date?.value ?? '',
      body: elements?.body?.values ?? [],
    }
    if (payload.img.length > 0) {
      payload.img = baseURL + payload.img
    }

    if (payload.body.length > 0) {
      payload.body = payload.body.map((value) => ({ value, id: uuid() }))
    }

    await dispatch({
      type: GET_ARTICLE,
      payload,
    })
  } catch {
    dispatch({
      type: ADD_MSG,
      payload: {
        type: 'error',
        name: 'problem while loading article.',
      },
    })
  } finally {
    dispatch({
      type: REMOVE_LOADING,
    })
  }
}
