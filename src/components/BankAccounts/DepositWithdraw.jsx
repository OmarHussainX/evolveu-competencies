import React, {Component} from 'react'
import '../css/BankAccounts.css';

class DepositWithdraw extends Component {
    render(props) {

    let accountName = ''
    let accountBalance = ''
        
    // If no account has been created yet, prompt the user to
    // create a new account
    if (this.props.currentAccount === '') {
        accountName = 'no accounts!'
    
    // Otherwise, obtain name and balance of the current account,
    // and display current account info
    } else {
        this.props.accountsArray.forEach((account) => {
            if (account.name === this.props.currentAccount) {
                accountName = account.name
                accountBalance = account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            }
        })
    }

    return (
      <React.Fragment>
        <div id='BankAccountCardWrapper'>
            <button id='cancelDepositWithdraw' onClick={this.props.clickHandler}>
                    x
            </button>

            <h5>
                {accountName}
                <br />
                {accountBalance}</h5>
            
            <br />
            
            <label>Funds
                <input 
                    className=''
                    type="number" 
                    min="0"
                    step="0.01"
                    name="depositWithdrawAmount"
                    value={this.props.chgBalInput}
                    onChange={this.props.onChange}
                />
            </label>

            <button id="depositBtn" onClick={this.props.clickHandler}>
                Deposit
            </button>
            <button id="withdrawBtn" onClick={this.props.clickHandler}>
                Withdraw
            </button>
        </div>
      </React.Fragment>
    )
  }
}
export default DepositWithdraw