import React, { Component } from "react"
import { Movie } from '../components/js/MoviesList'
import './css/DataStructures.css'
import MoviesListDisplay from './MoviesListDisplay'


// Set to 'true' to enable output of debug messages in console
const DEBUG_MSG = false


// Data set to use if a pre-filled data structure is selected
const movieData = [
    new Movie('Captain Marvel', 377.91),
    new Movie('Spider-Man: Into The Spider-Verse', 190.24),
    new Movie('Venom', 213.52),
    new Movie('Ant-Man and the Wasp', 216.65),
    new Movie('Deadpool 2', 318.49),
    new Movie('Avengers: Infinity War', 678.82),
    new Movie('Black Panther', 700.06),
    new Movie('Thor: Ragnarok', 315.06),
    new Movie('Spider-Man: Homecoming', 334.20),
    new Movie('Guardians of the Galaxy: Vol. 2', 389.81),
    new Movie('Logan', 226.28),
    new Movie('Doctor Strange', 232.64),
    new Movie('X-Men: Apocalypse', 155.44),
    new Movie('Captain America: Civil War', 408.08),
    new Movie('Deadpool', 363.07),
    new Movie('Fantastic Four', 56.12),
    new Movie('Ant-Man', 180.20),
    new Movie('Avengers: Age of Ultron', 459.00),
    new Movie('Big Hero 6', 222.53),
    new Movie('Guardians of the Galaxy', 333.18),
]




class DataStructures extends Component {


    // State contains:
    // a) The user's selected data structure, one of:
    //    - Linked List    (pre-filled with test data)
    //    - Queue (FIFO)   (pre-filled with test data)
    //    - Stack (LIFO)   (pre-filled with test data)
    //    - Linked List    (empty)
    //    - Queue (FIFO)   (empty)
    //    - Stack (LIFO)   (empty)
    // b) A reference to the data set to be stored in the
    //    selected data structure (if any), and then displayed
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

        let selectedData = []
        switch(value) {
            case 'llist':
            selectedData = movieData
            break

            case 'queue':
            break

            case 'stack':
            break

            case 'llist-empty':
            break

            case 'queue-empty':
            break

            case 'stack-empty':
            break

            default:
        }
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