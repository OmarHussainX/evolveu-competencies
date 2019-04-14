import React from 'react'
import ReactDOM from 'react-dom'
import OneAccount from '../OneAccount'

describe('Testing that component OneAccount', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<OneAccount />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
