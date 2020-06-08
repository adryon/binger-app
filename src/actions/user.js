import {
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT_SUCCESS,
  USER_SET_CURRENT_USER,
  USER_SET_TV_SERIES_WISHLIST,
  USER_SET_MOVIES_WISHLIST,
  USER_SET_CURRENTLY_WATCHING,
  USER_SET_FULL_WISHLIST,
  USER_SET_FULL_FAVORITES
} from './actions-types';
import {notification} from 'components/LayoutComponents';
import {push} from 'react-router-redux';
import lockr from 'lockr';
import _ from 'lodash';
import http from './../lib/axios-wrapper';
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

export function setCurrentlyWatching(data) {
  return {type: USER_SET_CURRENTLY_WATCHING, data}
}

export function setFullWishlist(data) {
  return {type: USER_SET_FULL_WISHLIST, data}
}

export function setFullFavorites(data) {
  return {type: USER_SET_FULL_FAVORITES, data}
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

  firebase.database().ref(`users/${userId}/movies/${movie_id}/tags`).push({
    text: tag,
    color: config.colors[Math.floor(Math.random() * config.colors.length)],
  });
  notification({
    type: 'success',
    title: 'Tag added!',
  })
}

export const deleteTagFromMovie = (tag, movie_id, userId) => (dispatch) => {

  firebase.database().ref(`users/${userId}/movies/${movie_id}/tags/${tag.uid}`).remove();
  notification({
    type: 'success',
    title: 'Tag removed!',
  })
}

export const addTagToTVSeries = (tag, tv_id, user_id) => (dispatch) => {

  firebase.database().ref(`users/${user_id}/tv/${tv_id}/tags`).push({
    text: tag,
    color: config.colors[Math.floor(Math.random() * config.colors.length)],
  });
  notification({
    type: 'success',
    title: 'Tag added!',
  })
}

export const deleteTagFromTVSeries = (tag, tv_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/tags/${tag.uid}`).remove();
  notification({
    type: 'success',
    title: 'Tag removed!',
  })
}

export const addToWatched = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/is_watched`).set("1");
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/watched_timestamp`).set(Date());
  notification({
    type: 'success',
    title: 'Movie added to your watch list!',
  })
}

export const removeFromWatched = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/is_watched`).remove();
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/watched_timestamp`).remove();
  notification({
    type: 'success',
    title: 'Movie removed from your watch list!',
  })
}

export const addMovieToFavorite = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/is_favorite`).set("1");
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/favorite_timestamp`).set(Date());
  notification({
    type: 'success',
    title: 'Movie added to your favorites list!',
  })
}

export const removeMovieFromFavorite = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/is_favorite`).remove();
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/favorite_timestamp`).remove();
  notification({
    type: 'success',
    title: 'Movie removed from your favorites list!',
  })
}

export const addTVSeriesToFavorites = (tv_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/is_favorite`).set("1");
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/favorite_timestamp`).set(Date());
  notification({
    type: 'success',
    title: 'TV Series added to your favorites list!',
  })
}

export const removeTVSeriesFromFavorites = (tv_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/is_favorite`).remove();
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/favorite_timestamp`).remove();
  notification({
    type: 'success',
    title: 'TV Series removed from your favorites list!',
  })
}

export const addMovieToWishlist = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/is_wishlist`).set("1");
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/wishlist_timestamp`).set(Date());
  notification({
    type: 'success',
    title: 'Movie added to your wishlist!',
  })
}

export const removeMovieFromWishlist = (movie_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/is_wishlist`).remove();
  firebase.database().ref(`users/${user_id}/movies/${movie_id}/wishlist_timestamp`).remove();
  notification({
    type: 'success',
    title: 'Movie removed from your wishlist!',
  })
}

export const addTVSeriesToWishlist = (tv_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/is_wishlist`).set("1");
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/wishlist_timestamp`).set(Date());
  notification({
    type: 'success',
    title: 'TV series added to your wishlist!',
  })
}

export const removeTVSeriesFromWishlist = (tv_id, user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/is_wishlist`).remove();
  firebase.database().ref(`users/${user_id}/tv/${tv_id}/wishlist_timestamp`).remove();
  notification({
    type: 'success',
    title: 'TV Series removed from your wishlist!',
  })
}

export const setEpisodesSeen = (payload) => (dispatch) => {
  let episodes_seen = 0;
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content`).once('value', tvSnapshot => {
    let tv = tvSnapshot.val();
    if (tv === null) {
      firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/metadata/episodes_seen`).set(0);
    } else {
      Object.keys(tv).map(item => {
        if (tv[item].metadata.season_number !== 0 ) {
          episodes_seen += Object.keys(tv[item].content).length;
        }
      })
      firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/metadata/episodes_seen`).set(episodes_seen);
    }
  })
}

export const watchEpisode = (payload) => (dispatch) => {
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}/content/${payload.episode_id}`).update({
    episode_name: payload.episode_name,
    episode_id: payload.episode_id,
    episode_number: payload.episode_number,
    timestamp: Date()
  });
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}/metadata`).update({
    season_number: payload.season_number,
    name: payload.season_name,
    id: payload.season_id
  });
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/metadata/last_episode_seen`).update({
    episode_name: payload.episode_name,
    episode_season: payload.episode_season,
    episode_id: payload.episode_id,
    episode_number: payload.episode_number,
  });
  dispatch(setEpisodesSeen(payload));
  
  notification({
    type: 'success',
    title: 'You have succesfully watched this episode!',
  })
}

export const unWatchEpisode = (payload) => (dispatch) => {
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}/content/${payload.episode_id}`).remove();

  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content`).once('value', tvSnapshot => {
    let tv = tvSnapshot.val();
    if (tv === null) {
      firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}`).remove();
    }
  })

  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}/content`).once('value', seasonSnapshot => {
    let season = seasonSnapshot.val();
    if (season === null) {
      firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}`).remove();
    }
    dispatch(setEpisodesSeen(payload));
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

  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}/content`).set(map);
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}/metadata`).set({
    season_number: payload.season_number,
    name: payload.season_name,
    id: payload.season_id,
  });
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/metadata`).update({
    last_episode_seen: {
      episode_name: payload.episode_name,
      episode_season: payload.episode_season,
      episode_id: payload.episode_id,
      episode_number: payload.episode_number,
    }
  });
  dispatch(setEpisodesSeen(payload));
  notification({
    type: 'success',
    title: 'You have succesfully watched the whole season!',
  })
}

export const unWatchSeason = (payload) => (dispatch) => { 
  firebase.database().ref(`users/${payload.user_id}/tv/${payload.tv_id}/content/${payload.season_id}`).remove();
  dispatch(setEpisodesSeen(payload));
  notification({
    type: 'success',
    title: 'You have succesfully un-watched the whole season!',
  })
}

export const getTVSeriesWishlist = (user_id) => (dispatch) => {

  firebase.database().ref(`users/${user_id}/tv`).orderByChild("is_wishlist").equalTo("1").on("value", snapshot => {
    let content = snapshot.val();
    let tvSeriesArray = content ? Object.keys(content).map(item => content[item]) : [];
    dispatch(setTVSeriesWishlist(tvSeriesArray));
  });
}

export const getMoviesWishlist = (user_id) => (dispatch) => {

  firebase.database().ref(`users/${user_id}/movies`).orderByChild("is_wishlist").equalTo("1").on("value", snapshot => {
    let content = snapshot.val();
    let moviesArray = content ? Object.keys(content).map(item => content[item]) : [];
    dispatch(setMoviesWishlist(moviesArray));
  });
}

export const getFullWishlist = (user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies`).orderByChild("is_wishlist").equalTo("1").on('value', movieSnapshot => {
    let movieContent = movieSnapshot.val();
    movieContent = movieContent ? Object.keys(movieContent).map(item => movieContent[item]) : [];
    movieContent = movieContent.map(item => ({...item, type: 'movie'}))
    
    firebase.database().ref(`users/${user_id}/tv`).orderByChild("is_wishlist").equalTo("1").on('value', tvSnapshot => {
      let tvSeriesContent = tvSnapshot.val();
      tvSeriesContent = tvSeriesContent ? Object.keys(tvSeriesContent).map(item => tvSeriesContent[item]) : [];
      tvSeriesContent = tvSeriesContent.map(item => ({...item, type: 'tv'}))

      var mergedArray = movieContent.concat(tvSeriesContent);
      var mergedArray = _.orderBy(mergedArray, ['wishlist_timestamp'],['desc']);
      dispatch(setFullWishlist(mergedArray));
    })
  })
}

export const getFullFavorites = (user_id) => (dispatch) => {
  firebase.database().ref(`users/${user_id}/movies`).orderByChild("is_favorite").equalTo("1").on('value', movieSnapshot => {
    let movieContent = movieSnapshot.val();
    movieContent = movieContent ? Object.keys(movieContent).map(item => movieContent[item]) : [];
    movieContent = movieContent.map(item => ({...item, type: 'movie'}))
    
    firebase.database().ref(`users/${user_id}/tv`).orderByChild("is_favorite").equalTo("1").on('value', tvSnapshot => {
      let tvSeriesContent = tvSnapshot.val();
      tvSeriesContent = tvSeriesContent ? Object.keys(tvSeriesContent).map(item => tvSeriesContent[item]) : [];
      tvSeriesContent = tvSeriesContent.map(item => ({...item, type: 'tv'}))

      var mergedArray = movieContent.concat(tvSeriesContent);
      var mergedArray = _.orderBy(mergedArray, ['wishlist_timestamp'],['desc']);
      dispatch(setFullFavorites(mergedArray));
    })
  })
}

export const getCurrentlyWatching = (user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`users/${user_id}/tv`).orderByChild("content").startAt("").on("value", async snapshot => {
      let content = snapshot.val();
  
      let results = content ? await Promise.all(
        Object.keys(content).map(tv => {
          let tv_metadata = content[tv].metadata;
          let lastEpisodeSeen = content[tv].metadata.last_episode_seen;
          if (tv_metadata.completed !== true) {
            return http.get(`tv/${tv_metadata.id}/season/${lastEpisodeSeen.episode_season}/episode/${lastEpisodeSeen.episode_number+1}`, config.MOVIE_DB_PAYLOAD)
            .then(result1 => {
              return http.get(`tv/${tv_metadata.id}`, config.MOVIE_DB_PAYLOAD)
              .then(tvResult => {
                tvResult.seasons.map(season => {
                  if (season.season_number === lastEpisodeSeen.episode_season) {
                    result1.season_id = season.id;
                    result1.season_name = season.name;
                  }
                });
                result1.tv_name = tvResult.name;
                result1.tv_poster_path = tvResult.poster_path;
                result1.tv_id = tvResult.id;
                return result1;
              })
            })
            .catch(error => {
              if (error.message === 'Request failed with status code 404') {
                return http.get(`tv/${tv_metadata.id}/season/${lastEpisodeSeen.episode_season+1}/episode/${1}`, config.MOVIE_DB_PAYLOAD)
                .then(result2 => {
                  return http.get(`tv/${tv_metadata.id}`, config.MOVIE_DB_PAYLOAD)
                  .then(tvResult => {
                    tvResult.seasons.map(season => {
                      if (season.season_number === lastEpisodeSeen.episode_season) {
                        result2.season_id = season.id;
                        result2.season_name = season.name;
                      }
                    });
                    result2.tv_name = tvResult.name;
                    result2.tv_poster_path = tvResult.poster_path;
                    result2.tv_id = tvResult.id;
                    return result2;
                  })
                })
                .catch(error => {
                  if (error.message === 'Request failed with status code 404') {
                    firebase.database().ref(`users/${user_id}/tv/${tv_metadata.id}/metadata/completed`).set(true);
                  } else {
                    notification({
                      type: 'error',
                      icon: 'exclamation-circle',
                      title: 'Cannot get tv series data!',
                    })
                  }
                });
              } else {
                notification({
                  type: 'error',
                  icon: 'exclamation-circle',
                  title: 'Cannot get tv series data!',
                })
              }
            });
          } else {
            return undefined;
          }
        })
      ) : null;
      results = _.without(results, undefined);
      resolve(results);
      dispatch(setCurrentlyWatching(results));
    })
  })
}
