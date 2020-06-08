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

  return http.get(`movie/${movie_id}`, config.MOVIE_DB_PAYLOAD)
  .then(result => {
    firebase.database().ref(`users/${lockr.get('Authorization')}/movies/${movie_id}`).on('value', snapshot => {
      let userData = snapshot.val();
      console.log(userData);
      if (userData) {
        if (userData && userData.tags) {
          userData.tags = Object.keys(userData.tags).map(item => ({
            uid: item,
            ...userData.tags[item]
          }));
        }
      } else {
        firebase.database().ref(`users/${lockr.get('Authorization')}/movies/${movie_id}/metadata`).update({
          id: result.id,
          poster_path: result.poster_path,
          title: result.title,
        });
        userData = {
          is_watched: null,
          is_favorite: null,
          is_wishlist: null,
        }
      }
      const movieData = Object.assign({}, {userData}, result);
      dispatch(getMovieDetailsSuccess(movieData));
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

export const getMovieCast = (movie_id) => (dispatch) => {

  return http.get(`movie/${movie_id}/credits`, config.MOVIE_DB_PAYLOAD)
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