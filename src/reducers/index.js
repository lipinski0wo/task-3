import { combineReducers } from 'redux'
import article from './article'
import general from './general'

export default combineReducers({
  general,
  article,
})
