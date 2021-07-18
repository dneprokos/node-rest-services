const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {forbiddenIfNotAdminValidation, jwtTokenValidation} = require("../middlewares/authenticator");
const paging = require("../middlewares/paging");

const movies = [
    {id: 1, name: "The Matrix", release_date: 1999, genre_ids: [1, 4]},
    {id: 2, name: "Titanic", release_date: 1997, genre_ids: [5, 6]},
    {id: 3, name: "The Avengers", release_date: 2012, genre_ids: [7]},
    {id: 4, name: "Serenity", release_date: 2005, genre_ids: [8]},
    {id: 5, name: "The Mummy", release_date: 1999, genre_ids: [9, 10, 1, 2]}
]

//####Movies endpoints######
router.get('/', jwtTokenValidation, (req, res) => {
    const { name, release_date, page = 1, limit = 10 } = req.query;
  
    const { error } = validateMoviesQueryParams(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    let filteredMovies = filterMovies(movies, req.query);
    var pagedMovies = paging.filterWithPageAndLimit(filteredMovies, page, limit);

    res.send({
        data: pagedMovies,
        pageNumber: Number(page),
        pageLimit: Number(limit),
        totalFound: filteredMovies.length
      });
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