DROP TABLE IF EXISTS app_users;
CREATE TABLE app_users (
  id INTEGER PRIMARY KEY NOT NULL,
  email TEXT,
  username TEXT,
  password TEXT
);

DROP TABLE IF EXISTS plaid_items CASCADE;
CREATE TABLE plaid_items (
  id TEXT PRIMARY KEY NOT NULL,
  access_token TEXT,
  institution_id TEXT,
  institution_name TEXT,
  app_user_id INTEGER,
  FOREIGN KEY(app_user_id) REFERENCES app_users(id)
);

DROP TABLE IF EXISTS plaid_accounts CASCADE;
CREATE TABLE plaid_accounts (
  id TEXT PRIMARY KEY NOT NULL,
  plaid_item_id TEXT,
  balance INTEGER NOT NULL,
  name TEXT,
  mask TEXT,
  type TEXT,
  FOREIGN KEY(plaid_item_id) REFERENCES plaid_items(id)
);

DROP TABLE IF EXISTS balance_history;
CREATE TABLE balance_history (
  date_of DATE NOT NULL,
  plaid_account_id TEXT NOT NULL,
  balance INTEGER NOT NULL,
  PRIMARY KEY(plaid_account_id, date_of),
  FOREIGN KEY(plaid_account_id) REFERENCES plaid_accounts(id)
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE plaid_transactions (
  id TEXT PRIMARY KEY NOT NULL,
  plaid_account_id TEXT NOT NULL,
  categories TEXT,
  category_id TEXT,
  amount INTEGER NOT NULL,
  date_of DATE NOT NULL,
  location TEXT,
  name TEXT,
  FOREIGN KEY(plaid_account_id) REFERENCES plaid_accounts(id)
);