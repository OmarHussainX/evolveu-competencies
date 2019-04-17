import React, {Component} from "react"
import { Movie } from '../components/js/MoviesList'
import './css/DataStructures.css'
import MoviesListDisplay from './MoviesListDisplay'


// Data to use if data structure pre-filled with test data is selected
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
    constructor() {
        super()
        this.state = {
            dataSet: null,
            dataStructureChoice: '',
        }
    }
    
    // When a selection is made, updates state with:
    // - the data structure choice
    // - reference to the data set to be displayed (if any)
    changeHandler = event => {
        const { name, value } = event.currentTarget
        console.log(`--- changeHandler() ---\n${name}: ${value}`)

        let selectedData = null
        switch(value) {
            case 'llist':
            selectedData = movieData
            break

            case 'queue':
            break

            case 'stack':
            break

            case 'llist-empty':
            selectedData = []
            break

            case 'queue-empty':
            break

            case 'stack-empty':
            break

            default:
        }
        this.setState({
            [name]: value,
            dataSet: selectedData
        })
    }

    
    render() {
        const { dataSet, dataStructureChoice } = this.state

        return (
            <div id='DataStructures'>
                <div id='dataControlsArea'>
                    <select
                        className='select-style'
                        value={this.state.dataStructureChoice}
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
                    {(dataStructureChoice === 'llist' || dataStructureChoice === 'llist-empty') && <MoviesListDisplay dataSet={dataSet}/>}
                </div>
            </div>
        )
    }
}

export default DataStructures