import * as React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { TabBar } from './components/Common'
import Home from './components/Home'
import LibrarySearchRouter from './components/LibrarySearch'
import About from './components/About'
import Newbooks from './components/NewBooks'

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact={true} from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/librarysearch" component={LibrarySearchRouter} />
        <Route path="/about" component={About} />
        <Route path="/newbooks" component={Newbooks} />
      </Switch>

      <TabBar />
    </Router>
  )
}

export default Routes
