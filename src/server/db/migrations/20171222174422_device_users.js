
exports.up = function(knex, Promise) {
  return knex.schema.createTable('device_users', (table) => {
      table.increments('id').primary();
      table.integer('userId').references('id').inTable('users').onDelete('CASCADE');
      table.integer('deviceId').references('id').inTable('devices').onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('device_users');
};
