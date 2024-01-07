const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const users = require('./routes/users');
const authorization = require('./routes/authorization');
//const authenticator = require('./middlewares/authenticator');
const app = express();
const swagger = require('./swagger/swagger');
const main = require('./middlewares/main-application');

// Connect to MongoDB only if useDatabase is true
if (config.get('useDatabase')) {
    const mongoConfig = config.get('mongoDB');
    mongoose.connect(mongoConfig.uri, mongoConfig.options)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => {
            console.error('Could not connect to MongoDB...', err);
            process.exit(1);
        });
}
else {
    console.log('Database connection is disabled via configuration. Hardcoded data will be used.');
}

// Json body parse
app.use(express.json());

// Routes
app.use('/api/authorization', authorization);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/users', users);

// Swagger
app.use('/api-docs', swagger);

// Error handling middleware (place at the end)
app.use((err, req, res, next) => async () => {
    console.error(err);
    res.status(500).send('Something went wrong');
    next();
});

//Start application
main.startApplication(app);
