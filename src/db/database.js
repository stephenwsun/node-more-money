import Sequelize from 'sequelize'

class Database {
  constructor() {}

  async init() {
    this.sequelize = new Sequelize(process.env.PG_CONNECTION_STRING, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
      },
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })

    try {
      await this.sequelize.authenticate()
      this.sequelize.sync()
      console.log('PostgreSQL connection has been established successfully')
    } catch (err) {
      console.error('Unable to connect to the database', err)
    }
  }
}

const database = new Database()
export default database
