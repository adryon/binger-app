import {
  TVSERIES_GET_DETAILS_SUCCESS,
  TVSERIES_GET_CAST_SUCCESS,
  TVSERIES_DETAILS_CLEAR,
  TVSERIES_SEARCH_SUCCESS
} from './actions-types';
import http from './../lib/axios-wrapper';
import {notification} from 'components/LayoutComponents';
import firebase from 'firebase';
import lockr from 'lockr';
import _ from 'lodash';
import config from '../lib/config';

export function tvseriesDetailsClear() {
  return {type: TVSERIES_DETAILS_CLEAR};
}

export const getTVSeriesSeasonDetails = (tv_id, season_number) => {
  return new Promise((resolve, reject) => {

    http.get(`tv/${tv_id}/season/${season_number}`, config.MOVIE_DB_PAYLOAD)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      })
  })
}

export const getTVSeriesDetails = (tv_id) => (dispatch) => {

  return http.get(`tv/${tv_id}`, config.MOVIE_DB_PAYLOAD)
  .then(result => {
    firebase.database().ref(`users/${lockr.get('Authorization')}/tv/${tv_id}`).on('value', snapshot => {
      let userData = snapshot.val();
      console.log(result);

      Promise.all(result.seasons.map(season => getTVSeriesSeasonDetails(tv_id, season.season_number)))
      .then(seasonsResult => {
        result.seasons = seasonsResult;

        if (userData) {
          if (userData && userData.tags) {
            userData.tags = Object.keys(userData.tags).map(item => ({
              uid: item,
              ...userData.tags[item]
            }));
          }
          userData.totalWatched = Math.floor(userData.metadata.episodes_seen/userData.metadata.number_of_episodes * 100) || 0;
        } else {
          firebase.database().ref(`users/${lockr.get('Authorization')}/tv/${tv_id}/metadata`).update({
            id: result.id,
            poster_path: result.poster_path,
            title: result.name,
            number_of_episodes: result.number_of_episodes,
            episodes_seen: 0
          });
          userData = {
            is_watched: null,
            is_favorite: null,
            is_wishlist: null,
            totalWatched: 0,
          }
        }

        const tvSeriesData = Object.assign({}, {userData}, result);
        dispatch({type: TVSERIES_GET_DETAILS_SUCCESS, data: tvSeriesData});
      })
    })
  })
  .catch(error => {
    notification({
      type: 'error',
      icon: 'exclamation-circle',
      title: 'Cannot get movie data!',
    })
  });
}

export const getTVSeriesCast = (tv_id) => (dispatch) => {

  return http.get(`tv/${tv_id}/credits`, config.MOVIE_DB_PAYLOAD)
    .then(result => {
      dispatch({type: TVSERIES_GET_CAST_SUCCESS, data: result});
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get tv series data!',
      })
    });
}

export const searchTVSeries = (tvseriesTitle) => (dispatch) => {
  const payload = {
    api_key: config.THE_MOVIE_DB_TOKEN,
    language: 'en-US',
    query: tvseriesTitle
  }

  return http.get(`search/tv`, payload)
    .then(result => {
      dispatch({type: TVSERIES_SEARCH_SUCCESS, data: result.results});
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get TV Series data!',
      })
    });
}
