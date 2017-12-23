exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.boolean('admin').notNullable().defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      });
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  };
