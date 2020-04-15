import * as React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import TabBar from './components/Common/TabBar'
import AppLayout from './AppLayout'
import About from './components/About'

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact={true} from="/" to="/home" />
        <Route path="/home" component={AppLayout} />
        <Route path="/about" component={About} />
      </Switch>

      <TabBar />
    </Router>
  )
}

export default Routes