import { City } from "./City";


/*
An array of City Objects, with some useful methods...
*/
class Community {
    constructor(citiesArray) {
        this.cities = []
        // if (citiesArray.length) citiesArray.forEach(city => {
        //     this.cities.push(new City(city.name, city.latitude, city.longitude, city.population))
        // })
    }


    // Returns a Community containing only cities from the Northern
    // or Southern hemisphere, depending on the value of its parameter
    whichSphere(hemisphere) {

    }


    // Returns the Northern-most City in the Community
    getMostNorthern() {

    }


    // Returns the Southern-most City in the Community
    getMostSouthern() {

    }


     // Takes two parameters and sorts the array of City Objects accordingly:
     // criterion:  property (name, latitude, longitude, population) on which to sort
     // order:      sort order (ascending/descending)
    sort(criterion, order) {

    }

}

export { Community }
