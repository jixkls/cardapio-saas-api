/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("menu_categories", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

        table.uuid("restaurant_id").notNullable().references("id").inTable("restaurants").onDelete("CASCADE");

        table.string("name", 150).notNullable();

        table.integer("display_order").defaultTo(0);

        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu_categories');
};
