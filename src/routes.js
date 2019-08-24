import React from 'react'
import { Route, Switch } from 'react-router'
import { PrivateRoute } from './PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/LayoutComponents/Navbar';

const routes = (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      {/*<PrivateRoute exact path='/dashboard' component={DashboardPage} />*/}
    </Switch>
  </div>
)

export default routes
