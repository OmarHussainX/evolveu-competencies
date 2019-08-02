import { Node } from './Node'

/*
This class defines a *positional*, singly-linked list of Node Objects


--- PROPERTIES ---
head        - points to the first Node of the list

tail        - points to the last Node of the list

position    - points to the 'current Node'. The current Node is the last Node in
              the list (i.e. the 'tail'), until 'position' is moved via one of
              the positional methods [first(), last(), next(), previous()] to
              to point to another Node
            - controls behaviour of insert() and delete() [see below for details]

length      - the number of Nodes in the list


--- METHODS ---
insert()    - inserts a new Node after the current Node, and makes the
              new Node the current Node

delete()    - removes the current Node, and makes the previous Node the
              the current Node

first()     - makes the head the current Node
last()      - makes the tail the current Node
next()      - makes the next Node the current Node
previous()  - makes the previous Node the current Node

map()       - returns an Array of (references to) all Node Objects in the list
              in sequence, from head to tail


--- NOTES ---
- All methods allow call chaining, including map()

- Empty list:
    'head', 'tail', 'position' are null and 'length' is 0

- The way this list has been defined, the only way to change the 'head', or 'tail'
or any Node in the list, really, is to move 'position' to the target Node, making it
the current Node, deleting it, and then inserting new Node(s) if desired.
*/

// Set to 'true' to enable output of debug messages from methods
const DEBUG_MSG = false



class LinkedList {

    constructor() {
        this.head = null
        this.tail = null
        this.position = null
        this.length = 0
    }


    // Inserts a new Node containing 'data' after the current Node, and
    // makes the new Node the current Node
    insert(data = null) {
        // Disallow addition of Nodes with no data
        if (data === null) return this

        let statusMsg = '__insert() '

        // List is empty:
        // - create the first Node of the list, containing data,
        //   _linked_ to null
        // - update head, position, tail to point to new Node
        if (this.position === null) {
            this.position = this.head = this.tail = new Node(data, null)
           statusMsg += '__created new Node: head'
        }

        // Current Node is the tail, insertion is to be done *after* the
        // current Node, and after insertion, the inserted Node becomes the
        // new tail, and also the new current Node:
        // - create Node containing data (_linked_ to null), which will be the new tail
        // - modify the current Node so that it _links_ to the new tail
        // - update tail and position to _point_ to the new Node, making it the new
        //   tail, and the new current Node
        else if (this.position === this.tail) {
            const oldTail = this.tail
            this.tail = this.position = new Node(data, null)
            oldTail.next = this.tail
           statusMsg += '__created new Node: tail'
        }

        // Current Node is the head, or any Node *but* the tail, insertion
        // is to be done *after* the current Node, and after insertion, 
        // the inserted Node becomes the new current Node:
        // - save a reference to the (soon to be old) current Node
        // - create new Node containing data, _linked_ to the (soon to be old) 
        //   current Node's next Node
        // - update position to _point_ to the newly created Node, making it the
        //   new current Node
        // - modify the old current Node so that it _links_ to the new current Node
        else {
            let oldCurrentNode = this.position
            this.position = new Node(data, this.position.next)
            oldCurrentNode.next = this.position
            statusMsg += `__added Node after '{${Object.entries(oldCurrentNode.data)}}'`
        }

        // A new Node was added to the list, increment length
        this.length++
        if (DEBUG_MSG) console.log(`${statusMsg}, length: ${this.length}`)
        return this
    }


    // Deletes the current Node, making the previous Node (if there is one)
    // the current Node
    delete() {
        // Case 1: empty list, nothing to do
        if (this.head === null) return this

        let statusMsg = '__delete() '

        // Case 2a: there is only one Node in the list (head, position, tail are equal)
        // Case 2b: there is more than one Node, and head is the current Node
        //
        // Delete the head, since it's the current Node - there is no previous node
        // so the Node after the head (if there is one) becomes the new current Node
        if (this.head === this.position) {
            // Save a reference to the current head, which is to be deleted
            const oldHead = this.head

            // The next Node (if it exists) becomes the new head & new current Node
            this.position = this.head = oldHead.next
            oldHead.next = null // unlink old head
            
            // In the case of a list with one Node, the tail needs to be updated as well
            if (this.tail === oldHead) this.tail = null
            statusMsg += `__deleted: head '{${Object.entries(oldHead.data)}}'`
        }
        
        // Case 3: The list has more than one Node, and the current Node is the tail, or
        //         any Node *but* the head
        //
        // Delete the current Node, making the previous node the current Node
        else {
            // Find the previous Node
            let prevNode = this.head
            while (prevNode.next !== this.position) prevNode = prevNode.next
            // The previous Node has been located at this point

            // If the tail is the current Node, this unlinks the current tail
            // If the current Node is not the tail, then this causes the current Node
            // to be unlnked from the list
            prevNode.next = this.position.next

            // This has no impact if the current Node was the tail, but if the current
            // Node was not the tail, this completes its unlinking from the the list
            this.position.next = null

            // If the tail was the current Node, update the tail to point to the
            // new tail: the previous Node
            if (this.tail === this.position) this.tail = prevNode

            // Make the previous Node the current Node
            this.position = prevNode

            statusMsg += `deleted Node that was after '{${Object.entries(prevNode.data)}}'`
        }

        // A Node was removed from the list, decrement length
        this.length--
        if (DEBUG_MSG) console.log(`${statusMsg}, length: ${this.length}`)

        return this
    }


    // Makes position point to the head, making the head the current Node
    // (Note: not concerned about checking for a null head/empty list, in an
    // empty list the vale of position is null in any case)
    first() {
        this.position = this.head
        return this
    }


    // Makes position point to the tail, making the tail the current Node
    // (Note: not concerned about checking for a null head/empty list, in an
    // empty list the vale of position is null in any case)
    last() {
        this.position = this.tail
        return this
    }


    // Makes position point to the Node after the current Node, making it 
    // the new current Node
    next() {
        // If the list is empty, or the current Node is the tail, the tail and position
        // will be equal, and there is no next Node to move to
        if (this.position === this.tail) return this

        // ASSERT: this.position will not be null at this point
        // (If position were null, tail would have been null too, satisfying the 
        // conditional check above)
        this.position = this.position.next
        
        return this
    }


    // Makes position point to the Node before the current Node, making it
    // the new current Node
    previous() {
        // If the list is empty, or the current Node is the head, the head and position
        // will be equal, and there is no previous Node to move to
        if (this.position === this.head) return this

        // Otherwise, search the list for the Node prior to the current Node, and when
        // found, make it the current Node
        // The previous Node _links_ to the current Node, so if we find a Node whose
        // _link_ is equal to position, we have found the previous Node
        let prevNode = this.head
        while (prevNode.next !== this.position) prevNode = prevNode.next
        this.position = prevNode

        return this
    }


    // Creates a new Array with the results of calling the provided function
    // on every Node in the list
    map(callback) {
        const listArray = []
        let currentNode = this.head

        while (currentNode !== null) {
            listArray.push(callback(currentNode))
            currentNode = currentNode.next
        }
        return listArray
    }
}

export { LinkedList }
