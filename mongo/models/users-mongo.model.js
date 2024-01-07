const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    username: {
        type: String,
        required: true
    },
    password: String,
    role: String
});

const UserMongoModel = mongoose.model('User', userSchema);

module.exports = UserMongoModel;
