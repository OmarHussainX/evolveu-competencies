import React, {Component} from "react"
import { LinkedList } from '../components/js/LinkedList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/DataStructures.css'

class DataStructures extends Component {
    constructor() {
        super()
        this.state = {
            dataStructureChoice: '',
            movieTitle: '',
            movieGross: '',
        }
    }
    
    // Ensures state always contains the latest input for:
    // - data structure choice
    changeHandler = event => {
        const { name, value } = event.currentTarget
        console.log(`--- changeHandler() ---\n${name}: ${value}`)

            this.setState({
                [name]: value,
            })
    }

    clickHandler = event => {
        const { id } = event.currentTarget
        console.log(`--- '${id}' clicked ---`)
    }

    render() {
        return (
            <div id='DataStructures'>
                <select
                    className='select-style'
                    value={this.state.dataStructureChoice}
                    onChange={this.changeHandler}
                    name="dataStructureChoice"
                >
                    <option value='' disabled>Select a data structure</option>
                    <optgroup label="Pre-filled with test data">
                        <option value="llist">Linked list</option>
                        <option value="queue">Queue (FIFO)</option>
                        <option value="stack">Stack (LIFO)</option>
                    </optgroup>
                    <optgroup label="Empty (no pre-filled data)">
                        <option value="llist-empty">Linked list</option>
                        <option value="queue-empty">Queue (FIFO)</option>
                        <option value="stack-empty">Stack (LIFO)</option>
                    </optgroup>
                </select>   
                <label>
                    <input
                        type='text'
                        placeholder='Movie title'
                        name='movieTitle'
                        value={this.state.movieTitle}
                        onChange={this.changeHandler}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gross (in M)'
                        min="0"
                        step="0.01"
                        name="movieGross"
                        value={this.state.movieGross}
                        onChange={this.changeHandler}
                    />
                </label>
                <button id='insert' onClick={this.clickHandler}>
                    <FontAwesomeIcon icon='plus-circle' size="sm" style={{marginRight:'5px'}}></FontAwesomeIcon>
                    Insert
                </button>
                <div id='positionControlsWrapper'>
                    <button id='pos_first' onClick={this.clickHandler}>
                        <FontAwesomeIcon icon='angle-double-left' size="2x"></FontAwesomeIcon>
                    </button>
                    <button id='pos_prev' onClick={this.clickHandler}>
                        <FontAwesomeIcon icon='angle-left' size="2x"></FontAwesomeIcon>
                    </button>
                    <button id='pos_next' onClick={this.clickHandler}>
                        <FontAwesomeIcon icon='angle-right' size="2x"></FontAwesomeIcon>
                    </button>
                    <button id='pos_last' onClick={this.clickHandler}>
                        <FontAwesomeIcon icon='angle-double-right' size="2x"></FontAwesomeIcon>
                    </button>
                </div>
                <button id='delete' onClick={this.clickHandler} className='severe'>
                    <FontAwesomeIcon icon='minus-circle' size="sm" style={{marginRight:'5px'}}></FontAwesomeIcon>
                    Delete
                </button>
            </div>
        )
    }
}

export default DataStructures