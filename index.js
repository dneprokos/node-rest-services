const Joi = require('joi');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


app.use(express.json());


const swaggerUi = require('swagger-ui-express');
const { parse } = require('yamljs');
YAML = require('yamljs');
swaggerDocument = YAML.load('./swagger.yml');

// function limit(c){
//   return this.filter((x,i)=>{
//   if(i<=(c-1)){return true}
//   })
// }

// function skip(c){
//   return this.filter((x,i)=>{
//   if(i>(c-1)){return true}
//   })
// }

// Array.prototype.limit=limit;
// Array.prototype.skip=skip;

const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },
  { id: 3, name: 'Test action' }   
];


//######Authorization logic and endpoints#######
const accessTokenSecret = 'mysupersecretkey';
const users = [
  {
      username: 'testadmin',
      password: 'testadminpassword',
      role: 'admin'
  }, {
      username: 'test',
      password: 'testpassword',
      role: 'member'
  }
];

app.post('/api/authorization', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.query;

  // Filter user from the users array by username and password
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

      res.json({
          accessToken
      });
  } else {
      res.sendStatus(404).send(error.details[0].message);
  }
});

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
app.get('/api/genres', authenticateJWT, (req, res) => {
  res.send(genres);
});

app.post('/api/genres', authenticateJWT, (req, res) => {
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

app.put('/api/genres/:id', authenticateJWT, (req, res) => {
  forbiddenIfNotAdminValidation(req, res);

  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  genre.name = req.body.name; 
  res.send(genre);
});

app.delete('/api/genres/:id', authenticateJWT, (req, res) => {
  forbiddenIfNotAdminValidation(req, res);

  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

app.get('/api/genres/search', authenticateJWT, (req, res) => {
  const { page = 1, limit = 10, name } = req.query;

  const { error } = validatePageNumberAndLimit(req.query);
  if (error) return res.status(400).send(error.details[0].message);

  let filteredGenres = genres.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  var pagedGenres = filterWithPageAndLimit(filteredGenres, page, limit);

  res.send({
    genres: pagedGenres,
    pageNumber: Number(page),
    pageLimit: Number(limit),
    totalFound: filteredGenres.length
  });
});


app.get('/api/genres/:id', authenticateJWT, (req, res) => {
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

    return array.slice(startIndex, endIndex)
  }
}

function validatePageNumberAndLimit(queryParams){
  const schema = {
    page: Joi.number().min(1).max(250),
    limit: Joi.number().min(1).max(20)
  }

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...
Swagger available by the following url: http://localhost:${port}/api-docs/`));