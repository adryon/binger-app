import {
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT_SUCCESS,
  USER_SET_CURRENT_USER,
  USER_SET_TV_SERIES_WISHLIST,
  USER_SET_MOVIES_WISHLIST
} from './actions-types';
import {notification} from 'components/LayoutComponents';
import {push} from 'react-router-redux';
import lockr from 'lockr';
import firebase from 'firebase';
import config from '../lib/config';

export function loginSuccess(data) {
  return {type: USER_LOG_IN_SUCCESS, data};
}

export function logOutSuccess() {
  return {type: USER_LOG_OUT_SUCCESS};
}

export function setCurrentUser(data) {
  return {type: USER_SET_CURRENT_USER, data};
}

export function setTVSeriesWishlist(data) {
  return {type: USER_SET_TV_SERIES_WISHLIST, data};
}

export function setMoviesWishlist(data) {
  return {type: USER_SET_MOVIES_WISHLIST, data}
}

export const register = (payload) => (dispatch) => {
  firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(result => {
    firebase.database().ref(`users/${result.user.uid}/metadata`).set({
      name: payload.name,
      email: payload.email,
      avatar: 'gs://binger-e4fea.appspot.com/Avengers-Thor-icon.png',
    });
    notification({
      type: 'success',
      title: 'Account created!',
      description: 'You have successfully created a new account!',
    })
    dispatch(push('/login'));
  })
  .catch(error => {
    notification({
      type: 'error',
      icon: 'exclamation-circle',
      title: 'Register failed!',
      description: error.message,
    })
  });
}

export const login = (payload) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(result => {
    dispatch(loginSuccess(result.user));
    notification({
      type: 'success',
      title: 'You have successfully logged in!',
      icon: 'check-circle',
    })
    dispatch(push('/main'));
  })
  .catch(error => {
    notification({
      title: 'Login failed!',
      description: error.message,
      type: 'error',
      icon: 'exclamation-circle',
    })
  });
}

export const logOut = () => (dispatch) => {
  firebase.auth().signOut().then(() => {
    dispatch(logOutSuccess());
    dispatch(push('/login'))
  })
  .catch(error => {
    notification({
      title: 'Logout failed!',
      type: 'error',
      icon: 'exclamation-circle',
    })
    dispatch(push('/login'))
  });
}

export const getCurrentUser = () => (dispatch) => {

  if(lockr.get('Authorization')) {
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref(`/users/${user.uid}/metadata`).on('value', snapshot => {
        const userData = Object.assign({}, snapshot.val(), {uid: user.uid})
        dispatch(setCurrentUser(userData)) 
      });
    });
    return Promise.resolve(true);
  } else {
    return Promise.reject();
  }
};

export const addTagToMovie = (tag, movie_id, userId) => (dispatch) => {
  firebase.database().ref(`users/${userId}/moviesTags/${movie_id}`).push({
    text: tag,
    color: config.colors[Math.floor(Math.random() * config.colors.length)],
  });
  notification({
    type: 'success',
    title: 'Tag added!',
  })
}

export const deleteTagFromMovie = (tag, movie_id, userId) => (dispatch) => {
  firebase.database().ref(`users/${userId}/moviesTags/${movie_id}/${tag.uid}`).remove();
  notification({
    type: 'success',
    title: 'Tag removed!',
  })
}

export const addTagToTVSeries = (tag, tv_id, userId) => (dispatch) => {
  firebase.database().ref(`users/${userId}/tvSeriesTags/${tv_id}`).push({
    text: tag,
    color: config.colors[Math.floor(Math.random() * config.colors.length)],
  });
  notification({
    type: 'success',
    title: 'Tag added!',
  })
}

export const deleteTagFromTVSeries = (tag, tv_id, userId) => (dispatch) => {
  firebase.database().ref(`users/${userId}/tvSeriesTags/${tv_id}/${tag.uid}`).remove();
  notification({
    type: 'success',
    title: 'Tag removed!',
  })
}

export const watchMovie = (movie, movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/moviesWatched/${movie_id}/`).set(movie);
  notification({
    type: 'success',
    title: 'Movie added to your watch list!',
  })
}

export const unWatchMovie = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/moviesWatched/${movie_id}/`).remove();
  notification({
    type: 'success',
    title: 'Movie removed from your watch list!',
  })
}

export const addMovieToFavorite = (movie, movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/moviesFavorite/${movie_id}/`).set(movie);
  notification({
    type: 'success',
    title: 'Movie added to your favorite list!',
  })
}

export const removeMovieFromFavorite = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/moviesFavorite/${movie_id}/`).remove();
  notification({
    type: 'success',
    title: 'Movie removed from your favorite list!',
  })
}

export const addMovieToWishlist = (movie, movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/moviesWishlist/${movie_id}/`).set(movie);
  notification({
    type: 'success',
    title: 'Movie added to your wishlist!',
  })
}

export const removeMovieFromWishlist = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/moviesWishlist/${movie_id}/`).remove();
  notification({
    type: 'success',
    title: 'Movie removed from your wishlist!',
  })
}

export const addTVSeriesToWishlist = (tv, tvId, userId) => (dispatch) => {
  firebase.database().ref(`users/${userId}/tvSeriesWishlist/${tvId}/`).set(tv);
  notification({
    type: 'success',
    title: 'TV series added to your wishlist!',
  })
}

export const removeTVSeriesFromWishlist = (tvId, userId) => (dispatch) => {
  firebase.database().ref(`users/${userId}/tvSeriesWishlist/${tvId}/`).remove();
  notification({
    type: 'success',
    title: 'TV Series removed from your wishlist!',
  })
}

export const watchEpisode = (payload) => (dispatch) => {
  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/content/${payload.season_id}/${payload.episode_id}`).set({
    timestamp: Date()
  });
  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/metadata`).set({
    poster_path: payload.poster_path,
    name: payload.name,
    id: payload.tv_id
  });
  notification({
    type: 'success',
    title: 'You have succesfully watched this episode!',
  })
}

export const unWatchEpisode = (payload) => (dispatch) => {
  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/content/${payload.season_id}/${payload.episode_id}`).remove();

  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/content`).once('value', contentSnapshot => {
    let content = contentSnapshot.val();
    if (content === null) {
      firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}`).remove();
    }
  })

  notification({
    type: 'success',
    title: 'Episode removed from your watched list!',
  })
}

export const watchSeason = (payload) => (dispatch) => {

  const map = {}
  payload.episodes.map(episode => {
     
    map[episode.id]= {
      timestamp: Date()
    }
  })

  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/content/${payload.season_id}`).set(map);
  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/metadata`).set({
    poster_path: payload.poster_path,
    name: payload.name,
    id: payload.tv_id
  });
  notification({
    type: 'success',
    title: 'You have succesfully watched the whole season!',
  })
}

export const unWatchSeason = (payload) => (dispatch) => {

  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/content/${payload.season_id}`).remove();
  firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}/content`).once('value', contentSnapshot => {
    let content = contentSnapshot.val();
    if (content === null) {
      firebase.database().ref(`users/${payload.user_id}/tvSeriesWatched/${payload.tv_id}`).remove();
    }
  })
  notification({
    type: 'success',
    title: 'You have succesfully un-watched the whole season!',
  })
}

export const getTVSeriesWishlist = (user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/tvSeriesWishlist`).on('value', snapshot => {
    let content = snapshot.val();
    let tvSeriesArray = Object.keys(content).map(item => content[item]);
    dispatch(setTVSeriesWishlist(tvSeriesArray));
  })
}

export const getMoviesWishlist = (user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/moviesWishlist`).on('value', snapshot => {
    let content = snapshot.val();
    let moviesArray = Object.keys(content).map(item => content[item]);
    dispatch(setMoviesWishlist(moviesArray));
  })
}
