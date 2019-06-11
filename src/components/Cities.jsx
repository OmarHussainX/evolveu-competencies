import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from './Modal'
import './css/Cities.css'

// Data set to use
import citiesData from './js/cities.json'
import { Community } from './js/Community';




class Cities extends Component {

    // State contains:
    // a) The user's choice of which hemisphere's cities to show
    //    (defaults to both)
    // b) A reference to the Community to be displayed
    // c) A flag controlling whether or not the modal is shown
    // d) Amount input by user (via modal) for population change
    // e) Index for the City whose population has been targeted for change
    constructor() {
        super()
        this.state = {
            community: new Community(citiesData),
            hemisphereChoice: 'both',
            modalOpen: false,
            populationInput: '',
            cityIndex: ''
        }
    }


    // - Toggles the modal's visibility
    // - If a button to to add to or subtract from a City's population was
    //   clicked, save the index for that City to state so that this exact
    //   City's population can be modified
    toggleModal = (e) => {
        this.setState({
            cityIndex: (e.currentTarget.id.includes('addPop') || e.currentTarget.id.includes('subPop')) ? e.currentTarget.id.slice(6) : '',
            modalOpen: !this.state.modalOpen
        })
    }


    // Prevents clicks on the modal dialog from propagating to the
    // parent (modal backdrop)
    // Needed since a click on the modal backdrop will close the modal
    // If this is not done, clicking on the modal dialog closes the modal - 
    // definitely not desirable
    onModalContentclick = (event) => {
        event.stopPropagation()
    }


    // Handle user input:
    // a) If a city-hemisphere selection was made, update state with:
    // - choice of hemisphere to show: both, Northern, or Southern
    // - reference to the Community to be displayed
    //
    // b) If an amount for population change has been entered (via modal):
    // - ensures state contains the latest user input
    changeHandler = event => {
        let { name, value } = event.currentTarget

        if (name === 'hemisphereChoice') {
            // Create a new Community containing all cities and then...
            let newCommunity = new Community(citiesData)
            
            // ...filter out Southern or Northern cities if needed
            if (value === 'north' || value === 'south')
                newCommunity = newCommunity.whichSphere(value)

            this.setState({
                community: newCommunity,
                [name]: value
            })

        } else {
            // Discard any floating point input for population change
            value = parseInt(value)
            this.setState({
                [name]: value
            })
        }
    }


    // Adds to or subtracts from, the population of the City whose index
    // is saved in state
    updatePopulation = event => {
        const { populationInput, cityIndex } = this.state

/*  TWO APPROACHES TO UPDATING OBJECT IN STATE (both work!):

        // ---------- FIRST APPROACH ----------
        // Make a copy of the Community in state
        // Update the copy depending on which button was pressed
        // Assign updated Community to state, clear user input, close modal
        const newCommunity = new Community(this.state.community.cities)

        if (event.currentTarget.id.includes('grow'))
            newCommunity.cities[cityIndex].movedIn(populationInput)
        else
            newCommunity.cities[cityIndex].movedOut(populationInput)

        this.setState({
            community: newCommunity,
            populationInput: '',
            modalOpen: false,
        })

 */

        // ---------- SECOND APPROACH ----------
        // Using setState, make changes to prevState, then assign those
        // changes to state...
        const buttonId = event.currentTarget.id
        this.setState(prevState => {
            if (buttonId.includes('grow'))
                prevState.community.cities[cityIndex].movedIn(populationInput)
            else
                prevState.community.cities[cityIndex].movedOut(populationInput)

            return {
                community: prevState.community,
                populationInput: '',
                modalOpen: false,
            }
        })
    }


    render() {
        const { community, hemisphereChoice, modalOpen, populationInput, cityIndex } = this.state

        // Generate an array of table rows - each row contains the data to 
        // be displayed for one City, along with controls to add to
        // or subtract from that City's population
        const citiesList = community.cities.map((city, i) => {

            let population = city.population
            if (population >= 1000000)
                population = `${(population / 1000000.0).toFixed(1)}M`
            else if (population >= 1000)
                population = `${(population / 1000.0).toFixed(1)}k`

            return (
                <tr key={i} className={(i % 2 ? 'altrow' : '')}>
                    <td>
                        {city.name}<br />
                        <span>({city.howBig()})</span>
                    </td>
                    <td>{population}</td>
                    <td className='popcontrols'>
                        <button id={`addPop${i}`} onClick={this.toggleModal}>
                            <FontAwesomeIcon icon='plus-circle' size='sm'></FontAwesomeIcon>
                        </button>
                        &nbsp;
                        <button id={`subPop${i}`} onClick={this.toggleModal}>
                            <FontAwesomeIcon icon='minus-circle' size='sm'></FontAwesomeIcon>
                        </button>
                    </td>
                    <td className='latlong'>
                        {`${city.latitude.toFixed(2)}, ${city.longitude.toFixed(2)}`}
                    </td>
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
                        name='hemisphereChoice'>
                        <option value='both'>Show cities in both hemispheres</option>
                        <option value='north'>Northern hemisphere only</option>
                        <option value='south'>Southern hemisphere only</option>
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
                                <th></th>
                            </tr>
                            {citiesList}
                        </tbody>
                    </table>

                </div>
                {/* Including the Modal last means it doesn't necessarily
                    have to have a higher z-index specified. */}
                {modalOpen &&
                    <Modal
                        toggleModal={this.toggleModal}
                        onModalContentclick={this.onModalContentclick} >
                        <h4><em>{community.cities[cityIndex].name}</em></h4>
                        <h5>Current population: {community.cities[cityIndex].population.toLocaleString(undefined)}</h5>
                        <p>Enter amount by which population will change</p>
                        <input
                            autoFocus
                            type='number'
                            // placeholder='enter amount'
                            min='0'
                            name='populationInput'
                            value={populationInput}
                            onChange={this.changeHandler} />
                        <button id='grow' onClick={this.updatePopulation}>
                            Grow
                        </button>
                        <button id='shrink' onClick={this.updatePopulation}>
                            Shrink
                        </button>
                </Modal>}
            </div>
        )
    }
}

export default Cities