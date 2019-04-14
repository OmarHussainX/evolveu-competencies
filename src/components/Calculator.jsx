import React, {Component} from "react"
import { sum, difference, multiply, divide } from './js/math'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Calculator.css';

class Calculator extends Component {
    constructor() {
        super()
        this.state = {
            arg1: '0',
            arg2: '0',
            mathOperator: '+',
            result: '0'
        }
    }
    
    changeHandler = event => {
        // obtain info on event from 'target' object
        const {name, value, type, checked} = event.target

        console.log(`----calc event type: ${type}----`)

        // update state based on input received
        type === 'checkbox' ? this.setState({ [name] : checked }) : this.setState({ [name] : value })

        // calculate result (is it smart to do this everytime there's a change event?)
        // NOTE: It is CRITICAL to check which input ('arg1' or 'arg2') was just updated via input,
        //       and then use that value in the calculation, with the other argument alone
        //       being obtained from state.
        //       Even though state has ostensibly been updated at this point, cannot just
        //       pull both arguments from state and calculate (if this *is* done, the calculated
        //       result appears to lag a bit behind new inputs, by 1 step) SEE:
        //          "due to the asynchronous nature of setState, you have no guarantee you
        //           will have immediate access to this.state after setState has been called"
        //       https://stackoverflow.com/questions/41896878/react-setstate-getstate-and-asynchronous
        const arg1 = name === 'arg1' ? value : this.state.arg1
        const arg2 = name === 'arg2' ? value : this.state.arg2
        const mathOperator = name === 'mathOperator' ? value : this.state.mathOperator

        let tempResult = ''
        switch(mathOperator) {
            case '+':
            tempResult = sum(parseFloat(arg1), parseFloat(arg2))
            break
            
            case '-':
            tempResult = difference(parseFloat(arg1), parseFloat(arg2))
            break
            
            case 'x':
            tempResult = multiply(parseFloat(arg1), parseFloat(arg2))
            break
            
            case '/':
            tempResult = divide(parseFloat(arg1), parseFloat(arg2))
            break
            
            default:
            tempResult = undefined
            break
            
        }
        this.setState({ result : tempResult })
    }

    render() {

        // TODO: Create a string containing the result to be shown, based on the current state
        // let resultTxt=''

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
                    value={this.state.arg1}
                    name="arg1"
                    onChange={this.changeHandler}
                />
                <span className='inputspacer'></span>
                <input 
                    type="number"
                    className='basic'
                    value={this.state.arg2}
                    name="arg2"
                    onChange={this.changeHandler}
                />
                
                <ul>
                    <li>
                        <input type="radio" id="add" name="mathOperator" value="+"
                            checked={this.state.mathOperator === "+"}
                            onChange={this.changeHandler} />
                        <label htmlFor="add">
                            <FontAwesomeIcon className="grow" icon='plus'size="1x" />
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="subtract" name="mathOperator" value="-"
                            checked={this.state.mathOperator === "-"}
                            onChange={this.changeHandler} />
                        <label htmlFor="subtract">
                            <FontAwesomeIcon className="grow" icon='minus' size="1x" />
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="multiply" name="mathOperator" value="x"
                            checked={this.state.mathOperator === "x"}
                            onChange={this.changeHandler} />
                        <label htmlFor="multiply">
                            <FontAwesomeIcon className="grow" icon='times' size="1x" />
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="divide" name="mathOperator" value="/"
                            checked={this.state.mathOperator === "/"}
                            onChange={this.changeHandler} />
                        <label htmlFor="divide">
                            <FontAwesomeIcon className="grow" icon='divide' size="1x" />
                        </label>
                    </li>
                </ul>

                <h2>{this.state.arg1} {this.state.mathOperator} {this.state.arg2} = {(+this.state.result).toFixed(2)}</h2>

                {/* <div class="container">

                    <h2>{this.state.arg1} + {this.state.arg2} = {this.state.result}</h2>

                    <ul>
                        <li>
                            <input type="radio" id="f-option" name="selector" />
                            <label for="f-option"><FontAwesomeIcon icon={faPlus} size="1x" /></label>
                            <div class="check"></div>
                        </li>
                        <li>
                            <input type="radio" id="s-option" name="selector" />
                            <label for="s-option"><FontAwesomeIcon icon={faMinus} size="1x" /></label>
                            <div class="check"><div class="inside"></div></div>
                        </li>
                        <li>
                            <input type="radio" id="t-option" name="selector" />
                            <label for="t-option"><FontAwesomeIcon icon={faTimes} size="1x" /></label>
                            <div class="check"><div class="inside"></div></div>
                        </li>
                        <li>
                            <input type="radio" id="u-option" name="selector" />
                            <label for="u-option"><FontAwesomeIcon icon={faDivide} size="1x" /></label>
                            <div class="check"><div class="inside"></div></div>
                        </li>
                    </ul>
                </div> */}

            </div>
        )
    }
}

export default Calculator