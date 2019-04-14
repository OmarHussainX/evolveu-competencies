class Node {
    constructor(nodeData = null, nextNode = null) {
        this.data = nodeData
        this.next = nextNode
    }

    // Displays Object data stored in the Node, in the following format:
    // {key: value, key: value, key: value, ...}
    //
    // Displays primitve data stored in the Node, in the following format:
    // {value}
    show() {

        // Need to determine type of Node's data in order to display it:
        // Primitive data types can be console.log()'ed directly
        // In order to display Objects, need to obtain their keys & values
        switch(typeof this.data) {

            case 'object':
            // null has a typeof 'object', so it must be accounted for
            if (this.data === null) {
                console.log(`{${this.data}}`)
                return
            }
            // Don't know what Object data might be stored in the node, so
            // obtain an array of the Object's keys/property names
            const dataKeys = Object.keys(this.data)

            // initialize the String representation for the Object's key:value pairs
            let dataString = '{'

            // for each key, obtain the corresponding value and add it to the String
            dataKeys.forEach(key => {
                dataString += `${key}: ${this.data[key]}, `
            })

            // remove the last ', ' from the String, and add the closing bracket
            dataString = dataString.slice(0, -2) + '}'
            console.log(dataString)
            break

            default:
            console.log(`{${this.data}}`)

        }

    }
}

export { Node }
