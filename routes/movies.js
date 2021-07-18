const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {forbiddenIfNotAdminValidation, jwtTokenValidation} = require("../middlewares/authenticator");
const paging = require("../middlewares/paging");
const Movie = require("../models/movie-model");
const PagingResult = require("../models/paging-result-model");

const movies = [
    new Movie(1, "The Matrix", 1999, [1, 4]),
    new Movie(2, "Titanic", 1997, [5, 6]),
    new Movie(3, "The Avengers", 2012, [7]),
    new Movie(4, "Serenity", 2005, [8]),
    new Movie(5, "The Mummy", 1999, [9, 10, 1, 2])
]

//####Movies endpoints######
router.get('/', jwtTokenValidation, (req, res) => {
    const { name, release_date, page = 1, limit = 10 } = req.query;
  
    const { error } = validateMoviesQueryParams(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    let filteredMovies = filterMovies(movies, req.query);
    var pagedMovies = paging.filterWithPageAndLimit(filteredMovies, page, limit);

    res.send(new PagingResult(pagedMovies, Number(page), Number(limit), filteredMovies.length));
});


//Helper methods
function filterMovies(movies, query) {
    const { name, release_date} = query;

    if (name != undefined && release_date != undefined) {
        return movies.filter(c => 
                c.name.toLowerCase().includes(name.toLowerCase()) 
                && c.release_date == release_date);
    }         
    else if (name == undefined && release_date == undefined) {
        return movies;
    }    
    else if (name == undefined) {
        return movies.filter(c => c.release_date == release_date)
    }
    else if (release_date == undefined) {
        return movies.filter(c.name.toLowerCase().includes(name.toLowerCase()))
    }
}

function validateMoviesQueryParams(queryParams){
    const schema = {
      page: Joi.number().min(1).max(250),
      limit: Joi.number().min(1).max(20),
      name: Joi.string().min(3).optional(),
      release_date: Joi.number().min(1930).optional()
    };
  
    return Joi.validate(queryParams, schema);
}

module.exports = router;