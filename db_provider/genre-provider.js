const Genre = require('../models/genre-model.js');

const genresData = [
    new Genre(1, 'Action'),
    new Genre(2, 'Horror'),
    new Genre(3, 'Romance'),
    new Genre(4, 'Science Fiction'),
    new Genre(5, 'Disaster Film'),
    new Genre(6, 'Epic Romance'),
    new Genre(7, 'Superhero Film'),
    new Genre(8, 'Space Western'),
    new Genre(9, 'Comedy'),
    new Genre(10, 'Adventure'),
    new Genre(11, 'Western')
];

class GenreProvider {
    constructor() {}

    getAllGenres() {
      return genresData;
    }

    getGenreById(genreId) {
      return genresData.find(genre => genre.id === genreId);
    }

    addGenre(genre) {
      genre.id = genresData.length + 1;
      genresData.push(genre);
      return genre;
    }

    updateGenre(genre) {
        const index = genresData.findIndex(g => g.id === genre.id);
        genresData.splice(index, 1, new Genre(genre.id, genre.name));
        return genre;
    }

    deleteGenre(genreId) {
        const index = genresData.findIndex(g => g.id === genreId);
        genresData.splice(index, 1);
    }

    searchGenresByName(name) {
        return genresData.filter(genre =>
          genre.name.toLowerCase().includes(name.toLowerCase())
        );
    }
}

module.exports = GenreProvider;