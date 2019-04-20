/*
NOTE:
No input validation will be done!!
Assuming that valid latitude & longitude values (x,y) will be provided:

Valid latitude:      -90 <= x <= 90
Valid longtitude:   -180 <= y <= 180

Cities with latitude > 0 will be considered to be in the Northern hemisphere
*/


class City {
    constructor(name = null, latitude = 0, longtitude = 0, population = 0) {
        this.name = name
        this.latitude = parseFloat(latitude)
        this.longtitude = parseFloat(longtitude)
        this.population = parseInt(population)
    }


    // Creates a String representation of the City
    show() {
        return `${this.name} [${this.latitude}, ${this.longtitude}] (pop. ${this.population.toLocaleString(undefined)})`
    }


    //  Receives a number that will be added to the city’s population
    movedIn(num) {
        this.population += parseInt(num)
    }


    //  Receives a number that will be subtracted from the city’s population
    movedOut(num) {
        if (num > 0 && num < this.population) this.population -= parseInt(num)
    }


    //  Returns a String representing the scale of the city based on its population
    howBig() {
        if (this.population > 100000) return 'City'
        if (this.population > 20000) return 'Large town'
        if (this.population > 1000) return 'Town'
        if (this.population > 100) return 'Village'
        if (this.population > 1) return 'Hamlet'
        return undefined
    }
}

export { City }
