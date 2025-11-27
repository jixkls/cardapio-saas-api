/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("restaurants", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("name", 150).notNullable();

      //Pra usar na url
      table.string("slug", 150).notNullable().unique();

      table.string("description", 255);
      table.string("phone", 40);
      table.string("address", 255);
      table.string("city", 120);

      table.boolean("is_active").notNullable().defaultTo(true);

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurants");
};
