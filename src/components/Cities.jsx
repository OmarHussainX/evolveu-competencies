import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Cities.css'

// Data set to use
import citiesData from './js/cities.json'
import { Community } from "./js/Community";

// Set to 'true' to enable output of debug messages in console
const DEBUG_MSG = true




class Cities extends Component {

    // State contains:
    // a) The user's choice of which hemisphere's cities to show
    //    (defaults to both)
    // b) A reference to the Community to be displayed
    constructor() {
        super()
        this.state = {
            community: new Community(citiesData),
            hemisphereChoice: 'both',
        }
    }

    
    // When a selection is made, updates state with:
    // - choice of hemisphere to show: both, Northern, or Southern
    // - reference to the Community to be displayed
    changeHandler = event => {
        const { name, value } = event.currentTarget
        if (DEBUG_MSG) console.log(`----- Cities changeHandler()\n${name}: ${value}`)

        // Create a new Community containgin all cities, and
        // filter out Southern or Northern cities if needed
        let newCommunity = new Community(citiesData)
        if  (value === 'north' || value === 'south')
           newCommunity = newCommunity.whichSphere(value) 

        this.setState({
            community: newCommunity,
            [name]: value
        })
    }

    
    render() {
        const { community, hemisphereChoice } = this.state

        const citiesList = community.cities.map((city, i ) => {

            let population = city.population
            if (population >= 1000000)
                population = `${(population/1000000.0).toFixed(1)}M`
            else if (population >= 1000)
                population = `${(population/1000.0).toFixed(1)}k`
            
            return (
                <tr key={i}>
                    <td>
                        {city.name}<br/>
                        <span>{city.howBig()}</span>
                    </td>
                    <td>{population}</td>
                    <td>
                        <button>
                            <FontAwesomeIcon icon='plus-circle' size="sm"></FontAwesomeIcon>
                        </button>
                        &nbsp;
                        <button>
                            <FontAwesomeIcon icon='minus-circle' size="sm"></FontAwesomeIcon>
                        </button>
                    </td>
                    <td>{`${city.latitude.toFixed(2)},${city.latitude.toFixed(2)}`}</td>
                </tr>
            )
        })

        return (
            <div id='Cities'>
                <div className='citiesControlsArea'>
                    <h2>Cities</h2>
                    <select
                        className='select-style'
                        value={hemisphereChoice}
                        onChange={this.changeHandler}
                        name="hemisphereChoice">
                        <option value="both">Show cities in both hemispheres</option>
                        <option value="north">Northern hemisphere only</option>
                        <option value="south">Southern hemisphere only</option>
                    </select>
                </div>
                <table className='overview'>
                    <tbody>
                        <tr>
                            <td>Northern-most</td>
                            <td>{community.getMostNorthern().name}</td>
                        </tr>
                        <tr>
                            <td>Southern-most</td>
                            <td>{community.getMostSouthern().name}</td>
                        </tr>
                        <tr>
                            <td>Total pop.</td>
                            <td>{community.getPopulation().toLocaleString(undefined)}</td>
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
                        {citiesList}
                    </tbody>
                </table>

                </div>
            </div>
        )
    }
}

export default Cities
