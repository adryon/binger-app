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

export function getTVSeriesDetailsSuccess(data) {
  return {type: TVSERIES_GET_DETAILS_SUCCESS, data};
}

export function getTVSeriesCastSuccess(data) {
  return {type: TVSERIES_GET_CAST_SUCCESS, data};
}

export function searchTVSeriesSuccess(data) {
  return {type: TVSERIES_SEARCH_SUCCESS, data};
}

// export function moviesSearchClear() {
//   return {type: MOVIE_SEARCH_CLEAR};
// }

export function tvseriesDetailsClear() {
  return {type: TVSERIES_DETAILS_CLEAR};
}

export const getTVSeriesSeasonDetails = (tv_id, season_number) => {
  return new Promise((resolve, reject) => {
    const payload = {
      api_key: config.THE_MOVIE_DB_TOKEN,
      language: 'en-US',
    }

    http.get(`tv/${tv_id}/season/${season_number}`, payload)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      })
  })
}

export const getTVSeriesDetails = (tv_id) => (dispatch) => {
  const payload = {
    api_key: config.THE_MOVIE_DB_TOKEN,
    language: 'en-US',
  }

  return http.get(`tv/${tv_id}`, payload)
    .then(result => {
      firebase.database().ref(`users/${lockr.get('Authorization')}/tvSeries/${tv_id}`).on('value', tvSeriesSnapshot => {
        firebase.database().ref(`users/${lockr.get('Authorization')}/tvSeriesWatched/${tv_id}`).on('value', watchedSnapshot => {
          firebase.database().ref(`users/${lockr.get('Authorization')}/tvSeriesWishlist/${tv_id}`).on('value', wishlistSnapshot => {
            let tags = [];
            let tvSeriesSnap = tvSeriesSnapshot.val();
            let watchedSnap = watchedSnapshot.val();
            let wishlistSnap = wishlistSnapshot.val();
            _.keys(tvSeriesSnap).map(item => {
              tvSeriesSnap[item].uid = item;
              tags.push(tvSeriesSnap[item]);
            });

            Promise.all(result.seasons.map(season => getTVSeriesSeasonDetails(tv_id, season.season_number)))
            .then(seasonsResult => {
              result.seasons = seasonsResult;

              const userData = {
                tags: tags,
                watched: watchedSnap,
                wishlist: wishlistSnap,
              }
  
              const tvSeriesData = Object.assign({}, {userData}, result);
              dispatch(getTVSeriesDetailsSuccess(tvSeriesData));
            })
          });
        });
      });
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get tv series data!',
      })
    });
}

export const getTVSeriesCast = (tv_id) => (dispatch) => {
  const payload = {
    api_key: config.THE_MOVIE_DB_TOKEN,
    language: 'en-US',
  }

  return http.get(`tv/${tv_id}/credits`, payload)
    .then(result => {
      dispatch(getTVSeriesCastSuccess(result));
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
      dispatch(searchTVSeriesSuccess(result.results));
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get TV Series data!',
      })
    });
}