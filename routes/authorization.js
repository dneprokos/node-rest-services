const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UsersProvider = require('../db_provider/users-provider');
const userProvider = new UsersProvider();


//######Authorization logic and endpoints#######
const accessTokenSecret = 'mysupersecretkey';

router.post('/', async (req, res) => {
  // Read username and password from request body
  const { username, password } = req.query;

  try {
    // Filter user from the users array by username and password
    const user = await userProvider.getUser({ username: username, password: password });
    
    if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
      
      res.json({ accessToken });
    } else {
      res.status(404).send('Invalid credentials.');
    }
  } catch (error) {
    // Handle any errors that might occur during user search
    res.status(500).send('Internal server error.');
  }
});

module.exports = router;