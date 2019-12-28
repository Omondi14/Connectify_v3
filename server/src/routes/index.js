var express = require('express');
var authentication = require('./authentication');

const passport = require('passport');
const passportService = require('../services/passport');
const requireAuth = passport.authenticate('jwt', {session: false});

const routes = express.Router();

routes.get('/', requireAuth, (req, res) => res.redirect('/home'))
routes.use('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
routes.use('/', authentication)

module.exports = routes;
