const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//######Authorization logic and endpoints#######
const accessTokenSecret = 'mysupersecretkey';
const users = [
  {
      username: 'testadmin',
      password: 'testadminpassword',
      role: 'admin'
  }, {
      username: 'test',
      password: 'testpassword',
      role: 'member'
  }
];

router.post('/', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.query;

  // Filter user from the users array by username and password
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
      res.json({ accessToken });
  } else {
      res.status(404).send(error.details[0].message);
  }
});

module.exports = router;