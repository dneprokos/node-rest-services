const Joi = require('joi');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//TODO: Move it to db
const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },
    { id: 4, name: 'Science Fiction' },
    { id: 5, name: 'Disaster Film' },
    { id: 6, name: 'Epic Romance' },  
    { id: 7, name: 'Superhero Film' },
    { id: 8, name: 'Space Western' },
    { id: 9, name: 'Comedy' },
    { id: 10, name: 'Adventure' }
];

//TODO: Move it to separate place and re-use for Movies and Genres
const accessTokenSecret = 'mysupersecretkey';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
  
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

//####Genres endpoints######
  router.get('/', authenticateJWT, (req, res) => {
    res.send(genres);
  });
  
  router.post('/', authenticateJWT, (req, res) => {
    forbiddenIfNotAdminValidation(req, res);
  
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = {
      id: genres.length + 1,
      name: req.body.name
    };
    genres.push(genre);
    res.sendStatus(201).send(genre);
  });
  
  router.put('/:id', authenticateJWT, (req, res) => {
    forbiddenIfNotAdminValidation(req, res);
  
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name; 
    res.send(genre);
  });
  
  router.delete('/:id', authenticateJWT, (req, res) => {
    forbiddenIfNotAdminValidation(req, res);
  
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
  });
  
  router.get('/search', authenticateJWT, (req, res) => {
    const { page = 1, limit = 10, name } = req.query;
  
    const { error } = validateSearchGenresQueryParams(req.query);
    if (error) return res.status(400).send(error.details[0].message);
  
    let filteredGenres = genres.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    var pagedGenres = filterWithPageAndLimit(filteredGenres, page, limit);
  
    res.send({
      data: pagedGenres,
      pageNumber: Number(page),
      pageLimit: Number(limit),
      totalFound: filteredGenres.length
    });
  });
  
  
  router.get('/:id', authenticateJWT, (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  });
  
  function filterWithPageAndLimit(array, page, limit){
    if (array.length === 0)
      return array;
    if (page === 1)
      return array.slice(0, limit);
    if (page > 0) {
      let startIndex = (page - 1) * limit;
      let endIndex = startIndex + limit;
  
      return array.slice(startIndex, endIndex);
    }
  }
  
  function validateSearchGenresQueryParams(queryParams){
    const schema = {
      page: Joi.number().min(1).max(250),
      limit: Joi.number().min(1).max(20),
      name: Joi.string().required().min(3)
    };
  
    return Joi.validate(queryParams, schema);
  }
  
  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }
  
  function forbiddenIfNotAdminValidation(req, res){
    const { role } = req.user;
    if (role !== 'admin') {
      return res.sendStatus(403).send('User role should be Admin');
    }
  }

module.exports = router;
 