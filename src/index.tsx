import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Header } from './components/header'
import { Menu } from './components/menu'
import { Home } from './home'

let parent: HTMLElement | null = document.getElementById('root')

class Apps extends React.Component {
    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <Header />
                <Router >
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                    </Switch>

                    <Menu />

                </Router>
            </div>
        )
    }
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    )
}

ReactDOM.render(<Apps />, parent)