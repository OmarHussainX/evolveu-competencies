import { Community } from '../js/Community'
import cities from '../js/cities.json'

describe('The Community class\' methods...', () => {
    const testCommunity = new Community(cities)

    it('Should be able to create a new Communty Object with verifiable data', () => {
        expect(testCommunity.cities.length).toEqual(30)
        expect(testCommunity.cities[0].name).toMatch(/Gross/)
        expect(testCommunity.cities[11].name).toMatch(/Stepantsminda/)
    })

    const northernCommunity = testCommunity.whichSphere('north')
    const southernCommunity = testCommunity.whichSphere('south')
    const brownCommunity = testCommunity.whichSphere('brown')
    const northernMostCity = testCommunity.getMostNorthern()
    const southernMostCity = testCommunity.getMostSouthern()

    it('Should be able to get all cities in the Northern hemisphere', () => {
        expect(northernCommunity.cities.length).toEqual(22)
        expect(northernCommunity.cities.every(city => city.latitude > 0)).toBeTruthy()
    })

    it('Should be able to get all cities in the Southern hemisphere', () => {
        expect(southernCommunity.cities.length).toEqual(8)
        expect(southernCommunity.cities.every(city => city.latitude <= 0)).toBeTruthy()
    })

    it('Should return \'undefined\' when trying to get cities in an invalid hemisphere ', () => {
        expect(brownCommunity).toBeUndefined()
    })

    it('Should be able to determine the Northern-most city', () => {
        expect(northernMostCity.name).toMatch(/Yellowknife/)
    })

    it('Should be able to determine the Southern-most city', () => {
        expect(southernMostCity.name).toMatch(/Lago Escondido/)
    })

    it('Should be able to determine the total population of all cities', () => {
        expect(testCommunity.getPopulation()).toEqual(39936069)
    })

    it('Should be able to sort by name, ascending & descending', () => {
        expect(testCommunity.sort('name', 'ascending').cities[0].name).toMatch(/Alberobello/)
        expect(testCommunity.sort('name', 'ascending').cities[1].name).toMatch(/Calgary/)
        expect(testCommunity.sort('name', 'descending').cities[0].name).toMatch(/Yellowknife/)
    })

    it('Should be able to sort by population, ascending & descending', () => {
        expect(testCommunity.sort('population', 'ascending').cities[0].name).toMatch(/Gross/)
        expect(testCommunity.sort('population', 'ascending').cities[22].population).toEqual(18233)
        expect(testCommunity.sort('population', 'descending').cities[0].name).toMatch(/Sao Paulo/)
    })

    it('Should be able to sort by latitude, ascending & descending', () => {
        expect(testCommunity.sort('latitude', 'ascending').cities[0].name).toMatch(/Lago Escondido/)
        expect(testCommunity.sort('latitude', 'descending').cities[0].name).toMatch(/Yellowknife/)
    })

    it('Should be able to sort by longitude, ascending & descending', () => {
        expect(testCommunity.sort('longitude', 'ascending').cities[0].name).toMatch(/Yellowknife/)
        expect(testCommunity.sort('longitude', 'descending').cities[0].name).toMatch(/Wanaka/)
    })

    const testCommunity2 = new Community(cities)
    testCommunity2.cities[3].name = testCommunity2.cities[4].name
    it('Should be able to sort by name, ascending & descending, even when duplicate names are present', () => {
        expect(testCommunity2.sort('name', 'ascending').cities[0].name).toMatch(/Alberobello/)
        expect(testCommunity2.sort('name', 'ascending').cities[1].name).toMatch(/Calgary/)
        expect(testCommunity2.sort('name', 'descending').cities[0].name).toMatch(/Yellowknife/)
    })

})
