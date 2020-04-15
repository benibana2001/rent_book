import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Routes from './Routes'

import './index.scss'

const parent: HTMLElement | null = document.getElementById('root')
const Apps: React.FunctionComponent = () => {
  return (
    <div className="container">
        <Routes />
    </div>
  )
}

ReactDOM.render(<Apps />, parent)
