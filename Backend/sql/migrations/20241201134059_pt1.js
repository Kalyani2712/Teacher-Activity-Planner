/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('teachers', table => {
      table.integer('t_id').primary();
      table.string('name');
      table.string('email').primary();
      table.string('password');
      table.string('designation');
      table.string('qualification');
      table.string('faculty');
      table.string('department');
      table.string('DOB');
      table.string('phoneNo');
      table.text('res_address');
      table.text('per_address');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('teachers');
};
