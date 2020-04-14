import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Toast from '../components/Common/Toast'

let container: HTMLElement | null = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('render', () => {
  act(() => {
    ReactDOM.render(<Toast text={'Hello world!'} />, container)
  })
  const outerElem: HTMLElement = document.getElementsByClassName(
    'outer'
  )[0] as HTMLElement
  expect(outerElem.textContent).toEqual('Hello world!')
})
