import React, {Component} from 'react'
import '../css/BankAccounts.css';

class NewAccount extends Component {   
    render(props) {

        return (
            <React.Fragment>
                <div id='BankAccountCardWrapper'>
                    <button id='cancelNewAccount' onClick={this.props.clickHandler}>
                        x
                    </button>
                    <h5>New account</h5>

                    <br />
                
                    <label>Name
                        <input 
                            className=''
                            type='text'
                            name='accountNameInput'
                            placeholder='Enter new account name'
                            value={this.props.accountname}
                            onChange={this.props.onChange}
                        />
                    </label>


                    <label>Starting balance
                        <input
                            className=''
                            type='number'
                            placeholder=''
                            // min='0'
                            step='0.01'
                            name='startingBalanceInput'
                            onChange={this.props.onChange}
                            value={this.props.accountbalance}
                        />
                    </label>

                    <button id='newAccountBtn' onClick={this.props.clickHandler}>
                        Create account
                    </button>
                    <br />
                </div>
            </React.Fragment>
        )
    }
}

export default NewAccount