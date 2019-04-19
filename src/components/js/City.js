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

    }
}

export { City }
