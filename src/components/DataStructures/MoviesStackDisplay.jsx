import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Node } from '../js/Node'
import { Movie } from '../js/MoviesList'
import { Stack } from '../js/Stack'
import MovieCard from './MovieCard'


// Set to 'true' to enable output of debug messages from methods
const DEBUG_MSG = false


class MoviesStackDisplay extends Component {

    // State contains:
    // - Stack of Nodes containing Movie Objects
    // - user input for title of new movie to be inserted in the stack
    // - user input for gross of new movie to be inserted in the stack
    constructor(props) {

        // Receive reference to array of Movie data to be stored & shown
        // in a Stack - construct the stack and save it in state
        // (When the data set is empty, the stack will also be empty)
        super(props)
        const { dataSet } = this.props
        const newMoviesStack = new Stack()
        dataSet.forEach(movie => newMoviesStack.add(new Node(movie)))

        this.state = {
            movieTitleInput: '',
            movieGrossInput: '',
            moviesStack: newMoviesStack,
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
    // no purpose in a Stack)
    doNothing = () => {
    }


    // Update Stack in state (by making a copy of the stack, and assigning
    // the copy to state) whenever a change is made to the stack
    // Changes are: inserting or deleting an item
    clickHandler = event => {
        const { id } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- MoviesStackDisplay: '${id}' clicked`)

        const newMoviesStack = new Stack()
        
        // Copying a stack whicc is using an array internally
        // - the first/zeroth element of the array is the top of the stack
        // - since the last element added to a stack will be the first one out,
        //   need to find the last/bottom-most element in the source stack,
        //   insert that into the copy, and then work from there up to
        //   the top of the source stack
        // - i.e. instead of traversing the source stack from the first
        //   element to the last, adding to the copy on the way, need to
        //   traverse the source stack from the last element to the first
        this.state.moviesStack.data.reverse().forEach(node => newMoviesStack.add(new Node(node.data)))

        switch (id) {
            // Add new Movie into the stack:
            // - Ensure title is not blank, gross is sensible, then add
            // - Clear user input
            case 'add':
            const { movieTitleInput } = this.state
            const movieGrossInput = parseFloat(this.state.movieGrossInput)
            if (movieTitleInput !== '' && movieGrossInput >= 0) {
                newMoviesStack.add(new Node(new Movie(movieTitleInput, movieGrossInput)))
                this.setState({
                    movieTitleInput: '',
                    movieGrossInput: '',
                })
            } else return
            break

            case 'delete':
            newMoviesStack.delete()
            break

            default:
        }
        this.setState({
            moviesStack: newMoviesStack,
        })
    }

    render() {
        if (DEBUG_MSG) console.log(`----- MoviesStackDisplay render()`)

        const { moviesStack } = this.state
        
        const movieCards = []
        moviesStack.data.forEach((movieNode, i) => {
            const nodeFlag = (i === 0) ? 'FIRSTOUT' : ''
            movieCards.push(<MovieCard
                key={i}
                dataSource='stack'
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
                {moviesStack.size() ? <div className='totalgross'>
                    <strong>Total Gross: </strong> {moviesStack.data.reduce((acc, curNode) => acc + curNode.data.gross, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}M for {moviesStack.size()} {moviesStack.size() > 1 ? 'movies' : 'movie'}
                </div> : ''}
                <div id='stackDataArea'>
                    {movieCards}
                </div>
            </React.Fragment>
        )
    }
}

export default MoviesStackDisplay