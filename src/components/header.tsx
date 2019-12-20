import * as React from 'react'

export class Header extends React.Component {
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Rent Books</span>
                </div>
            </header>
        )
    }
}