import * as React from 'react'
import { Link } from 'react-router-dom'

export { Menu }
class Menu extends React.Component {
    /**
     * MaterialDesignLiteにより実装されたサイドメニューを非表示
     * DOM操作j
     */
    invisible() {
        console.log('click')
        // DOM操作
        let drawers: HTMLCollection = document.getElementsByClassName('mdl-layout__drawer')
        let drawer: HTMLElement = drawers.item(0) as HTMLElement

        let overlays: HTMLCollection = document.getElementsByClassName('mdl-layout__obfuscator')
        let overlay: HTMLElement = overlays.item(0) as HTMLElement

        let arias: HTMLCollection = document.getElementsByClassName('mdl-layout__drawer-button')
        let aria : HTMLElement = arias.item(0) as HTMLElement

        console.log(drawers)
        drawer.classList.remove('is-visible')
        overlay.classList.remove('is-visible')
        aria.setAttribute('aria-expanded', 'false')
    }
    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Rent Books</span>
                <nav className="mdl-navigation">
                    <Link to="/" className="mdl-navigation__link" onClick={this.invisible}>本を検索する</Link>
                    <Link to="/about" className="mdl-navigation__link" onClick={this.invisible}>About</Link>
                </nav>
            </div>
        )
    }
}