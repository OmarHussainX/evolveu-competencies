import React, { Component } from "react"
import './css/Cities.css'
import MoviesListDisplay from './DataStructures/MoviesListDisplay'
import MoviesQueueDisplay from './DataStructures/MoviesQueueDisplay'
import MoviesStackDisplay from './DataStructures/MoviesStackDisplay'

// Data set to use if a pre-filled data structure is selected
import movieData from './js/movies.json'

// Set to 'true' to enable output of debug messages in console
const DEBUG_MSG = false




class Cities extends Component {

    // State contains:
    // a) The user's choice of which hemisphere's cities to show
    //    (defaults to both)
    // b) A reference to the Community to be displayed
    constructor() {
        super()
        this.state = {
            dataSet: null,
            hemisphereChoice: 'both',
        }
    }

    
    // When a selection is made, updates state with:
    // - the data structure selected
    // - reference to the data set to be displayed (if any)
    changeHandler = event => {
        const { name, value } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- Cities changeHandler()\n${name}: ${value}`)

        // If an 'empty' data structure has been selected, save reference
        // to an empty array in state, otherwise save reference to test data
        const selectedData = value.includes('-empty') ? [] : movieData

        this.setState({
            dataSet: selectedData,
            [name]: value
        })
    }

    
    render() {
        const { dataSet, hemisphereChoice } = this.state

        return (
            <div id='Cities'>
                <div className='dataControlsArea'>
                    <h2>Cities</h2>
                    <select
                        className='select-style'
                        value={hemisphereChoice}
                        onChange={this.changeHandler}
                        name="hemisphereChoice">
                        <option value="all">Show cities in both hemispheres</option>
                        <option value="northern">Northern hemisphere only</option>
                        <option value="southern">Southern hemisphere only</option>
                    </select>
                </div>
                <table className='overview'>
                    <tbody>
                        <tr>
                            <td>Northern-most:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Southern-most:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Total population:</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                    {/* See NOTE below on why these condtional rendering checks should not be combined! */}
                    {hemisphereChoice === 'llist' && <MoviesListDisplay dataSet={dataSet}/>}
                    {hemisphereChoice === 'llist-empty' && <MoviesListDisplay dataSet={dataSet}/>}
                    {hemisphereChoice === 'queue' && <MoviesQueueDisplay dataSet={dataSet}/>}
                    {hemisphereChoice === 'queue-empty' && <MoviesQueueDisplay dataSet={dataSet}/>}
                    {hemisphereChoice === 'stack' && <MoviesStackDisplay dataSet={dataSet} dataStructure='stack'/>}
                    {hemisphereChoice === 'stack-empty' && <MoviesStackDisplay dataSet={dataSet} dataStructure='stack'/>}
            </div>
        )
    }
}

export default Cities
