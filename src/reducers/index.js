//import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'
/*import user from './user'
import users from './users'*/

// export default combineReducers({
//   routing: routerReducer,
//   /*user,
//   users,*/
// })


import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
})

export default rootReducer
