// src/migrations/1_create_users.js
import bcrypt from 'bcrypt';

export const up = async function (knex) {
  await knex.schema.createTable('tb_users', (table) => {
    table.increments('IDUSER').primary();
    table.string('USERNAME', 100).notNullable().unique();
    table.string('EMAIL', 100).notNullable().unique(); 
    table.string('PASSWORD', 255).notNullable(); 
    table.boolean('IS_VERIFIED').defaultTo(false); 
    table.string('VERIFY_TOKEN', 255);
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
    table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
  });
};

export const down = async function (knex) {
  await knex.schema.dropTable("tb_users");
};