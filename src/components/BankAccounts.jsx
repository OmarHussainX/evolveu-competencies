import React, {Component} from 'react'
import './css/BankAccounts.css'
import Account from './js/account'
import AccountsController from './js/accountsController'
import Header from "./BankAccounts/Header"
import Body from "./BankAccounts/Body"

class BankAccounts extends Component {
constructor() {
    super();
    this.state = {
        // Contains an array of Account objects, provides methods for dealing with multiple accounts
        accountsController: new AccountsController(),
        
        // Contains user input for account name & starting balance while new account creation is active
        accountNameInput: '',
        startingBalanceInput: 0,

        // Contains user input when rename account is active
        renameAccountInput: '',

        // Message which is shown if a duplicate name is entered when creating a new account
        errorMessage: <span>&nbsp;</span>,

        // Contains user input for amount while deposit/withdrawal is active
        // and the selections for the 'From' and 'To' transfer targets
        depositWithdrawAmount: 0,
        transferFrom: '',
        transferTo: '',

        // Contains user input for amount while transfer is active
        transferAmount: 0,

        // Keeps track of which account is currently active
        currentAccount: '',

        // Controls what card is shown, based on the action selected by the user:
        // - CreateAccount
        // - DepositWithdrawal
        // - CreateAccount
        // - RenameAccount
        // - DeleteAccount
        currentCard: '',

        // Object containing the sort settings for the accounts list
        // The first property determines whether accounts are being sorted by balance or name
        // The last two properties determine whether the sort order is ascending or descending,
        // for balance and name, respectively
        // (Accounts are initally set to be sorted by balance, in ascending order)
        //
        // NOTE: The accounts collection needs to be re-sorted (based on sort settings in state) anytime:
        // - an Account is added
        // - an Account is renamed
        // - an Account balance is changed (deposit/withdrawal)
        // (since the accounts are always in a sorted state, there is no need to sort upon deletion of an account)
        sortOrder: {
            isSortedByBalance: true,
            balanceSortDirection: 'ascending',
            nameSortDirection: 'ascending'
        }
    }
}


// --> No binding needed when using arrow notation! <--
// Ensures state always contains the latest input for:
// - account name & balance when account creation is actve
// - deposit/withdrawal amount when deposit/withdrawal is active
changeHandler = event => {
    const {name, value} = event.target

    // If a 'From' account was selected in the Transfer card, need to
    // update the current account!
    // Updating the current account causes the 'To' dropdown to refresh
    // itself - exactly what we need! :D
    if (name === 'transferFrom') {
        console.log(`New 'From' account selected: ${value}`)
        this.setState({
            [name]: value,
            currentAccount: value
        })

    } else {
        this.setState({
            [name]: value,
        })
    }
}


// Handles all click events for all components, controlling:
// - view changes
// - current account changes
// - account renaming & deletion
// - account deposits & withdrawals
// - account sorting (by balance or name)
clickHandler = event => {
    
    // === Create account button in CreateAccount card was clicked
    // Ensure that account name and balance are sensible,
    // and disallow duplicate account names
    const newAccountName = this.state.accountNameInput
    const newAccountBalance = parseFloat(this.state.startingBalanceInput)

    if (event.target.id === 'newAccountBtn' && 
                newAccountName !== '' &&
                newAccountBalance !== '' &&
                newAccountBalance >= 0) {

        // If the account name is not unique, setup error message and exit...
        const accountsArray = this.state.accountsController.getArrayRef()
        let duplicateAccountName = false
        
        accountsArray.forEach(account => {
            if (newAccountName === account.name) {
                duplicateAccountName = true
            }
        })
        if (duplicateAccountName) {
            this.setState({ errorMessage: `[ERROR] Duplicate account name: "${newAccountName}"` })
            return

        // ...otherwise create new account,
        // - make a copy of the AccountsController object in state, 
        // - add the new account to the copy,
        // - sort the copy based on the flags in state
        // - assign the modified copy to state via setState()
        // - go to 'dashboard' view,
        // - clear the user's input (name & balance of the account just created),
        // - set the new account as the 'current account' for 'dashboard' view,
        // - clear duplicate account name error message (in case it had been set)
        } else {
            this.setState(prevState => {
                const newAccount = new Account(newAccountBalance, newAccountName)
                let newAccountsController = new AccountsController()

                prevState.accountsController.getArrayRef().forEach(account => {
                    newAccountsController.addAccount(account)
                })
                newAccountsController.addAccount(newAccount)

                // sort array based on flags in state
                if (this.state.sortOrder.isSortedByBalance)
                    newAccountsController.sortAccounts(this.state.sortOrder.balanceSortDirection, 'balance')
                else
                    newAccountsController.sortAccounts(this.state.sortOrder.nameSortDirection, 'name')
            
                return {
                    accountsController: newAccountsController,
                    accountNameInput: '',
                    startingBalanceInput: 0,
                    errorMessage: <span>&nbsp;</span>,
                    currentAccount: newAccountName,
                    currentCard: ''
                }
            })
        }

    // === An item in the account list was clicked
    // Set the current account, which will be displayed in the header header, 
    // highlighted in the account list, AND target for deposit/withdrawal actions
    // in the deposit/withdrawal card, which will be activated
    } else if (event.target.id.includes('accountNameIndex') || event.target.id.includes('accountBlncIndex') ) {
        // NOTE:
        // The clickable elements items in 'dashboard' view's account list:
        // <td>'account name'</td> and <td>'account balance'</td>
        // have 'id' of EQUAL LENGTH, of the form 'accountNameIndex###', and 'accountBlncIndex###'
        // respectively, where ### equals that particular account's index in the array
        // of Account objects inside state.accountsController 
        
        // An account in the 'account list' has been clicked...
        // ...if the account clicked is NOT the current account, update state
        // Also: clear input fields & activate deposit/withdrawal card
        const arrayIndex = event.target.id.substring('accountNameIndex'.length)
        const newCurrentAccount = this.state.accountsController.getArrayRef()[arrayIndex].name
        if (newCurrentAccount !== this.state.currentAccount) {
            this.setState({
                currentAccount: newCurrentAccount,
                currentCard: 'DepositWithdraw',
                accountNameInput: '',
                startingBalanceInput: 0,
                renameAccountInput: '',
                depositWithdrawAmount: 0,
                transferAmount: 0,
                errorMessage: <span>&nbsp;</span>
            })
        }

    // === The create new account button in 'dashboard' view's account list was clicked
    // Make the CreateAccount card active
    // Clear all card input fields, in case the user is *directly* switching between 
    // different cards (i.e. not pressing 'Cancel'). Otherwise previous inputs persist!
    } else if (event.target.id === 'addAccBtn') {
       this.setState({ 
            currentCard: 'NewAccount',
            accountNameInput: '',
            startingBalanceInput: 0,
            renameAccountInput: '',
            depositWithdrawAmount: 0,
            transferAmount: 0,
            errorMessage: <span>&nbsp;</span>
        })

    // === A deposit/withdraw account button in 'dashboard' view's account list was clicked
    // Make the DepositWithdraw card active
    // NOTE: need to make the clicked account active as well, so that the card's actions
    // affect the correct account
    // Clear all card input fields, in case the user is *directly* switching between 
    // different cards (i.e. not pressing 'Cancel'). Otherwise previous inputs persist!
    } else if (event.currentTarget.id.includes('depositAccountIndex')) {
        const arrayIndex = event.currentTarget.id.substring('depositAccountIndex'.length)

        const newCurrentAccount = this.state.accountsController.getArrayRef()[arrayIndex].name

        this.setState({ 
            currentAccount: newCurrentAccount, 
            currentCard: 'DepositWithdraw',
            accountNameInput: '',
            startingBalanceInput: 0,
            renameAccountInput: '',
            depositWithdrawAmount: 0,
            transferAmount: 0,
            errorMessage: <span>&nbsp;</span>
        })

    // === A make transfer button in 'dashboard' view's account list was clicked
    // Make the Transfer card active *if* there are two or more accounts,
    // and make the current account selected in the 'From' dropdown
    // NOTE: need to make the clicked account active as well, so that the card's actions
    // affect the correct account
    // Clear all card input fields, in case the user is *directly* switching between 
    // different cards (i.e. not pressing 'Cancel'). Otherwise previous inputs persist!
    } else if (event.currentTarget.id.includes('transferAccountIndex')) {
    const arrayIndex = parseInt(event.currentTarget.id.substring('transferAccountIndex'.length))

    // Not enough accounts to make a transfer! Don't change anything, just
    // display an error message
    if (this.state.accountsController.getArrayRef().length < 2) {
        this.setState({ 
            errorMessage: '[ERROR] Need two or more accounts to make a transfer'
        })
        return    
    }

    // Activate the Transfer card
    // set the 'From' account to the account that was clicked, and
    // the 'To' account to the one after it...
    const newCurrentAccount = this.state.accountsController.getArrayRef()[arrayIndex].name
    
    let newToAccount = ''
    if (arrayIndex === this.state.accountsController.getArrayRef().length - 1)
        newToAccount = this.state.accountsController.getArrayRef()[0].name
    else
        newToAccount = this.state.accountsController.getArrayRef()[arrayIndex + 1].name

    this.setState({ 
        currentAccount: newCurrentAccount, 
        currentCard: 'Transfer',
        accountNameInput: '',
        startingBalanceInput: 0,
        renameAccountInput: '',
        depositWithdrawAmount: 0,
        transferAmount: 0,
        transferFrom: newCurrentAccount,
        transferTo: newToAccount,
        errorMessage: <span>&nbsp;</span>
    })

// === A delete account button in 'dashboard' view's account list was clicked
    // Make the DeleteAccount card active
    // NOTE: need to make the clicked account active as well, so that the card's actions
    // affect the correct account
    // Clear all card input fields, in case the user is *directly* switching between 
    // different cards (i.e. not pressing 'Cancel'). Otherwise previous inputs persist!
    } else if (event.currentTarget.id.includes('delAccountIndex')) {
        const arrayIndex = event.currentTarget.id.substring('delAccountIndex'.length)

        const newCurrentAccount = this.state.accountsController.getArrayRef()[arrayIndex].name

        this.setState({ 
            currentAccount: newCurrentAccount, 
            currentCard: 'DeleteAccount',
            accountNameInput: '',
            startingBalanceInput: 0,
            renameAccountInput: '',
            depositWithdrawAmount: 0,
            transferAmount: 0,
            errorMessage: <span>&nbsp;</span>
        })

    // === Rename account name button in 'dashboard' view's account list was clicked
    // Make the RenameAccount card active
    // NOTE: need to make the clicked account active as well, so that the card's actions
    // affect the correct account
    } else if (event.currentTarget.id.includes('renameAccountIndex')) {
        const arrayIndex = event.currentTarget.id.substring('renameAccountIndex'.length)

        const newCurrentAccount = this.state.accountsController.getArrayRef()[arrayIndex].name

        this.setState({ 
            currentAccount: newCurrentAccount, 
            currentCard: 'RenameAccount',
            accountNameInput: '',
            startingBalanceInput: 0,
            renameAccountInput: '',
            depositWithdrawAmount: 0,
            transferAmount: 0,
            errorMessage: <span>&nbsp;</span>
        })

    // === Rename account button in RenameAccount was clicked
    // Rename the current/clicked account, and re-sort based on flags in state
    // Update the state 
    // Clear any user input, and deactivate the card
    } else if (event.target.id === 'renameAccountBtn') {
    const accountsArray = this.state.accountsController.getArrayRef()
    const currentAccountName = this.state.currentAccount

    let newAccountName = this.state.renameAccountInput

    if (newAccountName !== null && newAccountName !== '' ) {
        // The new name is not null or empty, make sure it's unique...
        let duplicateAccountName = false
        accountsArray.forEach(account => {
            if (newAccountName === account.name) {
                duplicateAccountName = true
            }
        })
        if (duplicateAccountName) {
            // Display an error mesage for the user...
            this.setState({
                currentCard: '',
                errorMessage: `[ERROR] Duplicate account name: "${newAccountName}"`
            })
            return
        } else {
            this.setState(prevState => {
                // - make a copy of the AccountsController object referenced in state.accountsController, 
                // - rename the account in the copy,
                // - re-sort the copy,
                // - assign the modified copy to state.accountsController via setState()
                // Update the state
                let newAccountsController = new AccountsController()

                prevState.accountsController.getArrayRef().forEach(account => {
                    newAccountsController.addAccount(account)
                })

                newAccountsController.renameAccount(currentAccountName, newAccountName)

                if (this.state.sortOrder.isSortedByBalance)
                    newAccountsController.sortAccounts(this.state.sortOrder.balanceSortDirection, 'balance')
                else
                    newAccountsController.sortAccounts(this.state.sortOrder.nameSortDirection, 'name')

                return { 
                    accountsController: newAccountsController, 
                    currentAccount: newAccountName,
                    renameAccountInput: '',
                    currentCard: ''
                 }
            })
        }
    }

    // === Delete account button in DeleteAccount was clicked
    // Delete the current account (since it's already been set as the target for deletion)
    // Update the state
    // Deactivate the card
    } else if (event.target.id === 'deleteAccountBtn') {
        const accountsArray = this.state.accountsController.getArrayRef()
        const currentAccountName = this.state.currentAccount

        this.setState(prevState => {
            // - make a copy of the AccountsController object referenced in state.accountsController, 
            // - delete the account from the AccountsController copy,
            // - assign the modified copy to state.accountsController via setState()
            let newAccountsController = new AccountsController()

            accountsArray.forEach(account => {
                newAccountsController.addAccount(account)
            })

            newAccountsController.removeAccount(currentAccountName)

            let newCurrentAccount

            // if the deleted account was the *last* account, set the current account to '', otherwise,
            // otherwise there is no change in current account after deletion (whatever was current,
            // remains current)
            if (accountsArray.length === 1) {
                newCurrentAccount = ''
            } else {
                newCurrentAccount = newAccountsController.getArrayRef()[0].name
            }
            return { 
                accountsController: newAccountsController, 
                currentAccount: newCurrentAccount, 
                currentCard: ''
            }
        })

    // === Deposit button was clicked
    // Make a deposit in the current account, re-sort accounts, then deactivate the card
    } else if (event.target.id === 'depositBtn') {

        // obtain the amount entered and make sure it's reasonable
        const amount = +(parseFloat(this.state.depositWithdrawAmount).toFixed(2))
        if (amount <= 0 || amount === '') {
        this.setState({ depositWithdrawAmount: 0 })
            return
        }
        
        this.setState(prevState => {
            // - make a copy of the AccountsController object in state, 
            // - make the deposit in the appropriate account of the copy,
            // - re-sort the copy based on the flags in state
            // - assign the modified copy to state via setState()
            // - clear the user's input for the deposit amount
            // - deactivate the DepositWithdraw card
            let newAccountsController = new AccountsController()

            prevState.accountsController.getArrayRef().forEach(account => {
                newAccountsController.addAccount(account)
            })

            newAccountsController.getArrayRef().forEach(account => {
                if (account.name === prevState.currentAccount) {
                    account.deposit(amount)
                }
            })

            if (this.state.sortOrder.isSortedByBalance)
                newAccountsController.sortAccounts(this.state.sortOrder.balanceSortDirection, 'balance')
            else
                newAccountsController.sortAccounts(this.state.sortOrder.nameSortDirection, 'name')

            return { 
                accountsController: newAccountsController,
                depositWithdrawAmount: 0,
                currentCard: ''
             }
        })

    // === Withdrawal button was clicked
    // Make a withdrawal from the current account, *if* sufficient funds exist,
    // then deactivate the card
    } else if (event.target.id === 'withdrawBtn') {

        // obtain the amount entered and make sure it's reasonable
        const amount = +(parseFloat(this.state.depositWithdrawAmount).toFixed(2))
        if (amount <= 0 || amount === '') {
            this.setState({ depositWithdrawAmount: 0 })
                return
        }
    
        this.setState(prevState => {
            // - make a copy of the AccountsController object in state, 
            // - make the withdrawal from the appropriate account of the copy
            //   *if* sufficient funds exist
            // - re-sort the copy based on the flags in state
            // - assign the modified copy to state via setState()
            // - clear the user's input for the withdrawal amount
            // - deactivate the DepositWithdraw card
            let newAccountsController = new AccountsController()

            prevState.accountsController.getArrayRef().forEach(account => {
                newAccountsController.addAccount(account)
            })

            let errorMessageNSF = <span>&nbsp;</span>

            newAccountsController.getArrayRef().forEach(account => {
                if (account.name === prevState.currentAccount) {
                    if (amount <= account.balance) {
                        account.withdraw(amount)
                    } else {
                        errorMessageNSF = `[ERROR] Insufficient funds to withdraw ${amount} from "${prevState.currentAccount}"`
                    }
                }
            })

            if (this.state.sortOrder.isSortedByBalance)
                newAccountsController.sortAccounts(this.state.sortOrder.balanceSortDirection, 'balance')
            else
                newAccountsController.sortAccounts(this.state.sortOrder.nameSortDirection, 'name')

            return { 
                accountsController: newAccountsController,
                depositWithdrawAmount: 0,
                currentCard: '',
                errorMessage: errorMessageNSF
             }
        })

    // === Transfer button was clicked
    // Make a deposit in the current account, re-sort accounts, then deactivate the card
    } else if (event.target.id === 'transferBtn') {
        console.log(`need to transfer ${this.state.transferAmount}
        from ${this.state.transferFrom} to ${this.state.transferTo}`)
        // return

        // obtain the amount entered and make sure it's reasonable
        const amount = +(parseFloat(this.state.transferAmount).toFixed(2))
        if (amount <= 0 || amount === '') {
            this.setState({ transferAmount: 0 })
                return
        }
    
        this.setState(prevState => {
            // - make a copy of the AccountsController object in state,
            // - make a withdrawal from the appropriate 'From' account of the copy
            //   *if* sufficient funds exist
            // - make a deposit in the appropriate 'To' account of the copy
            // - re-sort the copy based on the flags in state
            // - assign the modified copy to state via setState()
            // - clear the user's input for the transfer amount
            // - deactivate the Transfer card
            let newAccountsController = new AccountsController()

            prevState.accountsController.getArrayRef().forEach(account => {
                newAccountsController.addAccount(account)
            })

            let errorMessageNSF = <span>&nbsp;</span>

            newAccountsController.getArrayRef().forEach(account => {
                // Locate the account 'From' which the transfer is to be done
                if (account.name === prevState.transferFrom) {

                    // verify the 'From' account has sufficient funds...
                    if (amount <= account.balance) {
                        account.withdraw(amount)
                        
                        //make the deposit in the 'To' account
                        newAccountsController.getArrayRef().forEach(account => {
                            // Locate the acount 'To' which the transfer is to be done
                            if (account.name === prevState.transferTo)
                                    account.deposit(amount)
                        })

                    } else {
                        errorMessageNSF = `[ERROR] Insufficient funds to transfer $${amount} from "${prevState.transferFrom}"`
                    }
                }
            })

            if (this.state.sortOrder.isSortedByBalance)
                newAccountsController.sortAccounts(this.state.sortOrder.balanceSortDirection, 'balance')
            else
                newAccountsController.sortAccounts(this.state.sortOrder.nameSortDirection, 'name')

            return { 
                accountsController: newAccountsController,
                transferAmount: 0,
                currentCard: '',
                errorMessage: errorMessageNSF
             }
        })

    // === Cancel button in RenameAccount card clicked
    // Set currentCard to hide the card, and clear any input
    } else if (event.target.id === 'cancelNewAccount') {
    this.setState({
        currentCard: '',
        accountNameInput: '',
        startingBalanceInput: 0
    })

    // === Cancel button in RenameAccount card clicked
    // Set currentCard to hide the card, and clear any input
    } else if (event.target.id === 'cancelRenameAccount') {
        this.setState({
            currentCard: '',
            renameAccountInput: ''
        })

    // === Cancel button in Transfer card clicked
    // Set currentCard to hide the card, and clear any input
    } else if (event.target.id === 'cancelTransfer') {
        this.setState({
            currentCard: '',
            transferAmount: 0
        })

    // === Cancel button in DepositWithdrawal card clicked
    // Set currentCard to hide the card, and clear any input
    } else if (event.target.id === 'cancelDepositWithdraw') {
    this.setState({
        currentCard: '',
        depositWithdrawAmount: 0
    })

// === Cancel button in DeleteAccount card clicked
    // Set currentCard to hide the card
    } else if (event.target.id === 'cancelDeleteAccount') {
        this.setState({
            currentCard: ''
        })

    // === Sort by balance button in accounts overview clicked
    // NOTE: 'event.currentTarget' is needed when dealing with click events on svg/images!!
    } else if (event.currentTarget.id === 'sortByBalance') {
        
        this.setState(prevState => {
           
            let newBalanceSortDirection

            // If sorting by balance was already enabled, then we just need to toggle between ascending & descending,
            // and preserve whatever name sorting direction was in effect
            if (prevState.sortOrder.isSortedByBalance) {
                newBalanceSortDirection = (prevState.sortOrder.balanceSortDirection === 'ascending' ? 'descending' : 'ascending')

            // Otherwise, need to:
            // - enable sorting by balance
            // - preserve whatever balance & name sorting directions were in effect
            } else {
                newBalanceSortDirection = prevState.sortOrder.balanceSortDirection
            }

            // Sort the accounts
            let newAccountsController = new AccountsController()

            prevState.accountsController.getArrayRef().forEach(account => {
                newAccountsController.addAccount(account)
            })

            newAccountsController.sortAccounts(newBalanceSortDirection, 'balance')

            // setup the new sorting state
            const newSortOrder = {
                isSortedByBalance: true,
                balanceSortDirection: newBalanceSortDirection,
                nameSortDirection: prevState.sortOrder.nameSortDirection    
            }

            return { 
                    accountsController: newAccountsController,
                    sortOrder : newSortOrder
                   }
        
        })
 
    // === Sort by name button in accounts overview clicked
    // NOTE: 'event.currentTarget' is needed when dealing with click events on svg/images!!
    } else if (event.currentTarget.id === 'sortByName') {
        console.log('OK, we want to sort by name')
        
        this.setState(prevState => {
       
            let newNameSortDirection

            // If sorting by name was already enabled, then we just need to toggle between ascending & descending,
            // and preserve whatever balance sorting direction was in effect
            if (!prevState.sortOrder.isSortedByBalance) {
                newNameSortDirection = (prevState.sortOrder.nameSortDirection === 'ascending' ? 'descending' : 'ascending')

            // Otherwise, need to:
            // - enable sorting by name
            // - preserve whatever balance & name sorting directions were in effect
            } else {
                newNameSortDirection = prevState.sortOrder.nameSortDirection
            }

            // Sort the accounts
            let newAccountsController = new AccountsController()

            prevState.accountsController.getArrayRef().forEach(account => {
                newAccountsController.addAccount(account)
            })

            newAccountsController.sortAccounts(newNameSortDirection, 'name')

            // setup the new sorting state
            const newSortOrder = {
                isSortedByBalance: false,
                balanceSortDirection: prevState.sortOrder.balanceSortDirection,
                nameSortDirection: newNameSortDirection    
            }

            return { 
                    accountsController: newAccountsController,
                    sortOrder : newSortOrder
                   }
        })
    }
}

            
    render() {
        return (
            <div id='BankAccountsWrapper'>
                <Header
                    currentAccount={this.state.currentAccount} 
                    accountsArray={this.state.accountsController.getArrayRef()}
                    accountsController={this.state.accountsController}
                />
                <Body 
                    accountname={this.state.accountNameInput}
                    accountbalance={this.state.startingBalanceInput}
                    renameaccountinput={this.state.renameAccountInput}
                    clickHandler={this.clickHandler}
                    currentAccount={this.state.currentAccount}
                    sortOrder={this.state.sortOrder}
                    currentCard={this.state.currentCard}
                    accountsArray={this.state.accountsController.getArrayRef()}
                    chgBalInput={this.state.depositWithdrawAmount}
                    transferAmount={this.state.transferAmount}
                    transferFrom={this.state.transferFrom}
                    transferTo={this.state.transferTo}
                    onChange={this.changeHandler}
                />
                <h5 className='errormessage'>{this.state.errorMessage}</h5>
            </div>
        )
    }
}
export default BankAccounts