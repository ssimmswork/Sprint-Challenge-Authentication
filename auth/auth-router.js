const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model');
const secrets = require('./config');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

Users.add(user)
  .then(newUser => {
    res.status(201).json(newUser);
  })
  .catch(err => {
    res.status(500).json(err);
  })


});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  Users.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      }
      else{
        res.status(401).json(error);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  
});

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '8h'
  }
  const tokenSecret = secrets.jwtSecret;
  return jwt.sign(payload,tokenSecret,options);
}


module.exports = router;
