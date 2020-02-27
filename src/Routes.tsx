import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
interface IState {
    libraryResponse: LibResponse
    bookStatus: BookStatus
    bookInfo: BookResponse
}
export const defaultLibResponse: LibResponse = {
    libkey: null,
    reserveurl: '',
}
const defaultState: IState = {
    libraryResponse: defaultLibResponse,
    bookInfo: null,
    bookStatus: BookStatus.NOT_DONE
}

class Routes extends React.Component<{}, IState> {
    public constructor(props: {}) {
        super(props)
        this.state = defaultState
    }
    public componentDidMount() {
        this.setState(defaultState)
    }

    public setBookInfo = (bookInfo: BookResponse): void => this.setState({ bookInfo: bookInfo })
    public setBookStatus = (bookStatus: BookStatus): void => this.setState({ bookStatus: bookStatus })
    public setLibraryResponse = (res: LibResponse): void => this.setState({ libraryResponse: { ...res } })
    public removeData = (): void => this.setState({ libraryResponse: { ...defaultLibResponse } })
    render() {
        return (
            <div className="container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <Header />
                <Router >
                    <Route exact path="/" >
                        <Home
                            setBookInfo={this.setBookInfo}
                            setBookStatus={this.setBookStatus}
                            setLibraryResponse={this.setLibraryResponse}
                        />
                    </Route>
                    <Route exact path="/result">
                        <Result
                            bookStatus={this.state.bookStatus}
                            response={this.state.libraryResponse}
                            setBookStatus={this.setBookStatus}
                            setLibResponse={this.setLibraryResponse}
                        />
                    </Route>
                    <Route path="/about" component={About} />
                    {/* Side Menu created by Material design - lite */}
                    <Menu />
                </Router>
            </div>
        )
    }
}

export default Routes