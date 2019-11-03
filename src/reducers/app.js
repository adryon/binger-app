import defaultState from './default-state';
import {
  APP_MEDIA_SEARCH_SUCCESS,
  APP_MEDIA_SEARCH_CLEAR,
} from './../actions/actions-types';

import config from './../lib/config';
import lockr from 'lockr';

lockr.prefix = config.LOCKR_PREFIX;

export default function userState(state = defaultState.app, action) {

  switch (action.type) {

    case APP_MEDIA_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchData: action.data
      })

    case APP_MEDIA_SEARCH_CLEAR:
      return Object.assign({}, state, {
        searchData: []
      })

    default:
      return state;
  }
};
