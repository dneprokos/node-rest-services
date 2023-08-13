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

    async getAllGenres() {
      return genresData;
    }

    async getGenreById(genreId) {
      return genresData.find(genre => genre.id === genreId);
    }

    async addGenre(genre) {
      genre.id = genresData.length + 1;
      genresData.push(genre);
      return genre;
    }

    /**
     * @description Add multiple genres
     * @param {Array} genres
     * @returns {Promise<Array>}
     * @example
     * [
     * {
     * "name": "Action"
     * },
     * {
     * "name": "Horror"
     * }
     * ]
    */
    async addGenres(genres) {
        genres.forEach(genre => {
            genre.id = genresData.length + 1;
            genresData.push(genre);
        });
        return genres;
    }

    async updateGenre(genre) {
        const index = genresData.findIndex(g => g.id === genre.id);
        genresData.splice(index, 1, new Genre(genre.id, genre.name));
        return genre;
    }

    async deleteGenre(genreId) {
        const index = genresData.findIndex(g => g.id === genreId);
        genresData.splice(index, 1);
    }

    async searchGenresByName(name) {
      if (!name || name.trim() === "") {
        return genresData; // Return all genres
      }

      return genresData.filter(genre =>
        genre.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    async getInvalidGenreIds(genreIds) {
        const existingGenreIds = genresData.map(genre => genre.id);
        return genreIds.filter(genreId => !existingGenreIds.includes(genreId));
    }
}

module.exports = GenreProvider;