const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre_ids: {
        type: Array,
        required: true
    } 
});

const MovieMongoModel = mongoose.model('Movie', movieSchema);

module.exports = MovieMongoModel;