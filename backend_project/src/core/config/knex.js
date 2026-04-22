// D:\Personal App\Seline Porto NextJS ExpressJS\backend_project\src\core\config\knex.js
import knex from 'knex';
import config from '../../../knexfile.js';

const db = knex(config.development);

export default db;