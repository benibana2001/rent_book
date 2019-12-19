import * as React from 'react'

export class Header extends React.Component {
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Rent Books</span>
                </div>
                <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                    <a href="#fixed-tab-1" className="mdl-layout__tab is-active">ISBN</a>
                    <a href="#fixed-tab-2" className="mdl-layout__tab">Camera</a>
                </div>
            </header>
        )
    }
}