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



    // Takes two parameters and sorts the Cities array in place according to:
    // criterion:  property (name, latitude, longitude, population) on which to sort
    // order:      sort order (ascending/descending)
    //
    // Returns a reference to the sorted Community
    sort(criterion, order) {

        switch (criterion) {

            // lowercase string sort
            case 'name':
            this.cities.sort((a, b) => {
                a = a.name.toLowerCase()
                b = b.name.toLowerCase()
                if (order === 'ascending') {
                    if (a > b) return 1
                    if (a < b) return -1
                    return 0
                }
                else {
                    if (a > b) return -1
                    if (a < b) return 1
                    return 0
                }
            })
            break

            // numeric sort
            default:
            this.cities.sort((a, b) => {
                if (order === 'ascending')
                    return a[criterion] - b[criterion]
                else
                    return b[criterion] - a[criterion]
            })
            break
        }
        return this
    }
}

export { Community }
