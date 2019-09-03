import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import 'resources/binger.scss'
import config from 'lib/config';
import configureStore, { history } from './configureStore'
import { ConnectedRouter } from 'connected-react-router'
import App from './App';

import firebase from 'firebase'
var firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: "binger-e4fea.firebaseapp.com",
  databaseURL: "https://binger-e4fea.firebaseio.com",
  projectId: "binger-e4fea",
  storageBucket: "binger-e4fea.appspot.com",
  messagingSenderId: "100930507189"
};
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
