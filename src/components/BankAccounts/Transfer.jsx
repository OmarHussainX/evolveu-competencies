import React, {Component} from 'react'
import '../css/BankAccounts.css';

class Transfer extends Component {
    render(props) {

    // Create an array of option entries for the 'From' dropdown
    // Make the current account selected by default
    // Remember: account names are guaranteed to be unique!
    const fromDropdownOpts = this.props.accountsArray.map((account) => {
        return <option
                key={account.name} 
                value={account.name} 
                >
                {account.name}
                </option>
    })

    // Create an array of option entries for the 'From' dropdown
    // Exclude the current account from the list
    // Remember: account names are guaranteed to be unique!
    const toDropdownOpts = this.props.accountsArray.map((account) => {
        if (account.name !== this.props.currentAccount) {
            return <option
                    key={account.name} 
                    value={account.name} 
                    >
                    {account.name}
                    </option>
        } else return ''
    })

    return (
      <React.Fragment>
        <div id='BankAccountCardWrapper'>
            <button id='cancelTransfer' onClick={this.props.clickHandler}>
                    x
            </button>

            <h5>Transfer From:<br />
            '{(this.props.currentAccount.length >= 13 ? this.props.currentAccount.substring(0,10)+'...' : this.props.currentAccount)}' to:<br />
                '{this.props.transferTo}'</h5>
            <br />
            
            {/* NOTE:
            The onChange handler for these controls updates the 'To'
            dropdown anytime the 'From' one is changed!!
             */}
            <label>From: 
                <select 
                        className='select-style'
                        value={this.props.transferFrom}
                        onChange={this.props.onChange}
                        name="transferFrom"
                        >
                        {fromDropdownOpts}
                </select>
            </label>
            <br />
            <label>To: 
                <select 
                        className='select-style'
                        value={this.props.transferTo}
                        onChange={this.props.onChange}
                        name="transferTo"
                        >
                        {toDropdownOpts}
                </select>
            </label>

            <label>Funds
                <input 
                    className=''
                    type="number" 
                    min="0"
                    step="0.01"
                    name="transferAmount"
                    value={this.props.transferAmount}
                    onChange={this.props.onChange}
                />
            </label>

            <button id="transferBtn" onClick={this.props.clickHandler}>
                Transfer
            </button>
        </div>
      </React.Fragment>
    )
  }
}
export default Transfer