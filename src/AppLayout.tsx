import * as React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Home from './components/Home'
import Result from './components/Result'
import './index.scss'
import { LibResponse } from './api/Calil'

export enum BookStatus {
    EXIST = 'EXIST',
    NONE = 'NONE',
    NOT_DONE = 'NOT_DONE'
}
export const defaultLibResponse: LibResponse = {
    libkey: null,
    reserveurl: '',
}

const AppLayout: React.FunctionComponent = () => {
    const [bookStatus, setBookStatus] = useState(BookStatus.NOT_DONE)
    const [bookInfo, setBookInfo] = useState(null)
    const [libraryResponse, setLibraryResponse] = useState(defaultLibResponse)
    return (
        <React.Fragment>
            <Route exact path="/home" >
                <Home
                    setBookInfo={setBookInfo}
                    setBookStatus={setBookStatus}
                    setLibraryResponse={setLibraryResponse}
                />
            </Route>
            <Route path="/home/result">
                <Result
                    bookStatus={bookStatus}
                    response={libraryResponse}
                    setBookStatus={setBookStatus}
                    setLibResponse={setLibraryResponse}
                />
            </Route>
        </React.Fragment>
    )
}

export default AppLayout
