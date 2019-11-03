import defaultState from './default-state';
import {
  MOVIES_GET_DETAILS_SUCCESS,
  MOVIES_GET_CAST_SUCCESS,
  MOVIES_SEARCH_SUCCESS,
  MOVIES_SEARCH_CLEAR,
  MOVIES_DETAILS_CLEAR,
} from './../actions/actions-types';

import config from './../lib/config';
import lockr from 'lockr';

lockr.prefix = config.LOCKR_PREFIX;

export default function userState(state = defaultState.movies, action) {

  switch (action.type) {

    case MOVIES_GET_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        viewMovieDetails: action.data
      })

    case MOVIES_GET_CAST_SUCCESS:
      return Object.assign({}, state, {
        viewMovieCast: action.data
      })

    case MOVIES_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchData: action.data
      })
    
    case MOVIES_SEARCH_CLEAR:
      return Object.assign({}, state, {
        searchData: []
      })
    
    case MOVIES_DETAILS_CLEAR: 
      return Object.assign({}, state, {
        viewMovieDetails: null,
        viewMovieCast: null,
      })

    default:
      return state;
  }
};
