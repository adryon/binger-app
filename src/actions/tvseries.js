import {
  TVSERIES_SEARCH_SUCCESS
} from './actions-types';
import http from './../lib/axios-wrapper';
import {notification} from 'components/LayoutComponents';
import firebase from 'firebase';
import lockr from 'lockr';
import _ from 'lodash';
import config from '../lib/config';

// export function getMovieDetailsSuccess(data) {
//   return {type: MOVIE_GET_DETAILS_SUCCESS, data};
// }

// export function getMovieCastSuccess(data) {
//   return {type: MOVIE_GET_CAST_SUCCESS, data};
// }

export function searchTVSeriesSuccess(data) {
  return {type: TVSERIES_SEARCH_SUCCESS, data};
}

// export function moviesSearchClear() {
//   return {type: MOVIE_SEARCH_CLEAR};
// }

// export function movieDetailsClear() {
//   return {type: MOVIE_DETAILS_CLEAR}
// }

// export const getMovieDetails = (movie_id) => (dispatch) => {
//   const payload = {
//     api_key: config.THE_MOVIE_DB_TOKEN,
//     language: 'en-US',
//   }

//   return http.get(`movie/${movie_id}`, payload)
//     .then(result => {
//       firebase.database().ref(`users/${lockr.get('Authorization')}/movies/${movie_id}`).on('value', movieSnapshot => {
//         firebase.database().ref(`users/${lockr.get('Authorization')}/moviesWatched/${movie_id}`).on('value', watchedSnapshot => {
//           firebase.database().ref(`users/${lockr.get('Authorization')}/moviesWishlist/${movie_id}`).on('value', wishlistSnapshot => {
//             let tags = [];
//             let movieSnap = movieSnapshot.val();
//             let watchedSnap = watchedSnapshot.val();
//             let wishlistSnap = wishlistSnapshot.val();
//             _.keys(movieSnap).map(item => {
//               movieSnap[item].uid = item;
//               tags.push(movieSnap[item]);
//             });

//             const userData = {
//               tags: tags,
//               watched: watchedSnap,
//               wishlist: wishlistSnap,
//             }

//             const movieData = Object.assign({}, {userData}, result);
//             dispatch(getMovieDetailsSuccess(movieData));
//           });
//         });
//       });
//     })
//     .catch(error => {
//       notification({
//         type: 'error',
//         icon: 'exclamation-circle',
//         title: 'Cannot get movie data!',
//       })
//     });
// }

// export const getMovieCast = (movie_id) => (dispatch) => {
//   const payload = {
//     api_key: config.THE_MOVIE_DB_TOKEN,
//     language: 'en-US',
//   }

//   return http.get(`movie/${movie_id}/credits`, payload)
//     .then(result => {
//       dispatch(getMovieCastSuccess(result));
//     })
//     .catch(error => {
//       notification({
//         type: 'error',
//         icon: 'exclamation-circle',
//         title: 'Cannot get movie data!',
//       })
//     });
// }

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