const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('johnson123', salt);
    return Promise.join(
      knex('users').insert([
        {
          email: 'jeremy@gmail.com',
          password: hash
        }, {
          email: 'Andy@gmail.com',
          password: bcrypt.hashSync('password', salt)
        }
      ])
    );
  });
};
