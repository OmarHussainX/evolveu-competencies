import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MoviesList } from '../components/js/MoviesList'
import DataCard from './DataCard'


// Set to 'true' to enable output of debug messages from methods
const DEBUG_MSG = true


class MoviesListDisplay extends Component {

    // State contains:
    // - LinkedList of Movie Objects
    // - user input for title of new movie to be inserted in the list
    // - user input for gross of new movie to be inserted in the list
    constructor(props) {
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay constructor()`)

        // Receive reference to array of Movie data to be stored & shown
        // in a LinkedList - construct the list and save it in state
        super(props)
        const { dataSet } = this.props
        const newMoviesList = new MoviesList()
        dataSet.forEach(movie => newMoviesList.insert(movie))

        this.state = {
            movieTitleInput: '',
            movieGrossInput: '',
            moviesList: newMoviesList,
        }
    }


    // Ensures state contains the latest user input
    changeHandler = event => {
        const { name, value } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay changeHandler()\n${name}: ${value}`)
            this.setState({
                [name]: value,
            })
    }


    // Update LinkedList in state (by making a new list and assigning it)
    // whenever a change is made to the list
    clickHandler = event => {
        const { id } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay: '${id}' clicked`)
    }


    render() {
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay render()`)

        const { moviesList } = this.state
        
        const movieCards = []
        // if (moviesList.length) moviesList.map(node => node)
        moviesList.map(node => node).forEach((movieNode, i) => {
            let nodeFlag = ''
            nodeFlag += (movieNode === moviesList.head) ? '(HEAD)' : ''
            nodeFlag += (movieNode === moviesList.position) ? ' ^^^' : ''
            nodeFlag += (movieNode === moviesList.tail) ? ' (TAIL)' : ''
            movieCards.push(<DataCard
                key={i}
                nodeFlag={nodeFlag}
                movieData={movieNode.data}/>)
        })

        return (
            <React.Fragment>
                <div className='dataControlsArea'>
                    <label>
                        <input
                            type='text'
                            placeholder='Movie title'
                            name='movieTitleInput'
                            value={this.state.movieTitleInput}
                            onChange={this.changeHandler}/>
                    </label>
                    <label>
                        <input
                            type="number"
                            placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gross (in M)'
                            min="0"
                            step="0.01"
                            name="movieGrossInput"
                            value={this.state.movieGrossInput}
                            onChange={this.changeHandler}/>
                    </label>
                    <button id='insert' onClick={this.clickHandler}>
                        <FontAwesomeIcon icon='plus-circle' size="sm" style={{ marginRight: '5px' }}></FontAwesomeIcon>
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
                        <FontAwesomeIcon icon='minus-circle' size="sm" style={{ marginRight: '5px' }}></FontAwesomeIcon>
                        Delete
                    </button>
                </div>

{/* ------------------------------------------------------------ */}
{/* Data for the data structure goes here:
- For linked List, series of cards with arrows on the right, except for the tail
- For FIFO/LIFO, a vertical stack */}
                <div id='dataDisplayArea'>
                    {movieCards}
                </div>
{/* ------------------------------------------------------------ */}
            </React.Fragment>
        )
    }
}

export default MoviesListDisplay