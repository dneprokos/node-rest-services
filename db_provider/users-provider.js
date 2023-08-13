const User = require("../models/user-model");
const { hashPassword } = require("../utils/passwordUtils");

const users = [
    new User(1, "testadmin", "testadminpassword", "admin"),
    new User(2, "test", "testpassword", "member")
];

class UsersProvider {
    async getAllUsers() {
        const hashedUsers = users.map(user => ({
            ...user,
            password: hashPassword(user.password)
        }));
        return hashedUsers;
    }

    async getUser(user) {
        return users.find(u => u.username === user.username && u.password === user.password);
    }
}

module.exports = UsersProvider;