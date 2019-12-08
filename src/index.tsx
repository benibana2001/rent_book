import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './Components/App'

let parent: HTMLElement | null = document.getElementById('root')

ReactDOM.render(<App />, parent)