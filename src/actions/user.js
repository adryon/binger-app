import {
  USER_LOG_IN,
  USER_LOG_IN_FAIL,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT_FAIL,
  USER_LOG_OUT_SUCCESS,
} from './actions-types';
import http from 'lib/axios-wrapper';
//import {notification} from 'antd';
import {notification} from 'components/LayoutComponents/Notification';
import {push} from 'react-router-redux';
import firebase from 'firebase';
import _ from 'lodash';

export function loginSuccess(data) {
  return {type: USER_LOG_IN_SUCCESS, data};
}

export function loginFailed() {
  return {type: USER_LOG_IN_FAIL};
}

export function logOutFailed() {
  return {type: USER_LOG_OUT_FAIL};
}

export function logOutSuccess() {
  return {type: USER_LOG_OUT_SUCCESS};
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

export function login(payload) {
  return function (dispatch) {
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
}

// export function logOut() {
//   return function (dispatch) {
//     firebase.auth().signOut().then(() => {
//       dispatch(logOutSuccess());
//       dispatch(push('/login'))
//     })
//     .catch(error => {
//       dispatch(logOutFailed());
//       dispatch(push('/login'))
//     });
//   }
// }
