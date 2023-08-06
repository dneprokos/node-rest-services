const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {forbiddenIfNotAdminValidation, jwtTokenValidation} = require("../middlewares/authenticator");
const paging = require("../middlewares/paging");
const Movie = require("../models/movie-model");
const PagingResult = require("../models/paging-result-model");
const genres = require('./genres'); 

const movies = [
    new Movie(1, "The Matrix", 1999, [1, 4]),
    new Movie(2, "Titanic", 1997, [5, 6]),
    new Movie(3, "The Avengers", 2012, [7]),
    new Movie(4, "Serenity", 2005, [8]),
    new Movie(5, "The Mummy", 1999, [9, 10, 1, 2])
]

//####Movies endpoints######
router.get('/', jwtTokenValidation, (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    const { error } = validateMoviesQueryParams(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    const filteredMovies = filterMovies(movies, req.query);
    const pagedMovies = paging.filterWithPageAndLimit(filteredMovies, page, limit);

    res.status(200).send(new PagingResult(pagedMovies, Number(page), Number(limit), filteredMovies.length));
});

router.get('/:id', jwtTokenValidation, (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.status(200).send(movie);
});

router.post('/', jwtTokenValidation, (req, res) => {
    forbiddenIfNotAdminValidation(req, res);

    const { error } = validateProperties(req.body.name, req.body.release_date, req.body.genre_ids);
    if (error) res.status(400).send(error.details[0].message);

    // Validate genre_ids using the function from genres.js
    if (!genres.areGenreIdsValid(req.body.genre_ids)) {
        return res.status(400).send('Invalid genre_ids provided.');
    }

    const newMovie = new Movie (movies.length + 1, req.body.name, req.body.release_date, req.body.genre_ids);
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

router.delete('/:id', jwtTokenValidation, (req, res) => {
    forbiddenIfNotAdminValidation(req, res);

    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);
  
    res.send(204);
});

//Helper methods
function filterMovies(movies, query) {
  const { name, release_date, genre_ids } = query;

  return movies.filter(movie => {
    const lowercaseName = name ? name.toLowerCase() : null;
    const lowercaseMovieName = movie.name.toLowerCase();

    const matchesName = !name || lowercaseMovieName.includes(lowercaseName);
    const matchesReleaseDate = !release_date || movie.release_date == release_date;
    const matchesGenreIds = !genre_ids || genre_ids.split(',').map(id => parseInt(id.trim())).some(genreId => movie.genre_ids.includes(genreId));

    return matchesName && matchesReleaseDate && matchesGenreIds;
  });
}

function validateMoviesQueryParams(queryParams){
    const schema = {
      page: Joi.number().min(1).max(250),
      limit: Joi.number().min(1).max(20),
      name: Joi.string().min(3).optional(),
      release_date: Joi.number().min(1930).optional(),
      genre_ids: Joi.string().regex(/^\d+(,\d+)*$/).optional()
    };
  
    return Joi.validate(queryParams, schema);
}

function validateProperties(name, release_date, genre_ids) {
    const schema = {
        name: Joi.string().required().min(3),
        release_date: Joi.number().min(1930).optional().allow(null),
        genre_ids: Joi.array().items(Joi.number()).optional().allow(null)
    };

    return Joi.validate({name, release_date, genre_ids}, schema);
}

module.exports = router;