const config = require('config');
const express = require('express');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const authorization = require('./routes/authorization');
const app = express();
const swagger = require('./swagger/swagger');

//Json body parse
app.use(express.json());

//Routes
app.use('/api/authorization', authorization);
app.use('/api/genres', genres);
app.use('/api/movies', movies);

//Swagger
app.use('/api-docs', swagger);

const port = config.get('port') || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...
Swagger available by the following url: http://localhost:${port}/api-docs/`));