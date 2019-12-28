const jwt = require('jwt-simple')
const config = require('../../config')
const {createUser} = require('../actions/signUp')
const bcrypt = require('bcrypt')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

const signin = (req, res, next) => {
  res.send({token: tokenForUser(req.user)})
}

const signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 12;

  if (!email || !password) {
    res.status(422).send({error: 'You must provide an email and a password.'})
  }
  // see if a user with the given email exists.
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      return createUser(name, email, hash)
        .then((newUser) => {
          res.json({token: tokenForUser(newUser)})
        })
        .catch((err) => {
          res.json({error: 'Error saving user to database'})
        })
    })
    .catch((err) => {
      return next(err)
    })
}

module.exports = {signup, signin}
