const jwt = require('jsonwebtoken');
const knex = require('../db/connection');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  if (req.headers.authorization == process.env.DEVICE_SECRET) {
    return next();
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization;
  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }
    const id = decoded.id;
    // check if a user exists
    return knex('users').where({id}).first()
    .then((user) => {
      if (!user) return res.status(401).end();
      res.locals.current_user = id;
      return next();
    })
    .catch((err) => { return res.status(401).end(); });
  });
};
