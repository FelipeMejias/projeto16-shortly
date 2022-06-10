import pg from 'pg';

const { Pool } = pg;

const user = 'postgres';
const password = 'Hey000ya';
const host = '127.0.0.1';
const port = 5432;
const database = 'teste16';

const db = new Pool({
  user,
  password,
  host,
  port,
  database
});

export default db
