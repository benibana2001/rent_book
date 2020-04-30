import * as React from 'react'

import styled from 'styled-components'

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
    <ContainerInner onScroll={() => console.log('scroll')}>
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

const reachedAtPoint = (position: number) => (): boolean => {
  const elem: Element = document.body
  const crrntWndwY: number = window.scrollY
  const crrntWndwH: number = window.innerHeight
  const crrntElemH: number = elem.scrollHeight

  // marginTopの値を調整
  if (crrntWndwY + crrntWndwH >= crrntElemH * position) {
    return true
  }

  return false
}

const reachedAtBottom = reachedAtPoint(1.0)
const reachedAt80 = reachedAtPoint(0.8)
