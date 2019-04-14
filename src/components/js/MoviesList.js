import { LinkedList } from './LinkedList'


class Movie {
    constructor(title = '', gross = 0) {
        this.title = title
        this.gross = gross
    }
}


/*
This class defines a LinkedList of Movie Objects

--- PROPERTIES ---
inherited from parent class

--- METHODS ---
inherited from parent class, and:
totalGross()    - returns the total gross of all Movies in the list
*/
class MoviesList extends LinkedList {

    // Use LinkedList's map() method to obtain an array containing the
    // gross of each Movie, then reduce() the array
    totalGross() {
        return this.map(node => node.data.gross)
            .reduce((acc, cur) => acc + cur)
    }
}

export { Movie, MoviesList }
