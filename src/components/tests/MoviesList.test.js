import { Movie, MoviesList } from '../js/MoviesList'

describe('The MoviesList class', () => {
    const movieData = [
        new Movie(),
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
    
    const movieEarnings = new MoviesList()
    
    movieData.forEach(film => movieEarnings.insert(film))
    
    it('should create a linked list with the expected data', () => {
        expect(movieEarnings).not.toBeNull()
    })
    it('the length of the list should match the number of elements inserted', () => {
        expect(movieEarnings.length).toEqual(movieData.length)
    })
    it('the total gross should equal the expected value', () => {
        expect(movieEarnings.totalGross()).toBeCloseTo(movieData.reduce((acc, cur) => acc + cur.gross, 0))
    })
})
