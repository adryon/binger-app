import React from 'react'
import { Switch } from 'react-router'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute} from './PublicRoute'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
import MainPage from 'pages/MainPage'
import MovieDetailsPage from 'pages/MovieDetailsPage'
import TVSeriesDetailsPage from 'pages/TVSeriesDetailsPage'

const routes = (
  <div>
    <Switch>
      <PublicRoute exact path={'/'} component={LoginPage} />
      <PublicRoute exact path={'/login'} component={LoginPage} />
      <PublicRoute exact path={'/register'} component={RegisterPage} />
      <PrivateRoute exact path={'/main'} component={MainPage} />
      <PrivateRoute exact path={'/movie/:id'} component={MovieDetailsPage} />
      <PrivateRoute exact path={'/tv/:id'} component={TVSeriesDetailsPage} />
    </Switch>
  </div>
)

export default routes
