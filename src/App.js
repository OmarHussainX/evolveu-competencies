import React, { Component } from 'react'

// ----- font-awesome ---------------------------
import { library } from '@fortawesome/fontawesome-svg-core'

// AppNavBar icons
import { faHome, faCalculator, faHandHoldingUsd, faDollarSign, faServer } from '@fortawesome/free-solid-svg-icons'
// Calculator icons
import { faPlus, faMinus, faTimes, faDivide, faEquals, faSurprise } from '@fortawesome/free-solid-svg-icons'
// AccountsList icons
import { faEdit, faBackspace, faSortAmountDown, faSortAmountUp, faSortAlphaDown, faSortAlphaUp, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

// DataStructures icons
import { faPlusCircle, faMinusCircle, faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
//-----------------------------------------------


import './App.css'
import AppNavBar from './components/AppNavBar'
import ReactGreeter from './components/ReactGreeter'
import Calculator from './components/Calculator'
import OneAccount from './components/OneAccount'
import BankAccounts from './components/BankAccounts'
import Cities from './components/Cities'
import DataStructures from './components/DataStructures'


// ----- font-awesome ---------------------------
// build library of imported SVG for re-use in all child components
library.add(faHome, faCalculator, faHandHoldingUsd, faDollarSign, faServer,
    faPlus, faMinus, faTimes, faDivide, faEquals, faSurprise,
    faEdit, faBackspace, faSortAmountDown, faSortAmountUp, faSortAlphaDown, faSortAlphaUp, faExchangeAlt,
    faPlusCircle, faMinusCircle, faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight, faLongArrowAltRight)
//-----------------------------------------------


class App extends Component {

    // 'activeApp' is used to determine which component is active, and then
    // rendered as a consequence
    constructor() {
        super()
        this.state = {
            activeApp: 'cities'
        }
    }


    // NOTE: THIS ONLY WORKED VIA `event.currentTarget` (NOT 'event.target')
    //         https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
    //
    // NOTE: LOOK INTO React's SYNTHETIC EVENT OBJECT, AND 'event.nativeEvent'?
    //         https://reactjs.org/docs/events.html
    //         (looked into it, didn't make much headway with 'event.nativeEvent'...)

    // - Show/hide components based on the <button> that was clicked
    // - Only one component is visible at any given time
    //
    // NOTE: Using arrow notation ensures 'this' is bound correctly - no need
    // for explicit binding in constructor!
    clickHandler = event => {
        this.setState({ activeApp: event.currentTarget.name })
    }


    render() {

        const { activeApp } = this.state

        return (
            <div className="App">

                {/* render navbar with controls to activate Apps */}
                <AppNavBar clickHandler={this.clickHandler} activeApp={this.state.activeApp} />

                {/* render active App */}
                <div className="App-body">
                    {activeApp === 'home' && <ReactGreeter />}
                    {activeApp === 'calc' && <Calculator />}
                    {activeApp === 'oneaccount' && <OneAccount />}
                    {activeApp === 'bankaccounts' && <BankAccounts />}
                    {activeApp === 'cities' && <Cities />}
                    {activeApp === 'datastructures' && <DataStructures />}
                </div>
            </div>
        )
    }
}

export default App