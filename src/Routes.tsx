import * as React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Header from './components/Common/Header'
import About from './components/About'
import Menu from './components/Common/Menu'
import Home from './components/Home'
import Result from './components/Result'
import './index.scss'
import { LibResponse } from './api/Calil'
import { BookResponse } from './api/OpenBD'

export enum BookStatus {
    EXIST = 'EXIST',
    NONE = 'NONE',
    NOT_DONE = 'NOT_DONE'
}
export const defaultLibResponse: LibResponse = {
    libkey: null,
    reserveurl: '',
}

const Routes: React.FunctionComponent = () => {
    const [bookStatus, setBookStatus] = useState(BookStatus.NOT_DONE)
    const [bookInfo, setBookInfo] = useState(null)
    const [libraryResponse, setLibraryResponse] = useState(defaultLibResponse)
    return (
        <div className="container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
            <Header />
            <Router >
                <Menu />
                <Switch>
                    <Route exact path="/" >
                        <Home
                            setBookInfo={setBookInfo}
                            setBookStatus={setBookStatus}
                            setLibraryResponse={setLibraryResponse}
                        />
                    </Route>
                    <Route exact path="/result">
                        <Result
                            bookStatus={bookStatus}
                            response={libraryResponse}
                            setBookStatus={setBookStatus}
                            setLibResponse={setLibraryResponse}
                        />
                    </Route>
                    <Route path="/about" component={About} />
                </Switch>
                {/* Side Menu created by Material design - lite */}
            </Router>
        </div>
    )
}

export default Routes