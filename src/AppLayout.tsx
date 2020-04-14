import * as React from 'react'
import { useState } from 'react'
import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Home from './components/Home'
import Result from './components/Result'
import './index.scss'
import { LibResponse } from './api/Calil'

export enum BookStatus {
  EXIST = 'EXIST',
  NONE = 'NONE',
  NOT_DONE = 'NOT_DONE',
}

export const defaultLibResponse: LibResponse = {
  libkey: null,
  reserveurl: '',
}

const AppLayout: React.FunctionComponent = () => {
  const location = useLocation()
  const [bookStatus, setBookStatus] = useState(BookStatus.NOT_DONE)
  const [bookInfo, setBookInfo] = useState(null)
  const [libraryResponse, setLibraryResponse] = useState(defaultLibResponse)

  const renderHome = () => (
    <Home
      setBookInfo={setBookInfo}
      setBookStatus={setBookStatus}
      setLibraryResponse={setLibraryResponse}
    />
  )

  const renderResult = () => (
    <Result
      bookStatus={bookStatus}
      response={libraryResponse}
      setBookStatus={setBookStatus}
      setLibResponse={setLibraryResponse}
    />
  )

  return (
    <React.Fragment>
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="animate">
          <Switch location={location}>
            <Route exact path="/home">
              {renderHome()}
            </Route>

            <Route path="/home/result">{renderResult()}</Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  )
}

export default AppLayout
