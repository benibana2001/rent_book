import * as React from 'react'
// import * as ReactDOM from 'react-dom'
// import { unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect'
import { getByTestId, render, fireEvent } from '@testing-library/react'

import PrefArea from '../components/LibrarySearch/Pref'

// let container: HTMLElement | null = null
// beforeEach(() => {
//     container = document.createElement('div')
//     document.body.appendChild(container)
// })

// afterEach(() => {
//     unmountComponentAtNode(container)
//     container.remove()
//     container = null
// })

// it('test', () => {
//     const props = {
//         setter: {
//             systemID: () => { console.log('test') }
//             // systemID: jest.fn()
//         }
//     }
//     const { getByTestId } = render(<PrefArea {...props} />)
//     const btn = getByTestId('test-btn')
//     fireEvent.click(btn)

//     expect(btn).toHaveTextContent('Clicked!')
// })
it('be called changeHandler', () => {
  const props = {
    setSystemID: jest.fn(),
  }
  const { getByDisplayValue } = render(<PrefArea {...props} />)
  const select = getByDisplayValue('市区町村を選んでね')
  fireEvent.change(select)
  expect(props.setSystemID).toHaveBeenCalled()
})
