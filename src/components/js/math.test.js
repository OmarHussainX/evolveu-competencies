import {sum, difference, multiply, divide} from "./math"

test('Test the math functions', () => {
	console.log('Hello World')
	expect(sum(1, 2)).toEqual(3)
	expect(difference(1, 2)).toEqual(-1)
	expect(multiply(4, 2)).toEqual(8)
	expect(divide(4, 2)).toEqual(2)
})
