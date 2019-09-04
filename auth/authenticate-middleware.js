const jwt = require('jsonwebtoken');
const secrets = require('./config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  
  if(token ){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(decodedToken){
            next();
        }
        else{
          res.send(err);
        }
    })
}
else{
  res.status(401).json({ you: 'shall not pass!' });
}
};
