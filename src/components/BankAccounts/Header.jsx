import React, {Component} from "react"

class Header extends Component {
  render(props) {

    let accountName = ''
    let accountBalance = ''
    
    // If no account has been created yet, prompt the user to
    // create a new account
    if (this.props.currentAccount === '') {
        accountName = 'Create a new account to get started'
    
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

    let accountStats = ''
    if (this.props.currentAccount !== '') {
        accountStats = 
            <div className='account-stats'>
                <div>Lowest balance: {this.props.accountsController.getLowestBalance().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>Highest balance: {this.props.accountsController.getHighestBalance().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div><strong>Total funds:</strong> {this.props.accountsController.getTotalBalance().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            </div>
    }

    return (
      <React.Fragment>
        <div id="BankAccountsHeader">
            <h4>
                {accountName}
                <br />
                { accountBalance !== '' ? ` ${accountBalance}` : ''}
            </h4>
            {accountStats}
        </div>
      </React.Fragment>
    )
  }
}

export default Header
