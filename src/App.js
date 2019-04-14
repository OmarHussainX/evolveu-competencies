import React, { Component } from 'react';

// ----- font-awesome ---------------------------
import { library } from '@fortawesome/fontawesome-svg-core'

// AppNavBar icons
import { faHome, faCalculator, faHandHoldingUsd, faDollarSign } from '@fortawesome/free-solid-svg-icons'
// Calculator icons
import { faPlus, faMinus, faTimes, faDivide, faEquals, faSurprise } from '@fortawesome/free-solid-svg-icons'
// AccountsList icons
import {faEdit, faBackspace, faSortAmountDown, faSortAmountUp, faSortAlphaDown, faSortAlphaUp, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
//-----------------------------------------------

import './App.css';
import AppNavBar from './components/AppNavBar'
import ReactGreeter from './components/ReactGreeter'
import Calculator from './components/Calculator'
import OneAccount from './components/OneAccount'
import BankAccounts from './components/BankAccounts'


// build library of imported SVG for re-use in all child components (How to re-use library!?)
library.add(faHome, faCalculator, faHandHoldingUsd, faDollarSign, 
    faPlus, faMinus, faTimes, faDivide, faEquals, faSurprise, 
    faEdit, faBackspace, faSortAmountDown, faSortAmountUp, faSortAlphaDown, faSortAlphaUp, faExchangeAlt)


class App extends Component {
    
    // 'activeApp' is used to determine which component is active, and then
    // rendered as a consequence
    constructor() {
        super()
        this.state = {
            activeApp: 'bankaccounts'
		}
	}
	

    // NOTE 1: THIS ONLY WORKED VIA `event.currentTarget` (NOT 'event.target')
    //         https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
    // NOTE 2: LOOK INTO React's SYNTHETIC EVENT OBJECT, AND 'event.nativeEvent'?
    //         https://reactjs.org/docs/events.html
    //         (looked into it, didn't make much headway with 'event.nativeEvent'...)

    // - Show/hide components based on the <button> that was clicked
    // - Only one component is visible at any given time
    //
    // NOTE: Using arrow notation ensures 'this' is bound correctly - no need
    // for explicit binding in constructor!
	clickHandler = event => {
        
        // get the 'name' of the clicked <button>
        const {name} = event.currentTarget
        
        switch(name) {
            case 'home':
            this.setState({activeApp: 'home'})
            break

            case 'calc':
            this.setState({activeApp: 'calc'})
            break

            case 'oneaccount':
            this.setState({activeApp: 'oneaccount'})
            break

            case 'bankaccounts':
            this.setState({activeApp: 'bankaccounts'})
            break

            default:
            console.log(`default switch case - this.state.activeApp = ${this.state.activeApp}`)
            break
        }
	}


	render() {

        // Create a string containing the component to be shown, based on the current state
        let activeAppTxt=''
        switch(this.state.activeApp) {
            case 'home':
            activeAppTxt = <ReactGreeter />
            break

            case 'calc':
            activeAppTxt = <Calculator />
            break

            case 'oneaccount':
            activeAppTxt = <OneAccount />
            break

            case 'bankaccounts':
            activeAppTxt = <BankAccounts />
            break

            default:
            activeAppTxt = <h1>Something has gone wrong! :(</h1>
            console.log(`default switch case - this.state.activeApp = ${this.state.activeApp}`)
            break
        }

		return (
            /* - Render header: buttons used to set the active component
			   - Render whichever component is active */
            
            <div className="App">
            
                <AppNavBar clickHandler={this.clickHandler} activeApp={this.state.activeApp} />
            
                <div className="App-body">{activeAppTxt}</div>
            
            </div>
        )
    }
}

export default App;