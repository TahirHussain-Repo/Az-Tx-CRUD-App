const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Tots*29",
    database: "survey_answers",
    host: "localhost",
    port: 5432
});

module.exports = pool;