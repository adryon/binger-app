import {
  APP_MEDIA_SEARCH_SUCCESS,
  APP_MEDIA_SEARCH_CLEAR,
} from './actions-types';
import http from './../lib/axios-wrapper';
import {notification} from 'components/LayoutComponents';
import firebase from 'firebase';
import lockr from 'lockr';
import _ from 'lodash';
import config from '../lib/config';

export function searchMediaSuccess(data) {
  return {type: APP_MEDIA_SEARCH_SUCCESS, data};
}

export function mediaSearchClear() {
  return {type: APP_MEDIA_SEARCH_CLEAR};
}

export const searchMedia = (title) => (dispatch) => {
  const payload = {
    api_key: config.THE_MOVIE_DB_TOKEN,
    language: 'en-US',
    query: title
  }

  return http.get(`search/multi`, payload)
    .then(result => {
      result = result.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');
      dispatch(searchMediaSuccess(result));
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get data!',
      })
    });
}