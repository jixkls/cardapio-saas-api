/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("orders", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

        table.uuid("restaurant_id").notNullable().references("id").inTable("restaurants").onDelete("CASCADE");

        table.string("customer_name", 150);
        table.string("customer_phone", 40);

        table
            .enu("payment_method", ["CASH", "PIX", "CARD"], {
                useNative: true,
                enumName: "payment_method_enum",
            })
            .notNullable()
            .defaultTo("CASH");

        table.decimal("change_amount", 10, 2);

        table
            .enu("status", ["RECEIVED", "IN_PROGRESS", "READY", "COMPLETED", "CANCELED"], {
                useNative: true,
                enumName: "order_status_enum",
            })
            .notNullable()
            .defaultTo("RECEIVED");

        table.decimal("total_amount", 10, 2).notNullable().defaultTo(0);

        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

        table.timestamp("updated_at");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orders")
        .raw('DROP TYPE IF EXISTS "payment_method_enum";')
        .raw('DROP TYPE IF EXISTS "order_status_enum";');
};
