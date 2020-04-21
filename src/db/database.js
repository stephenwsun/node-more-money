class Database {
  constructor() {}

  init() {
    this.pg = require('knex')({
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING,
      searchPath: ['knex', 'public'],
    });
  }
}

const database = new Database()
export default database