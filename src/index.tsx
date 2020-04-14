import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Routes from './Routes'

const parent: HTMLElement | null = document.getElementById('root')
const Apps: React.FunctionComponent = () => {
  return <Routes />
}

ReactDOM.render(<Apps />, parent)
