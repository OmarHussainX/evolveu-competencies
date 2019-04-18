import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Movie, MoviesList } from '../js/MoviesList'
import MovieCard from './MovieCard'
// import Scrollable from './Scrollable'


// Set to 'true' to enable output of debug messages from methods
const DEBUG_MSG = false


class MoviesListDisplay extends Component {

    // State contains:
    // - LinkedList of Movie Objects
    // - user input for title of new movie to be inserted in the list
    // - user input for gross of new movie to be inserted in the list
    constructor(props) {
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay constructor()`)

        // Receive reference to array of Movie data to be stored & shown
        // in a LinkedList - construct the list and save it in state
        // (When the data set is empty, the linked list will also be empty)
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


    // Allows for setting current Node/'position' in the Linked List by 
    // clicking on the displayed Node
    //
    // NOTE
    // To pass parameters to event handlers while using property initializer syntax, need to use currying
    // https://medium.freecodecamp.org/reactjs-pass-parameters-to-event-handlers-ca1f5c422b9
    setCurrentNode = newCurrentNode => event => {
        const { moviesList } = this.state
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay setCurrentNode()\n${newCurrentNode.data.title}`)
        
        // This should be fine: modifying the list in state directly, BUT
        // not depending on this modification for a state change/re-render
        //
        // The modified list in state will immediately be replaced by a
        // new linked list object
        moviesList.position = newCurrentNode

        const newMoviesList = this.makeListCopy(moviesList)

        this.setState({
            moviesList: newMoviesList
        })
    }


    // Update LinkedList in state (by making a copy of the list and assigning
    // the copy to state) whenever a change is made to the list
    // Changes are: modifying the 'position'/current Node, or inserting
    // or deleting an item
    clickHandler = event => {
        const { id } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay: '${id}' clicked`)

        const newMoviesList = this.makeListCopy(this.state.moviesList)

        switch (id) {
            // Insert new Movie into the list:
            // - Ensure title is not blank, gross is sensible,
            //   then insert
            // - Clear user input
            case 'insert':
            const { movieTitleInput } = this.state
            const movieGrossInput = parseFloat(this.state.movieGrossInput)
            if (movieTitleInput !== '' && movieGrossInput >= 0) {
                newMoviesList.insert(new Movie(movieTitleInput, movieGrossInput))
                this.setState({
                    movieTitleInput: '',
                    movieGrossInput: '',
                })
            } else return
            break

            case 'pos_first':
            newMoviesList.first()
            break

            case 'pos_prev':
            newMoviesList.previous()
            break

            case 'pos_next':
            newMoviesList.next()
            break

            case 'pos_last':
            newMoviesList.last()
            break

            case 'delete':
            newMoviesList.delete()
            break

            default:
        }
        this.setState({
            moviesList: newMoviesList,
        })
    }


    // HELPER FUNCTION
    // Receives a LinkedList of Movie Objects, and returns a reference to a copy
    makeListCopy = sourceList => {

        // NOTE
        // Cannot use this method to make a copy of the linked list:
        // copyOfList = JSON.parse(JSON.stringify(sourceList))
        //
        // JSON.stringify doesn't preserve methods, Class type... (methods
        // aren't part of the Class instance, they're part of the Class definition)
        // So... need to copy the list manually)

        const copyOfList = new MoviesList()

        // Loop through the source list, inserting the data from each
        // node into the new copy
        //
        // (Insertion in the copy begins at the head, and both the tail
        // and 'position' will always be at the end in a new list)
        let currentNode = sourceList.head

        while (currentNode !== null) {
            copyOfList.insert(currentNode.data)
            currentNode = currentNode.next
        }

        // At this point we have a perfect copy of the linked list, apart from
        // its 'position' property, so:
        //
        // Loop through the copied list, looking for the node which contains data
        // that matches the data in the current node/'position' of the old list
        // When found, set the current node/'position' in the copied list
        currentNode = copyOfList.head
        while (currentNode != null && currentNode.data.title !== sourceList.position.data.title) {
            currentNode = currentNode.next
        }
        copyOfList.position = currentNode

        return copyOfList
    }


    render() {
        if (DEBUG_MSG) console.log(`----- MoviesListDisplay render()`)

        const { moviesList } = this.state
        
        const movieCards = []
        // if (moviesList.length) moviesList.map(node => node)
        moviesList.map(node => node).forEach((movieNode, i) => {
            let nodeFlag = ''
            nodeFlag += (movieNode === moviesList.head) ? 'HEAD' : ''
            nodeFlag += (movieNode === moviesList.position) ? ' CURRENT' : ''
            nodeFlag += (movieNode === moviesList.tail) ? ' TAIL' : ''
            movieCards.push(<MovieCard
                key={i}
                nodeFlag={nodeFlag}
                movieNode={movieNode}
                clickHandler={this.setCurrentNode}/>)
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
                {moviesList.length ? <div className='totalgross'>
                    <strong>Total Gross: </strong> {moviesList.totalGross().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}M for {moviesList.length} movies
                </div> : ''}
                {moviesList.length ? <div className='currenttitle'>
                    Current node: {moviesList.position.data.title}
                </div> : ''}
                {/* <Scrollable> */}
                <div id='dataDisplayArea'>
                    {movieCards}
                </div>
                {/* </Scrollable> */}
            </React.Fragment>
        )
    }
}

export default MoviesListDisplay