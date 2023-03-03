import {createPool} from "mysql2/promise";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    port: 8889,
    password: 'Marcin12',
    database: 'service-cars-app',
    namedPlaceholders: true,
    decimalNumbers: true,
});

