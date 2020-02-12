import {
  MOVIES_GET_DETAILS_SUCCESS,
  MOVIES_GET_CAST_SUCCESS,
  MOVIES_SEARCH_SUCCESS,
  MOVIES_SEARCH_CLEAR,
  MOVIES_DETAILS_CLEAR,
} from './actions-types';
import http from './../lib/axios-wrapper';
import {notification} from 'components/LayoutComponents';
import firebase from 'firebase';
import lockr from 'lockr';
import _ from 'lodash';
import config from '../lib/config';

export function getMovieDetailsSuccess(data) {
  return {type: MOVIES_GET_DETAILS_SUCCESS, data};
}

export function getMovieCastSuccess(data) {
  return {type: MOVIES_GET_CAST_SUCCESS, data};
}

export function searchMovieSuccess(data) {
  return {type: MOVIES_SEARCH_SUCCESS, data};
}

export function moviesSearchClear() {
  return {type: MOVIES_SEARCH_CLEAR};
}

export function movieDetailsClear() {
  return {type: MOVIES_DETAILS_CLEAR};
}

export const getMovieDetails = (movie_id) => (dispatch) => {
  const payload = {
    api_key: config.THE_MOVIE_DB_TOKEN,
    language: 'en-US',
  }

  return http.get(`movie/${movie_id}`, payload)
    .then(result => {
      firebase.database().ref(`users/${lockr.get('Authorization')}/moviesTags/${movie_id}`).on('value', tagsSnapshot => {
        firebase.database().ref(`users/${lockr.get('Authorization')}/moviesWatched/${movie_id}`).on('value', watchedSnapshot => {
          firebase.database().ref(`users/${lockr.get('Authorization')}/moviesWishlist/${movie_id}`).on('value', wishlistSnapshot => {
            firebase.database().ref(`users/${lockr.get('Authorization')}/moviesFavorite/${movie_id}`).on('value', favoriteSnapshot => {
              let tags = [];
              let tagsSnap = tagsSnapshot.val();
              let watchedSnap = watchedSnapshot.val();
              let wishlistSnap = wishlistSnapshot.val();
              let favoriteSnap = favoriteSnapshot.val();
              if (tagsSnap !== null) {
                _.keys(tagsSnap).map(item => {
                  tagsSnap[item].uid = item;
                  tags.push(tagsSnap[item]);
                });
              }

              const userData = {
                tags: tags,
                watched: watchedSnap,
                wishlist: wishlistSnap,
                favorite: favoriteSnap,
              }

              const movieData = Object.assign({}, {userData}, result);
              dispatch(getMovieDetailsSuccess(movieData));
            });
          });
        });
      });
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get movie data!',
      })
    });
}

export const getMovieCast = (movie_id) => (dispatch) => {
  const payload = {
    api_key: config.THE_MOVIE_DB_TOKEN,
    language: 'en-US',
  }

  return http.get(`movie/${movie_id}/credits`, payload)
    .then(result => {
      dispatch(getMovieCastSuccess(result));
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get movie data!',
      })
    });
}

export const searchMovies = (movieTitle) => (dispatch) => {
  const payload = {
    api_key: config.THE_MOVIE_DB_TOKEN,
    language: 'en-US',
    query: movieTitle
  }

  return http.get(`search/movie`, payload)
    .then(result => {
      dispatch(searchMovieSuccess(result.results));
    })
    .catch(error => {
      notification({
        type: 'error',
        icon: 'exclamation-circle',
        title: 'Cannot get movie data!',
      })
    });
}