import { City } from '../js/City'


describe('The City class constructor\'s default assignment', () => {
    let testCity = null
    testCity = new City()

    it('should create a new City with lat/long/pop set to 0', () => {
        expect(testCity).not.toBeNull()
        expect(testCity.name).toBeNull()
        expect(testCity.latitude).toEqual(0)
        expect(testCity.longitude).toEqual(0)
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
        expect(testCity.longitude).toBeCloseTo(-114.0708)
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
    it('should not be possible to grow the population by a negative amount', () => {
        testCity.movedIn(-1000000)
        expect(testCity.population).toEqual(1239000 + 1000000)
    })
    it('should be possible to shrink the population', () => {
        testCity.movedOut(2000000)
        expect(testCity.population).toEqual(1239000 + 1000000 - 2000000)
    })
    it('should not be possible to shrink by an amount that exceeds the population', () => {
        testCity.movedOut(200000000)
        expect(testCity.population).toEqual(1239000 + 1000000 - 2000000)
    })
    it('should not be possible to shrink population by a negative amount', () => {
        testCity.movedOut(-2)
        expect(testCity.population).toEqual(1239000 + 1000000 - 2000000)
    })
})

describe('City classification based on population:', () => {
    const testCity = new City('Calgary', 51.0486, -114.0708, 1239000)

    it('should be classified as a \'City\' for population > 100,000', () => {
        expect(testCity.howBig()).toMatch(/City/)
    })

    it('should be classified as a \'Large town\' for 100,000 > population > 20,000', () => {
        testCity.population = 50000
        expect(testCity.howBig()).toMatch(/Large town/)
    })

    it('should be classified as a \'Town\' for 20,000 > population > 1,000', () => {
        testCity.population = 10000
        expect(testCity.howBig()).toMatch(/Town/)
    })

    it('should be classified as a \'Village\' for 1,000 > population > 100', () => {
        testCity.population = 500
        expect(testCity.howBig()).toMatch(/Village/)
    })

    it('should be classified as a \'Hamlet\' for 100 > population > 1', () => {
        testCity.population = 50
        expect(testCity.howBig()).toMatch(/Hamlet/)
    })

    it('should be classified as undefined for 1 > population', () => {
        testCity.population = 0
        expect(testCity.howBig()).toBeUndefined()
    })


})
