import {
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT_SUCCESS,
  USER_SET_CURRENT_USER,
} from './actions-types';
import {notification} from 'components/LayoutComponents/Notification';
import {push} from 'react-router-redux';
import lockr from 'lockr';
import firebase from 'firebase';

export function loginSuccess(data) {
  return {type: USER_LOG_IN_SUCCESS, data};
}

export function logOutSuccess() {
  return {type: USER_LOG_OUT_SUCCESS};
}

export function setCurrentUser(data) {
  return {type: USER_SET_CURRENT_USER, data};
}

export function register(payload) {
  return function (dispatch) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(result => {
      firebase.database().ref(`users/${result.user.uid}`).set({
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
      firebase.database().ref('/users/' + user.uid).on('value', snapshot => {
        const userData = Object.assign({}, snapshot.val(), {uid: user.uid})
        dispatch(setCurrentUser(userData))
      });
    });
    return Promise.resolve(true);
  } else {
    return Promise.reject();
  }
};
