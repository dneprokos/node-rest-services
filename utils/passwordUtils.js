const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

module.exports = {
    hashPassword
};