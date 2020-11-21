import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './modules/App'
import Dashboard from './modules/dashboard'
import NavTop from './components/nav'
import Register from './modules/register'
import Login from './modules/login'

import 'bootstrap/dist/css/bootstrap.min.css';


render((
  <div>

    <Router>
      <NavTop />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/Login" component={Login} />
      </Switch>
    </Router>
  </div>
), document.getElementById('root'))