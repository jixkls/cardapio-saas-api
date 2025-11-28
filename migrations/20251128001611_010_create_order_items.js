/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("order_items", (table) => {

        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

        table.uuid("order_id").notNullable().references("id").inTable("orders").onDelete("CASCADE");

        table.uuid("menu_item_id").notNullable().references("id").inTable("menu_items").onDelete("CASCADE");

        table.integer("quantity").notNullable().defaultTo(1);

        // preço no momento do pedido
        table.decimal("unit_price", 10, 2).notNullable();

        table.string("observation", 255);

        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("order_items");
};
