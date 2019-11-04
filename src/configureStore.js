
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from './reducers'

export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL})

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    applyMiddleware( routerMiddleware(history), thunk))

  return store
}
