import React, {Component} from 'react'
import '../css/BankAccounts.css';

class RenameAccount extends Component {
    render(props) {


// NOTE:
// inside these cards, (with the exception of hte create new account & delete acocunt cards)
// we can be certain that the current account passed down via props is good - no
// need to worry about it

    let accountName = ''
        
    // If no account has been created yet, we shouldn't be here!
    if (this.props.currentAccount === '') {
        accountName = 'no accounts!'
    
    // Otherwise, obtain name of the current account
    } else {
        this.props.accountsArray.forEach((account) => {
            if (account.name === this.props.currentAccount) {
                accountName = account.name
            }
        })
    }

    return (
      <React.Fragment>
        <div className='cardWrapper'>
        <div id='BankAccountCardWrapper'>
            <button id='cancelRenameAccount' onClick={this.props.clickHandler}>
                    x
            </button>
                <h5>Rename '{accountName}'</h5>

                <br />

                <label>
                    <input
                        className=''
                        type='text'
                        placeholder='Enter new name'
                        name='renameAccountInput'
                        onChange={this.props.onChange}
                        value={this.props.renameaccountinput}
                    />
                </label>

               <button id='renameAccountBtn' onClick={this.props.clickHandler}>
                    Rename
                </button>
            </div>
        </div>
      </React.Fragment>
    )
  }
}
export default RenameAccount