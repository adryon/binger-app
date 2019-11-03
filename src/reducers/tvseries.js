import defaultState from './default-state';
import {
  TVSERIES_SEARCH_SUCCESS,
  TVSERIES_SEARCH_CLEAR,
  TVSERIES_DETAILS_CLEAR
} from './../actions/actions-types';

import config from './../lib/config';
import lockr from 'lockr';

lockr.prefix = config.LOCKR_PREFIX;

export default function userState(state = defaultState.tvseries, action) {

  switch (action.type) {

    // case MOVIES_GET_DETAILS_SUCCESS:
    //   return Object.assign({}, state, {
    //     viewMovieDetails: action.data
    //   })

    // case MOVIES_GET_CAST_SUCCESS:
    //   return Object.assign({}, state, {
    //     viewMovieCast: action.data
    //   })

    case TVSERIES_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchData: action.data
      })
    
    case TVSERIES_SEARCH_CLEAR:
      return Object.assign({}, state, {
        searchData: []
      })
    
    case TVSERIES_DETAILS_CLEAR: 
      return Object.assign({}, state, {
        viewMovieDetails: null,
        viewMovieCast: null,
      })

    default:
      return state;
  }
};
