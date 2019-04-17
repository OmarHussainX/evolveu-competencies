import React, {Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MoviesList } from '../components/js/MoviesList'
import DataCard from './DataCard'


class MoviesListDisplay extends Component {

    // Receive reference to array of Movie data to be stored & shown
    // in a LinkedList - construct the list and save it in state
    constructor(props) {
        super(props)
        const {dataSet} = this.props
        const tmpMoviesList = new MoviesList()
        if (dataSet) dataSet.forEach(film => tmpMoviesList.insert(film))
        
        console.log(`================== constructor rec'd ${this.props.dataSet} --------`)

        this.state = {
            movieTitleInput: '',
            movieGrossInput: '',
            moviesList: tmpMoviesList,
        }
    }

    // Ensures state contains latest user input
    changeHandler = event => {
        const { name, value } = event.currentTarget
        console.log(`--- changeHandler() ---\n${name}: ${value}`)
            this.setState({
                [name]: value,
            })
    }

    // Updated LinkedList in state (by making a new list and assigning it)
    // whenever a change is made to the list
    clickHandler = event => {
        const { id } = event.currentTarget
        console.log(`--- '${id}' clicked ---`)
    }

    render() {
        const { moviesList } = this.state

        console.log(`-------- MoviesListDisplay rendering! --------`)
        
        const movieCards = []
        if (moviesList.length) moviesList.map(node => node)
            .forEach((movieNode, i) => {
            movieCards.push(<DataCard key={i} movieData={movieNode.data}/>)
        })

        return (
            <React.Fragment>
                <div id='dataControlsArea'>
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