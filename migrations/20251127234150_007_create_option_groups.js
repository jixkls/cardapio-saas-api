/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("menu_item_option_groups", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("menu_item_id").notNullable().references("id").inTable("menu_items").onDelete("CASCADE");

      table.string("name", 150).notNullable();

      //Single: usuário escolhe 1 opção
      //Multiple: usuário escolhe vários itens
      table.enu("type", ["SINGLE", "MULTIPLE"], {
          useNative: true,
          enumName: "option_group_type",
      })
          .notNullable().defaultTo("SINGLE");

      table.integer("min_options").defaultTo(0);
      table.integer("max_options").defaultTo(1);

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("menu_item_option_groups").raw('DROP TYPE IF EXISTS "option_group_type";');
};