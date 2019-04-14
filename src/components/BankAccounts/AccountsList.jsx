import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AccountsList extends Component {
    render(props) {
        
        // Make the 'New account' button more prominent if no accounts have been created yet
        const noAccounts = (this.props.currentAccount ? {} : {padding: '1em', fontSize: '1.2em'})

        // Setup account sorting controls - none shown if there are no accounts
        let accountsHeader = <tr><td colSpan="8"></td></tr>
        
        if (this.props.accountsArray.length) {
            accountsHeader =
            <tr className='accountsHeader'>
                <td
                ><button
                    id="sortByName"
                    className={(!this.props.sortOrder.isSortedByBalance ? 'active' : '')}
                    onClick={this.props.clickHandler}
                    >
                    Name&nbsp;<FontAwesomeIcon 
                        icon={(this.props.sortOrder.nameSortDirection === 'ascending' ? 'sort-alpha-down' : 'sort-alpha-up')}
                        size='lg'></FontAwesomeIcon>
                    </button></td>
                <td></td>
                <td className='balance'>
                    <button
                        id="sortByBalance"
                        className={(this.props.sortOrder.isSortedByBalance ? 'active' : '')}
                        onClick={this.props.clickHandler}
                        > 
                        Balance&nbsp;<FontAwesomeIcon 
                            icon={(this.props.sortOrder.balanceSortDirection === 'ascending' ? 'sort-amount-down' : 'sort-amount-up')}
                            size='lg'></FontAwesomeIcon>
                    </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        }
        
        const accountsData = this.props.accountsArray.map((item, index) => {
            const balance = item.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            return <tr 
                    key={'trAccountIndex' + index}
                    className={(index%2 ? 'shaded' : '' )}
                    >
                        <td><span 
                            id={'accountNameIndex' + index} 
                            key={'accountNameIndex' + index} 
                            onClick={this.props.clickHandler}
                            className={'accountListEntry' + (this.props.currentAccount === item.name ? ' active_account' : '')}
                            >{(item.name.length >= 13 ? item.name.substring(0,10)+'...' : item.name)} 

                        </span></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                        <td className='balance'><span 
                            id={'accountBlncIndex' + index} 
                            key={'accountBlncIndex' + index} 
                            onClick={this.props.clickHandler}
                            className='accountListEntry'
                            >{balance} 
                        </span></td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><button
                            id={'depositAccountIndex' + index} 
                            key={'depositAccountIndex' + index} 
                            onClick={this.props.clickHandler}
                            >
                            <FontAwesomeIcon icon='dollar-sign' size="xs"></FontAwesomeIcon>
                        </button></td>
                        <td><button
                            id={'transferAccountIndex' + index} 
                            key={'transferAccountIndex' + index} 
                            onClick={this.props.clickHandler}
                            >
                            <FontAwesomeIcon icon='exchange-alt' size="xs"></FontAwesomeIcon>
                        </button></td>
                        <td><button
                            id={'renameAccountIndex' + index} 
                            key={'renameAccountIndex' + index} 
                            onClick={this.props.clickHandler}
                            >
                            <FontAwesomeIcon icon='edit' size="xs"></FontAwesomeIcon>
                        </button></td>
                        <td><button
                            id={'delAccountIndex' + index} 
                            key={'delAccountIndex' + index} 
                            onClick={this.props.clickHandler}
                            className='severe'
                            >
                            <FontAwesomeIcon icon='backspace' size="xs"></FontAwesomeIcon>
                        </button></td>
                    </tr>
        })
  
        return (
            <div id="AccountsListWrapper">
                <button 
                    id="addAccBtn" 
                    onClick={this.props.clickHandler}
                    style={noAccounts}
                    >New account
                </button>
                <h4>
                {(this.props.currentAccount ? 'Accounts' : '')}
                </h4>

                <table id='accountsList'>
                    <tbody>
                        {accountsHeader}
                        {accountsData}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default AccountsList
