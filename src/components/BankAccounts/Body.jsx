import React, {Component} from 'react'
import AccountsList from './AccountsList'
import DepositWithdraw from './DepositWithdraw'
import Transfer from './Transfer'
import NewAccount from './NewAccount'
import RenameAccount from './RenameAccount'
import DeleteAccount from './DeleteAccount'


class Body extends Component {
    render(props) {
        
        // don't paint background if the first account hasn't been created yet, in order
        // to make the 'New account' button more prominent
        const noAccounts = ((this.props.currentAccount === '' && this.props.currentCard === '') ? {background: 'none'} : {background: 'white'})

        return (
            <React.Fragment>
                <div id='BankAccountsBody' style={noAccounts}>
                    <AccountsList 
                        clickHandler={this.props.clickHandler} 
                        accountsArray={this.props.accountsArray}
                        currentAccount={this.props.currentAccount}
                        sortOrder={this.props.sortOrder}
                    />
                    {this.props.currentCard === 'NewAccount' && (
                        <NewAccount 
                            accountname={this.props.accountname}
                            accountbalance={this.props.accountbalance}
                            clickHandler={this.props.clickHandler}
                            onChange={this.props.onChange}
                        />
                    )}
                    {this.props.currentCard === 'DepositWithdraw' && (
                        <DepositWithdraw 
                            accountsArray={this.props.accountsArray}
                            currentAccount={this.props.currentAccount}
                            chgBalInput={this.props.chgBalInput}
                            clickHandler={this.props.clickHandler} 
                            onChange={this.props.onChange}
                        />
                    )}
                    {this.props.currentCard === 'Transfer' && (
                        <Transfer 
                            accountsArray={this.props.accountsArray}
                            currentAccount={this.props.currentAccount}
                            transferAmount={this.props.transferAmount}
                            transferFrom={this.props.transferFrom}
                            transferTo={this.props.transferTo}
                            clickHandler={this.props.clickHandler} 
                            onChange={this.props.onChange}
                        />
                    )}
                    {this.props.currentCard === 'RenameAccount' && (
                        <RenameAccount 
                            renameaccountinput={this.props.renameaccountinput}
                            accountsArray={this.props.accountsArray}
                            currentAccount={this.props.currentAccount}
                            clickHandler={this.props.clickHandler}
                            onChange={this.props.onChange}
                        />
                    )}
                    {this.props.currentCard === 'DeleteAccount' && (
                        <DeleteAccount 
                            accountsArray={this.props.accountsArray}
                            currentAccount={this.props.currentAccount}
                            clickHandler={this.props.clickHandler}
                        />
                    )}
                </div>
            </React.Fragment>
        )
    }
}
export default Body
