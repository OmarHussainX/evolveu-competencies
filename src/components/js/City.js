class City {
    constructor(name = null, latitude = 0, longtitude = 0, population = 0) {
        this.name = name
        this.latitude = latitude
        this.longtitude = longtitude
        this.population = population
    }


    // Creates a String representation of the City
    show() {
        return `this.name [this.latitude, this.longtiude] (pop. ${this.population})`
    }


    //  Receives a number that will be added to the city’s population
    movedIn() {

    }


    //  Receives a number that will be subtracted from the city’s population
    movedOut() {

    }


    //  Returns a String representing the scale of the city based on its population
    howBig() {

    }
}

export { City }
