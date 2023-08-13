const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {forbiddenIfNotAdminValidation, jwtTokenValidation} = require("../middlewares/authenticator");
const paging = require("../middlewares/paging");
const PagingResult = require("../models/paging-result-model");
const GenreProvider = require('../db_provider/genre-provider.js');
const genreProvider = new GenreProvider(); // Create an instance of the GenreProvider class

//####Genres endpoints######
  router.get('/', jwtTokenValidation, async (req, res) => {
    const genres = await genreProvider.getAllGenres();
    res.send(genres);
  });
  
  router.post('/', jwtTokenValidation, forbiddenIfNotAdminValidation, async (req, res) => {  
    const { error } = validateGenre(req.body);
    if (error) 
      return res.status(400).send(error.details[0].message);
  
    const genre = {
      // id: genres.length + 1,
      name: req.body.name
    };

    const newGenre = await genreProvider.addGenre(genre);
    //genres.push(genre);
    res.status(201).json(newGenre);
  });
  
  router.put('/:id', jwtTokenValidation, forbiddenIfNotAdminValidation, async (req, res) => {
    // Look up the genre
    const genreId = parseInt(req.params.id);
    const genre = await genreProvider.getGenreById(genreId);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    // Validate the genre
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // Update the genre
    const updatedGenre = await genreProvider.updateGenre(req.body);
    res.status(200).json(updatedGenre);
  });
  
  router.delete('/:id', jwtTokenValidation, forbiddenIfNotAdminValidation, async (req, res) => {  
    const genreId = parseInt(req.params.id);
    const genre = await genreProvider.getGenreById(genreId);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    genreProvider.deleteGenre(genreId);  
    res.send(204);
  });
  
  router.get('/search', jwtTokenValidation, async (req, res) => {
    const { page = 1, limit = 10, name } = req.query;
  
    const { error } = validateSearchGenresQueryParams(req.query);
    if (error) return res.status(400).send(error.details[0].message);
  
    let filteredGenres = await genreProvider.searchGenresByName(name);
    var pagedGenres = paging.filterWithPageAndLimit(filteredGenres, page, limit);
  
    res.status(200).send(new PagingResult(pagedGenres, Number(page), Number(limit), filteredGenres.length));
  });
  
  
  router.get('/:id', jwtTokenValidation, async (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = await genreProvider.getGenreById(genreId);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.status(200).send(genre);
  });
    
  function validateSearchGenresQueryParams(queryParams){
    const schema = {
      page: Joi.number().min(1).max(250),
      limit: Joi.number().min(1).max(20),
      name: Joi.string()
    };
  
    return Joi.validate(queryParams, schema);
  }
  
  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }
  
module.exports = router;
 