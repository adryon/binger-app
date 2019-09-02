import React from 'react'
import { Switch } from 'react-router'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute} from './PublicRoute'
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MainPage from 'pages/MainPage';
import Navbar from 'components/LayoutComponents/Navbar';
import Notification from 'components/LayoutComponents/Notification';

const routes = (
  <div>
    <Navbar />
    <Notification />
    <Switch>
      <PublicRoute exact path='/' component={LoginPage} />
      <PublicRoute exact path='/login' component={LoginPage} />
      <PublicRoute exact path='/' component={RegisterPage} />
      <PrivateRoute exact path='/main' component={MainPage} />
    </Switch>
  </div>
)

export default routes
