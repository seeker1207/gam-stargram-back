"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
const env = process.env.NODE_ENV || 'development';
const db = { User: sequelize_1.Sequelize };
const config = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
db.User = (0, user_1.default)(sequelize, sequelize_1.Sequelize);
// Object.keys(db).forEach(modelName => {
//     if (db[modelName].association) {
//         db[modelName].associate(db);
//     }
// });
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
