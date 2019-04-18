import { Movie, MoviesList } from './MoviesList'
import movieData from '../DataStructures/movies.json'

/* 
https://www.boxofficemojo.com/franchises/chart/?view=main&id=marvelcomics.htm&sort=date&order=DESC&p=.htm
 */

describe('The MoviesList class', () => {
    
    const movieEarnings = new MoviesList()
    movieEarnings.insert(new Movie())
    
    movieData.forEach(film => movieEarnings.insert(film))
    
    it('should create a linked list with the expected data', () => {
        expect(movieEarnings).not.toBeNull()
    })
    it('the length of the list should match the number of elements inserted', () => {
        expect(movieEarnings.length).toEqual(movieData.length+1)    //+1 for the blank movie inserted
    })
    it('the total gross should equal the expected value', () => {
        expect(movieEarnings.totalGross()).toBeCloseTo(movieData.reduce((acc, cur) => acc + cur.gross, 0))
    })
    test('inserting a blank movie shouldn\'t change the total gross', () => {
        expect(movieEarnings.totalGross()).toBeCloseTo(movieData.reduce((acc, cur) => acc + cur.gross, 0))
    })
})
