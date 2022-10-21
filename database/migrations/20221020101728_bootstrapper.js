/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    /*--------- Authentication Tables ----------*/
    knex.schema.createTable('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('email').notNullable().unique();
      table.string('first_name').notNullable();
      table.string('last_name');
      table.string('encrypted').notNullable();
      table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
      table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('user_properties', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('user').unsigned().notNullable().references('users.id');
      table.string('name').notNullable();
      table.string('value').notNullable();
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.alterTable('user_properties', function (table) {
      table.dropForeign('users');
    }),
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('user_properties'),
  ]);
};
