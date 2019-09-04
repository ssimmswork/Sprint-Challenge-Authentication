const router = require('express').Router();
const Users = require('./user-model');
const restricted = require('../auth/authenticate-middleware');

router.get('/', restricted, (req,res) => {
   console.log('im here     ');
    Users.find()
        .then(users => {
           
            res.status(201).json({users:users});
        })
        .catch(err => res.send(err));
});

module.exports = router;