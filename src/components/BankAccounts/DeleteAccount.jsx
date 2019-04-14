import React, {Component} from 'react'
import '../css/BankAccounts.css';

class DeleteAccount extends Component {
    render(props) {


// NOTE:
// inside these cards, (with the exception of create & delete account perhaps...)
// we can be certain that the current account passed down via props is good - no
// need to worry about it!

    let accountName = ''
        
    // If no account has been created yet, we shouldn't be here!
    if (this.props.currentAccount === '') {
        accountName = 'no accounts!'
    
    // Otherwise, obtain name of the current account
    // WHY!? Just use 'this.props.currentAccount'...
    } else {
        this.props.accountsArray.forEach((account) => {
            if (account.name === this.props.currentAccount) {
                accountName = account.name
            }
        })
    }

    return (
      <React.Fragment>
        <div id='BankAccountCardWrapper'>
            <div className='card'>
                <button id='cancelDeleteAccount' onClick={this.props.clickHandler}>
                        x
                </button>

                <h5>Delete <em>'{accountName}'</em></h5>

                <p>
                    Are you sure you wish to delete this account?
                </p>

                <button id='deleteAccountBtn' onClick={this.props.clickHandler}>
                    Delete
                </button>
            </div>
        </div>
      </React.Fragment>
    )
  }
}
export default DeleteAccount