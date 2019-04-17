import React, {Component} from "react"
import { LinkedList } from '../components/js/LinkedList'
import { Movie, MoviesList } from '../components/js/MoviesList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/DataStructures.css'
import DataCard from './DataCard'


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
            dataStructureChoice: '',
            dataStructure: null,
            movieTitle: '',
            movieGross: '',
        }
    }
    
    // When a selection is made, updates state with:
    // - the data structure choice
    // - reference to the data structure to be displayed
    changeHandler = event => {
        const { name, value } = event.currentTarget
        console.log(`--- changeHandler() ---\n${name}: ${value}`)

        let selectedData = null
        switch(value) {
            case 'llist':
            selectedData = new MoviesList()
            movieData.forEach(film => selectedData.insert(film))
            break

            case 'queue':
            break

            case 'stack':
            break

            case 'llist-empty':
            selectedData = new MoviesList()
            break

            case 'queue-empty':
            break

            case 'stack-empty':
            break

            default:
        }

            this.setState({
                [name]: value,
                dataStructure: selectedData
            })
    }

    clickHandler = event => {
        const { id } = event.currentTarget
        console.log(`--- '${id}' clicked ---`)
    }

    render() {
        const { dataStructureChoice, dataStructure } = this.state

        const dataCards = []
        if (dataStructure) dataStructure.map(node => node).forEach(movieNode => {
            dataCards.push(<DataCard movieData={movieNode.data}/>)
        })

        return (
            <div id='DataStructures'>
            <div id='dataControlsArea'>
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
                {dataStructureChoice.includes('llist') && (<div id='positionControlsWrapper'>
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
                </div>)}
                <button id='delete' onClick={this.clickHandler} className='severe'>
                    <FontAwesomeIcon icon='minus-circle' size="sm" style={{marginRight:'5px'}}></FontAwesomeIcon>
                    Delete
                </button>
                </div>

                <div id='dataDisplayArea'>
{/* ------------------------------------------------------------ */}
{/* Data for the data structure goes here:
- For linked List, series of cards with arrows on the right, except for the tail
- For FIFO/LIFO, a vertical stack */}
{dataCards}
                    {/* <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
                    <DataCard />
 */}
{/* ------------------------------------------------------------ */}
                </div>

            </div>
        )
    }
}

export default DataStructures