import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "27121977",
  host: "localhost",
  port: 5432,
  database: "tiemchung",
});

// const pool = new pg.Pool({
//   user: "postgres",
//   password: "minh15102001",
//   host: "localhost",
//   port: 5432,
//   database: "tiemchung",
// });

export default pool;
