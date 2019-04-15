import React, {Component} from "react"
import { LinkedList } from '../components/js/LinkedList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import './css/DataStructures.css'

class DataStructures extends Component {
    constructor() {
        super()
        this.state = {
            dataStructureChoice: '',
        }
    }
    
    // Ensures state always contains the latest input for:
    // - data structure choice
    changeHandler = event => {
        const { name, value } = event.target
        console.log(`Selection ${name}: ${value}`)

            this.setState({
                [name]: value,
            })
    }

    render() {
        return (
            <div id='DataStructures'>
                <select
                    // className='select-style'
                    value={this.state.dataStructureChoice}
                    onChange={this.changeHandler}
                    name="dataStructureChoice"
                >
                    <option value='' disabled>Select a data structure</option>
                    <optgroup label="Empty (no pre-filled data)">
                        <option value="llist-empty">Linked List</option>
                        <option value="queue-empty">Queue (FIFO)</option>
                        <option value="stack-empty">Stack (LIFO)</option>
                    </optgroup>
                    <optgroup label="Pre-filled with test data">
                        <option value="llist">Linked List</option>
                        <option value="queue">Queue (FIFO)</option>
                        <option value="stack">Stack (LIFO)</option>
                    </optgroup>
                </select>   


{/* 
                <input 
                    type="number"
                    className='basic'
                    value={this.state.argument1}
                    name="argument1"
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
                <input 
                    type="number"
                    className='basic'
                    value={this.state.argument2}
                    name="argument2"
                    onChange={this.changeHandler}
                />
                <h2>
                    {this.state.argument1} {this.state.mathOperator} {this.state.argument2} = {(+this.state.result).toFixed(2)}
                </h2>
*/}
            </div>
        )
    }
}

export default DataStructures