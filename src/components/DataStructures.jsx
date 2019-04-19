import React, { Component } from "react"
import './css/DataStructures.css'
import MoviesListDisplay from './DataStructures/MoviesListDisplay'
import MoviesQueueDisplay from './DataStructures/MoviesQueueDisplay'

// Data set to use if a pre-filled data structure is selected
import movieData from './DataStructures/movies.json'

// Set to 'true' to enable output of debug messages in console
const DEBUG_MSG = false




class DataStructures extends Component {

    // State contains:
    // a) The user's selected data structure (which may optionally
    //     be pre-filled with test data), one of:
    //    - Linked List
    //    - Queue (FIFO)
    //    - Stack (LIFO)
    // b) A reference to the data set to be stored in the
    //    selected data structure (if any)
    constructor() {
        super()
        this.state = {
            dataSet: null,
            dataStructureChoice: '',
        }
    }

    
    // When a selection is made, updates state with:
    // - the data structure selected
    // - reference to the data set to be displayed (if any)
    changeHandler = event => {
        const { name, value } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- DataStructures changeHandler()\n${name}: ${value}`)

        // If an 'empty' data structure has been selected, save reference
        // to an empty array in state, otherwise save reference to test data
        const selectedData = value.includes('-empty') ? [] : movieData

        this.setState({
            dataSet: selectedData,
            [name]: value
        })
    }

    
    render() {
        const { dataSet, dataStructureChoice } = this.state

        return (
            <div id='DataStructures'>
                <div className='dataControlsArea'>
                    <select
                        className='select-style'
                        value={dataStructureChoice}
                        onChange={this.changeHandler}
                        name="dataStructureChoice">
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
                </div>

                    {/* See NOTE below on why these condtional rendering checks should not be combined! */}
                    {dataStructureChoice === 'llist' && <MoviesListDisplay dataSet={dataSet}/>}
                    {dataStructureChoice === 'llist-empty' && <MoviesListDisplay dataSet={dataSet}/>}
                    {dataStructureChoice === 'queue' && <MoviesQueueDisplay dataSet={dataSet}/>}
                    {dataStructureChoice === 'queue-empty' && <MoviesQueueDisplay dataSet={dataSet}/>}
            </div>
        )
    }
}

export default DataStructures




/*
NOTE: Combining these two conditionals into one is NOT a good idea, since we want the constructor for <MoviesListDisplay> to be called _each_ time one of the conditions evaluates to true.

When combined, e.g.:
{(dataStructureChoice === 'llist' || dataStructureChoice === 'llist-empty') && <MoviesListDisplay dataSet={this.state.dataSet}/>}

<MoviesListDisplay>'s constructor() only gets called the first time one of the conditions is true. 


EXPLANATION:
Let us assume we have the following conditional rendering logic:
(A || B) && <ChildComponent>

Assume that initially A is true, B is false - <ChildComponent>'s constructor() is called due to A, and then it is render()'ed.

Now assume A becomes false, and B is true - <ChildComponent> will be re-render()'ed due to B, but it's constructor() will not be called, because <ChildComponent> already exists!

So, if there is some important setup in the constructor of <ChildComponent> which differs, or is somehow related to A & B, this will cause an issue.

The solution is simple: keep the conditional checks separate, so that A and B cause their own instances of <ChildComponent> to be constructe()'ed and render()'ed.
*/