/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("menu_item_options", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("option_group_id").notNullable().references("id").inTable("menu_item_option_groups").onDelete("CASCADE");

      table.string("label", 150).notNullable();
      table.decimal("extra_price", 10, 0).defaultTo(0);

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("menu_item_options");
};
