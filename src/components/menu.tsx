import * as React from 'react'

export { Menu }
class Menu extends React.Component {
    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Rent Books</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                </nav>
            </div>
        )
    }
}