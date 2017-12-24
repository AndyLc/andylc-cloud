const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const knex = require('../db/connection');

router.post('/create', (req, res, next)  => { //TODO: UPDATE TESTS
  var id = res.locals.current_user;
  knex('devices')
  .insert({
    name: req.body.name,
  })
  .returning("id")
  .then(function (did) {
    var device_id = did[0];
    knex('device_users')
    .insert({
      deviceId: device_id,
      userId: id
    })
    .returning("id")
    .then(function (id) {
      return res.status(200).json({ id: did, status: "successfully created device" });
    });
  });
});

router.get('/', (req, res, next)  => { //TODO: UPDATE TESTS
  var id = res.locals.current_user;
  return knex('users')
  .innerJoin('device_users', 'users.id', 'device_users.userId')
  .where('users.id', id)
  .innerJoin('devices', 'device_users.deviceId', 'devices.id')
  .select('devices.id', 'name', 'data')
  .then((results) => {
    return res.status(200).json({devices: results})
  })
});

router.post('/update', (req, res, next)  => { //TODO: UPDATE TESTS
  console.log(req.body);
  knex('devices')
  .where('name', req.body.device_name)
  .update({
    data: req.body.device_data
  })
  .then((result) => {
    return res.status(200).json({status: "success"})
  })
});

module.exports = router;
