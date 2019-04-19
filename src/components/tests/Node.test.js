import { Node } from '../js/Node'


describe('Testing the Node class', () => {

    describe('Calling the constructor with an Object...', () => {
        let testNode = null

        beforeAll(() => {
            testNode = new Node({ subject: 'Jest', amount: 100 })
        })

        it('should create a new Node', () => {
            expect(testNode).not.toBeNull()
        })

        it('containing the Object that was passed to the constructor', () => {
            expect(testNode.data.subject).toMatch(/Jest/)
            expect(testNode.data.amount).toEqual(100)

            // display the Node
            testNode.show()
        })
    })

    describe('Calling the constructor with primitive data types...', () => {
        const testNode = [
            new Node(true),
            new Node(null),
            new Node(),
            new Node(42),
            new Node('Primitive!'),
        ]
        testNode[2].data = undefined

        it('should create new Nodes', () => {
            expect(testNode).not.toBeNull()
            expect(testNode.length).toEqual(5)
        })

        it('containing the data that was passed to the constructor', () => {
            expect(testNode[0].data).toBeTruthy()
            expect(testNode[1].data).toBeNull()
            expect(testNode[2].data).toBeUndefined()
            expect(testNode[3].data).toEqual(42)
            expect(testNode[4].data).toMatch(/Primitive!/)

            // display the Nodes
            testNode.forEach(node => node.show())
        })
    })
})

