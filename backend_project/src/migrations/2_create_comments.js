export const up = async function (knex) {
  await knex.schema.createTable("tb_comment", (table) => {
    table.increments("IDCOMMENT").primary();

    table
      .integer("IDUSER")
      .unsigned()
      .notNullable()
      .references("IDUSER")
      .inTable("tb_users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.string("COMMENT", 150).notNullable();
    
    table.enu("RATING", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]).notNullable();
    
    table.timestamp("CREATED_AT").defaultTo(knex.fn.now());
    table.timestamp("UPDATED_AT").defaultTo(knex.fn.now());
  });

  await knex("tb_comment").insert({
    IDUSER: 1,
    COMMENT: "Web portofolionya keren banget, desain ungunya dapet banget!",
    RATING: "10", 
  });
};

export const down = async function (knex) {
  await knex.schema.dropTable("tb_comment");
};