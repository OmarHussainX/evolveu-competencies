/*
This class uses an Array to implement a Queue (FIFO)

--- PROPERTIES ---
Same as Array

--- METHODS ---
Same as Array, plus

add()       - Adds an element to the end of the Queue
delete()    - Removes the first element from the Queue
size()      - Returns the size of the Queue
*/


class Queue {

    constructor() {
        this.data = []
    }

    // Adds an element to the end of the Queue
    add(data) {
        return this.data.push(data)
    }

    // Removes the first element from the Queue
    delete() {
        return this.data.shift()
    }

    // Returns the size of the Queue
    size() {
        return this.data.length
    }
}

export { Queue }
