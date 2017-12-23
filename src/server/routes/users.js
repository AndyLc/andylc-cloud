const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const knex = require('../db/connection');

router.get('/profile', (req, res, next)  => { //TODO: UPDATE TESTS
  var id = res.locals.current_user;
  return knex('users').select('email').where({id}).first()
  .then((user) => {
    if (!user) return res.status(401).end();
    return res.status(200).json({user});
  })
  .catch((err) => { return res.status(401).end(); });
});

router.get('/', (req, res, next)  => { //TODO: make this admin only visible
  done();
  //handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
