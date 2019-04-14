import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from '../Calculator'

describe('Testing that component Calculator', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Calculator />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
