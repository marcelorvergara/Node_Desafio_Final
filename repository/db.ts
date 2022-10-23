import * as pg from "pg";

async function connect() {
  const URL_STR = process.env.URL_DB;
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    connectionString: URL_STR,
  });
  global.connection = pool;
  return pool.connect();
}

export { connect };
