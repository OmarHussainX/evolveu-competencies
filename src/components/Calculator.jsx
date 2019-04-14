import React, {Component} from "react"
import { sum, difference, multiply, divide } from './js/math'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Calculator.css';

class Calculator extends Component {
    constructor() {
        super()
        this.state = {
            argument1: '0',
            argument2: '0',
            mathOperator: '+',
            result: '0'
        }
    }
    
    // Any time there is an input event:
    // - check the inputs and update state
    // - calculate the result of the expression and update state
    changeHandler = event => {
        // obtain data on event from 'target' object
        const {name, value, type, checked} = event.target

        // Update state based on input received
        // (NOTE: not using 'checkbox' inputs anymore, but leaving the special
        // handling for checkboxes in for future reference...)
        type === 'checkbox' ? this.setState({ [name] : checked }) : this.setState({ [name] : value })

        // calculate result
        //
        // NOTE: It is CRITICAL to check which input ('argument1' or 'argument2') was just updated via input,
        //       and then use that value in the calculation, with the other argument alone
        //       being obtained from state.
        //       Even though state has ostensibly been updated at this point, cannot just
        //       pull both arguments from state and calculate (if this *is* done, the calculated
        //       result appears to lag a bit behind new inputs, by 1 step) SEE:
        //          "due to the asynchronous nature of setState, you have no guarantee you
        //           will have immediate access to this.state after setState has been called"
        //       https://stackoverflow.com/questions/41896878/react-setstate-getstate-and-asynchronous
        const argument1 = name === 'argument1' ? value : this.state.argument1
        const argument2 = name === 'argument2' ? value : this.state.argument2
        const mathOperator = name === 'mathOperator' ? value : this.state.mathOperator

        let tempResult = ''
        switch(mathOperator) {
            case '+':
            tempResult = sum(parseFloat(argument1), parseFloat(argument2))
            break
            
            case '-':
            tempResult = difference(parseFloat(argument1), parseFloat(argument2))
            break
            
            case 'x':
            tempResult = multiply(parseFloat(argument1), parseFloat(argument2))
            break
            
            case '/':
            tempResult = divide(parseFloat(argument1), parseFloat(argument2))
            break
            
            default:
            tempResult = undefined
            break
        }
        this.setState({ result : tempResult })
    }

    render() {
        return (
            <div id='Calculator'>
                <h1>
                    A <em>calculator!?&nbsp;&nbsp;</em> 
                    <FontAwesomeIcon icon='surprise' size="1x" />
                </h1>
                <br />
                <input 
                    type="number"
                    className='basic'
                    value={this.state.argument1}
                    name="argument1"
                    onChange={this.changeHandler}
                />
                <span className='inputspacer'></span>
                <input 
                    type="number"
                    className='basic'
                    value={this.state.argument2}
                    name="argument2"
                    onChange={this.changeHandler}
                />
                
                <ul>
                    <li>
                        <input type="radio" name="mathOperator" id="add" value="+"
                            checked={this.state.mathOperator === "+"}
                            onChange={this.changeHandler} />
                        <label htmlFor="add">
                            <FontAwesomeIcon className="grow" icon='plus'size="1x" />
                        </label>
                    </li>
                    <li>
                        <input type="radio" name="mathOperator" id="subtract" value="-"
                            checked={this.state.mathOperator === "-"}
                            onChange={this.changeHandler} />
                        <label htmlFor="subtract">
                            <FontAwesomeIcon className="grow" icon='minus' size="1x" />
                        </label>
                    </li>
                    <li>
                        <input type="radio" name="mathOperator" id="multiply" value="x"
                            checked={this.state.mathOperator === "x"}
                            onChange={this.changeHandler} />
                        <label htmlFor="multiply">
                            <FontAwesomeIcon className="grow" icon='times' size="1x" />
                        </label>
                    </li>
                    <li>
                        <input type="radio" name="mathOperator" id="divide" value="/"
                            checked={this.state.mathOperator === "/"}
                            onChange={this.changeHandler} />
                        <label htmlFor="divide">
                            <FontAwesomeIcon className="grow" icon='divide' size="1x" />
                        </label>
                    </li>
                </ul>

                <h2>{this.state.argument1} {this.state.mathOperator} {this.state.argument2} = {(+this.state.result).toFixed(2)}</h2>

            </div>
        )
    }
}

export default Calculator