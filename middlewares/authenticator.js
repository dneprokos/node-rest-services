const jwt = require('jsonwebtoken');
const accessTokenSecret = 'mysupersecretkey';

async function jwtTokenValidation(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
  
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

async function forbiddenIfNotAdminValidation(req, res, next) {
    const { role } = req.user;

    if (role !== 'admin') {
      return res.status(403).send('Your user role cannot perform this operation');
    }

    next(); // Call next() to continue processing the request
}

module.exports = { jwtTokenValidation, forbiddenIfNotAdminValidation }