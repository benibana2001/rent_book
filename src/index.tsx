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
            <p>
                書籍のISBN（アイエスビーエヌ、International Standard Book Number）を元に、図書館別の蔵書情報および貸し出し状況の確認から貸出/予約までを行うことを可能とするアプリです。
    2019年12月現在, 開発中です。
            </p>
        </div>
    )
}

ReactDOM.render(<Apps />, parent)