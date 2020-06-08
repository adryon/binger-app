import React from 'react'
import { Switch } from 'react-router'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute} from './PublicRoute'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
import ComponentsPage from 'pages/ComponentsPage'
import MainPage from 'pages/MainPage'
import MovieDetailsPage from 'pages/MovieDetailsPage'
import TVSeriesDetailsPage from 'pages/TVSeriesDetailsPage'
import WishlistPage from 'pages/WishlistPage'
import FavoritesPage from 'pages/FavoritesPage'

const routes = (
  <div>
    <Switch>
      <PublicRoute exact path={'/'} component={LoginPage} />
      <PublicRoute exact path={'/login'} component={LoginPage} />
      <PublicRoute exact path={'/register'} component={RegisterPage} />
      <PrivateRoute exact path={'/components'} component={ComponentsPage} />
      <PrivateRoute exact path={'/main'} component={MainPage} />
      <PrivateRoute exact path={'/movie/:id'} component={MovieDetailsPage} />
      <PrivateRoute exact path={'/tv/:id'} component={TVSeriesDetailsPage} />
      <PrivateRoute exact path={'/wishlist'} component={WishlistPage} />
      <PrivateRoute exact path={'/favorites'} component={FavoritesPage} />
    </Switch>
  </div>
)

export default routes
