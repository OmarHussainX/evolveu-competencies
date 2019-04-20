import { City } from "./City";


/*
An array of City Objects, with some useful methods...
*/


class Community {
    constructor(citiesArray = []) {
        this.cities = []

        citiesArray.forEach(city => {
            this.cities.push(new City(city.name, city.latitude, city.longitude, city.population))
        })
    }


    // Returns a Community containing only cities from the Northern
    // or Southern hemisphere, depending on the value of its parameter
    whichSphere(hemisphere) {

        if (hemisphere.toLowerCase() !== 'north' && hemisphere.toLowerCase() !== 'south') return

        const filteredCommunity = new Community()
        let filteredCities = []

        if (hemisphere.toLowerCase() === 'north') 
            filteredCities = this.cities.filter(city => city.latitude > 0)
        else
            filteredCities = this.cities.filter(city => city.latitude <= 0)

        filteredCities.forEach(city => {
            filteredCommunity.cities.push(new City(city.name, city.latitude, city.longitude, city.population))
        })
        return filteredCommunity
    }


    // Returns the Northern-most City in the Community
    getMostNorthern() {
        return this.cities.reduce((acc, cur) => {
            if (acc.latitude > cur.latitude) return acc
            else return cur
        })
    }


    // Returns the Southern-most City in the Community
    getMostSouthern() {
        return this.cities.reduce((acc, cur) => {
            if (acc.latitude < cur.latitude) return acc
            else return cur
        })
    }


    // Returns the total population of all Cities in the Community
    getPopulation() {
        return this.cities.reduce((acc, cur) => acc + cur.population, 0)}



    // Takes two parameters and sorts the array of City Objects accordingly:
    // criterion:  property (name, latitude, longitude, population) on which to sort
    // order:      sort order (ascending/descending)
    // sort(criterion, order) {

    // }
}

export { Community }
