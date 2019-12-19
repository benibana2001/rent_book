import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Header } from './components/header'
import { Menu } from './components/menu'
import { Tabs } from './tabs'

let parent: HTMLElement | null = document.getElementById('root')

class Apps extends React.Component {
    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <Router >
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Tabs />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                    </Switch>

                    <Menu />

                    <Link to="/">本を検索する</Link>
                    <Link to="/about">About</Link>

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