import user from './user'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user,
})

export default rootReducer
