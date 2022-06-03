import { DataSource } from 'typeorm';
import configInfo from '../config/config';
import User from './User';
import Photo from './Photo';
import Hashtag from './Hashtag';

const env = process.env.NODE_ENV || 'development';
const config = configInfo[env];

const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.host,
  port: 3306,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: [User, Photo, Hashtag],
  synchronize: true,
  logging: true,
});

export default AppDataSource;
