import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Common/Header'
import About from './components/About'
import Menu from './components/Common/Menu'
import Home from './components/Home'
import Result from './components/Result'
import './index.scss'
import { LibResponse } from './api/Calil'

class Routes extends React.Component<{}, {}> {
    render() {
        return (
            <div className="container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <Header />
                <Router >
                    <Route exact path="/" component={Home} />
                    <Route exact path="/result" component={Result} />
                    <Route path="/about" component={About} />
                    {/* Side Menu created by Material design - lite */}
                    <Menu />
                </Router>
            </div>
        )
    }
}

export default Routes