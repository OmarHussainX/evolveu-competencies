import { Queue } from '../js/Queue'
import { Movie } from '../js/MoviesList'


const movieData = [
    new Movie('Captain Marvel', 377.91),
    new Movie('Spider-Man: Into The Spider-Verse', 190.24),
    new Movie('Venom', 213.52),
    new Movie('Ant-Man and the Wasp', 216.65),
    new Movie('Deadpool 2', 318.49),
    new Movie('Avengers: Infinity War', 678.82),
    new Movie('Black Panther', 700.06),
    new Movie('Thor: Ragnarok', 315.06),
    new Movie('Spider-Man: Homecoming', 334.20),
    new Movie('Guardians of the Galaxy: Vol. 2', 389.81),
    new Movie('Logan', 226.28),
    new Movie('Doctor Strange', 232.64),
    new Movie('X-Men: Apocalypse', 155.44),
    new Movie('Captain America: Civil War', 408.08),
    new Movie('Deadpool', 363.07),
    new Movie('Fantastic Four', 56.12),
    new Movie('Ant-Man', 180.20),
    new Movie('Avengers: Age of Ultron', 459.00),
    new Movie('Big Hero 6', 222.53),
    new Movie('Guardians of the Galaxy', 333.18),
]

describe('An empty Queue', () => {
    
    const movieQueue = new Queue()
    
    it('should have a size of zero', () => {
        expect(movieQueue.size()).toEqual(0)
    })
})


describe('A non-empty Queue', () => {
    
    const movieQueue = new Queue()
    
    movieData.forEach(film => movieQueue.add(film))

    it('should contain the expected data', () => {
        expect(movieQueue).not.toBeNull()
        expect(movieQueue.data[5].title).toEqual(movieData[5].title)
        expect(movieQueue.data[7].gross).toEqual(movieData[7].gross)
    })
    it('the size should match the number of elements added', () => {
        expect(movieQueue.size()).toEqual(movieData.length)
    })
    it('deleting should remove the first element and reduce the size of the queue by 1', () => {
        expect(movieQueue.delete().title).toMatch(movieData[0].title)
        expect(movieQueue.size()).toEqual(movieData.length-1)
    })
})
