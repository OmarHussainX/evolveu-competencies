import { LinkedList } from './LinkedList'


//------------------------------------------------
// HELPER FUNCTION
// Given a LinkedList whose Nodes have been populated with Objects of the format:
// {subject:'string', amount:integer}
//
// This function prints out a string representation of the list:
// H {subject:'string', amount:integer} --> {subject:'string', amount:integer} --> 
// {subject:'string', amount:integer} --> P T {subject:'string', amount:integer}
//
// Where H, P, and T mark the head, position/current Node, and tail, repsectively
//------------------------------------------------
const printList = (linkedList) => {
    
    // Initialise the String representation of the linked list
    let listString = ''
    
    // Use LinkedList's map() to create an array of all the Nodes, and then build up
    // a string representation of the linked list by looping through the array
    linkedList.map(nodeObject => nodeObject).forEach(node => {

        // identifier for key nodes: [H]ead, [P]osition, [T]ail
        let keyNode = ''
        if (node === linkedList.head) keyNode += 'H '
        if (node === linkedList.position) keyNode += 'P '
        if (node === linkedList.tail) keyNode += 'T '

        listString += `${keyNode}{${node.data.subject}, ${node.data.amount}} ${keyNode.includes('T') ? '' : '--> '}`
    })
    console.log(listString)
}

// Set to 'true' to enable console.log()'ing of the linked lists used in the tests
const PRINT_LIST = false


describe('Testing the LinkedList class', () => {

    describe('Calling the constructor...', () => {
        let testList = null

        beforeAll(() => {
            testList = new LinkedList()
        })

        it('should create a new LinkedList', () => {
            expect(testList).not.toBeNull()
        })

        it('which should have a length of 0', () => {
            expect(testList.length).toEqual(0)
        })
    })

    describe('insert()...', () => {
        let testList = null

        beforeAll(() => {
            testList = new LinkedList()
            testList.insert({ subject: 'A', amount: 1 })
        })

        describe('in an empty list', () => {
            it('should create a list with a non-null head, position, and tail which all reference the same node', () => {
                expect(testList.head).not.toBeNull()
                expect(testList.position).not.toBeNull()
                expect(testList.tail).not.toBeNull()
                expect(testList.position === testList.head && testList.tail === testList.head).toBeTruthy()
            })
            it('which has of length 1', () => {
                expect(testList.length).toEqual(1)
            })

            it('which should have a Node whose value is verified', () => {
                expect(testList.head.data.subject).toMatch(/A/)
            })
        })

        describe('in a list of length 1', () => {
            beforeAll(() => {
                testList.insert({ subject: 'B', amount: 2 })
            })

            it('should increase the lists\' length to 2', () => {
                expect(testList.length).toEqual(2)
            })

            it('should have a head pointing to a Node whose value is unchanged', () => {
                expect(testList.head.data.subject).toMatch(/A/)
            })

            it('should have a position and tail which reference the same Node, whose value is verified', () => {
                expect(testList.position === testList.tail).toBeTruthy()
                expect(testList.position.data.subject).toMatch(/B/)
            })
        })

        describe('in a list of length 2', () => {
            beforeAll(() => {
                testList.insert({ subject: 'C', amount: 3 })
            })

            it('should increase the lists\' length to 3', () => {
                expect(testList.length).toEqual(3)
            })

            it('should have a head pointing to a Node whose value is unchanged', () => {
                expect(testList.head.data.subject).toMatch(/A/)
            })

            it('should have a Node after the head which is not the tail, and, whose value is verified', () => {
                expect(testList.head.next !== testList.tail).toBeTruthy()
                expect(testList.head.next.data.subject).toMatch(/B/)
            })

            it('should have a position and tail which reference the same Node, whose value is verified', () => {
                expect(testList.position === testList.tail).toBeTruthy()
                expect(testList.position.data.subject).toMatch(/C/)

                if (PRINT_LIST) printList(testList)
            })
        })
    })

    describe('Adjusting position in a linked list with several Nodes', () => {

        const testList = new LinkedList()

        if (PRINT_LIST) printList(testList)

        const testData = [
            { subject: 'A', amount: 1 },
            { subject: 'B', amount: 2 },
            { subject: 'C', amount: 3 },
            { subject: 'D', amount: 4 },
            { subject: 'E', amount: 5 },
            { subject: 'F', amount: 6 },
        ]

        testData.forEach(item => testList.insert(item))

        it(`First check the list: it should have length ${testData.length}, with a head whose Node has value {${testData[0].subject}, ${testData[0].amount}}, and whose tail & position reference the same Node which has value {${testData[testData.length - 1].subject}, ${testData[testData.length - 1].amount}}`, () => {
            expect(testList.length).toEqual(testData.length)
            expect(testList.head.data.subject === testData[0].subject && testList.head.data.amount === testData[0].amount).toBeTruthy()
            expect(testList.position === testList.tail).toBeTruthy()
            expect(testList.tail.data.subject === testData[testData.length - 1].subject && testList.tail.data.amount === testData[testData.length - 1].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })

        test(`After calling first(), position should be pointing to the head whose Node has value {${testData[0].subject}, ${testData[0].amount}}` , () => {
            testList.first()
            expect(testList.position.data.subject === testData[0].subject && testList.position.data.amount === testData[0].amount).toBeTruthy()
        })

        test(`After calling next() 3 times, position should be pointing to the Node which has value {${testData[3].subject}, ${testData[3].amount}}` , () => {
            testList.next().next().next()

            expect(testList.position.data.subject === testData[3].subject && testList.position.data.amount === testData[3].amount).toBeTruthy()
        })

        test(`After calling previous() 2 times, position should be pointing to the Node which has value {${testData[1].subject}, ${testData[1].amount}}` , () => {
            testList.previous().previous()
            expect(testList.position.data.subject === testData[1].subject && testList.position.data.amount === testData[1].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })

        test(`After calling last(), position should be pointing to the head whose Node has value {${testData[testData.length - 1].subject}, ${testData[testData.length - 1].amount}}` , () => {
            testList.last()
            expect(testList.position.data.subject === testData[testData.length - 1].subject && testList.position.data.amount === testData[testData.length - 1].amount).toBeTruthy()
            if (PRINT_LIST) printList(testList)
        })

        test(`position should not change after calling next(), when the current Node is the tail`, () => {
            testList.next()
            expect(testList.position.data.subject === testData[testData.length - 1].subject && testList.position.data.amount === testData[testData.length - 1].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })

        test(`position should not change after calling previous(), when the current Node is the head`, () => {
            testList.first()
            testList.previous()
            expect(testList.position.data.subject === testData[0].subject && testList.position.data.amount === testData[0].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })
    })

    describe('Inserting Nodes when the current Node is not the head or the tail', () => {

        const testList = new LinkedList()
        const testData = [
            { subject: 'A', amount: 1 },
            { subject: 'B', amount: 2 },
            { subject: 'C', amount: 3 },
            { subject: 'D', amount: 4 },
            { subject: 'E', amount: 5 },
            { subject: 'F', amount: 6 },
        ]

        testData.forEach(item => testList.insert(item))

        it(`First check the list: it should have length ${testData.length}, with a head whose Node has value {${testData[0].subject}, ${testData[0].amount}}, whose tail and position reference the same Node which has value {${testData[testData.length - 1].subject}, ${testData[testData.length - 1].amount}}`, () => {
            expect(testList.length).toEqual(testData.length)
            expect(testList.head.data.subject === testData[0].subject && testList.head.data.amount === testData[0].amount).toBeTruthy()
            expect(testList.position === testList.tail).toBeTruthy()
            expect(testList.tail.data.subject === testData[testData.length - 1].subject && testList.tail.data.amount === testData[testData.length - 1].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })

        test(`After calling previous() 3 times, position should be pointing to the Node which has value {${testData[2].subject}, ${testData[2].amount}}` , () => {
            testList.previous().previous().previous()

            expect(testList.position.data.subject === testData[2].subject && testList.position.data.amount === testData[2].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })

        test(`insert()'ing nothing should not change the list: not allowed to have Nodes with no data` , () => {
            testList.insert()
            expect(testList.position.data.subject === testData[2].subject && testList.position.data.amount === testData[2].amount).toBeTruthy()
        })

        test(`After inserting { subject: 'G', amount: 7 }, position should be pointing to the Node which has value { subject: 'G', amount: 7 }, and length should be ${testData.length+1}` , () => {
            testList.insert({ subject: 'G', amount: 7 })
            expect(testList.position.data.subject === 'G' && testList.position.data.amount === 7).toBeTruthy()
            expect(testList.length).toEqual(testData.length+1)

            if (PRINT_LIST) printList(testList)
        })
    })

    describe('Deleting Nodes from a list...', () => {

        let testList = new LinkedList()
        const testData = [
            { subject: 'A', amount: 1 },
            { subject: 'B', amount: 2 },
            { subject: 'C', amount: 3 },
            { subject: 'D', amount: 4 },
            { subject: 'E', amount: 5 },
            { subject: 'F', amount: 6 },
            { subject: 'G', amount: 7 },
            { subject: 'H', amount: 8 },
            { subject: 'I', amount: 9 },
            { subject: 'J', amount: 10 },
        ]

        testData.forEach(item => testList.insert(item))

        test(`Delete from tail: position/current Node is the tail, so after calling delete() 2 times, position should be pointing to the Node which has value {${testData[(testData.length-1)-2].subject}, ${testData[(testData.length-1)-2].amount}}` , () => {

            testList.delete().delete()

            expect(testList.position.data.subject === testData[(testData.length-1)-2].subject && testList.position.data.amount === testData[(testData.length-1)-2].amount).toBeTruthy()
        })

        test(`Empty the list: delete all Nodes from list with length {${testList.length}}. Afterwards the list should have length '0', & 'position', 'head', and 'tail' should all be null.` , () => {

            for (let i = testList.length; i > 0; i--) {
                testList.delete()
            }

            expect(testList.position === null && testList.head === null && testList.tail === null && testList.length === 0).toBeTruthy()                        
        })

        test(`Try deleting from an empty list! Afterwards the list should still have length '0', & 'position', 'head', and 'tail' should all still be null.` , () => {

            testList.delete().delete()

            expect(testList.position === null && testList.head === null && testList.tail === null && testList.length === 0).toBeTruthy()            
        })

        test(`Re-populate list, and move position/current Node to the head. After calling delete() 2 times, position should be pointing to the Node which has value {${testData[2].subject}, ${testData[2].amount}}` , () => {

            testData.forEach(item => testList.insert(item))
            testList.first().delete().delete()

            expect(testList.position.data.subject === testData[2].subject && testList.position.data.amount === testData[2].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })

        test(`Deletion of Node that is neither head nor tail: Move position/current Node to 3 before the tail. After calling delete() 1 time, position should be pointing to the Node which has value {${testData[5].subject}, ${testData[5].amount}}` , () => {
            testList.last().previous().previous().previous().delete()

            expect(testList.position.data.subject === testData[5].subject && testList.position.data.amount === testData[5].amount).toBeTruthy()

            if (PRINT_LIST) printList(testList)
        })
    })

    describe('Calling map() on the linked list...', () => {

        let testList = new LinkedList()
        const testData = [
            { subject: 'A', amount: 1 },
            { subject: 'B', amount: 2 },
            { subject: 'C', amount: 3 },
            { subject: 'D', amount: 4 },
            { subject: 'E', amount: 5 },
            { subject: 'F', amount: 6 },
            { subject: 'G', amount: 7 },
            { subject: 'H', amount: 8 },
            { subject: 'I', amount: 9 },
            { subject: 'J', amount: 10 },
        ]

        testData.forEach(item => testList.insert(item))

        const testMap = testList.map(node => node)

        it(`Should create an array of length ${testData.length} whose first entry has value {${testData[0].subject}, ${testData[0].amount}} and matches the head of the list` , () => {

            expect(testMap[0].data.subject === testData[0].subject && testMap[0].data.amount === testData[0].amount && testData.length === testMap.length && testMap[0] === testList.head).toBeTruthy()
        })
        it(`Should have a fourth entry with value {${testData[3].subject}, ${testData[3].amount}}` , () => {

            expect(testMap[3].data.subject === testData[3].subject && testMap[3].data.amount === testData[3].amount).toBeTruthy()
        })
        it(`Should have a final entry with value {${testData[9].subject}, ${testData[9].amount}} which matches the tail and position/current Node of the list` , () => {

            expect(testMap[9].data.subject === testData[9].subject && testMap[9].data.amount === testData[9].amount && testData.length === testMap.length && testMap[9] === testList.tail && testMap[9] === testList.position).toBeTruthy()
        })
    })
})

