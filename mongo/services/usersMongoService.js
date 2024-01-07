const User = require("../models/users-mongo.model");
const { hashPassword } = require("../../utils/passwordUtils");

async function getAllUsers() {
    const users = await User.find().sort('id').select('-id username password role');
    return users.map(user => ({
        ...user,
        password: hashPassword(user.password)
    }));
}

async function getUser(user) {
    // Find the user by username and password
    const foundUser = await User.findOne({
        username: user.username, 
        password: user.password
    });

    return foundUser; // This will be null if no matching user is found
}

module.exports = {
    getAllUsers,
    getUser
};