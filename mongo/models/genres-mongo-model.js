const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true
    }
});

const GenreMongoModel = mongoose.model('Genre', genreSchema);

module.exports = GenreMongoModel;