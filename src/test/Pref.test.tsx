import * as React from "react";
import * as ReactDOM from 'react-dom'
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect'
import { getByTestId, render, fireEvent, waitForElement } from '@testing-library/react'

import Pref from '../components/Home/Pref'
import PrefArea from "../components/Home/Pref";

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

it('test', () => {
    const props = {
        setter: {
            systemID: () => { console.log('test') }
        }
    }
    const { getByTestId } = render(<PrefArea {...props} />)
    const btn = getByTestId('test-btn')
    fireEvent.click(btn)
    expect(btn).toHaveTextContent('Clicked!')
})