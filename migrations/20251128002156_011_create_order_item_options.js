/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_item_options", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

        table.uuid("order_item_id").notNullable().references("id").inTable("order_items").onDelete("CASCADE");

        table.uuid("menu_item_option_id").notNullable().references("id").inTable("menu_item_options").onDelete("CASCADE");

        table.decimal("extra_price", 10, 2).defaultTo(0);

        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("order_item_options");
};
