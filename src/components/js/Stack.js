/*
This class uses an Array to implement a Stack (FIFO)

--- PROPERTIES ---
Same as Array

--- METHODS ---
Same as Array, plus

add()       - Adds an element to the top of the Stack
delete()    - Removes the last element from the Stack
size()      - Returns the size of the Stack
*/


class Stack {

    constructor() {
        this.data = []
    }

    // Adds an element to the top of the Stack
    add(data) {
        return this.data.unshift(data)
    }

    // Removes the top element from the Stack
    delete() {
        return this.data.shift()
    }

    // Returns the size of the Stack
    size() {
        return this.data.length
    }
}

export { Stack }
