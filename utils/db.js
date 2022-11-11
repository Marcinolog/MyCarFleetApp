const {createPool} = require ("mysql2/promise");


const pool = createPool({
    host: 'localhost',
    user: 'root',
    port: 8889,
    password: 'Marcin12',
    database: 'service-cars-app',
    namedPlaceholders: true,
    decimalNumbers: true,
});

module.exports = {
    pool,
}
