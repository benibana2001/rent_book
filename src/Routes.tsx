import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'

import AppLayout from './AppLayout'
import Header from './components/Common/Header'
import About from './components/About'
import Menu from './components/Common/Menu'
import './index.scss'

const Routes: React.FunctionComponent = () => {
    return (
        <div className="container mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
            <Header />
            <Router >
                {/* Side Menu created by Material design - lite */}
                <Menu />
                <Switch>
                    <Redirect exact={true} from="/" to="/home" />
                    <Route path="/home" component={AppLayout} />
                    <Route path="/about" component={About} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes