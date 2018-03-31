const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('./model')
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
    clientID: 2009751859260789,
    clientSecret: 'aec75b3675e8cbb3bde5464c4d67480b',
  }, function(accessToken, refreshToken, profile, done) {
  console.log('User profile', profile)
    User.findOrCreate({facebookId: profile.id}, function (error, user) {
      return done(error, user);
    });
  }
));

router.get('/user', (req, res, next) => {
  User.find({})
    .then(user => {
    res.json({user})
  })
})

router.post('/user', (req, res, next) => {
  new User(req.body.user)
    .save()
    .then(user => {
      res.json({user})
    })
    .catch(next)
})

router.post('/user/facebook/token',
  function (req, res, next) {
    console.log('here')
    next()
  },
  passport.authenticate('facebook-token'),
  function (req, res) {
    res.send(req.user);
  }
);

module.exports = router




