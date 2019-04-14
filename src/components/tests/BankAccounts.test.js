import React from 'react'
import ReactDOM from 'react-dom'
import BankAccounts from '../BankAccounts'

describe('Testing that component BankAccounts', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<BankAccounts />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
