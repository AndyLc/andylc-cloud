const bcrypt = require('bcryptjs');
const knex = require('../db/connection');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req, res) {
  return handleErrors(req)
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return knex('users')
        .insert({
          username: req.body.username,
          password: hash
        }).returning('*');
  })
  .catch((err) => {
    res.status(400).json({status: err.message});
  });
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  return next();
}

function correctUser(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  var id = req.params.id;
  knex('users')
  .where({id})
  .returning('*')
  .then((result) => {
      if (result.length < 1) return res.status(401).json({status: 'No such user exists'});
      if (parseInt(req.user.id) !== parseInt(req.params.id)) return res.status(401).json({status: 'You do not have access to this page'});
      return next();
    });
}

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    {status: 'You are already logged in'});
  return next();
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 6) {
      reject({
        message: 'Username must be longer than 6 characters'
      });
    }
    else if (req.body.password.length < 6) {
      reject({
        message: 'Password must be longer than 6 characters'
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  correctUser,
  loginRedirect,
  handleErrors
};
