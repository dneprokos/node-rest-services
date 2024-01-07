const User = require("../models/user-model");
const { hashPassword } = require("../utils/passwordUtils");
const userService = require('../mongo/services/usersMongoService.js');
const BaseProvider = require("./_base-provider"); // Import the 'BaseProvider' class

const users = [
    new User(1, "testadmin", "testadminpassword", "admin"),
    new User(2, "test", "testpassword", "member")
];

class UsersProvider extends BaseProvider {
    constructor() {
        super();
    }

    /**
     * @description Get all users from the database or the users array
     * returns {Promise<Array>}
     * @example
     * [
     * {
     * "id": 1,
     * "username": "testadmin",
     * "password": "testadminpassword",
     * "role": "admin"
     * },
     * {
     * "id": 2,
     * "username": "test",
     * "password": "testpassword",
     * "role": "member"
     * }
     * ]
     * */
    async getAllUsers() {
        if (this.useDatabase) {
            return await userService.getAllUsers();
        }

        const hashedUsers = users.map(user => ({
            ...user,
            password: hashPassword(user.password)
        }));
        return hashedUsers;
    }

    /**
     * @description Get a user by id from the database or the users array
     * @param {number} userId
     * @returns {Promise<Object>}
     * @example
     * {
     * "id": 1,
     * "username": "testadmin",
     * "password": "testadminpassword",
     * "role": "admin"
     * }
     * */
    async getUser(user) {
        if (this.useDatabase) {
            return await userService.getUser(user);
        }
        
        return users.find(u => u.username === user.username && u.password === user.password);
    }
}

module.exports = UsersProvider;