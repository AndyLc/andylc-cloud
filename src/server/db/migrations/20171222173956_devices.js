
exports.up = function(knex, Promise) {
  return knex.schema.createTable('devices', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.json('data');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('devices');
};
