import React, {Component} from "react"
import Account from './js/account'
import './css/OneAccount.css';


class OneAccount extends Component {
    constructor() {
        super()
        this.state = {
            userAccount: new Account(1000000, 'Heisenberg'),
            userinput: 0

        }
        this.clickHandler = this.clickHandler.bind(this)
    }
    
    changeHandler = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        // console.log(`NAME: ${name}`)
        // console.log(`VALUE: ${value}`)
    }

    clickHandler(event) {
        // console.log(`event.target.id: ${event.target.id}`)
        // console.log(`event.currentTarget.id: ${event.currentTarget.id}`)
        console.log(`this.state...name: ${this.state.userAccount.name}`)
        console.log(`this.state...balance: ${this.state.userAccount.balance}`)
        //read input
        // - if deposit, make deposit
        // - if withdrawal, make withdrawal
        //update state
        //clear input
        const input = event.target.value
        console.log(`input: ${input}`)
        const action = event.target.id

        switch(action) {
            case 'depositBtn':
                
                this.setState(prevState => {
                    const accountName = prevState.userAccount.name
                    const accountBalance = (prevState.userAccount.balance) + parseFloat(prevState.userinput)
                    let updatedAccount = new Account(accountBalance, accountName)
                    updatedAccount.setName('Lydia')
                    return { userAccount: updatedAccount }
                })
                break

            case 'withdrawBtn':
                this.setState(prevState => {
                    const accountName = prevState.userAccount.name
                    const accountBalance = (prevState.userAccount.balance) - parseFloat(prevState.userinput)
                    let updatedAccount = new Account(accountBalance, accountName)
                    return { userAccount: updatedAccount }
                })            
                break

            default:
                break
        }
        this.setState({ userinput: 0})

    }

    render() {


        return (
            <div id='OneAccount'>
                <h2>Account: {this.state.userAccount.name}</h2>
                <h3>Balance: {this.state.userAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
                <div>
                    <input
                        type='number'
                        className='basic'
                        name='userinput'
                        onChange={this.changeHandler}
                        value={this.state.userinput}
                    />
                    <br />
                    <div id="depositBtn" className="bankbutton" onClick={this.clickHandler}>Deposit</div>
                    <div id="withdrawBtn" className="bankbutton" onClick={this.clickHandler}>Withdraw</div>
                </div>
            </div>
        )
    }
}

export default OneAccount