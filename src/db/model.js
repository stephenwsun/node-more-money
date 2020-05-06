import Sequelize from 'sequelize'

class Model {
  constructor(sequelize) {
    this._sequelize = sequelize

    const uniqueBalance = {
      indexes: [
        {
          unique: true,
          fields: ['date_of', 'account_id'],
        },
      ],
    }

    const options = {
      freezeTableName: true,
    }

    this.User = sequelize.define(
      'app_users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoincrement: true,
        },
        email: {
          type: Sequelize.STRING,
          field: 'email',
        },
        username: {
          type: Sequelize.STRING,
          field: 'username',
        },
        password: {
          type: Sequelize.STRING,
          field: 'password',
        },
      },
      options
    )

    this.Item = sequelize.define(
      'plaid_items',
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        accessToken: {
          type: Sequelize.STRING,
          field: 'access_token',
        },
        institutionId: {
          type: Sequelize.STRING,
          field: 'institution_id',
        },
        institutionName: {
          type: Sequelize.STRING,
          field: 'institution_name',
        },
        appUserId: {
          type: Sequelize.INTEGER,
          references: {
            model: this.User,
          },
        },
      },
      options
    )

    this.Account = sequelize.define(
      'plaid_accounts',
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        plaidItemId: {
          type: Sequelize.STRING,
          references: {
            model: this.Item,
          },
          field: 'plaid_item_id',
        },
        balance: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
        },
        mask: {
          type: Sequelize.STRING,
        },
        type: {
          type: Sequelize.STRING,
        },
      },
      options
    )

    this.BalanceHistory = sequelize.define(
      'balance_history',
      {
        dateOf: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'date_of',
        },
        plaidAccountId: {
          type: Sequelize.STRING,
          references: {
            model: this.Account,
          },
          allowNull: false,
          field: 'plaid_account_id',
        },
        balance: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      Object.assign({}, uniqueBalance, options)
    )

    this.Transaction = sequelize.define(
      'transactions',
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        amount: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        plaidAccountId: {
          type: Sequelize.STRING,
          references: {
            model: this.Account,
          },
          field: 'plaid_account_id',
        },
        categories: {
          type: Sequelize.STRING,
          validate: {
            isJson(string) {
              string & JSON.parse(string)
            },
          },
        },
      },
      options
    )

    this.User.hasMany(this.Item)
    this.Item.hasMany(this.Account)
    this.Account.hasMany(this.Transaction)
    this.Account.hasMany(this.BalanceHistory)
    this.Item.belongsTo(this.User)
    this.Account.belongsTo(this.Item)
    this.Transaction.belongsTo(this.Account)
    this.BalanceHistory.belongsTo(this.Account)
  }
}

export default Model
