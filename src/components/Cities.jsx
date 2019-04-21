import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Cities.css'

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
                <div className='citiesControlsArea'>
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
                            <td>Northern-most</td>
                            <td>Some city.....</td>
                        </tr>
                        <tr>
                            <td>Southern-most</td>
                            <td>Some other city....</td>
                        </tr>
                        <tr>
                            <td>Total pop.</td>
                            <td>{(134567245).toLocaleString(undefined)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='citieslistCard'>
                <table className='citieslist'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th colSpan='2'>Population</th>
                            <th>latitude, longitude</th>
                        </tr>
                        <tr>
                            <td>
                                Calgary<br/>
                                <span>(City)</span>
                            </td>
                            <td>1.3M</td>
                            <td>
                                <button>
                                    <FontAwesomeIcon icon='plus-circle' size="sm"></FontAwesomeIcon>
                                </button>
                                &nbsp;
                                <button>
                                    <FontAwesomeIcon icon='minus-circle' size="sm"></FontAwesomeIcon>
                                </button>
                            </td>
                            <td>45.34, -52.45</td>
                        </tr>
                        <tr>
                            <td>
                                Yellowknife<br/>
                                <span>(Large town)</span>
                            </td>
                            <td>500k</td>
                            <td>
                                <button>
                                    <FontAwesomeIcon icon='plus-circle' size="sm"></FontAwesomeIcon>
                                </button>
                                &nbsp;
                                <button>
                                    <FontAwesomeIcon icon='minus-circle' size="sm"></FontAwesomeIcon>
                                </button>
                            </td>
                            <td>72.81, -122.36</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default Cities
