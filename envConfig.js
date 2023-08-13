const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

module.exports = {
    baseURL: process.env.BASE_URL,
    regularUser: process.env.REGULAR_USER,
    regularPassword: process.env.REGULAR_USER_PASSWORD,
    adminUser: process.env.ADMIN_USER,
    adminPassword: process.env.ADMIN_USER_PASSWORD
};