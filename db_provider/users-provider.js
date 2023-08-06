const User = require("../models/user-model");

const users = [
    new User(1, "testadmin", "testadminpassword", "admin"),
    new User(2, "test", "testpassword", "member")
];

class UsersProvider {
    constructor() {}

    async getAllUsers() {
      return users;
    }

    async getUser(user) {
        return users.find(u => u.username === user.username && u.password === user.password);
    }
}

module.exports = UsersProvider;