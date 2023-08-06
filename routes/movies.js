const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {forbiddenIfNotAdminValidation, jwtTokenValidation} = require("../middlewares/authenticator");
const paging = require("../middlewares/paging");
const Movie = require("../models/movie-model");
const PagingResult = require("../models/paging-result-model");
const MoviesProvider = require('../db_provider/movies-provider'); // Import the MoviesProvider class
const moviesProvider = new MoviesProvider(); // Create an instance of the MoviesProvider class
const GenreProvider = require('../db_provider/genre-provider.js');
const genreProvider = new GenreProvider();

//####Movies endpoints######
router.get('/', jwtTokenValidation, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    const { error } = validateMoviesQueryParams(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    const allMovies = await moviesProvider.getAllMovies(); //TODO:  This is not the best way to do this.  We should be using a database.
    const filteredMovies = filterMovies(allMovies, req.query);
    const pagedMovies = paging.filterWithPageAndLimit(filteredMovies, page, limit);

    res.status(200).send(new PagingResult(pagedMovies, Number(page), Number(limit), filteredMovies.length));
});

router.get('/:id', jwtTokenValidation, async (req, res) => {
    const movie = await moviesProvider.getMovieById(parseInt(req.params.id)); 
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.status(200).send(movie);
});

router.post('/', jwtTokenValidation, async (req, res) => {
    forbiddenIfNotAdminValidation(req, res);

    // Validate the request body
    const { error } = validateProperties(req.body.name, req.body.release_date, req.body.genre_ids);
    if (error) res.status(400).send(error.details[0].message);

    // Validate genre_ids using genre-provider
    const invalidGenreIds = await genreProvider.getInvalidGenreIds(req.body.genre_ids);
    if (invalidGenreIds.length > 0) {
      return res.status(400).json({ message: 'Invalid genre_ids provided.', invalidGenreIds });
    }

    const movie = new Movie (0, req.body.name, req.body.release_date, req.body.genre_ids);
    const newMovie = await moviesProvider.addMovie(movie);
    res.status(201).json(newMovie).send();
});

router.delete('/:id', jwtTokenValidation, async (req, res) => {
    forbiddenIfNotAdminValidation(req, res);

    const movie = await moviesProvider.getMovieById(parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    moviesProvider.deleteMovie(parseInt(req.params.id));
    res.status(204).send();
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