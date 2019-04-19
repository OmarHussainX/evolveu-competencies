import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Node } from '../js/Node'
import { Movie } from '../js/MoviesList'
import { Queue } from '../js/Queue'
import MovieCard from './MovieCard'


// Set to 'true' to enable output of debug messages from methods
const DEBUG_MSG = false


class MoviesQueueDisplay extends Component {

    // State contains:
    // - Queue of Nodes containing Movie Objects
    // - user input for title of new movie to be inserted in the queue
    // - user input for gross of new movie to be inserted in the queue
    constructor(props) {

        // Receive reference to array of Movie data to be stored & shown
        // in a Queue - construct the queue and save it in state
        // (When the data set is empty, the queue will also be empty)
        super(props)
        const { dataSet } = this.props
        const newMoviesQueue = new Queue()
        dataSet.forEach(movie => newMoviesQueue.add(new Node(movie)))

        this.state = {
            movieTitleInput: '',
            movieGrossInput: '',
            moviesQueue: newMoviesQueue,
        }
    }


    // Ensures state contains the latest user input
    changeHandler = event => {
        const { name, value } = event.currentTarget
            this.setState({
                [name]: value,
            })
    }


    // Need this empty function because child component <MovieCard>
    // requires it (meant to set current Node in LinkedList, has
    // no purpose in a Queue)
    doNothing = () => {
    }


    // Update Queue in state (by making a copy of the queue, and assigning
    // the copy to state) whenever a change is made to the queue
    // Changes are: inserting or deleting an item
    clickHandler = event => {
        const { id } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- MoviesQueueDisplay: '${id}' clicked`)

        const newMoviesQueue = new Queue()
        this.state.moviesQueue.data.forEach(node => newMoviesQueue.add(new Node(node.data)))

        switch (id) {
            // Add new Movie into the queue:
            // - Ensure title is not blank, gross is sensible, then add
            // - Clear user input
            case 'add':
            const { movieTitleInput } = this.state
            const movieGrossInput = parseFloat(this.state.movieGrossInput)
            if (movieTitleInput !== '' && movieGrossInput >= 0) {
                newMoviesQueue.add(new Node(new Movie(movieTitleInput, movieGrossInput)))
                this.setState({
                    movieTitleInput: '',
                    movieGrossInput: '',
                })
            } else return
            break

            case 'delete':
            newMoviesQueue.delete()
            break

            default:
        }
        this.setState({
            moviesQueue: newMoviesQueue,
        })
    }

    render() {
        if (DEBUG_MSG) console.log(`----- MoviesQueueDisplay render()`)

        const { moviesQueue } = this.state
        
        const movieCards = []
        moviesQueue.data.forEach((movieNode, i) => {
            const nodeFlag = (i === 0) ? 'FIRSTOUT' : ''
            movieCards.push(<MovieCard
                key={i}
                dataSource='queue'
                nodeFlag={nodeFlag}
                movieNode={movieNode}
                clickHandler={this.doNothing}/>)
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
                    <button id='add' onClick={this.clickHandler}>
                        <FontAwesomeIcon icon='plus-circle' size="sm" style={{ marginRight: '5px' }}></FontAwesomeIcon>
                        Insert
                    </button>

                    <button id='delete' onClick={this.clickHandler} className='severe'>
                        <FontAwesomeIcon icon='minus-circle' size="sm" style={{ marginRight: '5px' }}></FontAwesomeIcon>
                        Delete
                    </button>
                </div>
                {moviesQueue.size() ? <div className='totalgross'>
                    <strong>Total Gross: </strong> {moviesQueue.data.reduce((acc, curNode) => acc + curNode.data.gross, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}M for {moviesQueue.size()} {moviesQueue.size() > 1 ? 'movies' : 'movie'}
                </div> : ''}
                <div id='queueDataArea'>
                    {movieCards}
                </div>
            </React.Fragment>
        )
    }
}

export default MoviesQueueDisplay