const express = require('express');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const users = require('./routes/users');
const authorization = require('./routes/authorization');
const app = express();
const swagger = require('./swagger/swagger');
const main = require('./middlewares/main-application')

//Json body parse
app.use(express.json());

//Routes
app.use('/api/authorization', authorization);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/users', users);

//Swagger
app.use('/api-docs', swagger);

//Start application
main.startApplication(app);
