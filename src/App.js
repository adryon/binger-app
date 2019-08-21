import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        {/*<PrivateRoute exact path='/dashboard' component={DashboardPage} />*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
