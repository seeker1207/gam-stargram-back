import dotenv from 'dotenv';
import { DotenvConfig } from '../type/modelTypes';

dotenv.config();

const configInfo: DotenvConfig = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'gamstargram',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

export default configInfo;
