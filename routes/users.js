//const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {forbiddenIfNotAdminValidation, jwtTokenValidation} = require("../middlewares/authenticator");
const UsersProvider = require('../db_provider/users-provider');
const userProvider = new UsersProvider(); // Create an instance of the GenreProvider class

router.get('/', jwtTokenValidation, async (req, res) => {
    forbiddenIfNotAdminValidation(req, res);
    
    const users = await userProvider.getAllUsers();
    res.status(200).send(users);
})

module.exports = router;