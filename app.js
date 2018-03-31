const express = require('express')
const bodyParser = require('body-parser')

const app = express()

require('./db')

const config = require('./config')
const user = require('./users/routes')

const passport = require('passport');
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());


app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`)
})

app.use(bodyParser.json())

app.use('/api/v1', user)

// error handling
app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.path}`)
  err.status = 404
  next(err)
})
app.use((error, req, res, next) => {
  if (error) {
    return res.status(400).json({error})
  }
  next(error)
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app

