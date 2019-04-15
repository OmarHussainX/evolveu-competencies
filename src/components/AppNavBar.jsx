import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/AppNavBar.css';


class AppNavBar extends Component {

    render(props) {

        return (
            <div>

                {/* Buttons used to change the active component  */}
                <header id='AppNavBar'>
                    <button onClick={this.props.clickHandler} name="home">
                        <FontAwesomeIcon
                            className={'button grow' +
                                (this.props.activeApp === 'home' ? ' selected' : '')}
                            icon='home'
                            size="2x" />
                    </button>
                    <button onClick={this.props.clickHandler} name="calc">
                        <FontAwesomeIcon
                            className={'button grow' +
                                (this.props.activeApp === 'calc' ? ' selected' : '')}
                            icon='calculator'
                            size="2x" />
                    </button>
                    <button onClick={this.props.clickHandler} name="oneaccount">
                        <FontAwesomeIcon
                            className={'button grow' +
                                (this.props.activeApp === 'oneaccount' ? ' selected' : '')}
                            icon='hand-holding-usd'
                            size="2x" />
                    </button>
                    <button onClick={this.props.clickHandler} name="bankaccounts">
                        <FontAwesomeIcon
                            className={'button grow' +
                                (this.props.activeApp === 'bankaccounts' ? ' selected' : '')}
                            icon='dollar-sign'
                            size="2x" />
                    </button>
                    <button onClick={this.props.clickHandler} name="datastructures">
                        <FontAwesomeIcon
                            className={'button grow' +
                                (this.props.activeApp === 'datastructures' ? ' selected' : '')}
                            icon='server'
                            size="2x" />
                    </button>
                </header>

            </div>
        )
    }
}

export default AppNavBar
