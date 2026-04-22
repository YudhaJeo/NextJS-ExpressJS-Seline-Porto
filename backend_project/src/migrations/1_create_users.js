// src/migrations/1_create_users.js
import bcrypt from 'bcrypt';

export const up = async function (knex) {
  await knex.schema.createTable('tb_users', (table) => {
    table.increments('IDUSER').primary();
    table.string('USERNAME', 100).notNullable().unique();
    table.string('PASSWORD', 255).notNullable(); 
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
    table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
  });

  // Tambahkan ini agar IDUSER 1 tercipta lebih dulu
  const hashedPassword = await bcrypt.hash('user123', 10);
  await knex("tb_users").insert({
    USERNAME: "UserSample",
    PASSWORD: hashedPassword,
  });
};

export const down = async function (knex) {
  await knex.schema.dropTable("tb_users");
};