import * as React from 'react'

import styled from 'styled-components'

import * as Util from './util'

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
        <Container />
      </Switch>

      <TabBar />
    </Router>
  )
}

const Container: React.FunctionComponent = () => {
  return (
    <ContainerInner
    //   onScroll={() => {
    //   }}
    >
      <Redirect exact={true} from="/" to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/librarysearch" component={LibrarySearchRouter} />
      <Route path="/about" component={About} />
      <Route
        path="/newbooks"
        render={() => <Newbooks test={'hello world'} />}
      />
      {/* <Route path="/newbooks" component={Newbooks} /> */}
    </ContainerInner>
  )
}

const ContainerInner = styled.div`
  height: calc(100vh - 83px);
  overflow-y: scroll;
`

export default Routes
