import * as React from 'react'
import { Link } from 'react-router-dom'

const Menu: React.FunctionComponent = () => {
  // MaterialDesignLiteにより実装されたサイドメニューを自動折りたたみ
  const invisible = () => {
    // DOM操作
    const drawers: HTMLCollection = document.getElementsByClassName(
      'mdl-layout__drawer'
    )
    const drawer: HTMLElement = drawers.item(0) as HTMLElement

    const overlays: HTMLCollection = document.getElementsByClassName(
      'mdl-layout__obfuscator'
    )
    const overlay: HTMLElement = overlays.item(0) as HTMLElement

    const arias: HTMLCollection = document.getElementsByClassName(
      'mdl-layout__drawer-button'
    )
    const aria: HTMLElement = arias.item(0) as HTMLElement

    drawer.classList.remove('is-visible')
    overlay.classList.remove('is-visible')
    aria.setAttribute('aria-expanded', 'false')
  }
  return (
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Rent Books</span>
      <nav className="mdl-navigation">
        {/* NavLink にしておくと、activeClassNameを設定できる */}
        <Link to="/home" className="mdl-navigation__link" onClick={invisible}>
          本を検索する
        </Link>
        <Link
          to="/home/result"
          className="mdl-navigation__link"
          onClick={invisible}
        >
          検索結果
        </Link>
        <Link to="/about" className="mdl-navigation__link" onClick={invisible}>
          About
        </Link>
      </nav>
    </div>
  )
}

export default Menu
