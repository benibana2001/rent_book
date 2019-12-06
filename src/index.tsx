import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { View } from './Components/App'

// ReactDOM.render(<App />, document.getElementById('root'));
let parent: HTMLElement | null = document.getElementById('root')

ReactDOM.render(<View />, parent)