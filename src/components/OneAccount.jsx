import React, { Component } from "react"
import Account from './js/account'
import './css/OneAccount.css';


class OneAccount extends Component {
    constructor() {
        super()
        this.state = {
            userAccount: new Account(1000000, 'Heisenberg'),
            userinput: ''
        }
    }


    // Update state with the user's input amount for deposit/withdrawal anytime
    // there is a change in the input field
    changeHandler = event => {
        const { name, value } = event.target

        // Only update state for valid input (disallow blank input, basically)
        if (value) this.setState({
            [name]: value
        })
    }


    // When a button has been clicked:
    // - user's input amount for deposit/withdrawal is in state
    // - current bank balance is in Account Object in state
    // - calculate new balance based on which button was clicked (deposit/withdrawal)
    // - create a new Account Object using account name from state, and new balance
    // - update state with new Account Object
    // - clear user's input (preventing it from being re-used)
    clickHandler = event => {

        // Do nothing if input is blank or 0...
        if (!this.state.userinput) return

        const accountAction = event.target.id

        switch (accountAction) {
            case 'depositBtn':
                this.setState(prevState => {
                    const newBalance = (prevState.userAccount.balance) + parseFloat(prevState.userinput)
                    return {
                        userAccount: new Account(newBalance, prevState.userAccount.name),
                        userinput: ''
                    }
                })
                break

            case 'withdrawBtn':
                this.setState(prevState => {
                    const newBalance = (prevState.userAccount.balance) - parseFloat(prevState.userinput)
                    return {
                        userAccount: new Account(newBalance, prevState.userAccount.name),
                        userinput: ''
                    }
                })
                break

            default:
                break
        }
    }

    render() {


        return (
            <div id='OneAccount'>
                <h3>Account: {this.state.userAccount.name}</h3>
                <h4>Balance: {this.state.userAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
                <div>
                    <input
                        type='number'
                        className='basic'
                        name='userinput'
                        placeholder='$0.00'
                        onChange={this.changeHandler}
                        value={this.state.userinput}
                    />
                    <div className='flexCenter'>
                        <button id='depositBtn' onClick={this.clickHandler}>
                            Deposit
                        </button>
                        <button id='withdrawBtn' onClick={this.clickHandler}>
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OneAccount