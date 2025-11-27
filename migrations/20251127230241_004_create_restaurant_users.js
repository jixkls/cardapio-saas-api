/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("restaurant_users", function (table) {
      table.uuid("ïd").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.uuid("restaurant_id").notNullable().references("id").inTable("restaurants").onDelete("CASCADE");

      table.enu("role", ["OWNER", "MANAGER", "STAFF"], {
          useNative: true,
          enumName: "restaurant_user_role",
      })
          .notNullable()
          .defaultTo("OWNER");

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

      //Pra garantir que não vai duplicar
      table.unique(["user_id", "restaurant_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('restaurant_users');
};
