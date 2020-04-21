import * as React from 'react'
import { useState } from 'react'
import { Route, Switch, useLocation, useRouteMatch, Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Search from './Search'
import Result from './Result'
import '../../index.scss'
import { LibResponse } from '../../api/Calil'

export enum BookStatus {
  EXIST = 'EXIST',
  NONE = 'NONE',
  NOT_DONE = 'NOT_DONE',
}

export const defaultLibResponse: LibResponse = {
  libkey: null,
  reserveurl: '',
}

const LibrarySearchRouter: React.FunctionComponent = () => {
  const location = useLocation()
  const [bookStatus, setBookStatus] = useState(BookStatus.NOT_DONE)
  const [bookInfo, setBookInfo] = useState(null)
  const [libraryResponse, setLibraryResponse] = useState(defaultLibResponse)
  const { path, url } = useRouteMatch()

  const renderLibrarySearch = () => (
    <Search
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
    <Switch location={location}>
      <Route exact path={path}>
        {renderLibrarySearch()}
        <Link to={`${url}/result`}>Result</Link>
      </Route>

      <Route path={`${path}/result`}>{renderResult()}</Route>
    </Switch>
  )
}

export default LibrarySearchRouter
