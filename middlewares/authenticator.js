const jwt = require('jsonwebtoken');
const accessTokenSecret = 'mysupersecretkey';

function forbiddenIfNotAdminValidation(req, res){
    const { role } = req.user;
    if (role !== 'admin') {
      return res.sendStatus(403).send('User role should be Admin');
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
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { forbiddenIfNotAdminValidation, jwtTokenValidation }

// module.exports = (req, res, next) => {
//     const authHeader = req.headers.authorization;
  
//     if (authHeader) {
//         const token = authHeader.split(' ')[1];
  
//         jwt.verify(token, accessTokenSecret, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }
  
//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };