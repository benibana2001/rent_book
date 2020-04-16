import * as React from 'react'
import { useState } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import LibrarySearch from './components/LibrarySearch'
import Result from './components/LibrarySearch/Result'
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

  const renderLibrarySearch = () => (
    <LibrarySearch
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
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={500} classNames="animate">
        <Switch location={location}>
          <Route exact path="/librarysearch">
            {renderLibrarySearch()}
          </Route>

          <Route path="/librarysearch/result">{renderResult()}</Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default AppLayout
