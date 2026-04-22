export const up = async function (knex) {
    await knex.schema.createTable('tb_users', (table) => {
      table.increments('IDUSER').primary();
      table.string('USERNAME', 100).notNullable().unique();
      table.string('PASSWORD', 200).notNullable();
      table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
      table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
    });
    
    await knex("tb_users").insert({
      USERNAME: "UserSample",
      PASSWORD: "user123",
    });
};
  
export const down = async function (knex) {
  await knex.schema.dropTable("tb_users");
};  