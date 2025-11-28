/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("menu_items", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("restaurant_id").notNullable().references("id").inTable("restaurants").onDelete("CASCADE");
      table.uuid("category_id").notNullable().references("id").inTable("menu_categories").onDelete("CASCADE");

      table.string("name", 150).notNullable();
      table.string("description", 255);
      table.decimal("base_price", 10, 2).notNullable();
      table.string("image_url", 255);

      table.boolean("is_avaliable").notNullable().defaultTo(true);

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu_items');
};
