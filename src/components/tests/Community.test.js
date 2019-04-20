import { Community } from '../js/Community'
import cities from '../js/cities.json'


describe('The Community class\' methods...', () => {
    const testCommunity = new Community(cities)
    const northernCommunity = Community.whichSphere('north')
    const southernCommunity = Community.whichSphere('south')
    const northernMostCity = testCommunity.getMostNorthern()
    const southernMostCity = testCommunity.getMostSouthern()

    it('Should be able to get all cities in the Northern hemisphere', () => {
        expect(northernCommunity.length).toEqual(22)
        expect(northernCommunity.every(city => city.latitude > 0)).toBeTruthy()
    })

    it('Should be able to get all cities in the Southern hemisphere', () => {
        expect(southernCommunity.length).toEqual(8)
        expect(southernCommunity.every(city => city.latitude <= 0)).toBeTruthy()
    })

    it('Should be able to determine the Northern-most city', () => {
        expect(northernMostCity.name).toMatch(/Yellowknife/)
    })

    it('Should be able to determine the Southern-most city', () => {
        expect(southernMostCity.name).toMatch(/Lago Escondido/)
    })

    it('Should be able to determine the total population of all cities', () => {
        expect(testCommunity.getPopulation()).toEqual(39936066)
    })

    it('Should be able to sort by name, ascending & descending', () => {
        expect(testCommunity.sort('name', 'ascending')[0].name).toMatch(/Alberobello/)
        expect(testCommunity.sort('name', 'descending')[0].name).toMatch(/Yellowknife/)
    })

    it('Should be able to sort by population, ascending & descending', () => {
        expect(testCommunity.sort('population', 'ascending')[0].name).toMatch(/Gross/)
        expect(testCommunity.sort('population', 'descending')[0].name).toMatch(/Sao Paulo/)
    })

    it('Should be able to sort by latitude, ascending & descending', () => {
        expect(testCommunity.sort('latitude', 'ascending')[0].name).toMatch(/Lago Escondido/)
        expect(testCommunity.sort('latitude', 'descending')[0].name).toMatch(/Yellowknife/)
    })

    it('Should be able to sort by longitude, ascending & descending', () => {
        expect(testCommunity.sort('longitude', 'ascending')[0].name).toMatch(/Yellowknife/)
        expect(testCommunity.sort('longitude', 'descending')[0].name).toMatch(/Wanaka/)
    })
})
