import { REMOVE_LOADING, REMOVE_MSG } from './types'
import { removeLoading, removeMsg } from './general'

describe('general actions', () => {
  it('should REMOVE_LOADING', async () => {
    const dispatch = jest.fn()
    await removeLoading()(dispatch)
    expect(dispatch).toBeCalledWith({
      type: REMOVE_LOADING,
    })
  })

  it('should REMOVE_MSG', async () => {
    const dispatch = jest.fn()
    await removeMsg('id')(dispatch)
    expect(dispatch).toBeCalledWith({
      type: REMOVE_MSG,
      payload: 'id',
    })
  })
})
