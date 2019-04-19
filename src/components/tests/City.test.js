import { City } from '../js/City'


describe('The City class constructor\'s default assignment', () => {
    let testCity = null
    testCity = new City()

    it('should create a new City with lat/long/pop set to 0', () => {
        expect(testCity).not.toBeNull()
        expect(testCity.name).toBeNull()
        expect(testCity.latitude).toEqual(0)
        expect(testCity.longtitude).toEqual(0)
        expect(testCity.population).toEqual(0)
    })

    // display the City
    console.log(testCity.show())
})

describe('The City class constructor with parameters', () => {
    const testCity = new City('Calgary', 51.0486, -114.0708, 1239000)

    it('should create a new City with verifiable properties', () => {
        expect(testCity.name).toMatch(/Calgary/)
        expect(testCity.latitude).toBeCloseTo(51.0486)
        expect(testCity.longtitude).toBeCloseTo(-114.0708)
        expect(testCity.population).toEqual(1239000)

        // display the City
        console.log(testCity.show())
    })
})

describe('Population adjustment:', () => {
    const testCity = new City('Calgary', 51.0486, -114.0708, 1239000)

    it('should be possible to grow the population', () => {
        testCity.movedIn(1000000)
        expect(testCity.population).toEqual(1239000 + 1000000)
    })
    it('should be possible to shrink the population', () => {
        testCity.movedOut(2000000)
        expect(testCity.population).toEqual(1239000 + 1000000 - 2000000)
    })
})

// describe('Testing city classification based on population:', () => {
//     it('should be classified as a \'City\' for population over 100,000', () => {
//         expect(testCity.howBig()).toMatch(/City/)
//     })
// })
