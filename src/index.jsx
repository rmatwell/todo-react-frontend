import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './modules/App'
import Dashboard from './modules/dashboard'
import Nav from './components/nav'

render((
  <div>

    <Router>
      <Nav />
      <Route path="/" component={App}>
        <Route path="/dashboard" component={Dashboard}>
        </Route>
      </Route>
    </Router>
  </div>
), document.getElementById('root'))