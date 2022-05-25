import { Sequelize } from 'sequelize';
import configInfo from '../config/config';
import User from '../models/user';

const env = process.env.NODE_ENV || 'development';
const db: any = { User: Sequelize };
const config = configInfo[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = User(sequelize, Sequelize);

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].association) {
//         db[modelName].associate(db);
//     }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db, User};

