import app from './app'
import user from './user'
import movies from './movies'
import tvseries from './tvseries'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app,
  user,
  movies,
  tvseries,
})

export default rootReducer
