// Enable access to .env variables
import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

console.log ('env variables for db connection:')
console.log('DB_URL', process.env.DB_URL)
console.log('DB_NAME', process.env.DB_NAME)
console.log('DB_USER', process.env.DB_USER)
console.log('DB_PASSWORD', process.env.DB_PASSWORD)
// Create a connection object
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

export default sequelize;

