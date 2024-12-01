// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './sql/prototype1.db3'
    },
    migrations: { 
      directory: './sql/migrations'
    },
    seeds: {
      directory: './sql/seeds'
    },
    useNullAsDefault: true
  }
};
