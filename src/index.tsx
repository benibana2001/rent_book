import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './tabs'

let parent: HTMLElement | null = document.getElementById('root')

ReactDOM.render(<App />, parent)