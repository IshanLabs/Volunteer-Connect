const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {

    if (err) {
        console.error("❌ PostgreSQL Connection Failed");
        console.error(err.message);
        return;
    }

    console.log("✅ PostgreSQL Connected Successfully");

    release();
});

module.exports = pool;