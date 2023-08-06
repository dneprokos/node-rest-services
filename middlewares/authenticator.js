//const c = require('config');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'mysupersecretkey';

function forbiddenIfNotAdminValidation(req, res){
    const { role } = req.user;
    console.log(role);

    if (role !== 'admin') {
      return res.status(403).send('Your user role cannot perform this operation');
    }
}

function jwtTokenValidation(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
  
            req.user = user;
            console.log(user);
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { forbiddenIfNotAdminValidation, jwtTokenValidation }