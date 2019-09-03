import defaultState from './default-state';
import {
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT_SUCCESS,
  USER_SET_CURRENT_USER,
} from './../actions/actions-types';

import config from './../lib/config';
import lockr from 'lockr';

lockr.prefix = config.LOCKR_PREFIX;

export default function userState(state = defaultState.user, action) {

  switch (action.type) {

    case USER_LOG_IN_SUCCESS:
      lockr.set('Authorization', action.data.uid);
      return Object.assign({}, state, {
        data: action.data,
        authenticated: true,
      });

    case USER_LOG_OUT_SUCCESS:
      lockr.rm('Authorization');
      return Object.assign({}, state, {
        data: {id: '', email: '', firstName: '', lastName: '', uid: ''},
        authenticated: false
      });

    case USER_SET_CURRENT_USER:
      return Object.assign({}, state, {
        data: action.data,
        authenticated: true,
      });
    //
    // case USER_LOAD_TV_SERIES_WISHLIST:
    //   return Object.assign({}, state, {
    //     tvSeriesWishlist: action.data,
    //   });
    //
    // case USER_LOAD_MOVIES_WISHLIST:
    //   return Object.assign({}, state, {
    //     moviesWishlist: action.data,
    //   });

    default:
      return state;
  }
};
